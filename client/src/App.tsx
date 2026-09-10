import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Leistung from "./pages/Leistung";
import {
  AngebotSeite,
  FragenSeite,
  LeistungenSeite,
  UeberUnsSeite,
  BewerbungSeite,
  DatenschutzSeite,
  ImpressumSeite,
  KontaktSeite,
  StellenSeite,
} from "./pages/Textseiten";
import { LEISTUNGSSEITEN } from "./seiten";


// Die Vorschau liegt unter kodozen.github.io/ckr-alt/. Ohne diesen
// Grundpfad sucht der Router nach der Route "/ckr-alt/", findet sie
// nicht und zeigt die 404-Seite — die Seite baut und lädt, sieht aber
// aus, als gäbe es sie nicht. Der Wert kommt aus derselben Variable
// wie base in vite.config.ts; für eine eigene Domain fällt er weg.
const GRUNDPFAD = import.meta.env.BASE_URL.replace(/\/$/, "");

// Beim Vorrendern gibt es keine Adresszeile, aus der der Router lesen
// könnte. wouter nimmt dafür ssrPath; im Browser bleibt der Parameter
// leer und es gilt wieder window.location.
//
// ssrPath ist die vollständige Adresse, so wie sie in der Adresszeile
// stünde — der Grundpfad gehört also davor. Ohne ihn liegt "/kontakt/"
// für den Router außerhalb von base, keine Route greift, und
// herausgerendert wird eine leere Hülle.
function Router({ ssrPfad }: { ssrPfad?: string }) {
  return (
    <WouterRouter
      base={GRUNDPFAD}
      ssrPath={ssrPfad ? GRUNDPFAD + ssrPfad : undefined}
    >
      <Switch>
        <Route path="/" component={Home} />

        {/* Die Leistungsseiten kommen aus dem Verzeichnis, nicht aus einer
            zweiten Liste hier — sonst gäbe es irgendwann eine Seite, die
            gebaut wird, aber keine Route hat. */}
        {LEISTUNGSSEITEN.map((s) => {
          const id = s.pfad.replace(/\//g, "");
          return (
            <Route key={s.pfad} path={s.pfad}>
              <Leistung id={id} />
            </Route>
          );
        })}

        <Route path="/leistungen/" component={LeistungenSeite} />
        <Route path="/ueber-uns/" component={UeberUnsSeite} />
        <Route path="/haeufige-fragen/" component={FragenSeite} />
        <Route path="/kontakt/" component={KontaktSeite} />
        <Route path="/angebot-anfordern/" component={AngebotSeite} />
        <Route path="/stellenanzeigen/" component={StellenSeite} />
        <Route path="/ihre-bewerbung/" component={BewerbungSeite} />
        <Route path="/impressum/" component={ImpressumSeite} />
        <Route path="/datenschutzerklaerung/" component={DatenschutzSeite} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App({ ssrPfad }: { ssrPfad?: string } = {}) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          {/* sonner beschriftet seinen Meldungsbereich sonst englisch
              ("Notifications alt+T") — auf einer deutschen Seite hört das
              ein Screenreader-Nutzer als Fremdkörper. */}
          <Toaster
            containerAriaLabel="Meldungen"
            toastOptions={{ closeButton: false }}
          />
          <Router ssrPfad={ssrPfad} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
