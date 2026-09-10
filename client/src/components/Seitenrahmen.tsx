import { useLocation } from "wouter";
import { MessageCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import { CKR_INFO } from "@/data/ckrData";
import { pfad } from "@/lib/pfade";
import { useKopf } from "@/lib/kopf";
import type { SeitenEintrag } from "@/seiten";

/**
 * Der gemeinsame Rahmen jeder Seite: Kopf, Inhalt, Fuß, Schnellkontakt.
 *
 * Vorher steckte das alles in der Startseite. Sobald es zweite Seiten
 * gibt, muss es an einer Stelle liegen — sonst hat man irgendwann einen
 * Fuß mit dem alten Impressumsverweis auf der einen und den neuen auf
 * der anderen Seite.
 */
export default function Seitenrahmen({
  seite,
  vorauswahl,
  children,
}: {
  seite: SeitenEintrag;
  vorauswahl?: string;
  children: React.ReactNode;
}) {
  const [, setLocation] = useLocation();
  useKopf(seite);

  // Auf der Startseite scrollt der Knopf zum Formular; von einer
  // Unterseite aus gibt es nichts zu scrollen, also führt er dorthin,
  // wo das Formular steht.
  const zumAngebot = () => {
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLocation("/angebot-anfordern/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] text-[#0f172a] selection:bg-emerald-100 selection:text-emerald-900">
      <Header onAngebotAnfordern={zumAngebot} />

      <main className="flex-1">{children}</main>

      <ContactSection prefilledService={vorauswahl} />

      <nav
        aria-label="Schnellkontakt"
        className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5"
      >
        <a
          href="https://wa.me/436508933881?text=Hallo%20CKR%20Cleaning%20Services,%20ich%20ben%C3%B6tige%20ein%20Angebot."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          title="WhatsApp Chat starten"
          aria-label="Über WhatsApp schreiben"
        >
          <MessageCircle className="w-7 h-7" aria-hidden="true" />
        </a>

        <a
          href={`tel:${CKR_INFO.phoneRaw}`}
          className="w-13 h-13 rounded-full bg-[#122272] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          title="24-Stunden-Hotline sofort anrufen"
          aria-label="24-Stunden-Hotline anrufen"
        >
          <Phone className="w-6 h-6 text-[#2E7D0E]" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
}

export { pfad };
