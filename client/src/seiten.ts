import { CKR_SERVICES } from "./data/ckrData";

/**
 * Das Verzeichnis aller Adressen der Website.
 *
 * Es gibt genau eine Liste, und drei Dinge lesen daraus: der Router im
 * Browser, das Werkzeug, das beim Bauen aus jeder Adresse eine echte
 * HTML-Datei macht, und die sitemap.xml. Führte jedes davon seine eigene
 * Liste, hätte man über kurz oder lang eine Seite, die im Router steht,
 * aber nicht gebaut wird — oder eine, die in der Sitemap steht und ins
 * Leere zeigt.
 *
 * Die Adressen sind nicht frei gewählt. Es sind die, unter denen die
 * laufende Seite ckrreinigung.at seit Jahren erreichbar ist. Wer sie
 * ändert, wirft weg, was Google über die Jahre zugeordnet hat.
 */
export interface SeitenEintrag {
  /** Adresse mit führendem und abschließendem Schrägstrich. */
  pfad: string;
  /** Steht im Reiter des Browsers und in der Trefferliste. */
  titel: string;
  /** Der Satz unter dem Treffer. Höchstens etwa 155 Zeichen. */
  beschreibung: string;
}

const MARKE = "CKR Cleaning Services";

export const LEISTUNGSSEITEN: SeitenEintrag[] = CKR_SERVICES.map((l) => ({
  pfad: `/${l.id}/`,
  titel: `${l.title} in Kufstein & Tirol · ${MARKE}`,
  beschreibung: l.shortDesc.slice(0, 155),
}));

export const TEXTSEITEN: SeitenEintrag[] = [
  {
    pfad: "/kontakt/",
    titel: `Kontakt · ${MARKE} Kufstein`,
    beschreibung:
      "Rufen Sie uns an oder schreiben Sie uns: CKR Cleaning Services in Kufstein, erreichbar rund um die Uhr, auch bei Havarie.",
  },
  {
    pfad: "/angebot-anfordern/",
    titel: `Angebot anfordern · ${MARKE}`,
    beschreibung:
      "Kostenlose Besichtigung, danach ein verbindliches Angebot. Beschreiben Sie kurz Ihr Objekt — wir melden uns.",
  },
  {
    pfad: "/stellenanzeigen/",
    titel: `Ausbildung & Stellen · ${MARKE} Kufstein`,
    beschreibung:
      "CKR bildet aus und sucht laufend Reinigungskräfte im Bezirk Kufstein. Lehrstelle, Teilzeit oder Vollzeit.",
  },
  {
    pfad: "/ihre-bewerbung/",
    titel: `Ihre Bewerbung · ${MARKE}`,
    beschreibung:
      "Bewerben Sie sich bei CKR Cleaning Services in Kufstein — als Lehrling, Reinigungskraft oder Objektleitung.",
  },
  {
    pfad: "/impressum/",
    titel: `Impressum · ${MARKE}`,
    beschreibung:
      "Angaben gemäß § 5 ECG und § 25 MedienG zu CKR – Cleaning Services, Inhaberin Sevgi Ay, Kufstein.",
  },
  {
    pfad: "/datenschutzerklaerung/",
    titel: `Datenschutzerklärung · ${MARKE}`,
    beschreibung:
      "Wie CKR Cleaning Services personenbezogene Daten verarbeitet — nach DSGVO und österreichischem Datenschutzgesetz.",
  },
];

export const STARTSEITE: SeitenEintrag = {
  pfad: "/",
  titel: `${MARKE} · Meisterbetrieb für Gebäudereinigung in Kufstein`,
  beschreibung:
    "Gebäudereinigung in Kufstein und ganz Tirol: Unterhalt, Glas, Hotel, Bau und Entrümpelung. Rund um die Uhr erreichbar.",
};

export const ALLE_SEITEN: SeitenEintrag[] = [
  STARTSEITE,
  ...LEISTUNGSSEITEN,
  ...TEXTSEITEN,
];
