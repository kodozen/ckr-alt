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
  /** Nur wenn der Kopf der Leistungsseite eine andere Aufnahme trägt als
      die Kachel auf der Startseite. */
  bildSeite?: string;
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
  experienceYears: "10+",
  clientsSatisfied: "500+",
  coverageArea: "Bezirk Kufstein, Wörgl, Kitzbühel, Schwaz & Umgebung (Tirol)",
  logo: bild("/manus-storage/ckr-logo-original_a1e7247c.png"),
  meisterSiegel: bild("/meisterbetrieb-siegel.jpg"),
  heroImage: bild("/manus-storage/G1jT57jzwtmc_8fc296a6.jpg"),
  teamImage: bild("/manus-storage/afgOOxPThKeo_76986f5d.jpg"),
  detailImageOffice: bild("/manus-storage/QPImpFF6sPNS_e1968161.jpg"),
  detailImageCare: bild("/fotos/band-unterhalt.jpg"),
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
      "Werkstätten und Betriebsräume",
      "Mülltrennung & fachgerechte Entsorgung",
      "Küchen- und Pausenraumpflege"
    ],
    image: bild("/fotos/unterhaltsreinigung.jpg"),
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
    image: bild("/fotos/treppenhausreinigung.jpg"),
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
    image: bild("/fotos/grundreinigung.jpg"),
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
    id: "fenster-und-fassadenreinigung",
    title: "Fenster- & Fassadenreinigung",
    shortDesc: "Fassaden, Glasfronten und Außenanlagen — gereinigt mit dem Verfahren, das der jeweilige Werkstoff verträgt.",
    fullDesc: "Eine Fassade wird von außen beurteilt, lange bevor jemand das Gebäude betritt. Putz, Klinker, Glas, Metall und beschichtete Flächen vertragen sehr Unterschiedliches: Was den einen Werkstoff säubert, trägt beim nächsten die Oberfläche ab. Wir wählen Druck, Temperatur und Mittel nach dem Untergrund und arbeiten bei Höhen mit gesicherter Ausrüstung.",
    features: [
      "Fassadenreinigung nach Werkstoff und Verschmutzung",
      "Glasfronten und Eingangsbereiche",
      "Entfernung von Algen, Moos und Grauschleier",
      "Dach- und Solaranlagenreinigung",
      "Balkone, Geländer und Vordächer",
      "Gesicherte Höhenarbeit mit geeigneter Ausrüstung"
    ],
    image: bild("/manus-storage/G1jT57jzwtmc_8fc296a6.jpg"),
    iconName: "Building2"
  },
  {
    id: "hotelreinigung",
    title: "Hotel- & Pensionsreinigung",
    shortDesc: "Sauberkeit, wie Gäste in Tiroler Häusern sie erwarten — Zimmer, Suiten, Gastronomie und Wellnessbereich.",
    fullDesc: "Wir übernehmen alle Reinigungsleistungen von der täglichen Zimmerreinigung über topmoderne Reinigungen für Pools und Wellnessanlagen bis hin zu Sonderreinigungen.",
    features: [
      "Tägliche Hotelzimmer- und Suitenreinigung",
      "Wellness-, Sauna- und Poolbereich",
      "Empfangsbereich, Gänge und Konferenzräume",
      "Wäscheservice-Koordination & Turn-down",
      "Zusätzliche Kräfte in der Hochsaison"
    ],
    image: bild("/manus-storage/56GiyVpVX1CN_7c5868d9.jpg"),
    bildSeite: bild("/fotos/hotel-kopf.jpg"),
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
    image: bild("/fotos/teppichreinigung.jpg"),
    iconName: "Layers"
  },
  {
    id: "baureinigung-endreinigung",
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
    id: "verkehrsmittelreinigung",
    title: "Verkehrsmittelreinigung",
    shortDesc: "Straßenbahnen, Züge und Busse — gereinigt im Umlauf oder nachts im Depot, nach Ihrem Fahrplan.",
    fullDesc: "Verkehrsmittel sind die Arbeit mit dem engsten Zeitfenster: zwischen zwei Umläufen bleiben oft wenige Minuten, nachts steht dafür das ganze Depot zur Verfügung. Beides verlangt eine andere Planung als ein Bürogebäude. Wir arbeiten nach Ihrem Dienstplan — Unterhaltsreinigung im Umlauf, Grundreinigung in der Nacht oder an Standtagen.",
    features: [
      "Innenreinigung im Umlauf",
      "Grundreinigung nachts und an Standtagen",
      "Sitze, Polster und Haltestangen",
      "Böden und Einstiegsbereiche",
      "Scheiben innen und außen",
      "Sonderreinigung nach Vorfällen"
    ],
    image: bild("/manus-storage/W26I5SqCRoqZ_f8c2bf58.jpg"),
    iconName: "Truck"
  },
  {
    id: "denkmalreinigung",
    title: "Denkmalreinigung",
    shortDesc: "Historische Substanz verträgt keine Routine — geprüft, getestet, dann erst gereinigt.",
    fullDesc: "An denkmalgeschützter Substanz ist der stärkste Reiniger immer der falsche: Was einmal abgetragen ist, kommt nicht zurück. Jede Fläche wird vorher geprüft und das Verfahren an einer unauffälligen Stelle getestet, bevor großflächig gearbeitet wird. Wo Auflagen der Denkmalbehörde bestehen, richten wir uns danach und stimmen uns mit den Verantwortlichen ab. Das dauert länger — bei einem Gebäude, das seit dreihundert Jahren steht, ist das die richtige Reihenfolge.",
    features: [
      "Naturstein und historischer Putz",
      "Sichtziegel und Sichtbeton",
      "Schonende Verfahren mit geringem Druck",
      "Probefläche vor der Ausführung",
      "Grünbelag- und Krustenentfernung",
      "Abstimmung mit den Auflagen der Behörde"
    ],
    image: bild("/manus-storage/c11Cq6dwwpAu_b39b6734.jpg"),
    iconName: "ShieldCheck"
  },
  {
    id: "entruempelung-hausbetreuung",
    title: "Entrümpelungen & Hausbetreuung",
    shortDesc: "Besenreine Räumung von Keller bis Dachboden sowie ganzheitliche Hausmeisterdienste.",
    fullDesc: "Unser Unternehmen ist Ihr kompetenter Partner für diskrete, termintreue Entrümpelungen und fortlaufende Hausbetreuung im Tiroler Unterland.",
    features: [
      "Wohnungs- & Haushaltsauflösungen",
      "Gewerbliche Räumung von Lagern & Archiven",
      "Fachgerechte Entsorgung über befugte Entsorgungsbetriebe",
      "Laufende Hausmeistertätigkeiten & Kontrollgänge",
      "Kleinreparaturen & Saisonpflege"
    ],
    image: bild("/fotos/entruempelung-hausbetreuung.jpg"),
    iconName: "Truck"
  }
];

