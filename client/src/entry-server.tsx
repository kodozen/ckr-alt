import { renderToString } from "react-dom/server";
import { memoryLocation } from "wouter/memory-location";
import App from "./App";
import { ALLE_SEITEN } from "./seiten";

/**
 * Einstieg für das Vorrendern beim Bauen.
 *
 * Im Browser liest der Router die Adresse aus der Adresszeile. Beim Bauen
 * gibt es keine — deshalb bekommt er sie hier vorgegeben, einmal je Seite.
 * Der Grundpfad steckt schon im Router der Anwendung; hereingereicht wird
 * die Adresse ohne ihn, also "/kontakt/" und nicht "/ckr-alt/kontakt/".
 */
export function rendern(adresse: string): string {
  const { hook } = memoryLocation({ path: adresse, static: true });
  return renderToString(<App hook={hook} />);
}

/** Das Werkzeug beim Bauen liest die Liste der Adressen hier heraus. */
export { ALLE_SEITEN };
