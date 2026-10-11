import { createRoot, hydrateRoot } from "react-dom/client";
// Die Schriften liegen jetzt bei der Seite selbst. Vorher kamen sie von
// Google: ein zweiter Server, eine eigene Stilvorlage, die das erste Bild
// um fast eine Sekunde aufhielt, und danach erst die Schriftdateien.
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/outfit";
import App from "./App";
import "./index.css";

const wurzel = document.getElementById("root")!;

// Jede Seite kommt fertig gerendert an. createRoot hat dieses HTML bisher
// weggeworfen und alles noch einmal gezeichnet — auch das Aufmacherbild,
// das dadurch erst nach dem Programm als "größtes Element" zählte.
// hydrateRoot übernimmt, was schon da ist. Nur im Entwicklungsserver,
// wo der Container leer ankommt, wird neu gezeichnet.
if (wurzel.hasChildNodes()) {
  hydrateRoot(wurzel, <App />);
} else {
  createRoot(wurzel).render(<App />);
}
