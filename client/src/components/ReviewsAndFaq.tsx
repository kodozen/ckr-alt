import { useState } from "react";
import { Link } from "wouter";
import { CKR_REVIEWS, CKR_BEWERTUNGSQUELLEN, CKR_FAQ } from "@/data/ckrData";
import { Star, ChevronDown, MessageSquareQuote, HelpCircle, CheckCircle2 } from "lucide-react";

export default function ReviewsAndFaq({
  ohneFragen = false,
  ohneVerweis = false,
  ohneBewertungen = false,
}: {
  /** Auf der Startseite stehen die Fragen nicht mehr — sie haben
      eine eigene Adresse. */
  ohneFragen?: boolean;
  ohneVerweis?: boolean;
  /** Auf der Fragenseite stehen nur die Fragen. */
  ohneBewertungen?: boolean;
} = {}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="bewertungen" className="py-20 sm:py-28 bg-white dark:bg-[#070d2e] relative">
      <div className="container">
        {/* Bewertungen — nur belegte Stimmen, jede mit Fundstelle */}
        {!ohneBewertungen && (
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-400/15 text-amber-800 dark:text-amber-200 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200/60 dark:border-amber-300/25">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" aria-hidden="true" />
              Bewertungen
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122272] dark:text-white tracking-tight">
              Was Kundinnen und Kunden geschrieben haben
            </h2>
            {/* Diese Zeile ist keine Zier: wer Bewertungen zeigt, muss
                sagen, woher sie stammen (§ 2 Abs. 6 UWG, Anhang Z23b). */}
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
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
                  className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a1236] px-4 py-3 text-sm transition-colors hover:border-blue-200 dark:hover:border-white/25 hover:bg-white dark:hover:bg-[#101a4d] sm:py-2"
                >
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-bold text-slate-900 dark:text-white">{q.wertung}</span>
                  <span className="text-slate-600 dark:text-slate-300">
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
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#0a1236] p-7 transition-all duration-300 hover:border-blue-200 dark:hover:border-white/25 hover:shadow-lg"
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

                  <blockquote className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base">
                    „{rev.text}“
                  </blockquote>
                </div>

                <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 dark:border-white/10 pt-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{rev.autor}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{rev.datum}</p>
                  </div>
                  <a
                    href={rev.quelleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-[#122272]/50 px-2.5 py-1 text-xs font-semibold text-[#122272] dark:text-white hover:bg-white dark:hover:bg-[#101a4d]"
                  >
                    Quelle: {rev.quelle}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        )}

        {!ohneFragen && (
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-[#122272]/50 text-[#122272] dark:text-white text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100 dark:border-white/10">
              <HelpCircle className="w-3.5 h-3.5 text-[#2E7D0E]" />
              Häufige Fragen (FAQ)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122272] dark:text-white tracking-tight">
              Alles Wichtige rund um unsere Reinigungsdienste
            </h2>
          </div>

          <div className="space-y-4">
            {CKR_FAQ.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-slate-50/50 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-800 dark:text-slate-100 hover:text-[#122272] text-sm sm:text-base transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#122272] dark:text-white" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        )}
        {ohneFragen && !ohneVerweis && (
          <p className="mt-4 text-center">
            <Link
              href="/haeufige-fragen/"
              className="inline-flex items-center gap-1.5 py-3 text-sm font-bold text-[#122272] dark:text-white hover:text-[#2E7D0E] sm:py-0"
            >
              Häufige Fragen ansehen
              <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
