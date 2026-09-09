import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PriceEstimator from "@/components/PriceEstimator";
import ReviewsAndFaq from "@/components/ReviewsAndFaq";
import ContactSection from "@/components/ContactSection";
import { MessageCircle, Phone } from "lucide-react";
import { CKR_INFO } from "@/data/ckrData";

export default function Home() {
  const [prefilledService, setPrefilledService] = useState<string>("Unterhaltsreinigung");

  const scrollToCalculator = () => {
    const el = document.getElementById("kalkulator");
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
      {/* Header with Navigation and 24h Topbar */}
      <Header onOpenCalculator={scrollToCalculator} />

      {/* Main Content Area */}
      <main className="flex-1">
        <HeroSection onOpenCalculator={scrollToCalculator} />
        <ServicesSection onSelectService={handleSelectService} />
        <AboutSection />
        <PriceEstimator />
        <ReviewsAndFaq />
      </main>

      {/* Footer & Contact & Impressum */}
      <ContactSection prefilledService={prefilledService} />

      {/* Floating Action Buttons (Sticky Quick Contacts for Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/436508933881?text=Hallo%20CKR%20Cleaning%20Services,%20ich%20benötige%20ein%20Angebot.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          title="WhatsApp Chat starten"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        <a
          href={`tel:${CKR_INFO.phoneRaw}`}
          className="w-13 h-13 rounded-full bg-[#122272] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          title="24h-Hotline sofort anrufen"
        >
          <Phone className="w-6 h-6 text-[#52b719]" />
        </a>
      </div>
    </div>
  );
}
