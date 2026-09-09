import { useState } from "react";
import { Calculator, CheckCircle2, Send, PhoneCall, Sparkles } from "lucide-react";
import { CKR_SERVICES, CKR_INFO } from "@/data/ckrData";
import { toast } from "sonner";

export default function PriceEstimator() {
  const [serviceType, setServiceType] = useState<string>("unterhaltsreinigung");
  const [areaSize, setAreaSize] = useState<number>(120);
  const [frequency, setFrequency] = useState<string>("weekly");
  const [windowCleaningAddon, setWindowCleaningAddon] = useState<boolean>(true);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Basit indikatif maliyet hesabı
  const calculateEstimate = () => {
    let baseRatePerSqm = 1.35; // EUR / m²
    if (serviceType === "grundreinigung") baseRatePerSqm = 2.4;
    else if (serviceType === "hotelreinigung" || serviceType === "appartementreinigung") baseRatePerSqm = 1.6;
    else if (serviceType === "baureinigung") baseRatePerSqm = 2.8;
    else if (serviceType === "treppenhausreinigung") baseRatePerSqm = 0.95;

    let subtotal = areaSize * baseRatePerSqm;

    // Frekans çarpanı
    let freqMultiplier = 1;
    if (frequency === "daily") freqMultiplier = 0.85; // Mengenrabatt
    else if (frequency === "twice_weekly") freqMultiplier = 0.9;
    else if (frequency === "weekly") freqMultiplier = 1.0;
    else if (frequency === "biweekly") freqMultiplier = 1.15;
    else if (frequency === "one_off") freqMultiplier = 1.35;

    let total = subtotal * freqMultiplier;
    if (windowCleaningAddon) total += 45;

    // Minimum Einsatzpauschale
    return Math.max(75, Math.round(total));
  };

  const estimatedPrice = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      toast.error("Bitte tragen Sie Ihren Namen und Telefonnummer ein.");
      return;
    }
    setSubmitted(true);
    toast.success("Vielen Dank! Ihre unverbindliche Preisanfrage wurde erfolgreich übermittelt. Wir melden uns umgehend bei Ihnen.");
  };

  return (
    <section id="kalkulator" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-emerald-50/40 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            Transparente Richtpreise für Tirol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122272] tracking-tight">
            Interaktiver Online-Preiskalkulator
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Berechnen Sie unverbindlich in wenigen Klicks Ihren geschätzten Richtpreis für Ihre Immobilie in Kufstein und Umgebung.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Form Side */}
          <div className="lg:col-span-7 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Select */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  1. Gewünschte Reinigungsleistung
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#122272] focus:bg-white outline-none transition"
                >
                  {CKR_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area Size Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    2. Ungefähre Fläche (m²)
                  </label>
                  <span className="text-sm font-extrabold text-[#122272] bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {areaSize} m²
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={800}
                  step={10}
                  value={areaSize}
                  onChange={(e) => setAreaSize(Number(e.target.value))}
                  className="w-full accent-[#122272] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>Kleinobjekt (30 m²)</span>
                  <span>Mittelbetrieb (250 m²)</span>
                  <span>Großanlage (800+ m²)</span>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  3. Reinigungsturnus / Intervall
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "daily", label: "Täglich" },
                    { id: "twice_weekly", label: "2x pro Woche" },
                    { id: "weekly", label: "Wöchentlich" },
                    { id: "biweekly", label: "14-tägig" },
                    { id: "one_off", label: "Einmalig / Grundreinigung" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id)}
                      className={`text-xs py-2 px-3 rounded-lg font-semibold border transition-all text-left ${
                        frequency === f.id
                          ? "bg-[#122272] text-white border-[#122272] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={windowCleaningAddon}
                    onChange={(e) => setWindowCleaningAddon(e.target.checked)}
                    className="w-4 h-4 rounded text-[#52b719] accent-[#52b719] focus:ring-[#52b719]"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Inklusive Fenster- & Glasreinigung (streifenfrei)
                  </span>
                </label>
              </div>

              {/* Contact mini form */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Kontaktdaten für schriftliches Festpreisangebot
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ihr Name / Ansprechpartner"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#122272] focus:bg-white outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefonnummer (z.B. +43...)"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#122272] focus:bg-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-[#122272] hover:bg-[#0c164a] text-white font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4 text-[#52b719]" />
                  <span>{submitted ? "Angebot angefordert!" : "Kostenloses Angebot anfordern"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Pricing Summary Side */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#122272] to-[#0c164a] p-6 sm:p-8 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Indikative Kostenschätzung
              </div>

              <div className="mt-2">
                <span className="text-xs uppercase tracking-wider text-slate-300">
                  Geschätzter Richtpreis ab:
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1 tracking-tight flex items-baseline gap-1">
                  <span>~ {estimatedPrice} €</span>
                  <span className="text-xs text-slate-300 font-normal">
                    {frequency === "one_off" ? "einmalig zzgl. USt" : "pro Turnus zzgl. USt"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Inkl. professioneller Arbeitsmittel & Spezialchemie</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Ausgebildetes & versichertes Reinigungspersonal</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Keine versteckten Anfahrtskosten im Bezirk Kufstein</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Kostenlose Vor-Ort-Besichtigung zur exakten Abstimmung</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-300 mb-2">Sie wünschen eine sofortige Beratung?</p>
              <a
                href={`tel:${CKR_INFO.phoneRaw}`}
                className="w-full bg-[#52b719] hover:bg-[#469f15] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Direkt anrufen: {CKR_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
