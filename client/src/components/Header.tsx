import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";
import { pfad } from "@/lib/pfade";
import { LEISTUNGSSEITEN } from "@/seiten";
import SozialeKanaele from "@/components/SozialeKanaele";

/** "/kontakt" und "/kontakt/" sind dieselbe Seite; "/" bleibt "/". */
function gleichform(adresse: string) {
  const ohne = adresse.replace(/\/+$/, "");
  return ohne === "" ? "/" : ohne + "/";
}

export default function Header({ onAngebotAnfordern }: { onAngebotAnfordern: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ort] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sprungmarken funktionieren nur auf der Startseite. Von einer
  // Unterseite aus zeigte "#leistungen" ins Leere — deshalb stehen hier
  // jetzt Adressen, die von überall aus gelten.
  const navLinks = [
    { name: "Startseite", route: "/" },
    { name: "Leistungen", route: "/leistungen/" },
    { name: "Über uns", route: "/ueber-uns/" },
    { name: "Ausbildung & Stellen", route: "/stellenanzeigen/" },
    { name: "Kontakt", route: "/kontakt/" },
  ].map((l) => ({ ...l, href: pfad(l.route) }));

  // Welcher Punkt gehört zur Seite, auf der man gerade steht? Eine
  // Leistungsseite zählt zu "Leistungen" — sonst wäre auf zwölf von
  // zweiundzwanzig Seiten kein Punkt gekennzeichnet.
  const hier = gleichform(ort);
  const istAktiv = (route: string) =>
    hier === route ||
    (route === "/leistungen/" &&
      LEISTUNGSSEITEN.some((seite) => gleichform(seite.pfad) === hier));

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Banner (Contact & Notdienst) */}
      <div className="bg-[#070d2e] text-white/90 text-sm sm:text-[0.9375rem] py-1.5 px-4 border-b border-white/10 sm:py-2.5">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${CKR_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 font-medium hover:text-[#5CBC1A] transition-colors"
             aria-label="Anrufen">
              <Phone className="w-4 h-4 text-[#5CBC1A]" aria-hidden="true" />
              <span>24-Stunden-Hotline: {CKR_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${CKR_INFO.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-[#5CBC1A] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#5CBC1A]" aria-hidden="true" />
              <span>{CKR_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-300 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Kufstein & Umgebung (Tirol)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        aria-label="Hauptmenü"
        className={`transition-all duration-200 ${
          isScrolled
            ? "bg-[#0c164a]/95 backdrop-blur-md shadow-lg py-2.5 sm:py-3"
            : "bg-[#0c164a] py-3 sm:py-4"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo Area */}
          {/* Der Schriftzug daneben ist entfallen: "CKR Cleaning Services"
              steht bereits im Zeichen selbst, zweimal dasselbe zu lesen
              bringt nichts. Das Zeichen darf dafür größer werden. */}
          <a href={pfad("/")} className="flex items-center group">
            <span className="bg-white rounded-lg px-2.5 py-1.5 flex items-center">
              <img
                src={CKR_INFO.logo}
                alt="CKR Cleaning Services, Kufstein"
                width={1360}
                height={682}
                className="h-11 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </span>
          </a>

          {/* Die Menüpunkte sitzen in einer eigenen Leiste statt frei im
              Balken zu schweben. Der Punkt der laufenden Seite ist weiß
              ausgefüllt — vorher war auf keiner Seite zu sehen, wo man
              gerade ist, und der grüne Strich, der beim Überfahren von
              links einlief, war die einzige Regung im ganzen Kopf. */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-[0.9375rem] font-semibold backdrop-blur">
            {navLinks.map((link) => {
              const aktiv = istAktiv(link.route);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={aktiv ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 transition-colors ${
                    aktiv
                      ? "bg-white text-[#122272] shadow-sm"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onAngebotAnfordern}
              type="button"
              className="bg-[#2E7D0E] hover:bg-[#256A0B] text-white text-sm sm:text-[0.9375rem] font-semibold px-4 sm:px-5 py-3 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>Angebot anfordern</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </button>
            <a
              href={`https://wa.me/436508933881?text=Hallo%20CKR%20Cleaning%20Services,%20ich%20habe%20eine%20Anfrage%20zu%20einer%20Reinigung.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-[#128C7E] hover:bg-[#075E54] text-white p-2.5 rounded-lg shadow-sm transition-all lg:hidden xl:inline-flex"
              title="Per WhatsApp anfragen"
             aria-label="Über WhatsApp schreiben">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            {/* Instagram und Facebook neben WhatsApp. Zwischen 1024 und
                1280 treten alle drei zurück, sonst bricht die Menüleiste
                um — unten rechts und im Fuß stehen sie weiterhin. */}
            <SozialeKanaele
              farbig
              knopfKlasse="h-10 w-10"
              className="lg:hidden xl:flex"
            />
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${CKR_INFO.phoneRaw}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white"
              title="Anrufen"
             aria-label="Anrufen">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:text-emerald-300"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-white px-4 pt-3 pb-6 mt-3 shadow-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const aktiv = istAktiv(link.route);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={aktiv ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center rounded-lg border-l-4 px-3 py-2 text-base font-semibold transition-colors ${
                      aktiv
                        ? "border-[#5CBC1A] bg-slate-50 text-[#122272]"
                        : "border-transparent text-slate-800 hover:bg-slate-50 hover:text-[#122272]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAngebotAnfordern();
                  }}
                  className="w-full bg-[#122272] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow"
                >
                  <span>Kostenloses Angebot anfordern</span>
                  <ArrowRight className="w-4 h-4 text-[#5CBC1A]" aria-hidden="true" />
                </button>
                <a
                  href={`tel:${CKR_INFO.phoneRaw}`}
                  className="w-full bg-[#2E7D0E] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                 aria-label="Anrufen">
                  <Phone className="w-4 h-4" />
                  <span>24-Stunden-Hotline anrufen</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
