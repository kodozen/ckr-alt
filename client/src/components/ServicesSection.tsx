import { useState } from "react";
import { CKR_SERVICES, ServiceItem } from "@/data/ckrData";
import {
  Sparkles,
  Building2,
  ShieldCheck,
  Sun,
  BedDouble,
  Home,
  Layers,
  HardHat,
  Truck,
  ArrowRight,
  CheckCircle2,
  X,
  Phone
} from "lucide-react";

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

export default function ServicesSection({ onSelectService }: { onSelectService?: (serviceName: string) => void }) {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  return (
    <section id="leistungen" className="py-20 sm:py-28 bg-white relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#122272] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D0E]" />
            Unsere Leistungen im Überblick
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#122272] tracking-tight">
            Maßgeschneiderte Reinigungsdienste für Privat & Gewerbe
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Unsere Leistungen werden stets von hochqualifizierten Fachkräften durchgeführt und an Ihre individuellen Anforderungen angepasst.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CKR_SERVICES.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Sparkles;

            return (
              <div
                key={service.id}
                className="group bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Top Border Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#122272] to-[#52b719] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Image Thumbnail with Overlay */}
                  <div className="relative h-44 rounded-xl overflow-hidden mb-5 bg-slate-200">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {service.badge && (
                      <span className="absolute top-3 left-3 bg-[#2E7D0E] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-[#122272] flex items-center justify-center shadow-sm">
                        <Icon className="w-4 h-4 text-[#122272]" />
                      </div>
                      <span className="text-white text-xs font-semibold bg-slate-900/75 px-2 py-0.5 rounded">Kufstein & Umgebung</span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#122272] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Top Features bullets */}
                  <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-2">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D0E] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(service)}
                    className="text-xs sm:text-sm font-bold text-[#122272] hover:text-[#2E7D0E] flex items-center gap-1.5 transition-colors group/btn"
                  >
                    <span>Details ansehen</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <a
                    href="#kontakt"
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="text-xs font-semibold bg-blue-50 hover:bg-[#122272] text-[#122272] hover:text-white px-3 py-1.5 rounded-lg transition-all"
                  >
                    Anfragen
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Service Details */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56 sm:h-64 bg-slate-100">
                <img
                  src={activeModal.image}
                  alt={activeModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  {activeModal.badge && (
                    <span className="bg-[#2E7D0E] text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      {activeModal.badge}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeModal.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Leistungsbeschreibung
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {activeModal.fullDesc}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Im Serviceumfang enthalten:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModal.features.map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs sm:text-sm text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D0E] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-600">
                    Kostenlose Besichtigung & unverbindliches Angebot
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={`tel:${CKR_SERVICES ? "+436508933881" : ""}`}
                      className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2"
                     aria-label="Anrufen">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Jetzt anrufen</span>
                    </a>
                    <a
                      href="#kalkulator"
                      onClick={() => setActiveModal(null)}
                      className="flex-1 sm:flex-none bg-[#122272] hover:bg-[#0c164a] text-white text-xs font-bold px-4 py-2.5 rounded-xl text-center"
                    >
                      Preise kalkulieren
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
