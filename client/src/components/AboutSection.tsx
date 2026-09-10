import { Link } from "wouter";
import { CKR_ADVANTAGES, CKR_INFO } from "@/data/ckrData";
import { Award, Clock, PhoneCall, GraduationCap, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Award,
  Clock,
  PhoneCall,
  GraduationCap
};

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verlässlichkeit & Qualität
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122272] tracking-tight leading-tight">
              Willkommen bei CKR Cleaning Services in Kufstein
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Unsere ausgebildeten Gebäudereiniger arbeiten seit Jahren eigenständig und verfügen über ein hohes Maß an Praxiserfahrung. Wir sind bedacht auf die regelmäßige, fachliche Schulung unserer Mitarbeiter in modernen Arbeits- und Anwendungstechniken, um unseren Service stets zu perfektionieren.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Durch jahrelange Erfahrung und fachliche Kompetenz finden wir eine individuell abgestimmte Lösung für Sie. In regelmäßiger Absprache wollen wir die für Sie passende Lösung finden und mit höchster Tiroler Qualität umsetzen!
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Geschultes Fachpersonal",
                "Feste Ansprechpartner & Vorarbeiter",
                "Ökologisch abbaubare Reinigungsmittel",
                "Feste Objektleiter, regelmäßige Kontrolle",
                "Flexibel bei Arbeits- & Nachtzeiten",
                "Kostenlose Vor-Ort-Besichtigung",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-[#2E7D0E] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#kontakt"
                className="bg-[#122272] hover:bg-[#0c164a] text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-sm inline-flex items-center gap-2"
              >
                <span>Jetzt Kontakt aufnehmen</span>
                <ArrowRight className="w-4 h-4 text-[#2E7D0E]" />
              </a>
              <a
                href={`tel:${CKR_INFO.phoneRaw}`}
                className="bg-white hover:bg-slate-100 text-[#122272] border border-slate-200 text-sm font-bold px-6 py-3 rounded-xl transition shadow-sm inline-flex items-center gap-2"
               aria-label="Anrufen">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>{CKR_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Image & Stats Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                <img
                  src={CKR_INFO.teamImage}
                  alt="Verkaufsraum eines Autohauses nach der Unterhaltsreinigung"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={900}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122272]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">
                    Gebäudereinigung aus Leidenschaft
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    Ihr Partner im Tiroler Unterland & Umgebung
                  </h3>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#122272] flex items-center justify-center font-black text-xl">
                  {CKR_INFO.experienceYears}
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 leading-tight">
                    Jahre Erfahrung
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    in Kufstein & ganz Tirol
                  </div>
                </div>
              </div>

              {/* Floating Notdienst-Plakette */}
              <div className="absolute -top-6 -right-2 sm:right-4 bg-gradient-to-br from-[#122272] to-[#0c164a] text-white rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Notdienst rund um die Uhr
                  </span>
                </div>
                <div className="text-sm font-extrabold mt-1">
                  Bei Havarie und Wasserschaden
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CKR_ADVANTAGES.map((adv, idx) => {
            const Icon = ICON_MAP[adv.icon] || Award;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#2E7D0E]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{adv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Career & Apprenticeship Banner (Wir bilden Lehrlinge aus!) */}
        {/* Ausbildung: der ausführliche Text steht auf /stellenanzeigen/.
            Auf der Startseite genügt der Hinweis, dass es ihn gibt. */}
        <div className="rounded-3xl bg-gradient-to-r from-[#122272] via-[#1a2d8a] to-[#0e3b1c] p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 shrink-0 text-emerald-300" aria-hidden="true" />
              <p className="text-sm font-bold sm:text-base">
                Wir bilden aus und suchen laufend Verstärkung.
              </p>
            </div>
            <Link
              href="/stellenanzeigen/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D0E] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#256A0B] sm:text-sm"
            >
              Ausbildung &amp; Stellen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
