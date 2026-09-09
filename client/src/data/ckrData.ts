// Die Bilder liegen unter /manus-storage/. Als absoluter Pfad zeigt das
// auf die Wurzel der Domain — unter kodozen.github.io/ckr-alt/ also ins
// Leere; deshalb waren alle dreizehn Bilder 404. BASE_URL enthält den
// Unterordner, den Vite beim Bauen kennt; auf einer eigenen Domain ist
// er "/" und die Pfade bleiben, wie sie sind.
const bild = (pfad: string) =>
  import.meta.env.BASE_URL.replace(/\/$/, "") + pfad;

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  badge?: string;
  iconName: string;
}

export const CKR_INFO = {
  name: "CKR Cleaning Services",
  legalName: "CKR – Cleaning Services (Inh. Sevgi Ay)",
  tagline: "Ihre verlässliche Reinigungsfirma in Kufstein & Tirol",
  phone: "+43 650 8933881",
  phoneRaw: "+436508933881",
  email: "info@ckrreinigung.at",
  officeAddress: "Weckaufstraße 10, 6330 Kufstein, Österreich",
  officialAddress: "Bartl Lechner-Straße 17, 6330 Kufstein, Österreich",
  uid: "ATU74543201",
  owner: "Sevgi Ay",
  hotline: "Notdienst rund um die Uhr",
  workingHours: "Büro: Mo–Sa 07:00–19:00 Uhr · Notdienst rund um die Uhr",
  experienceYears: "10+",
  clientsSatisfied: "500+",
  coverageArea: "Bezirk Kufstein, Wörgl, Kitzbühel, Schwaz & Umgebung (Tirol)",
  logo: bild("/manus-storage/ckr-logo-original_a1e7247c.png"),
  meisterSiegel: bild("/meisterbetrieb-siegel.jpg"),
  heroImage: bild("/manus-storage/G1jT57jzwtmc_8fc296a6.jpg"),
  teamImage: bild("/manus-storage/afgOOxPThKeo_76986f5d.jpg"),
  detailImageOffice: bild("/manus-storage/QPImpFF6sPNS_e1968161.jpg"),
  detailImageCare: bild("/manus-storage/W26I5SqCRoqZ_f8c2bf58.jpg"),
  detailImageFloor: bild("/manus-storage/c11Cq6dwwpAu_b39b6734.jpg"),
  detailImageModern: bild("/manus-storage/56GiyVpVX1CN_7c5868d9.jpg"),
};

