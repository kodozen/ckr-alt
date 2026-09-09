import { ArrowRight } from "lucide-react";

/**
 * Ganzflächiges Band mit Aufnahme.
 *
 * Vorbild sind die beiden großen Blöcke bei starclean ("Weil es für uns
 * mehr als Reinigung ist"): eine Aufnahme über
 * die volle Breite, darüber eine Aussage, ein kurzer Satz, ein Weg
 * weiter. Kein Raster, keine Kacheln.
 *
 * Der Schleier ist gerichtet wie im Aufmacher: dicht auf der Seite, auf
 * der die Schrift steht, offen auf der anderen — sonst wäre die
 * Aufnahme wieder nur Dekoration unter einer Farbfläche. Die Deckung ist
 * gemessen, nicht geschätzt: hinter jedem Textblock wurde der hellste
 * Bildpunkt geprüft.
 */
export default function BandSection({
  id,
  bild,
  augenbraue,
  titel,
  text,
  linkText,
  href,
  seite = "links",
}: {
  id?: string;
  bild: string;
  augenbraue: string;
  titel: string;
  text: string;
  linkText: string;
  href: string;
  seite?: "links" | "rechts";
}) {
  const rechts = seite === "rechts";

  return (
    <section id={id} className="relative isolate overflow-hidden bg-[#070d2e]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${bild})` }}
      />
      <div className="absolute inset-0 -z-10 bg-[#070d2e]/65 sm:bg-[#070d2e]/30" />
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${
          rechts
            ? "bg-gradient-to-l from-[#070d2e] from-10% via-[#070d2e]/70 via-55% to-[#070d2e]/5"
            : "bg-gradient-to-r from-[#070d2e] from-10% via-[#070d2e]/70 via-55% to-[#070d2e]/5"
        }`}
      />

      <div className="container py-20 sm:py-28">
        <div className={`max-w-2xl ${rechts ? "ml-auto text-right" : ""}`}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {augenbraue}
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            {titel}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed">
            {text}
          </p>
          <a
            href={href}
            className={`mt-8 inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition hover:bg-white/10 ${
              rechts ? "flex-row-reverse" : ""
            }`}
          >
            <span>{linkText}</span>
            <ArrowRight className={`w-4 h-4 text-emerald-300 ${rechts ? "rotate-180" : ""}`} />
          </a>
        </div>
      </div>
    </section>
  );
}
