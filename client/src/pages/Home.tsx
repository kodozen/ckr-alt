import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BandSection from "@/components/BandSection";
import MeisterSection from "@/components/MeisterSection";
import ServicesSection from "@/components/ServicesSection";
import { CKR_INFO } from "@/data/ckrData";
import AboutSection from "@/components/AboutSection";
import ReviewsAndFaq from "@/components/ReviewsAndFaq";
import ContactSection from "@/components/ContactSection";
import { MessageCircle, Phone } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";

export default function Home() {
  const [prefilledService, setPrefilledService] = useState<string>("Unterhaltsreinigung");

  const zumFormular = () => {
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setPrefilledService(serviceName);
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] text-[#0f172a] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header with Navigation and Obere Leiste */}
      <Header onAngebotAnfordern={zumFormular} />

      {/* Main Content Area */}
      <main className="flex-1">
        <HeroSection onAngebotAnfordern={zumFormular} />
        <MeisterSection />
        <ServicesSection onSelectService={handleSelectService} />

        <BandSection
          bild={CKR_INFO.detailImageCare}
          augenbraue="Gebäude & Unterhalt"
          titel="Was jeden Tag gleich aussehen muss."
          text="Stiegenhäuser, Büros, Hotelzimmer, Appartements. Die laufende Reinigung fällt niemandem auf, solange sie stimmt — und genau das ist die Aufgabe. Wir arbeiten nach Ihrem Betriebsablauf, nicht nach unserem."
          linkText="Zu den Leistungen"
          href="#leistungen"
        />

        <BandSection
          bild={CKR_INFO.teamImage}
          augenbraue="Glas, Fassade & Denkmal"
          titel="Was von außen gesehen wird."
          text="Ein Gebäude wird beurteilt, bevor jemand hineingeht. Fassaden, Fenster und historische Substanz vertragen sehr Unterschiedliches — hier entscheidet das Verfahren, nicht die Leistung des Geräts."
          linkText="Meisterbetrieb ansehen"
          href="#meisterbetrieb"
          seite="rechts"
        />
        <AboutSection />
        <ReviewsAndFaq />
      </main>

      {/* Footer & Contact & Impressum */}
      <ContactSection prefilledService={prefilledService} />

      {/* Floating Action Buttons (Sticky Quick Contacts for Mobile & Desktop) */}
      <nav aria-label="Schnellkontakt" className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/436508933881?text=Hallo%20CKR%20Cleaning%20Services,%20ich%20benötige%20ein%20Angebot.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          title="WhatsApp Chat starten"
          aria-label="Über WhatsApp schreiben"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        <a
          href={`tel:${CKR_INFO.phoneRaw}`}
          className="w-13 h-13 rounded-full bg-[#122272] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          title="24-Stunden-Hotline sofort anrufen"
          aria-label="24-Stunden-Hotline anrufen"
        >
          <Phone className="w-6 h-6 text-[#2E7D0E]" />
        </a>
      </nav>
    </div>
  );
}
