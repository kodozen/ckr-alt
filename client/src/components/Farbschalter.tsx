import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const SCHLUESSEL = "ckr-farbschema";

/**
 * Der Umschalter zwischen heller und dunkler Fassung.
 *
 * Die Entscheidung fällt schon im Kopf der Seite, bevor gezeichnet
 * wird — hier wird sie nur noch geändert und gemerkt. Wer nie
 * umgeschaltet hat, folgt weiter dem Gerät: stellt jemand sein Telefon
 * abends auf dunkel, wechselt die Seite mit. Erst ein Klick hier
 * entscheidet für diesen Browser dauerhaft.
 */
export default function Farbschalter({ knopfKlasse = "" }: { knopfKlasse?: string }) {
  const [dunkel, setDunkel] = useState(false);
  const [montiert, setMontiert] = useState(false);

  useEffect(() => {
    setDunkel(document.documentElement.classList.contains("dark"));
    setMontiert(true);

    const medium = window.matchMedia("(prefers-color-scheme: dark)");
    const beiWechsel = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(SCHLUESSEL)) return;
      } catch {
        /* ohne Speicher gilt einfach das Gerät */
      }
      document.documentElement.classList.toggle("dark", e.matches);
      setDunkel(e.matches);
    };
    medium.addEventListener("change", beiWechsel);
    return () => medium.removeEventListener("change", beiWechsel);
  }, []);

  const umschalten = () => {
    const neu = !dunkel;
    document.documentElement.classList.toggle("dark", neu);
    try {
      localStorage.setItem(SCHLUESSEL, neu ? "dunkel" : "hell");
    } catch {
      /* im privaten Fenster gilt die Wahl eben nur für diese Sitzung */
    }
    setDunkel(neu);
  };

  const beschriftung = dunkel
    ? "Zur hellen Darstellung wechseln"
    : "Zur dunklen Darstellung wechseln";

  return (
    <button
      type="button"
      onClick={umschalten}
      aria-label={beschriftung}
      aria-pressed={dunkel}
      title={beschriftung}
      className={knopfKlasse}
    >
      {/* Vor der Übernahme im Browser steht noch nicht fest, welches
          Zeichen gilt; solange bleibt die Fläche leer statt falsch. */}
      {montiert &&
        (dunkel ? (
          <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
        ))}
    </button>
  );
}
