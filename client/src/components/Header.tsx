import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Phone, Mail, Menu, X, ArrowRight } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";
import { pfad } from "@/lib/pfade";
import { LEISTUNGSSEITEN } from "@/seiten";
import SozialeKanaele from "@/components/SozialeKanaele";
import Farbschalter from "@/components/Farbschalter";

/** "/kontakt" und "/kontakt/" sind dieselbe Seite; "/" bleibt "/". */
function gleichform(adresse: string) {
  const ohne = adresse.replace(/\/+$/, "");
  return ohne === "" ? "/" : ohne + "/";
}

/**
 * Der Kopf.
 *
 * Zwei Teile, die sich verschieden verhalten:
 *
 * Der Kontaktstreifen mit Hotline und E-Mail steht ganz oben und
 * scrollt weg. Er ist eine Auskunft, keine Steuerung — er muss nicht
 * mitfahren, und ohne ihn bleibt vom Kopf nur noch das übrig, was man
 * unterwegs wirklich braucht.
 *
 * Darunter schwebt die Menüleiste: eine gerundete Glasplatte, die beim
 * Scrollen stehen bleibt. Oben auf der Seite liegt sie auf demselben
 * Dunkelblau wie der Aufmacher und wirkt wie ein Teil davon; sobald man
 * scrollt, wird der Streifen dahinter durchsichtig, die Platte deckt
 * stärker und schwebt über dem Inhalt, der darunter durchläuft. Die
 * helle Kante an ihrer Oberkante ist das, was die Platte aus der Fläche
 * hebt — ohne sie sieht Glas wie ein grauer Kasten aus.
 */
