/**
 * Adressen zusammensetzen.
 *
 * Die Vorschau liegt unter kodozen.github.io/ckr-alt/, die fertige Seite
 * wird an der Wurzel ihrer eigenen Domain liegen. Ein fest verdrahtetes
 * "/kontakt/" zeigt in der Vorschau ins Leere. BASE_URL kennt den
 * Unterordner; alles andere ergibt sich daraus.
 */
export const GRUNDPFAD = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Aus "/kontakt/" wird "/ckr-alt/kontakt/" — oder "/kontakt/". */
export function pfad(adresse: string): string {
  return GRUNDPFAD + adresse;
}

/** Ein Sprungziel auf der Startseite, von jeder Seite aus erreichbar. */
export function startAnker(anker: string): string {
  return `${GRUNDPFAD}/#${anker}`;
}
