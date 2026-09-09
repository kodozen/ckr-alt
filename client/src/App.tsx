import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


// Die Vorschau liegt unter kodozen.github.io/ckr-alt/. Ohne diesen
// Grundpfad sucht der Router nach der Route "/ckr-alt/", findet sie
// nicht und zeigt die 404-Seite — die Seite baut und lädt, sieht aber
// aus, als gäbe es sie nicht. Der Wert kommt aus derselben Variable
// wie base in vite.config.ts; für eine eigene Domain fällt er weg.
const GRUNDPFAD = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <WouterRouter base={GRUNDPFAD}>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
