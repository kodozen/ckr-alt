import { useEffect } from "react";
import type { SeitenEintrag } from "@/seiten";

/**
 * Titel und Kurzbeschreibung der Seite setzen.
 *
 * Beim Bauen schreibt das Vorrender-Werkzeug diese Angaben fest in jede
 * HTML-Datei; eine Suchmaschine liest sie also, ohne ein Skript
 * auszuführen. Dieser Haken ist für den zweiten Fall zuständig: wenn
 * jemand im Browser von Seite zu Seite klickt, ohne dass neu geladen
 * wird. Ohne ihn bliebe im Reiter der Titel der zuerst geöffneten Seite
 * stehen.
 */
export function useKopf(seite: SeitenEintrag) {
  useEffect(() => {
    document.title = seite.titel;

    const setzen = (auswahl: string, attribut: string, wert: string) => {
      const el = document.head.querySelector(auswahl);
      if (el) el.setAttribute(attribut, wert);
    };

    setzen('meta[name="description"]', "content", seite.beschreibung);
    setzen('meta[property="og:title"]', "content", seite.titel);
    setzen('meta[property="og:description"]', "content", seite.beschreibung);

    const kanonisch = document.head.querySelector('link[rel="canonical"]');
    if (kanonisch) {
      const wurzel = kanonisch.getAttribute("href")?.replace(/\/[^/]*$/, "") ?? "";
      // Nur der Pfad wechselt, die Domain bleibt, wie sie beim Bauen
      // gesetzt wurde.
      try {
        const url = new URL(kanonisch.getAttribute("href") ?? "", location.href);
        url.pathname = new URL(seite.pfad, location.origin + import.meta.env.BASE_URL).pathname;
        kanonisch.setAttribute("href", url.toString());
      } catch {
        void wurzel;
      }
    }
  }, [seite]);
}
