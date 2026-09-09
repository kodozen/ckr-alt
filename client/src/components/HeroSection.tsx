import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";

export default function HeroSection({ onOpenCalculator }: { onOpenCalculator: () => void }) {
  const zusagen = [
    "Kostenlose Besichtigung, danach Festpreis",
    "24h erreichbar, auch bei Havarie",
    "Geschultes Personal, feste Objektleiter",
    "Ausbildungsbetrieb in Tirol",
  ];

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Die Aufnahme füllt die Fläche; darüber liegt ein kräftiger
          Schleier, damit die Schrift sicher lesbar bleibt. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${CKR_INFO.heroImage})` }}
      />
      <div className="absolute inset-0 -z-10 bg-[#070d2e]/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070d2e] via-[#070d2e]/80 to-transparent" />

      <div className="container py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Meisterbetrieb · Kufstein &amp; ganz Tirol
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]">
            Glänzende Sauberkeit.
            <br />
            Verlässlicher Service.
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-200 leading-relaxed">
            Professionelle Gebäudereinigung für Betriebe, Hausverwaltungen und
            Privathaushalte. Mit geschulten Fachkräften und einer
            <strong className="text-white"> 24h-Hotline</strong>, auch bei Havarie.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {zusagen.map((z) => (
              <li key={z} className="flex items-start gap-2.5 text-sm text-slate-100">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-300 mt-px" />
                <span>{z}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCalculator}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2E7D0E] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition hover:bg-[#256A0B] active:scale-95"
            >
              <span>Angebot anfordern</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${CKR_INFO.phoneRaw}`}
              aria-label="24-Stunden-Hotline anrufen"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3.5 text-sm sm:text-base font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>24h anrufen</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
