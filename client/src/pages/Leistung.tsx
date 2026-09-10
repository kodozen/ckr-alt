import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import Seitenrahmen from "@/components/Seitenrahmen";
import { CKR_INFO, CKR_SERVICES } from "@/data/ckrData";
import { LEISTUNGSSEITEN } from "@/seiten";
import { pfad } from "@/lib/pfade";
import NotFound from "@/pages/NotFound";

/**
 * Eine Seite je Leistung.
 *
 * Der Text stand vorher in einem Fenster auf der Startseite. Ein Fenster
 * hat keine Adresse: es lässt sich nicht verlinken, nicht weitergeben und
 * von einer Suchmaschine nicht als eigene Seite führen. Dieselben Inhalte
 * unter der Adresse, unter der die laufende Seite sie seit Jahren führt,
 * sind dagegen genau das, wonach jemand sucht, der "Treppenhausreinigung
 * Kufstein" eingibt.
 */
export default function Leistung({ id }: { id: string }) {
  const leistung = CKR_SERVICES.find((l) => l.id === id);
  const seite = LEISTUNGSSEITEN.find((s) => s.pfad === `/${id}/`);

  if (!leistung || !seite) return <NotFound />;

  const andere = CKR_SERVICES.filter((l) => l.id !== id).slice(0, 3);

  return (
    <Seitenrahmen seite={seite} vorauswahl={leistung.title}>
      {/* Aufmacher mit der Aufnahme der Leistung */}
      <section className="relative isolate overflow-hidden bg-[#070d2e]">
        <img
          src={leistung.bildSeite ?? leistung.image}
          alt=""
          width={1200}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Vorher lag über der Aufnahme zweierlei: opacity-40 auf dem Bild
            und darüber ein fast deckender Verlauf. Zusammen war vom Motiv
            kaum etwas übrig — blau, und darunter zu ahnen, was gemeint war.
            Jetzt trägt nur noch der Verlauf, und der ist gerichtet: dicht
            links, wo die Schrift steht, offen rechts, wo das Bild zu sehen
            sein soll.

            Auf schmalen Bildschirmen läuft die Schrift über die volle
            Breite; dort liegt zusätzlich eine gleichmäßige Decke, die ab
            sm wieder verschwindet. */}
        <div className="absolute inset-0 bg-[#070d2e]/55 sm:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d2e]/95 via-[#070d2e]/70 to-[#070d2e]/15" />

        <div className="container relative z-10 py-16 sm:py-24">
          <nav aria-label="Brotkrumen" className="mb-6 text-xs text-slate-300">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-white">
                  Startseite
                </Link>
              </li>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <li className="text-white">{leistung.title}</li>
            </ol>
          </nav>

          {leistung.badge && (
            <span className="mb-3 inline-block rounded-full bg-[#2E7D0E] px-3 py-1 text-xs font-bold text-white">
              {leistung.badge}
            </span>
          )}

          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {leistung.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
            {leistung.shortDesc}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/angebot-anfordern/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D0E] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
            >
              Angebot anfordern
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${CKR_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>

      {/* Beschreibung und Umfang */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#122272] sm:text-3xl">
              Was wir für Sie tun
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {leistung.fullDesc}
            </p>

            <h3 className="mt-10 text-xs font-bold uppercase tracking-wider text-slate-500">
              Im Leistungsumfang enthalten
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {leistung.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200/60 bg-slate-50 p-3 text-sm text-slate-800"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D0E]"
                    aria-hidden="true"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-bold text-[#122272]">
                Kostenlose Besichtigung
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Wir sehen uns Ihr Objekt an und schreiben danach ein
                verbindliches Angebot. Die Besichtigung kostet nichts und
                verpflichtet Sie zu nichts.
              </p>
              <Link
                href="/angebot-anfordern/"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#122272] hover:text-[#2E7D0E]"
              >
                Angebot anfordern
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-bold text-[#122272]">
                Lieber gleich sprechen?
              </p>
              <a
                href={`tel:${CKR_INFO.phoneRaw}`}
                className="mt-2 block text-lg font-extrabold text-[#122272] hover:text-[#2E7D0E]"
              >
                {CKR_INFO.phone}
              </a>
              <p className="mt-1 text-xs text-slate-600">
                Rund um die Uhr erreichbar, auch bei Havarie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weitere Leistungen */}
      <section className="bg-[#f6f7fb] py-16">
        <div className="container">
          <h2 className="text-xl font-extrabold tracking-tight text-[#122272]">
            Weitere Leistungen
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {andere.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/${l.id}/`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-lg"
                >
                  <span className="font-bold text-slate-900 group-hover:text-[#122272]">
                    {l.title}
                  </span>
                  <span className="mt-2 line-clamp-2 text-xs text-slate-600">
                    {l.shortDesc}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#122272]">
                    Ansehen
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Seitenrahmen>
  );
}

export { pfad };
