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

    // Der Grundpfad gehört in die Adresse.
    //
    // Vorher stand hier new URL(seite.pfad, origin + BASE_URL). Weil
    // seite.pfad mit einem Schrägstrich beginnt, wirft der URL-Aufbau den
    // Unterordner weg: aus "/ckr-alt/" und "/kontakt/" wurde "/kontakt/".
    // Das Vorrendern schrieb die richtige Adresse in die Datei, und der
    // Browser überschrieb sie eine Zehntelsekunde später mit einer, die es
    // nicht gibt. Eine Messung liest den Zustand danach — und wertete das
    // canonical als ungültig.
    const grundpfad = import.meta.env.BASE_URL.replace(/\/$/, "");
    const kanonisch = document.head.querySelector('link[rel="canonical"]');
    const adresse = kanonisch
      ? new URL(grundpfad + seite.pfad, kanonisch.getAttribute("href") ?? location.href).toString()
      : null;

    if (kanonisch && adresse) kanonisch.setAttribute("href", adresse);
    if (adresse) setzen('meta[property="og:url"]', "content", adresse);

  }, [seite]);
}