export const CKR_ADVANTAGES = [
  {
    title: "Langjährige Praxiserfahrung",
    description: "Ausgebildete Gebäudereiniger, die seit vielen Jahren eigenständig arbeiten und wissen, worauf es bei jedem Objekt ankommt.",
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

// Bewertungen: nur, was nachweislich jemand geschrieben hat.
//
// Hier standen drei erfundene Stimmen mit erfundenen Namen. Sie sind
// ersatzlos gestrichen. In Österreich ist es seit der Umsetzung der
// Omnibus-Richtlinie (§ 2 Abs. 6 UWG, Anhang Z23b) eine unlautere
// Geschäftspraktik, Bewertungen zu zeigen, ohne sagen zu können, woher
// sie stammen — erfundene Stimmen sind es ohnehin.
//
// Deshalb trägt jeder Eintrag Quelle, Datum und Fundstelle. Neue
// Bewertungen bitte nur wortgetreu übernehmen und die Fundstelle
// mitliefern; nichts glätten, nichts ergänzen.
export interface Bewertung {
  autor: string;
  text: string;
  datum: string;
  quelle: string;
  quelleUrl: string;
  sterne: number;
}

export const CKR_REVIEWS: Bewertung[] = [
  {
    autor: "ferityakup",
    text: "Sehr zuverlässig und freundlich. Immer abrufbereit und auch kurzfristige Einsätze machbar. Sehr gute Arbeit!",
    datum: "26. April 2018",
    quelle: "HEROLD",
    quelleUrl: "https://www.herold.at/",
    sterne: 5,
  },
];

// Die Gesamtwertungen der Portale, an denen CKR geführt wird. Sie sind
// nachprüfbar, weil jeder dem Verweis folgen kann — anders als eine Zahl,
// die nur auf der eigenen Seite steht.
//
// Bewusst NICHT als aggregateRating in den strukturierten Daten: eine
// Sternebewertung, die sich ein Betrieb auf der eigenen Seite selbst
// ausstellt, wertet Google als Verstoß gegen seine Richtlinien.
export const CKR_BEWERTUNGSQUELLEN = [
  {
    portal: "Google",
    wertung: "5,0",
    anzahl: 6,
    url: "https://www.google.com/search?q=CKR+Cleaning+Services+Geb%C3%A4udereinigung+Kufstein",
  },
  {
    portal: "HEROLD",
    wertung: "5,0",
    anzahl: 3,
    url: "https://www.herold.at/",
  },
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
    a: "Ja. Nach einer kurzen Bedarfsanalyse oder einer unverbindlichen Besichtigung vor Ort erhalten Sie ein schriftliches, nach Positionen aufgeschlüsseltes Angebot. Es ist kostenlos und verpflichtet Sie zu nichts."
  },
  {
    q: "Wer kommt zu mir?",
    a: "Festes Personal, keine wechselnden Aushilfen. Geschulte Objektleiter weisen das Team ein und kontrollieren die Arbeit regelmäßig. Weil unser Team mit Ihren Sachen in Berührung kommt, zählen bei der Auswahl Verantwortungsbewusstsein, Diskretion und Zuverlässigkeit."
  }
];