export const CKR_SERVICES: ServiceItem[] = [
  {
    id: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    shortDesc: "Täglich gepflegte Büros, Ordinationen und Geschäftsräume für einen erstklassigen ersten Eindruck.",
    fullDesc: "Täglich durch die Büroräume geflitzt… CKR Cleaning Services in Kufstein ist Ihr professioneller Partner für kontinuierliche Sauberkeit. Wir stimmen Intervall und Reinigungszeiten perfekt auf Ihren Betriebsablauf ab.",
    features: [
      "Schreibtisch- & Oberflächenreinigung",
      "Sanitäranlagen-Hygieneservice",
      "Bodenpflege (Saugen & Wischen)",
      "Mülltrennung & fachgerechte Entsorgung",
      "Küchen- und Pausenraumpflege"
    ],
    image: bild("/manus-storage/QPImpFF6sPNS_e1968161.jpg"),
    badge: "Meistgefragt",
    iconName: "Sparkles"
  },
  {
    id: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    shortDesc: "Damit Sie nicht alles selber machen müssen! Regelmäßige Pflege für Wohnanlagen und Hausverwaltungen.",
    fullDesc: "Der Hausflur ist die Visitenkarte jedes Gebäudes. Wir übernehmen für Hausverwaltungen, Eigentümergemeinschaften und Betriebe im gesamten Bezirk Kufstein die gründliche Treppenhauspflege.",
    features: [
      "Kehren und feuchtes Wischen aller Stufen",
      "Handläufe, Geländer & Lichtschalter desinfizieren",
      "Eingangstüren, Klingelleisten & Briefkästen reinigen",
      "Spinnwebenbeseitigung & Glasflächen im Stiegenhaus",
      "Feste Termine & zuverlässige Ausführung"
    ],
    image: bild("/manus-storage/W26I5SqCRoqZ_f8c2bf58.jpg"),
    iconName: "Building2"
  },
  {
    id: "grundreinigung",
    title: "Grundreinigung & Sonderreinigung",
    shortDesc: "Tiefenwirksame Intensivreinigung für stark beanspruchte Böden, Fugen und Spezialbereiche.",
    fullDesc: "Unsere verlässlichen und motivierten Mitarbeiter sind bestens geschult und beseitigen auch hartnäckigste Verschmutzungen oder abgenutzte Pflegefilme gründlich und werterhaltend.",
    features: [
      "Maschinelle Bodenreinigung & Beschichtung",
      "Entfernung alter Versiegelungen",
      "Tiefenreinigung von Sanitär- & Nassbereichen",
      "Wand- und Deckenentstaubung",
      "Werterhaltende Pflege aller Werkstoffe"
    ],
    image: bild("/manus-storage/c11Cq6dwwpAu_b39b6734.jpg"),
    badge: "Werterhalt",
    iconName: "ShieldCheck"
  },
  {
    id: "glasreinigung",
    title: "Glas- & Fensterreinigung",
    shortDesc: "Streifenfreier Glanz für Schaufenster, Bürofassaden, Rahmen und schwer zugängliche Verglasungen.",
    fullDesc: "Die Glasreinigung beinhaltet die Reinigung von Fenster-Verglasungen ein-, zwei- oder mehrseitig samt Rahmen und Einfassungen mit modernsten Geräten und umweltschonenden Mitteln.",
    features: [
      "Fensterglas innen und außen streifenfrei",
      "Rahmen-, Falz- und Sims-Aufbereitung",
      "Schaufensterfronten für den Handel",
      "Wintergärten & Glasüberdachungen",
      "Sicherheitsausrüstung für Höhenarbeiten"
    ],
    image: bild("/manus-storage/G1jT57jzwtmc_8fc296a6.jpg"),
    iconName: "Sun"
  },
  {
    id: "hotelreinigung",
    title: "Hotel- & Pensionsreinigung",
    shortDesc: "Fünf-Sterne-Sauberkeit für Tiroler Gastronomie, Wellnessanlagen, Zimmer und Suiten.",
    fullDesc: "Wir übernehmen alle Reinigungsleistungen von der täglichen Zimmerreinigung über topmoderne Reinigungen für Pools und Wellnessanlagen bis hin zu Sonderreinigungen.",
    features: [
      "Tägliche Hotelzimmer- und Suitenreinigung",
      "Wellness-, Sauna- und Poolbereich",
      "Empfangsbereich, Gänge und Konferenzräume",
      "Wäscheservice-Koordination & Turn-down",
      "Zusätzliche Kräfte in der Hochsaison"
    ],
    image: bild("/manus-storage/56GiyVpVX1CN_7c5868d9.jpg"),
    badge: "Tiroler Tourismus",
    iconName: "BedDouble"
  },
  {
    id: "appartementreinigung",
    title: "Appartement- & Ferienwohnungsreinigung",
    shortDesc: "Pünktlicher Wechseltag-Service für Chalets und Ferienwohnungen mit höchstem Komfort.",
    fullDesc: "Im Urlaub sollte man sich wie zu Hause fühlen, selbstverständlich gehört hierzu eine saubere Wohnung. Teamgeist, Qualität und bestes Know-how machen uns zu Ihrem starken Partner.",
    features: [
      "Schneller Wechsel zwischen zwei Gästen",
      "Küchenausstattung desinfizieren & prüfen",
      "Bettwäsche- & Handtuchwechsel",
      "Endkontrolle & Checklisten-Protokoll",
      "Schlüsselübergabe-Unterstützung nach Absprache"
    ],
    image: bild("/manus-storage/afgOOxPThKeo_76986f5d.jpg"),
    iconName: "Home"
  },
  {
    id: "teppichreinigung",
    title: "Teppich- & Polsterreinigung",
    shortDesc: "Hygienische Tiefenreinigung gegen Flecken, Gerüche, Keime und Allergene.",
    fullDesc: "Abgewohnte und ungewaschene Teppiche vermitteln nicht nur einen schlechten Eindruck – sie können durch die Ansammlung von Keimen und Bakterien auch ein Gesundheitsrisiko darstellen.",
    features: [
      "Sprühextraktionsverfahren mit Tiefenwirkung",
      "Faserschonende Fleckenbehandlung",
      "Allergen- & Milbenentfernung",
      "Farbfrische-Reaktivierung",
      "Schnelle Trocknungszeiten"
    ],
    image: bild("/manus-storage/c11Cq6dwwpAu_b39b6734.jpg"),
    iconName: "Layers"
  },
  {
    id: "baureinigung",
    title: "Bau- & Endreinigung",
    shortDesc: "Baugrobreinigung und schlüsselfertige Baufeinreinigung vor der finalen Übergabe.",
    fullDesc: "Vom Neubau bis zur Sanierung: Wir befreien Baustellen von Grobschmutz, Farbspritzern, Zementschleiern und Feinstaub, sodass Ihr Objekt bezugsfertig glänzt.",
    features: [
      "Baugrobreinigung während der Bauphase",
      "Bauschluss- und Feinreinigung vor Übergabe",
      "Beseitigung von Mörtel-, Farb- und Kleberesten",
      "Reinigungsabnahme mit Bauherren & Architekten",
      "Verlässliche Termineinhaltung vor Bezug"
    ],
    image: bild("/manus-storage/QPImpFF6sPNS_e1968161.jpg"),
    iconName: "HardHat"
  },
  {
    id: "entruempelung",
    title: "Entrümpelungen & Hausbetreuung",
    shortDesc: "Besenreine Räumung von Keller bis Dachboden sowie ganzheitliche Hausmeisterdienste.",
    fullDesc: "Unser Unternehmen ist Ihr kompetenter Partner für diskrete, termintreue Entrümpelungen und fortlaufende Hausbetreuung im Tiroler Unterland.",
    features: [
      "Wohnungs- & Haushaltsauflösungen",
      "Gewerbliche Räumung von Lagern & Archiven",
      "Fachgerechte & zertifizierte Entsorgung",
      "Laufende Hausmeistertätigkeiten & Kontrollgänge",
      "Kleinreparaturen & Saisonpflege"
    ],
    image: bild("/manus-storage/W26I5SqCRoqZ_f8c2bf58.jpg"),
    iconName: "Truck"
  }
];