export default function Header({ onAngebotAnfordern }: { onAngebotAnfordern: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ort] = useLocation();
  const leiste = useRef<HTMLDivElement>(null);

  // Das Licht an der Oberkante folgt dem Zeiger. Gerechnet wird nichts
  // in React: die Position geht als CSS-Variable an das Element, den
  // Rest macht ein radialer Verlauf in der Stilvorlage. So kostet die
  // Bewegung keinen einzigen Neuaufbau der Leiste.
  const beiZeiger = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = leiste.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--zeiger-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--zeiger-y", `${e.clientY - r.top}px`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sprungmarken funktionieren nur auf der Startseite. Von einer
  // Unterseite aus zeigte "#leistungen" ins Leere — deshalb stehen hier
  // Adressen, die von überall aus gelten.
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

  const glasKnopf =
    "inline-flex items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <>
      {/* Kontaktstreifen — fährt beim Scrollen nach oben aus dem Bild. */}
      <div className="bg-[#070d2e] px-4 py-1.5 text-sm text-white/90 sm:py-2.5 sm:text-[0.9375rem]">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${CKR_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-[#5CBC1A]"
              aria-label="Anrufen"
            >
              <Phone className="h-4 w-4 text-[#5CBC1A]" aria-hidden="true" />
              <span>24-Stunden-Hotline: {CKR_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${CKR_INFO.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-[#5CBC1A] md:flex"
            >
              <Mail className="h-4 w-4 text-[#5CBC1A]" aria-hidden="true" />
              <span>{CKR_INFO.email}</span>
            </a>
          </div>

          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-1 text-sm font-semibold text-emerald-300 sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Kufstein &amp; Umgebung (Tirol)
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 py-2.5 transition-colors duration-300 sm:py-3 ${
          isScrolled ? "bg-transparent" : "bg-[#070d2e]"
        }`}
      >
        <div className="container">
          {/* Die Glasplatte ist eine eigene Schicht unter dem Inhalt und
              nicht die haftende Leiste selbst: so trägt das Element, das
              beim Scrollen stehen bleibt, kein Filter mit sich herum —
              der Browser muss nur eine kleine Fläche neu zusammensetzen
              statt die ganze Leiste samt Schrift und Symbolen. */}
          {/* Die Leiste wird beim Scrollen schmaler und rückt zusammen —
              dieselbe Bewegung wie im Vorbild: oben auf der Seite nimmt
              sie die volle Breite, unterwegs tritt sie zurück. */}
          <div
            ref={leiste}
            onMouseMove={beiZeiger}
            className={`group/leiste relative mx-auto transition-[max-width] duration-500 ease-out ${
              isScrolled ? "max-w-[68rem]" : "max-w-full"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-[1.5rem] border border-white/12 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors duration-300 ${
                isScrolled ? "bg-[#0c164a]/85" : "bg-white/[0.07]"
              }`}
            >
              {/* Ruhezustand: ein Hauch Licht in der Mitte der Oberkante. */}
              <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-300 group-hover/leiste:opacity-0" />
            </span>

            {/* Und das Licht, das dem Zeiger folgt: ein heller Fleck, der
                nur auf dem Rand sichtbar ist. */}
            <span aria-hidden="true" className="zeigerlicht rounded-[1.5rem]" />

          <nav
            aria-label="Hauptmenü"
            className={`relative flex items-center justify-between gap-3 px-3 transition-[padding] duration-300 ${
              isScrolled ? "py-1.5" : "py-2"
            }`}
          >

            <a href={pfad("/")} className="group flex items-center">
              {/* Die Platte bleibt in beiden Fassungen weiß: das Zeichen ist
                  dunkelblau und grün, auf dunklem Grund verschwände es. */}
              <span className="flex items-center rounded-full bg-white px-3 py-1.5">
                <img
                  src={CKR_INFO.logo}
                  alt="CKR Cleaning Services, Kufstein"
                  width={1360}
                  height={682}
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? "h-9 sm:h-10" : "h-10 sm:h-11"
                  }`}
                />
              </span>
            </a>

            <div className="hidden items-center gap-1 text-[0.9375rem] font-semibold lg:flex">
              {navLinks.map((link) => {
                const aktiv = istAktiv(link.route);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={aktiv ? "page" : undefined}
                    className={`group/punkt relative whitespace-nowrap px-3.5 py-2.5 transition-colors ${
                      aktiv ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {/* Der Strich wächst aus der Mitte, statt von links
                        einzulaufen: kürzer, ruhiger, und er steht dicht
                        unter der Schrift wie im Vorbild. */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 bottom-1 h-0.5 origin-center rounded-full bg-[#5CBC1A] transition-all duration-200 ${
                        aktiv
                          ? "scale-x-100 opacity-100"
                          : "scale-x-50 opacity-0 group-hover/punkt:scale-x-100 group-hover/punkt:opacity-100"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={onAngebotAnfordern}
                type="button"
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[#2E7D0E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#256A0B] active:scale-95 sm:px-5 sm:text-[0.9375rem]"
              >
                <span>Angebot anfordern</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              {/* WhatsApp, Instagram und Facebook in derselben ruhigen
                  Glasform wie die übrigen Symbole. Zwischen 1024 und
                  1280 Pixeln treten sie zurück, sonst bricht die Leiste
                  um — unten rechts und im Fuß bleiben sie erreichbar. */}
              <a
                href="https://wa.me/436508933881?text=Hallo%20CKR%20Cleaning%20Services,%20ich%20habe%20eine%20Anfrage%20zu%20einer%20Reinigung."
                target="_blank"
                rel="noopener noreferrer"
                title="Per WhatsApp anfragen"
                aria-label="Über WhatsApp schreiben"
                className={`${glasKnopf} h-9 w-9 lg:hidden xl:inline-flex`}
              >
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              <SozialeKanaele
                knopfKlasse="h-9 w-9 rounded-full"
                stilKlasse="text-white/60 hover:bg-white/10 hover:text-white"
                className="lg:hidden xl:flex"
              />

              <Farbschalter knopfKlasse={`${glasKnopf} h-9 w-9`} />
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <Farbschalter knopfKlasse={`${glasKnopf} h-10 w-10`} />
              <a
                href={`tel:${CKR_INFO.phoneRaw}`}
                className={`${glasKnopf} h-10 w-10`}
                title="Anrufen"
                aria-label="Anrufen"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${glasKnopf} h-10 w-10`}
                aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>
          </div>

          {/* Das Menü auf dem Telefon: dieselbe Glasplatte, nur größer. */}
          {mobileMenuOpen && (
            <div className="mt-2 rounded-3xl border border-white/15 bg-[#0c164a]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const aktiv = istAktiv(link.route);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      aria-current={aktiv ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                        aktiv
                          ? "bg-white/15 text-white"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          aktiv ? "bg-[#5CBC1A]" : "bg-transparent"
                        }`}
                      />
                      {link.name}
                    </a>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAngebotAnfordern();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2E7D0E] py-3 font-semibold text-white shadow transition-colors hover:bg-[#256A0B]"
                >
                  <span>Kostenloses Angebot anfordern</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href={`tel:${CKR_INFO.phoneRaw}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 py-3 font-semibold text-white transition-colors hover:bg-white/20"
                  aria-label="24-Stunden-Hotline anrufen"
                >
                  <Phone className="h-4 w-4 text-[#8FE04A]" aria-hidden="true" />
                  <span>24-Stunden-Hotline anrufen</span>
                </a>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <SozialeKanaele knopfKlasse="h-11 w-11 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
