import { renderToString } from "react-dom/server";
import App from "./App";
import { ALLE_SEITEN } from "./seiten";

/**
 * Einstieg für das Vorrendern beim Bauen.
 *
 * Im Browser liest der Router die Adresse aus der Adresszeile. Beim Bauen
 * gibt es keine — wouter nimmt dafür ssrPath. Ein eigener Haken über
 * memoryLocation ginge auch, scheitert aber an useSyncExternalStore:
 * ohne getServerSnapshot bricht React beim Serverrendern ab.
 *
 * Hereingereicht wird die Adresse ohne den Grundpfad, also "/kontakt/"
 * und nicht "/ckr-alt/kontakt/" — den setzt der Router selbst davor.
 */
export function rendern(adresse: string): string {
  return renderToString(<App ssrPfad={adresse} />);
}

/** Das Werkzeug beim Bauen liest die Liste der Adressen hier heraus. */
export { ALLE_SEITEN };
