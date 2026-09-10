/**
 * Macht aus jeder Adresse eine echte HTML-Datei.
 *
 * Ohne diesen Schritt liefert der Server für jede Adresse dieselbe leere
 * Hülle aus, und erst im Browser entscheidet ein Skript, was darin steht.
 * Für einen Besucher ist das kaum zu merken. Für eine Suchmaschine heißt
 * es: zehn Leistungsseiten mit demselben Titel, derselben Beschreibung
 * und demselben canonical — also faktisch eine einzige Seite.
 *
 * Also: einmal je Adresse rendern, Kopf setzen, Datei schreiben.
 */
import fs from "node:fs/promises";
import path from "node:path";

const WURZEL = process.cwd();
const AUSGABE = path.join(WURZEL, "dist/public");
const BASIS_PFAD = (process.env.BASIS_PFAD || "/").replace(/\/+$/, "") + "/";
const BASIS_URL = (process.env.BASIS_URL || "https://kodozen.github.io/ckr-alt").replace(/\/+$/, "");

const { rendern, ALLE_SEITEN } = await import(
  path.join(WURZEL, "dist/ssr/entry-server.js")
);

const vorlage = await fs.readFile(path.join(AUSGABE, "index.html"), "utf-8");

/** Ersetzt den Inhalt eines Kopf-Eintrags, ohne den Rest anzufassen. */
function setze(html, muster, ersatz) {
  if (!muster.test(html)) {
    throw new Error(`Kopfeintrag nicht gefunden: ${muster}`);
  }
  return html.replace(muster, ersatz);
}

function maskieren(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let anzahl = 0;

for (const seite of ALLE_SEITEN) {
  const rumpf = rendern(seite.pfad);
  const adresse = BASIS_URL + (seite.pfad === "/" ? "/" : seite.pfad);
  const titel = maskieren(seite.titel);
  const beschreibung = maskieren(seite.beschreibung);

  let html = vorlage;
  html = setze(html, /<title>[\s\S]*?<\/title>/, `<title>${titel}</title>`);
  html = setze(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${beschreibung}" />`,
  );
  html = setze(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${adresse}" />`,
  );
  html = setze(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${adresse}" />`,
  );
  html = setze(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${titel}" />`,
  );
  html = setze(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${beschreibung}" />`,
  );

  html = html.replace('<div id="root"></div>', `<div id="root">${rumpf}</div>`);

  const ordner =
    seite.pfad === "/" ? AUSGABE : path.join(AUSGABE, seite.pfad);
  await fs.mkdir(ordner, { recursive: true });
  await fs.writeFile(path.join(ordner, "index.html"), html, "utf-8");
  anzahl += 1;
}

// Die Sitemap kommt aus derselben Liste. Eine zweite, von Hand gepflegte
// Liste wäre nach der ersten neuen Seite falsch.
const heute = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ALLE_SEITEN.map((s) => {
    const adresse = BASIS_URL + (s.pfad === "/" ? "/" : s.pfad);
    return (
      `  <url>\n    <loc>${adresse}</loc>\n` +
      `    <lastmod>${heute}</lastmod>\n` +
      `    <priority>${s.pfad === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
    );
  }).join("\n") +
  `\n</urlset>\n`;
await fs.writeFile(path.join(AUSGABE, "sitemap.xml"), sitemap, "utf-8");

// Die Fehlerseite wird ebenso gerendert — sonst bekäme jemand, der sich
// vertippt hat, erst die Startseite zu sehen und einen Sekundenbruchteil
// später die Fehlermeldung.
{
  let html = vorlage;
  html = setze(
    html,
    /<title>[\s\S]*?<\/title>/,
    "<title>Seite nicht gefunden · CKR Cleaning Services</title>",
  );
  // index.html führt keinen robots-Eintrag; für die Fehlerseite wird er
  // eingesetzt, damit sie nicht selbst im Index landet.
  html = html.replace(
    "</head>",
    '  <meta name="robots" content="noindex" />\n  </head>',
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${rendern("/diese-adresse-gibt-es-nicht/")}</div>`,
  );
  await fs.writeFile(path.join(AUSGABE, "404.html"), html, "utf-8");
}

console.log(`${anzahl} Seiten vorgerendert, Grundpfad ${BASIS_PFAD}`);
console.log(`sitemap.xml mit ${ALLE_SEITEN.length} Adressen geschrieben`);
