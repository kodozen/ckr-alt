import { Link } from "wouter";
import { ArrowRight, ChevronRight, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Seitenrahmen from "@/components/Seitenrahmen";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ReviewsAndFaq from "@/components/ReviewsAndFaq";
import { DatenschutzText, ImpressumText } from "@/components/Rechtstexte";
import { CKR_INFO } from "@/data/ckrData";
import { TEXTSEITEN } from "@/seiten";

const seite = (pfad: string) => {
  const s = TEXTSEITEN.find((t) => t.pfad === pfad);
  if (!s) throw new Error(`Seite ${pfad} fehlt im Verzeichnis`);
  return s;
};

/** Kopfzeile mit Brotkrumen — auf jeder Unterseite gleich aufgebaut. */
function Aufschlag({ titel, text }: { titel: string; text?: string }) {
  return (
    <section className="bg-[#0c164a] py-14 sm:py-20">
      <div className="container">
        <nav aria-label="Brotkrumen" className="mb-5 text-xs text-slate-300">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-white">
                Startseite
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <li className="text-white">{titel}</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {titel}
        </h1>
        {text && (
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-200">{text}</p>
        )}
      </div>
    </section>
  );
}

export function ImpressumSeite() {
  const s = seite("/impressum/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag titel="Impressum" />
      <section className="bg-white py-14">
        <div className="container max-w-2xl">
          <ImpressumText />
        </div>
      </section>
    </Seitenrahmen>
  );
}

export function DatenschutzSeite() {
  const s = seite("/datenschutzerklaerung/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag titel="Datenschutzerklärung" />
      <section className="bg-white py-14">
        <div className="container max-w-2xl">
          <DatenschutzText />
        </div>
      </section>
    </Seitenrahmen>
  );
}

export function KontaktSeite() {
  const s = seite("/kontakt/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag
        titel="Kontakt"
        text="Rufen Sie an, schreiben Sie uns oder benutzen Sie das Formular weiter unten. Bei Havarie erreichen Sie uns rund um die Uhr."
      />
      <section className="bg-white py-14">
        <div className="container grid max-w-3xl gap-4 sm:grid-cols-3">
          <a
            href={`tel:${CKR_INFO.phoneRaw}`}
            className="rounded-2xl border border-slate-200 p-6 transition-colors hover:border-blue-200"
          >
            <Phone className="h-5 w-5 text-[#2E7D0E]" aria-hidden="true" />
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              Telefon
            </p>
            <p className="mt-1 font-extrabold text-[#122272]">{CKR_INFO.phone}</p>
          </a>
          <a
            href={`mailto:${CKR_INFO.email}`}
            className="rounded-2xl border border-slate-200 p-6 transition-colors hover:border-blue-200"
          >
            <Mail className="h-5 w-5 text-[#2E7D0E]" aria-hidden="true" />
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              E-Mail
            </p>
            <p className="mt-1 font-bold break-words text-[#122272]">
              {CKR_INFO.email}
            </p>
          </a>
          <div className="rounded-2xl border border-slate-200 p-6">
            <MapPin className="h-5 w-5 text-[#2E7D0E]" aria-hidden="true" />
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              Büro
            </p>
            <p className="mt-1 text-sm text-slate-700">{CKR_INFO.officeAddress}</p>
          </div>
        </div>
      </section>
    </Seitenrahmen>
  );
}

export function AngebotSeite() {
  const s = seite("/angebot-anfordern/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag
        titel="Angebot anfordern"
        text="Sagen Sie uns, um welches Objekt es geht. Wir sehen es uns kostenlos an und schreiben danach ein verbindliches Angebot."
      />
      <section className="bg-white py-14">
        <div className="container max-w-2xl">
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["Sie schreiben uns", "Formular, Anruf oder WhatsApp — was Ihnen lieber ist."],
              ["Wir sehen uns das Objekt an", "Kostenlos, unverbindlich, zu einem Termin, der Ihnen passt."],
              ["Sie bekommen ein Angebot", "Schriftlich und nach Positionen aufgeschlüsselt."],
            ].map(([titel, text], i) => (
              <li key={titel} className="rounded-2xl border border-slate-200 p-5">
                <span className="text-2xl font-extrabold text-[#122272]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-bold text-slate-900">{titel}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-slate-600">
            Das Formular steht direkt darunter.
          </p>
        </div>
      </section>
    </Seitenrahmen>
  );
}

export function StellenSeite() {
  const s = seite("/stellenanzeigen/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag
        titel="Ausbildung & Stellen"
        text="Wir bilden aus und suchen laufend Verstärkung im Bezirk Kufstein."
      />
      <section className="bg-white py-14">
        <div className="container max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <GraduationCap className="h-6 w-6 text-[#2E7D0E]" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-extrabold text-[#122272]">
              Lehrstelle Gebäudereiniger/in
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Als anerkannter Ausbildungsbetrieb bilden wir Fachkräfte in
              modernen Arbeits- und Umwelttechniken aus. Du lernst bei Leuten,
              die den Beruf seit Jahren machen, und arbeitest vom ersten Jahr an
              an echten Objekten mit.
            </p>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              "Reinigungskraft (Teilzeit)",
              "Reinigungskraft (Vollzeit)",
              "Vorarbeiter/in / Objektleitung",
            ].map((stelle) => (
              <li
                key={stelle}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-bold text-slate-900"
              >
                {stelle}
              </li>
            ))}
          </ul>

          <Link
            href="/ihre-bewerbung/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#122272] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            Jetzt bewerben
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Seitenrahmen>
  );
}

export function BewerbungSeite() {
  const s = seite("/ihre-bewerbung/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag
        titel="Ihre Bewerbung"
        text="Schreiben Sie uns kurz, wofür Sie sich bewerben — im Formular unten oder direkt per E-Mail."
      />
      <section className="bg-white py-14">
        <div className="container max-w-2xl">
          <p className="text-sm leading-relaxed text-slate-700">
            Im Formular weiter unten schalten Sie oben auf{" "}
            <strong>Bewerbung / Lehrstelle</strong> um. Lieber per E-Mail?
            Schicken Sie Ihren Lebenslauf an{" "}
            <a
              href={`mailto:${CKR_INFO.email}`}
              className="font-bold text-[#122272] underline"
            >
              {CKR_INFO.email}
            </a>
            .
          </p>
        </div>
      </section>
    </Seitenrahmen>
  );
}

/**
 * Die drei Seiten, auf die die Startseite ausgelagert hat.
 *
 * Sie zeigen jeweils denselben Abschnitt wie vorher, nur vollständig:
 * die Startseite reicht nur noch einen Ausschnitt und einen Verweis.
 */
export function LeistungenSeite() {
  const s = seite("/leistungen/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag
        titel="Alle Leistungen"
        text="Zwölf Bereiche, ein Ansprechpartner. Öffnen Sie einen Bereich, um zu sehen, was dazugehört."
      />
      <ServicesSection />
    </Seitenrahmen>
  );
}

export function UeberUnsSeite() {
  const s = seite("/ueber-uns/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag titel="Über uns" />
      <AboutSection />
    </Seitenrahmen>
  );
}

export function FragenSeite() {
  const s = seite("/haeufige-fragen/");
  return (
    <Seitenrahmen seite={s}>
      <Aufschlag
        titel="Häufige Fragen"
        text="Die Fragen, die uns am häufigsten gestellt werden — und die Antworten darauf."
      />
      <ReviewsAndFaq ohneBewertungen />
    </Seitenrahmen>
  );
}