export const CKR_ADVANTAGES = [
  {
    title: "Langjährige Praxiserfahrung",
    description: "Ausgebildete Gebäudereiniger, die seit vielen Jahren eigenständig arbeiten und höchste Qualitätsstandards in Tirol etablieren.",
    icon: "Award"
  },
  {
    title: "Individuelle & Schnelle Lösungen",
    description: "Kein Standard von der Stange: In enger Abstimmung entwickeln wir flexible Reinigungspläne, die sich Ihrem Alltag anpassen.",
    icon: "Clock"
  },
  {
    title: "24-Stunden-Notdienst",
    description: "Rohrbruch, Wasserschaden, ein Termin, der morgen früh stehen muss: Sie erreichen uns direkt unter der angegebenen Nummer, ohne Warteschleife.",
    icon: "PhoneCall"
  },
  {
    title: "Lehrlingsausbildung mit Zukunft",
    description: "Als anerkannter Ausbildungsbetrieb schulen wir Fachkräfte von morgen fundiert in modernsten Arbeits- und Umwelttechniken.",
    icon: "GraduationCap"
  }
];

export const CKR_REVIEWS = [
  {
    author: "Markus Huber",
    role: "Geschäftsführer, Kufstein",
    content: "CKR betreut unsere Büroräume seit über zwei Jahren. Absolut verlässlich, pünktlich und blitzsauber. Auch die Glasreinigung im 3. Stock läuft immer reibungslos.",
    rating: 5,
    service: "Unterhalts- & Glasreinigung"
  },
  {
    author: "Claudia Eder",
    role: "Hausverwaltung Kitzbühel-Kufstein",
    content: "Die Treppenhausreinigung für unsere 4 Wohnanlagen funktioniert tadellos. Mieter und Eigentümer sind sehr zufrieden mit der Gründlichkeit und Höflichkeit der Mitarbeiter.",
    rating: 5,
    service: "Treppenhausreinigung"
  },
  {
    author: "Stefan Bichler",
    role: "Hotelier im Kaiserwinkl",
    content: "In der Hochsaison ist CKR unser Retter bei Zimmerwechseln und Sonderreinigungen der Wellnessbereiche. Schnelligkeit gepaart mit meisterlicher Sauberkeit!",
    rating: 5,
    service: "Hotel- & Wellnessreinigung"
  }
];

export const CKR_FAQ = [
  {
    q: "Wie schnell kann ein Reinigungsteam in Kufstein und Umgebung vor Ort sein?",
    a: "Bei regelmäßigen Verträgen starten wir flexibel nach Absprache. Für dringende Einsätze und Notfälle steht Ihnen unsere 24-Stunden-Hotline unter +43 650 8933881 zur Verfügung."
  },
  {
    q: "Bringen Sie Reinigungsmittel und professionelle Geräte selbst mit?",
    a: "Ja, selbstverständlich. Unser Team bringt moderne Hochleistungsgeräte und umweltfreundliche, materialschonende Profi-Reinigungsmittel direkt mit."
  },
  {
    q: "Welche Regionen in Österreich werden abgedeckt?",
    a: "Unser Schwerpunkt liegt im gesamten Bezirk Kufstein sowie Wörgl, Kitzbühel, Brixental, Schwaz und angrenzenden Regionen in Tirol."
  },
  {
    q: "Erhalte ich vorab ein unverbindliches Angebot?",
    a: "Ja. Nach einer kurzen Bedarfsanalyse oder einer unverbindlichen Objektbesichtigung vor Ort erstellen wir Ihnen ein transparentes, detailliertes Festpreisangebot."
  },
  {
    q: "Wer kommt zu mir?",
    a: "Festes Personal, keine wechselnden Aushilfen. Geschulte Objektleiter weisen das Team ein und kontrollieren die Arbeit regelmäßig. Weil unser Team mit Ihren Sachen in Berührung kommt, zählen bei der Auswahl Verantwortungsbewusstsein, Diskretion und Zuverlässigkeit."
  }
];
