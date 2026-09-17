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

/**
 * Wortlaut und Reihenfolge folgen dem Impressum, das der Kunde geliefert
 * hat (PDF, September 2026). Nicht übernommen ist der frühere Hinweis auf
 * die EU-Plattform zur Online-Streitbeilegung: die Plattform wurde am
 * 20. Juli 2025 eingestellt, der Verweis zeigte ins Leere.
 */
export function ImpressumText() {
  const link = "text-[#122272] underline";
  return (
    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
      <div>
        <p><strong>{CKR_INFO.legalName}</strong></p>
        <p>{CKR_INFO.strasse}</p>
        <p>{CKR_INFO.ort}</p>
        <p>Österreich</p>
      </div>

      <div>
        <p><strong>Telefon:</strong>{" "}
          <a href={`tel:${CKR_INFO.phoneRaw}`} className={link}>{CKR_INFO.phone}</a>
        </p>
        <p><strong>E-Mail:</strong>{" "}
          <a href={`mailto:${CKR_INFO.email}`} className={link}>{CKR_INFO.email}</a>
        </p>
        <p><strong>Web:</strong> {CKR_INFO.web}</p>
      </div>

      <div>
        <p><strong>UID-Nummer:</strong> {CKR_INFO.uid}</p>
        <p><strong>GISA-Zahl:</strong> {CKR_INFO.gisa}</p>
      </div>

      <div>
        <strong>Gewerbe:</strong>
        <p>Denkmal-, Fassaden- und Gebäudereinigung (Handwerk)</p>
      </div>

      <div>
        <strong>Zuständige Gewerbebehörde:</strong>
        <p>Bezirkshauptmannschaft Kufstein</p>
      </div>

      <div>
        <strong>Mitgliedschaft:</strong>
        <p>Wirtschaftskammer Tirol</p>
        <p>Landesinnung Chemische Gewerbe und der Denkmal-, Fassaden- und Gebäudereiniger</p>
      </div>

      <div>
        <strong>Anwendbare Rechtsvorschriften:</strong>
        <p>Gewerbeordnung (GewO)</p>
        <p>
          Abrufbar über das Rechtsinformationssystem des Bundes unter{" "}
          <a href="https://www.ris.bka.gv.at" target="_blank" rel="noreferrer" className={link}>
            www.ris.bka.gv.at
          </a>
        </p>
      </div>

      <div>
        <strong>Medieninhaber:</strong>
        <p>{CKR_INFO.legalName}, {CKR_INFO.inhaberin}</p>
        <p>{CKR_INFO.ort}, Österreich</p>
      </div>

      <div>
        <strong>Unternehmensgegenstand:</strong>
        <p>Denkmal-, Fassaden- und Gebäudereinigung (Handwerk)</p>
      </div>

      <div>
        <strong>Grundlegende Richtung der Website:</strong>
        <p>
          Information über CKR Cleaning Services sowie über die angebotenen
          Dienstleistungen im Bereich der Denkmal-, Fassaden- und Gebäudereinigung.
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
        <p>{CKR_INFO.adresse}</p>
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
