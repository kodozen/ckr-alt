import { useState } from "react";
import { CKR_REVIEWS, CKR_BEWERTUNGSQUELLEN, CKR_FAQ } from "@/data/ckrData";
import { Star, ChevronDown, MessageSquareQuote, HelpCircle, CheckCircle2 } from "lucide-react";

export default function ReviewsAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="bewertungen" className="py-20 sm:py-28 bg-white relative">
      <div className="container">
        {/* Bewertungen — nur belegte Stimmen, jede mit Fundstelle */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200/60">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
              Bewertungen
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122272] tracking-tight">
              Was Kundinnen und Kunden geschrieben haben
            </h2>
            {/* Diese Zeile ist keine Zier: wer Bewertungen zeigt, muss
                sagen, woher sie stammen (§ 2 Abs. 6 UWG, Anhang Z23b). */}
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Alle Zitate stammen unverändert von öffentlichen Bewertungs&shy;portalen,
              auf denen CKR geführt wird. Wir sammeln keine Bewertungen selbst,
              wählen nichts aus und kürzen nichts — jede Stimme ist unter der
              angegebenen Quelle nachlesbar.
            </p>
          </div>

          {/* Gesamtwertungen der Portale */}
          <ul className="flex flex-wrap justify-center gap-3 mb-12">
            {CKR_BEWERTUNGSQUELLEN.map((q) => (
              <li key={q.portal}>
                <a
                  href={q.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm transition-colors hover:border-blue-200 hover:bg-white"
                >
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-bold text-slate-900">{q.wertung}</span>
                  <span className="text-slate-600">
                    auf {q.portal} ({q.anzahl}{" "}
                    {q.anzahl === 1 ? "Bewertung" : "Bewertungen"})
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {CKR_REVIEWS.map((rev, idx) => (
              <figure
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-7 transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
              >
                <div>
                  <div
                    className="mb-4 flex items-center gap-1 text-amber-400"
                    role="img"
                    aria-label={`${rev.sterne} von 5 Sternen`}
                  >
                    {[...Array(rev.sterne)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base">
                    „{rev.text}“
                  </blockquote>
                </div>

                <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 pt-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{rev.autor}</p>
                    <p className="text-xs text-slate-600">{rev.datum}</p>
                  </div>
                  <a
                    href={rev.quelleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#122272] hover:bg-white"
                  >
                    Quelle: {rev.quelle}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#122272] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5 text-[#2E7D0E]" />
              Häufige Fragen (FAQ)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122272] tracking-tight">
              Alles Wichtige rund um unsere Reinigungsdienste
            </h2>
          </div>

          <div className="space-y-4">
            {CKR_FAQ.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#122272] text-sm sm:text-base transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#122272]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
