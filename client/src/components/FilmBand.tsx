import { useEffect, useRef, useState } from "react";
import { CKR_INFO } from "@/data/ckrData";

/**
 * Das Filmband.
 *
 * Eine ruhige Fläche zwischen zwei Abschnitten: keine Überschrift, kein
 * Text, nur die Aufnahme und das Zeichen. Wer bis hierher gescrollt
 * hat, bekommt einen Moment zum Durchatmen — und die Marke einmal groß.
 *
 * Der Film läuft erst, wenn das Band wirklich im Bild ist, und hält an,
 * sobald es wieder heraus ist: ein Video, das unsichtbar im Hintergrund
 * weiterläuft, kostet Strom und Leitung für nichts. Geladen wird er
 * überhaupt nur, wenn das Gerät ihn will — nicht bei "weniger
 * Bewegung", nicht im Sparmodus, nicht auf einer langsamen Leitung.
 * Bis dahin (und wenn es gar keinen Film gibt) steht das Standbild da,
 * und niemand sieht eine Lücke.
 */

type Film = HTMLVideoElement & {
  requestVideoFrameCallback?: (rueckruf: () => void) => number;
};

type Leitung = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

export default function FilmBand() {
  const band = useRef<HTMLDivElement>(null);
  const film = useRef<Film>(null);
  const [darf, setDarf] = useState(false);
  const [imBild, setImBild] = useState(false);
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    if (!CKR_INFO.bandFilm) return;
    const wenigerBewegung = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leitung = (navigator as Leitung).connection;
    const sparsam = leitung?.saveData === true;
    const langsam = /(^|-)(slow-)?2g$/.test(leitung?.effectiveType ?? "");
    if (wenigerBewegung || sparsam || langsam) return;
    setDarf(true);
  }, []);

  useEffect(() => {
    const el = band.current;
    if (!darf || !el) return;
    const beobachter = new IntersectionObserver(
      ([eintrag]) => setImBild(eintrag.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [darf]);

  useEffect(() => {
    const v = film.current;
    if (!v) return;
    if (!imBild) {
      v.pause();
      return;
    }
    let abgebrochen = false;
    let bilder = 0;
    const zeigen = () => {
      if (!abgebrochen) setBereit(true);
    };
    if (typeof v.requestVideoFrameCallback === "function") {
      const zaehlen = () => {
        if (abgebrochen) return;
        bilder += 1;
        if (bilder >= 2) zeigen();
        else v.requestVideoFrameCallback?.(zaehlen);
      };
      v.requestVideoFrameCallback(zaehlen);
    } else {
      const warten = () => {
        if (abgebrochen) return;
        if (v.currentTime > 0.2) zeigen();
        else window.requestAnimationFrame(warten);
      };
      window.requestAnimationFrame(warten);
    }
    const versuch = v.play();
    if (versuch && typeof versuch.catch === "function") versuch.catch(() => {});
    return () => {
      abgebrochen = true;
    };
  }, [imBild]);

  return (
    <section
      aria-label="CKR Cleaning Services"
      className="relative isolate flex min-h-[58svh] items-center justify-center overflow-hidden bg-[#070d2e] lg:min-h-[74svh]"
    >
      <div ref={band} className="absolute inset-0 -z-10">
        <img
          src={CKR_INFO.bandStandbild}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {darf && (
          <video
            ref={film}
            src={CKR_INFO.bandFilm}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              bereit ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Oben und unten läuft die Fläche ins Dunkelblau der Seite aus,
            damit das Band nicht als Fremdkörper zwischen den
            Abschnitten steht. Und ein ruhiger Schleier über allem: das
            Zeichen soll darauf lesbar sein, egal was der Film zeigt. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[#070d2e]/45" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070d2e] to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070d2e] to-transparent" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,13,46,0.65)_100%)]"
        />
      </div>

      {/* Das Zeichen, groß und allein. */}
      <div className="flex flex-col items-center px-6 py-20">
        <span className="rounded-3xl bg-white/95 px-7 py-5 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/25 backdrop-blur-sm">
          <img
            src={CKR_INFO.logo}
            alt="CKR Cleaning Services, Kufstein"
            width={1360}
            height={682}
            loading="lazy"
            className="h-16 w-auto object-contain sm:h-20 lg:h-24"
          />
        </span>
        <span
          aria-hidden="true"
          className="mt-7 h-0.5 w-16 rounded-full bg-[#5CBC1A]"
        />
      </div>
    </section>
  );
}
