import { Link } from "wouter";
import {
  ArrowRight,
  BedDouble,
  Building2,
  HardHat,
  Home,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
} from "lucide-react";
import { CKR_SERVICES } from "@/data/ckrData";

const ICON_MAP: Record<string, any> = {
  Sparkles,
  Building2,
  ShieldCheck,
  Sun,
  BedDouble,
  Home,
  Layers,
  HardHat,
  Truck,
};

/**
 * Die Leistungen auf der Startseite — als Übersicht, nicht als Lexikon.
 *
 * Vorher hing an jeder Kachel ein Fenster mit der vollständigen
 * Beschreibung. Das machte die Startseite lang und den Text unauffindbar:
 * ein Fenster hat keine Adresse. Jetzt führt jede Kachel auf die Seite
 * der Leistung, unter der Adresse, unter der die laufende Seite sie seit
 * Jahren führt.
 */
export default function ServicesSection({
  anzahl,
}: {
  /** Auf der Startseite stehen nur die ersten sechs; die übrigen stehen
      unter /leistungen/. Zwölf Kacheln waren dort ein Drittel der
      gesamten Höhe. */
  anzahl?: number;
} = {}) {
  const gezeigt = anzahl ? CKR_SERVICES.slice(0, anzahl) : CKR_SERVICES;
  return (
    <section id="leistungen" className="relative bg-white py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#122272]">
            <Sparkles className="h-3.5 w-3.5 text-[#2E7D0E]" aria-hidden="true" />
            Leistungen
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#122272] sm:text-5xl">
            Was wir für Sie reinigen
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Zwölf Bereiche, ein Ansprechpartner. Öffnen Sie einen Bereich, um
            zu sehen, was dazugehört.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {gezeigt.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Sparkles;
            return (
              <li key={service.id}>
                <Link
                  href={`/${service.id}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#122272] sm:p-6"
                >
                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#122272] to-[#52b719] opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-slate-200 sm:aspect-[3/2]">
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {service.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#2E7D0E] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#122272] shadow-sm backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-[#122272]" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-[#122272] sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {service.shortDesc}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#122272] transition-colors group-hover:text-[#2E7D0E] sm:text-sm">
                    Ansehen
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {anzahl && anzahl < CKR_SERVICES.length ? (
          <p className="mt-8 text-center sm:mt-10">
            <Link
              href="/leistungen/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#122272] transition-colors hover:border-blue-200 hover:text-[#2E7D0E]"
            >
              Alle {CKR_SERVICES.length} Leistungen ansehen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
