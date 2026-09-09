import { ArrowRight, Phone, ShieldCheck, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";

export default function HeroSection({ onOpenCalculator }: { onOpenCalculator: () => void }) {
  return (
    <section id="top" className="relative pt-6 sm:pt-12 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-200/30 via-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-slate-200/80 text-xs font-semibold text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52b719] animate-pulse" />
              <span>Gebäudereinigung in Kufstein &amp; Tirol</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#122272] font-bold">Kufstein & Umgebung</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#122272] tracking-tight leading-[1.08]">
              Glänzende Sauberkeit.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#122272] via-[#203ca8] to-[#52b719]">
                Verlässlicher Service.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Professionelle Gebäudereinigung für Betriebe, Hausverwaltungen und anspruchsvolle Privathaushalte. Mit geschulten Fachkräften, modernster Ausrüstung und einer garantierten <strong>24h-Notfall-Hotline</strong>.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                "Langjährige Erfahrung & Praxiskompetenz",
                "Individuelle Reinigungsintervalle",
                "24h Notfallservice bei Havariefällen",
                "Anerkannter Ausbildungsbetrieb in Tirol",
              ].map((bullet, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#52b719]" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCalculator}
                className="bg-[#122272] hover:bg-[#0c164a] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 group"
              >
                <span>Angebot anfordern</span>
                <ArrowRight className="w-4 h-4 text-[#52b719] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${CKR_INFO.phoneRaw}`}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl transition shadow-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#52b719]" />
                <span>24h anrufen</span>
              </a>
            </div>

            {/* Micro trust bar */}
            <div className="pt-3 border-t border-slate-200/60 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Kostenlose Besichtigung</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Festpreis nach Besichtigung</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Hero Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src={CKR_INFO.heroImage}
                  alt="Professionelle Reinigungskraft in Österreich"
                  className="w-full h-[460px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Floating overlay card inside */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                        Einsatzbereit
                      </span>
                      <h4 className="text-sm font-extrabold text-[#122272]">
                        Bezirk Kufstein & Tirol
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-[#52b719] bg-emerald-50 px-2.5 py-1 rounded-full">
                      Aktiv vor Ort
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                    Büro, Hotel, Stiegenhaus, Glas & Neubau
                  </p>
                </div>
              </div>

              {/* Floating Top Badge */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  10+
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">Jahre Erfahrung</div>
                  <div className="text-[11px] text-slate-500">Geprüfte Qualität</div>
                </div>
              </div>

              {/* Floating 24h Hotlink */}
              <div className="absolute -bottom-4 -right-3 sm:-right-4 bg-gradient-to-r from-[#122272] to-[#0c164a] text-white rounded-2xl py-3 px-4 shadow-xl border border-white/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#52b719] text-white flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                    24h Notdienst
                  </div>
                  <div className="text-xs font-extrabold">{CKR_INFO.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
