import { useEffect, useRef, useState } from "react";
import { CKR_INFO, CKR_SERVICES } from "@/data/ckrData";
import { Phone, Mail, MapPin, Send, ShieldCheck, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection({ prefilledService }: { prefilledService?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: prefilledService || "Unterhaltsreinigung",
    flaeche: "",
    turnus: "",
    message: "",
    isApplication: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const rechtsfensterRef = useRef<HTMLDivElement>(null);
  const ausloeserRef = useRef<HTMLElement | null>(null);
  const rechtsfensterOffen = showImpressum || showDatenschutz;

  // Escape schließt, der Fokus wandert hinein und danach dorthin zurück,
  // wo der Besucher war, und die Seite dahinter scrollt nicht mehr mit.
  useEffect(() => {
    if (!rechtsfensterOffen) return;

    ausloeserRef.current = document.activeElement as HTMLElement;
    rechtsfensterRef.current?.focus();

    const vorherigesOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const beiTaste = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setShowImpressum(false);
      setShowDatenschutz(false);
    };
    document.addEventListener("keydown", beiTaste);

    return () => {
      document.removeEventListener("keydown", beiTaste);
      document.body.style.overflow = vorherigesOverflow;
      ausloeserRef.current?.focus();
    };
  }, [rechtsfensterOffen]);

  // Die Seite liegt auf einem reinen Dateiserver — es gibt nichts, was
  // ein Formular entgegennehmen könnte. Bis ein Postfachdienst feststeht,
  // wird die Anfrage im E-Mail-Programm des Besuchers vorbereitet und an
  // CKR adressiert. Das ist der einzige Weg, der ohne fremden Anbieter
  // auskommt — und vor allem der einzige, bei dem die Nachricht wirklich
  // ankommt.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Bitte geben Sie Ihren Namen und eine Telefonnummer an.");
      return;
    }

    const betreff = formData.isApplication
      ? `Bewerbung: ${formData.service}`
      : `Anfrage: ${formData.service}`;

    const zeilen = [
      `Name: ${formData.name}`,
      `Telefon: ${formData.phone}`,
      formData.email ? `E-Mail: ${formData.email}` : null,
      formData.isApplication
        ? `Gewünschte Stelle: ${formData.service}`
        : `Gewünschte Leistung: ${formData.service}`,
      !formData.isApplication && formData.flaeche ? `Fläche: ${formData.flaeche}` : null,
      !formData.isApplication && formData.turnus ? `Turnus: ${formData.turnus}` : null,
      "",
      formData.message || "(keine weitere Nachricht)",
    ].filter(Boolean);

    window.location.href =
      `mailto:${CKR_INFO.email}` +
      `?subject=${encodeURIComponent(betreff)}` +
      `&body=${encodeURIComponent(zeilen.join("\n"))}`;

    setSubmitted(true);
    toast.success("Ihre Anfrage ist im E-Mail-Programm vorbereitet — bitte nur noch absenden.");
  };

  return (
    <footer id="kontakt" className="bg-[#0a133d] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#122272]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#52b719]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Contact Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/30">
            Kontaktieren Sie uns
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 tracking-tight text-white">
            Rufen Sie uns an oder senden Sie uns eine Nachricht.
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Wir kümmern uns gerne um Ihr Anliegen und freuen uns auf Ihren Besuch! Vertrauen Sie uns – wir werden uns bemühen, Ihren Auftrag exakt an Ihre Wünsche und Vorstellungen anzupassen.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Info Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#2E7D0E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    Telefon & 24-Stunden-Hotline
                  </span>
                  <div className="text-lg font-bold mt-0.5">
                    <a href={`tel:${CKR_INFO.phoneRaw}`} className="inline-flex items-center min-h-[44px] hover:text-[#2E7D0E] transition-colors" aria-label="Anrufen">
                      {CKR_INFO.phone}
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Jederzeit für Havariefälle und Terminanfragen erreichbar.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    E-Mail
                  </span>
                  <div className="text-base font-bold mt-0.5">
                    <a href={`mailto:${CKR_INFO.email}`} className="inline-flex items-center min-h-[44px] hover:text-[#2E7D0E] transition-colors" aria-label="E-Mail schreiben">
                      {CKR_INFO.email}
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Angebotsanfragen innerhalb weniger Stunden beantwortet.
                  </p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    Bürostandort Kufstein
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {CKR_INFO.officeAddress}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Einsatzgebiet: Kufstein, Wörgl, Kitzbühel & ganz Tirol
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Commitment Box */}
            <div className="bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Österreichischer Meisterbetrieb-Anspruch
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reinigungsfachkräfte nach strengen österreichischen Hygiene- und Sicherheitsrichtlinien ausgebildet.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="bg-white/10 px-2.5 py-1 rounded-md">UID: {CKR_INFO.uid}</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md">Geschäftsführung: {CKR_INFO.owner}</span>
              </div>
            </div>
          </div>

          {/* Contact & Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#122272]">
                    Unverbindliche Anfrage senden
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Wir antworten werktags meist innerhalb von 2 Stunden.
                  </p>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    Kostenlos
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Mode Switch (Anfrage vs Bewerbung) */}
                <div className="flex rounded-lg bg-slate-100 p-1 mb-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isApplication: false })}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition ${
                      !formData.isApplication
                        ? "bg-white text-[#122272] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Reinigungsanfrage
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isApplication: true })}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition ${
                      formData.isApplication
                        ? "bg-white text-[#122272] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Bewerbung / Lehrstelle
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Ihr Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Vor- und Nachname"
                      aria-label="Vor- und Nachname"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Telefonnummer *
                    </label>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+43 650 ..."
                      aria-label="Ihre Telefonnummer"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="ihre.adresse@beispiel.at"
                      aria-label="Ihre E-Mail-Adresse"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {formData.isApplication ? "Gewünschte Stelle" : "Gewünschte Leistung"}
                    </label>
                    <select
                      aria-label="Ihr Anliegen"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none"
                    >
                      {formData.isApplication ? (
                        <>
                          <option value="Lehrling Gebäudereinigung">Lehrstelle Gebäudereiniger/in</option>
                          <option value="Reinigungskraft Teilzeit">Reinigungskraft (Teilzeit)</option>
                          <option value="Reinigungskraft Vollzeit">Reinigungskraft (Vollzeit)</option>
                          <option value="Vorarbeiter / Objektleiter">Vorarbeiter/in / Objektleitung</option>
                        </>
                      ) : (
                        CKR_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                {/* Fläche und Turnus — kamen vom früheren Rechnerabschnitt
                    hierher. Als Auswahl statt als Freitext, weil sich damit
                    die Besichtigung planen lässt. Bei einer Bewerbung sind
                    sie ohne Bedeutung und bleiben weg. */}
                {!formData.isApplication && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Ungefähre Fläche
                      </label>
                      <select
                        aria-label="Ungefähre Fläche"
                        value={formData.flaeche}
                        onChange={(e) => setFormData({ ...formData, flaeche: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="bis 100 m²">bis 100 m²</option>
                        <option value="100 bis 300 m²">100 – 300 m²</option>
                        <option value="300 bis 1000 m²">300 – 1000 m²</option>
                        <option value="über 1000 m²">über 1000 m²</option>
                        <option value="weiß ich nicht">weiß ich nicht</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Wie oft
                      </label>
                      <select
                        aria-label="Gewünschter Turnus"
                        value={formData.turnus}
                        onChange={(e) => setFormData({ ...formData, turnus: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="einmalig">einmalig</option>
                        <option value="wöchentlich">wöchentlich</option>
                        <option value="14-tägig">14-tägig</option>
                        <option value="mehrmals pro Woche">mehrmals pro Woche</option>
                        <option value="noch offen">noch offen</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ihre Nachricht / Objektangaben
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Beschreiben Sie kurz Ihr Objekt (Fläche, Turnus, Besonderheiten) oder Ihre Qualifikation..."
                    aria-label="Ihre Nachricht"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#122272] outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D0E] shrink-0" />
                  <span>Ihre Daten werden vertraulich behandelt und nicht weitergegeben.</span>
                </div>

                {/* Nicht dauerhaft sperren: öffnet sich das E-Mail-Programm
                    nicht, muss der Besucher es erneut versuchen können. */}
                <button
                  type="submit"
                  className="w-full bg-[#122272] hover:bg-[#0c164a] text-white font-bold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-[#2E7D0E]" />
                  <span>
                    {submitted
                      ? "Im E-Mail-Programm geöffnet"
                      : formData.isApplication
                      ? "Bewerbung absenden"
                      : "Unverbindliche Anfrage absenden"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <img
              src={CKR_INFO.logo}
              alt="CKR Logo"
              loading="lazy"
              width={1360}
              height={682}
              className="h-7 w-auto object-contain brightness-200 contrast-50"
            />
            <span>© {new Date().getFullYear()} CKR Cleaning Services. Alle Rechte vorbehalten.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowImpressum(true)}
              className="hover:text-white underline underline-offset-4 transition"
            >
              Impressum
            </button>
            <button
              onClick={() => setShowDatenschutz(true)}
              className="hover:text-white underline underline-offset-4 transition"
            >
              Datenschutzerklärung
            </button>
            <a href="#top" className="hover:text-[#2E7D0E] transition">
              Nach oben ↑
            </a>
          </div>
        </div>
      </div>

      {/* Impressum Modal */}
      {showImpressum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm text-slate-900"
          onClick={() => setShowImpressum(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="impressum-titel"
            ref={rechtsfensterRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl outline-none"
          >
            <button
              onClick={() => setShowImpressum(false)}
              aria-label="Fenster schließen"
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 text-lg font-bold"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <h3 id="impressum-titel" className="text-2xl font-extrabold text-[#122272] mb-4">Impressum</h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <strong>Angaben gemäß § 5 ECG und § 25 MedienG:</strong>
                <p>{CKR_INFO.owner}</p>
                <p>{CKR_INFO.legalName}</p>
                <p>{CKR_INFO.officialAddress}</p>
              </div>

              <div>
                <strong>Büro & Kundenkontakt:</strong>
                <p>{CKR_INFO.officeAddress}</p>
                <p>Telefon: {CKR_INFO.phone}</p>
                <p>E-Mail: {CKR_INFO.email}</p>
              </div>

              <div>
                <strong>Umsatzsteuer-Identifikationsnummer:</strong>
                <p>UID-Nummer: <strong>{CKR_INFO.uid}</strong></p>
              </div>

              <div>
                <strong>Geschäftsführung:</strong>
                <p>{CKR_INFO.owner}</p>
              </div>

              <div>
                <strong>Unternehmensgegenstand:</strong>
                <p>Gebäudereinigung (Denkmal-, Fassaden- und Gebäudereinigung)</p>
              </div>

              <div>
                <strong>Gewerbebehörde:</strong>
                <p>Bezirkshauptmannschaft Kufstein</p>
              </div>

              <div>
                <strong>Kammerzugehörigkeit:</strong>
                <p>
                  Wirtschaftskammer Tirol, Landesinnung der Gebäudereiniger
                </p>
              </div>

              <div>
                <strong>Anwendbare Rechtsvorschrift:</strong>
                <p>
                  Gewerbeordnung 1994, abrufbar unter
                  <a
                    href="https://www.ris.bka.gv.at"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#122272] underline ml-1"
                  >
                    www.ris.bka.gv.at
                  </a>
                </p>
              </div>

              <div>
                <strong>EU-Streitschlichtung:</strong>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#122272] underline ml-1"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowImpressum(false)}
                className="bg-[#122272] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Datenschutz Modal */}
      {showDatenschutz && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm text-slate-900"
          onClick={() => setShowDatenschutz(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="datenschutz-titel"
            ref={rechtsfensterRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl outline-none"
          >
            <button
              onClick={() => setShowDatenschutz(false)}
              aria-label="Fenster schließen"
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 text-lg font-bold"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <h3 id="datenschutz-titel" className="text-2xl font-extrabold text-[#122272] mb-4">Datenschutzerklärung</h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Wir legen großen Wert auf den Schutz Ihrer persönlichen Daten gemäß DSGVO und österreichischem Datenschutzgesetz (DSG).
              </p>
              <p>
                <strong>Erhebung und Verarbeitung:</strong> Bei Kontaktaufnahme über Formular oder E-Mail werden Ihre Angaben zwecks Bearbeitung der Anfrage und möglicher Anschlussfragen bei uns gespeichert.
              </p>
              <p>
                <strong>Ihre Rechte:</strong> Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch zu. Kontaktieren Sie uns hierzu unter info@ckrreinigung.at.
              </p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowDatenschutz(false)}
                className="bg-[#122272] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
