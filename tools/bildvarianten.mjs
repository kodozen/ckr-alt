/**
 * Bildvarianten erzeugen.
 *
 * Jede Aufnahme gibt es danach in mehreren Breiten als WebP. Der Browser
 * sucht sich über srcset die kleinste aus, die für seinen Bildschirm
 * reicht: ein Telefon lädt die Kachel mit 480 Pixeln statt der 1200 —
 * gemessen ein Viertel der Daten, und WebP spart gegenüber JPEG noch
 * einmal gut ein Drittel.
 *
 * Erzeugt wird nie größer als die Vorlage. Welche Breiten es pro Bild
 * gibt, steht danach in client/src/data/bildvarianten.json — daraus
 * baut client/src/lib/bilder.ts die srcset-Angaben.
 *
 * Aufruf: node tools/bildvarianten.mjs   (nur nötig, wenn Bilder dazukommen)
 */
import sharp from "sharp";
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OEFFENTLICH = path.resolve("client/public");
const QUELLEN = [
  ...(await readdir(path.join(OEFFENTLICH, "fotos")))
    .filter((d) => /\.(jpe?g|png)$/i.test(d))
    .map((d) => "/fotos/" + d),
  "/manus-storage/G1jT57jzwtmc_8fc296a6.jpg",
  "/manus-storage/ckr-logo-original_a1e7247c.png",
];
const FOTO_BREITEN = [480, 800, 1200];
const LOGO_BREITEN = [240, 480, 720];

const verzeichnis = {};
let vorher = 0, nachher = 0;

for (const quelle of QUELLEN) {
  const datei = path.join(OEFFENTLICH, quelle);
  const { width } = await sharp(datei).metadata();
  const istLogo = quelle.includes("logo");
  const wunsch = istLogo ? LOGO_BREITEN : FOTO_BREITEN;
  // Nie größer als die Vorlage; ist sie breiter als die größte Stufe,
  // kommt ihre eigene Breite als oberste Stufe dazu.
  // Beim Zeichen genügen die Wunschstufen — es wird nie über 200 Pixel
  // breit gezeigt, eine Stufe in voller Vorlagenbreite wäre Ballast.
  const breiten = istLogo
    ? wunsch.filter((b) => b <= width)
    : [...new Set([...wunsch.filter((b) => b < width), width > Math.max(...wunsch) ? width : Math.max(...wunsch.filter((b) => b <= width))])]
        .sort((a, b) => a - b);

  vorher += (await stat(datei)).size;
  for (const b of breiten) {
    const ziel = datei.replace(/\.(jpe?g|png)$/i, `-${b}.webp`);
    await sharp(datei)
      .resize({ width: b, withoutEnlargement: true })
      .webp({ quality: istLogo ? 88 : 72, effort: 6, alphaQuality: 95 })
      .toFile(ziel);
    nachher += b === Math.max(...breiten) ? (await stat(ziel)).size : 0;
  }
  verzeichnis[quelle] = breiten;
  console.log(quelle.padEnd(48), breiten.join(", "));
}

await writeFile(
  path.resolve("client/src/data/bildvarianten.json"),
  JSON.stringify(verzeichnis, null, 2) + "\n",
);
console.log(`\nVorlagen ${Math.round(vorher / 1024)} kB  ->  größte WebP-Stufen ${Math.round(nachher / 1024)} kB`);
