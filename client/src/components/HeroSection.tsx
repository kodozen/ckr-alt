import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";

/**
 * Der Aufmacher.
 *
 * Er war ein ruhiger Kasten mit Schrift auf einer Aufnahme. Jetzt ist er
 * die Bühne der Seite: mehr Höhe, deutlich größere Schrift, und drei
 * Dinge, die ihn leben lassen, ohne dass etwas nachgeladen werden muss —
 * die Aufnahme zieht sich langsam heran, ein grünes und ein blaues Licht
 * geben der Fläche Tiefe, und alle paar Sekunden geht ein heller Streifen
 * darüber wie ein Abzieher über Glas.
 *
 * Die Aufnahme liegt als <img> und nicht als Hintergrundbild darin: so
 * kann der Browser sie früh und bevorzugt laden — sie ist das größte
 * Element im ersten Bildschirm, an ihr hängt die gemessene Ladezeit.
 */
export default function HeroSection({ onAngebotAnfordern }: { onAngebotAnfordern: () => void }) {
  const zusagen = [
    "Kostenlose Besichtigung, danach ein unverbindliches Angebot",
    "24 Stunden am Tag erreichbar",
    "Geschultes Personal, feste Objektleiter",
    "Ausbildungsbetrieb in Tirol",
  ];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-[#070d2e] lg:min-h-[40rem]"
    >
      <img
        src={CKR_INFO.heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="atmen absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {/* Der Schleier ist gerichtet: links deckt er, rechts bleibt die
          Aufnahme sichtbar. Auf schmalen Geräten deckt er mehr, weil die
          Schrift dort die ganze Breite einnimmt. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#070d2e]/70 sm:bg-[#070d2e]/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070d2e] from-15% via-[#070d2e]/80 via-60% to-[#070d2e]/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#070d2e] to-transparent"
      />

      {/* Zwei weiche Lichter statt eines zweiten Bildes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#5CBC1A]/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#2743c8]/25 blur-[130px]"
      />

      {/* Der Abzieher: ein heller Streifen, der alle zwölf Sekunden
          einmal durchs Bild geht. Bei "weniger Bewegung" bleibt er weg. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="wischer absolute inset-y-[-20%] left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur sm:text-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5CBC1A] opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5CBC1A]" />
            </span>
            Gebäudereinigung in Kufstein
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/25 sm:block" />
            <span className="hidden text-[#8FE04A] sm:inline">&amp; ganz Tirol</span>
          </p>

          <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Glänzende Sauberkeit.
            <br />
            <span className="bg-gradient-to-r from-[#A3EF5C] via-[#7BD934] to-[#5CBC1A] bg-clip-text text-transparent">
              Verlässlicher Service.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Professionelle Gebäudereinigung für Betriebe, Hausverwaltungen und
            Privathaushalte — in
            <strong className="text-white"> Kufstein, Wörgl, Kitzbühel</strong> und
            im übrigen Tirol.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {zusagen.map((z) => (
              <li key={z} className="flex items-start gap-2.5 text-sm text-slate-100">
                <CheckCircle2 className="mt-px h-5 w-5 shrink-0 text-[#8FE04A]" />
                <span>{z}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onAngebotAnfordern}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2E7D0E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#256A0B] active:scale-95 sm:px-7 sm:py-4 sm:text-base"
            >
              <span>Angebot anfordern</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={`tel:${CKR_INFO.phoneRaw}`}
              aria-label="24-Stunden-Hotline anrufen"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:px-6 sm:py-4 sm:text-base"
            >
              <Phone className="h-4 w-4 text-[#8FE04A]" />
              <span>Jetzt anrufen</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
