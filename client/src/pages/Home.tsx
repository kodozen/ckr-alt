import Seitenrahmen from "@/components/Seitenrahmen";
import HeroSection from "@/components/HeroSection";
import MeisterSection from "@/components/MeisterSection";
import ServicesSection from "@/components/ServicesSection";
import BandSection from "@/components/BandSection";
import AboutSection from "@/components/AboutSection";
import ReviewsAndFaq from "@/components/ReviewsAndFaq";
import { CKR_INFO } from "@/data/ckrData";
import { STARTSEITE } from "@/seiten";

/**
 * Die Startseite ist eine Übersicht, kein Nachschlagewerk.
 *
 * Sie war neunzehn Bildschirme lang, weil alles auf ihr stand: jede
 * Leistung mit vollem Umfang, die Ausbildung, die Rechtstexte. Das meiste
 * davon hat inzwischen eine eigene Adresse. Was hier bleibt, hat einen
 * Zweck — zeigen, worum es geht, und den Besucher an die richtige Stelle
 * bringen.
 */
export default function Home() {
  const zumFormular = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Seitenrahmen seite={STARTSEITE}>
      <HeroSection onAngebotAnfordern={zumFormular} />
      <MeisterSection />
      <ServicesSection />

      <BandSection
        bild={CKR_INFO.detailImageCare}
        augenbraue="Gebäude & Unterhalt"
        titel="Was jeden Tag gleich aussehen muss."
        text="Stiegenhäuser, Büros, Hotelzimmer, Appartements. Die laufende Reinigung fällt niemandem auf, solange sie stimmt — und genau das ist die Aufgabe. Wir arbeiten nach Ihrem Betriebsablauf, nicht nach unserem."
        linkText="Zu den Leistungen"
        href="#leistungen"
      />

      <AboutSection />
      <ReviewsAndFaq />
    </Seitenrahmen>
  );
}
