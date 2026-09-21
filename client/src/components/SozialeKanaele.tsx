import { CKR_INFO } from "@/data/ckrData";

/**
 * Instagram und Facebook von CKR.
 *
 * Die beiden Konten standen bisher nur in den strukturierten Daten —
 * Google kannte sie, ein Besucher nicht. Die Symbole sind eingebettet
 * statt aus lucide geholt: dessen Markenzeichen sind als veraltet
 * markiert und fallen in einer der nächsten Fassungen weg.
 */
export default function SozialeKanaele({
  className = "",
  farbig = false,
  knopfKlasse = "h-11 w-11 rounded-lg",
}: {
  className?: string;
  /** Im Kopf stehen die Symbole in den Farben der Dienste, damit sie
      neben dem grünen WhatsApp-Knopf als Reihe erkennbar sind. Sonst
      bleiben sie zurückhaltend. */
  farbig?: boolean;
  knopfKlasse?: string;
}) {
  const kanaele = [
    {
      name: "Instagram",
      href: CKR_INFO.instagram,
      markenKlasse:
        "bg-gradient-to-br from-[#C13584] to-[#833AB4] text-white hover:from-[#A82C6F] hover:to-[#6C2F93]",
      symbol: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: CKR_INFO.facebook,
      markenKlasse: "bg-[#1877F2] text-white hover:bg-[#0F5FCB]",
      symbol: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
        </svg>
      ),
    },
  ];

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {kanaele.map((k) => (
        <li key={k.name}>
          <a
            href={k.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`CKR auf ${k.name}`}
            title={`CKR auf ${k.name}`}
            className={`inline-flex items-center justify-center transition-colors ${knopfKlasse} ${
              farbig
                ? k.markenKlasse
                : "bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white"
            }`}
          >
            {k.symbol}
          </a>
        </li>
      ))}
    </ul>
  );
}
