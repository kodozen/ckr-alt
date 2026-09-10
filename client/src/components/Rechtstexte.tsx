import { CKR_INFO } from "@/data/ckrData";

/**
 * Die Rechtstexte stehen hier und nicht im Fuß.
 *
 * Sie werden an zwei Stellen gebraucht: im Fenster, das der Fuß öffnet,
 * und auf den eigenen Seiten /impressum/ und /datenschutzerklaerung/.
 * Zweimal derselbe Text an zwei Orten hieße, dass irgendwann nur einer
 * davon gepflegt wird — und bei einem Impressum ist der veraltete der
 * teure. Deshalb: eine Quelle, zwei Verwendungen.
 */

export function ImpressumText() {
  return (
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
      <div>
        <strong>Angaben gemäß § 5 ECG und § 25 MedienG:</strong>
        <p>{CKR_INFO.owner}</p>
        <p>{CKR_INFO.legalName}</p>
        <p>{CKR_INFO.officialAddress}</p>
      </div>

      <div>
        <strong>Büro & Kundenkontakt:</strong>
        <p>{CKR_INFO.officeAddress}</p>
        <p>Telefon: {CKR_INFO.phone}</p>
        <p>E-Mail: {CKR_INFO.email}</p>
      </div>

      <div>
        <strong>Umsatzsteuer-Identifikationsnummer:</strong>
        <p>UID-Nummer: <strong>{CKR_INFO.uid}</strong></p>
      </div>

      <div>
        <strong>Geschäftsführung:</strong>
        <p>{CKR_INFO.owner}</p>
      </div>

      <div>
        <strong>Unternehmensgegenstand:</strong>
        <p>Gebäudereinigung (Denkmal-, Fassaden- und Gebäudereinigung)</p>
      </div>

      <div>
        <strong>Gewerbebehörde:</strong>
        <p>Bezirkshauptmannschaft Kufstein</p>
      </div>

      <div>
        <strong>Kammerzugehörigkeit:</strong>
        <p>
          Wirtschaftskammer Tirol, Landesinnung der Gebäudereiniger
        </p>
      </div>

      <div>
        <strong>Anwendbare Rechtsvorschrift:</strong>
        <p>
          Gewerbeordnung 1994, abrufbar unter
          <a
            href="https://www.ris.bka.gv.at"
            target="_blank"
            rel="noreferrer"
            className="text-[#122272] underline ml-1"
          >
            www.ris.bka.gv.at
          </a>
        </p>
      </div>

      <div>
        <strong>EU-Streitschlichtung:</strong>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noreferrer"
            className="text-[#122272] underline ml-1"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
      </div>
    </div>
  );
}

export function DatenschutzText() {
  return (
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
      <p>
        Wir verarbeiten personenbezogene Daten nach der
        Datenschutz-Grundverordnung (DSGVO) und dem österreichischen
        Datenschutzgesetz (DSG).
      </p>

      <div>
        <strong>Verantwortlicher:</strong>
        <p>{CKR_INFO.legalName}</p>
        <p>{CKR_INFO.officialAddress}</p>
        <p>
          {CKR_INFO.phone} · {CKR_INFO.email}
        </p>
      </div>

      <div>
        <strong>Wenn Sie das Anfrageformular benutzen:</strong>
        <p>
          Das Formular überträgt nichts an uns. Es öffnet Ihr eigenes
          E-Mail-Programm mit einer vorbereiteten Nachricht — abgeschickt
          wird sie erst, wenn Sie es dort selbst tun. Bis dahin bleiben
          Ihre Eingaben in Ihrem Browser und erreichen uns nicht.
        </p>
      </div>

      <div>
        <strong>Wenn Sie uns schreiben oder anrufen:</strong>
        <p>
          Wir verarbeiten Ihre Angaben, um Ihre Anfrage zu beantworten
          und ein Angebot zu erstellen. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. b DSGVO (vorvertragliche Maßnahmen) beziehungsweise
          lit. f (unser Interesse, Anfragen zu beantworten). Wir bewahren
          die Nachricht auf, solange sie für die Bearbeitung und für
          Rückfragen nötig ist; kommt ein Auftrag zustande, gelten die
          gesetzlichen Aufbewahrungsfristen von sieben Jahren nach
          § 132 BAO.
        </p>
      </div>

      <div>
        <strong>Keine Cookies, keine Statistik, keine fremden Dienste:</strong>
        <p>
          Diese Seite setzt keine Cookies, bindet keine Schriften,
          Karten, Videos oder Analysewerkzeuge von fremden Servern ein
          und wertet Ihr Verhalten nicht aus. Deshalb erscheint hier auch
          kein Zustimmungsbanner — es gibt nichts zuzustimmen.
        </p>
      </div>

      {/* Anbieter aus den Daten der laufenden Seite bestimmt:
          ckrreinigung.at liegt auf ns01/ns02.one.com, die Postfächer
          auf mailpod10-cph3.one.com. Die Angaben stammen aus dem
          Impressum von one.com. Wechselt der Kunde den Anbieter,
          gehört dieser Absatz geändert. */}
      <div>
        <strong>Aufruf der Seite (Hosting):</strong>
        <p>
          Diese Seite wird bei One.com Group AB, Carlsgatan 3, 211 20
          Malmö, Schweden gehostet. Beim Aufruf verarbeitet der Anbieter
          technisch notwendige Verbindungsdaten, darunter Ihre
          IP-Adresse, um die Seite ausliefern und den Betrieb absichern
          zu können. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die
          Daten bleiben innerhalb der Europäischen Union; eine
          Übermittlung in ein Drittland findet nicht statt.
        </p>
      </div>

      <div>
        <strong>Ihre Rechte:</strong>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und
          Widerspruch. Wenden Sie sich dafür an{" "}
          <a href={`mailto:${CKR_INFO.email}`} className="text-[#122272] underline">
            {CKR_INFO.email}
          </a>
          .
        </p>
      </div>

      <div>
        <strong>Beschwerderecht:</strong>
        <p>
          Wenn Sie glauben, dass wir Ihre Daten nicht rechtmäßig
          verarbeiten, können Sie sich bei der Österreichischen
          Datenschutzbehörde beschweren: Barichgasse 40–42, 1030 Wien,{" "}
          <a
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noreferrer"
            className="text-[#122272] underline"
          >
            www.dsb.gv.at
          </a>
          .
        </p>
      </div>
    </div>
  );
}
