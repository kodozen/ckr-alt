# CKR — alternativer Entwurf

Zweiter Entwurf für die Website der **CKR Cleaning Services**, Kufstein,
erstellt mit einem anderen Werkzeug (React, Vite, Tailwind, shadcn/ui).
Er liegt hier, damit er dem Kunden neben unserem Entwurf gezeigt werden
kann.

**Das ist eine Vorführung, keine veröffentlichte Website.** Sie trägt
`noindex` und eine sperrende `robots.txt`.

Unser eigener Entwurf: <https://github.com/kodozen/ckr>

## Was gegenüber dem Paket geändert wurde

Zwei Dinge, sonst nichts — der Entwurf soll bleiben, wie er ist.

1. **Bilder ergänzt.** Im Paket war kein einziges: alle Aufnahmen lagen
   hinter `/manus-storage/…` und damit auf einem fremden Server, der
   ohne das Werkzeug nicht erreichbar ist. Ohne Ersatz wäre die
   Vorführung eine Seite voller grauer Kästen. Eingesetzt sind die
   Aufnahmen aus unserem Entwurf, unter exakt denselben Dateinamen —
   so musste am Code nichts angefasst werden.
2. **`base` in `vite.config.ts`**, weil die Seite unter einem
   Unterordner liegt. Ohne das zeigen alle erzeugten Pfade auf die
   Wurzel des Kontos.

## Bauen

```sh
pnpm install
pnpm exec vite build      # Ergebnis in dist/public
```

Auf GitHub baut das der Ablauf in `.github/workflows/pages.yml` bei
jedem Push selbst.
