import varianten from "@/data/bildvarianten.json";

/**
 * Aus einem Bildpfad die Angaben für <img src srcSet>.
 *
 * Zu jeder Aufnahme liegen WebP-Fassungen in mehreren Breiten bereit
 * (tools/bildvarianten.mjs). Der Browser nimmt über srcset die kleinste,
 * die für seinen Bildschirm reicht — die Angabe sizes am Bild sagt ihm,
 * wie breit es dort ungefähr erscheint.
 *
 * Gibt es für ein Bild keine Fassungen, bleibt es beim Original.
 */
const GRUND = import.meta.env.BASE_URL.replace(/\/$/, "");
const TABELLE = varianten as Record<string, number[]>;

export function bildquellen(pfad: string): { src: string; srcSet?: string } {
  const roh = GRUND && pfad.startsWith(GRUND) ? pfad.slice(GRUND.length) : pfad;
  const breiten = TABELLE[roh];
  if (!breiten || breiten.length === 0) return { src: pfad };
  const stamm = pfad.replace(/\.(jpe?g|png)$/i, "");
  return {
    src: `${stamm}-${breiten[breiten.length - 1]}.webp`,
    srcSet: breiten.map((b) => `${stamm}-${b}.webp ${b}w`).join(", "),
  };
}
