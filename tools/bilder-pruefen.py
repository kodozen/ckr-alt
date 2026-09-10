#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prüft die Aufnahmen unter client/public/fotos.

Drei Dinge, die in diesem Projekt schon einmal danebengegangen sind:

* Zwei Ziele mit derselben Datei. Entsteht, wenn sips abbricht und die
  Zwischendatei liegen bleibt — der Rückgabewert ist dabei 0.
* Schwarze Ränder. Entstehen, wenn die Zielhöhe über der Quellhöhe
  liegt; sips füllt dann auf, statt zu beschneiden.
* Unscharfe Vorlagen. Unter einer Varianz von 60 im Laplace-Operator
  ist eine Aufnahme sichtbar weich.
"""
import glob, os, struct, subprocess, sys, zlib

SCHWELLE_SCHAERFE = 60
SCHWELLE_RAND = 12


def png_lesen(pfad):
    d = open(pfad, "rb").read()
    i, idat, breite, hoehe, tiefe, farbe = 8, b"", 0, 0, 0, 0
    while i < len(d):
        laenge = struct.unpack(">I", d[i:i + 4])[0]
        art = d[i + 4:i + 8]
        rumpf = d[i + 8:i + 8 + laenge]
        if art == b"IHDR":
            breite, hoehe, tiefe, farbe = struct.unpack(">IIBB", rumpf[:10])
        elif art == b"IDAT":
            idat += rumpf
        elif art == b"IEND":
            break
        i += 12 + laenge
    kanaele = {0: 1, 2: 3, 4: 2, 6: 4}[farbe]
    roh = zlib.decompress(idat)
    schritt = breite * kanaele
    aus = bytearray(hoehe * schritt)
    vorher = bytearray(schritt)
    p = 0
    for y in range(hoehe):
        art_f = roh[p]; p += 1
        zeile = bytearray(roh[p:p + schritt]); p += schritt
        for x in range(schritt):
            a = zeile[x - kanaele] if x >= kanaele else 0
            b = vorher[x]
            c = vorher[x - kanaele] if x >= kanaele else 0
            if art_f == 1:   zeile[x] = (zeile[x] + a) & 255
            elif art_f == 2: zeile[x] = (zeile[x] + b) & 255
            elif art_f == 3: zeile[x] = (zeile[x] + (a + b) // 2) & 255
            elif art_f == 4:
                pp = a + b - c
                pa, pb, pc = abs(pp - a), abs(pp - b), abs(pp - c)
                zeile[x] = (zeile[x] + (a if (pa <= pb and pa <= pc) else (b if pb <= pc else c))) & 255
        aus[y * schritt:(y + 1) * schritt] = zeile
        vorher = zeile
    grau = bytearray(breite * hoehe)
    for y in range(hoehe):
        for x in range(breite):
            o = y * schritt + x * kanaele
            grau[y * breite + x] = ((aus[o] * 299 + aus[o + 1] * 587 + aus[o + 2] * 114) // 1000
                                    if kanaele >= 3 else aus[o])
    return breite, hoehe, grau


def schaerfe(grau, b, h):
    summe = quadrat = n = 0
    for y in range(1, h - 1):
        z = y * b
        for x in range(1, b - 1):
            lap = (grau[z + x - 1] + grau[z + x + 1] + grau[z - b + x] + grau[z + b + x]) - 4 * grau[z + x]
            summe += lap; quadrat += lap * lap; n += 1
    m = summe / n
    return quadrat / n - m * m


def main():
    ordner = sys.argv[1] if len(sys.argv) > 1 else "client/public/fotos"
    dateien = sorted(glob.glob(os.path.join(ordner, "*.jpg")))
    if not dateien:
        print("keine Dateien in", ordner); return 1

    fehler = []
    gesehen = {}
    print(f"{'DATEI':<34}{'MASSE':>12}{'VERH':>7}{'SCHÄRFE':>9}  RÄNDER")
    for f in dateien:
        roh = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", f],
                             capture_output=True, text=True).stdout
        w = int([z for z in roh.split() if z.isdigit()][0])
        h = int([z for z in roh.split() if z.isdigit()][1])

        # gleiche Datei zweimal?
        summe = subprocess.run(["md5", "-q", f], capture_output=True, text=True).stdout.strip()
        if summe in gesehen:
            fehler.append(f"{os.path.basename(f)} ist dieselbe Datei wie {gesehen[summe]}")
        gesehen[summe] = os.path.basename(f)

        klein = "/tmp/pruef.png"
        subprocess.run(["sips", "-s", "format", "png", "-Z", "300", f, "--out", klein],
                       capture_output=True)
        b, hh, g = png_lesen(klein)
        # Ein aufgefüllter Rand ist nicht nur dunkel, sondern auch
        # gleichförmig. Ein dunkler Schattenstreifen im Motiv — etwa
        # unter einem Sturz — ist dunkel, aber uneben. Ohne die zweite
        # Bedingung meldet die Prüfung solche Aufnahmen fälschlich.
        def kante(werte):
            m = sum(werte) / len(werte)
            abw = (sum((v - m) ** 2 for v in werte) / len(werte)) ** 0.5
            return m, abw

        kanten = {
            "oben": kante(list(g[0:b])),
            "unten": kante(list(g[(hh - 1) * b:hh * b])),
            "links": kante([g[y * b] for y in range(hh)]),
            "rechts": kante([g[y * b + b - 1] for y in range(hh)]),
        }
        raender = min(m for m, _ in kanten.values())
        for name, (m, abw) in kanten.items():
            if m < SCHWELLE_RAND and abw < 6:
                fehler.append(
                    f"{os.path.basename(f)} hat einen schwarzen Rand ({name},"
                    f" Helligkeit {m:.0f}, Streuung {abw:.1f})")

        subprocess.run(["sips", "-s", "format", "png", "-c", "700", "700", f, "--out", klein],
                       capture_output=True)
        b2, h2, g2 = png_lesen(klein)
        s = schaerfe(g2, b2, h2)
        if s < SCHWELLE_SCHAERFE:
            fehler.append(f"{os.path.basename(f)} ist unscharf ({s:.0f})")

        print(f"{os.path.basename(f):<34}{w}x{h:<7}{w/h:>7.2f}{s:>9.0f}  {raender:>3.0f}")

    print()
    if fehler:
        print("FEHLER:")
        for e in fehler:
            print("  -", e)
        return 1
    print(f"{len(dateien)} Aufnahmen geprüft, nichts zu beanstanden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
