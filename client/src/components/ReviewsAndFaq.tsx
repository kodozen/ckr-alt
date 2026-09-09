import { useState } from "react";
import { CKR_REVIEWS, CKR_FAQ } from "@/data/ckrData";
import { Star, ChevronDown, MessageSquareQuote, HelpCircle, CheckCircle2 } from "lucide-react";

export default function ReviewsAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="bewertungen" className="py-20 sm:py-28 bg-white relative">
      <div className="container">
        {/* Reviews Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200/60">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
              Echte Kundenstimmen
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#122272] tracking-tight">
              Was unsere Kunden in Kufstein & Tirol über uns sagen
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Höchste Zufriedenheit bei Betrieben, Hausverwaltungen und Hotellerie durch Termintreue und meisterliche Sauberkeit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CKR_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                    "{rev.content}"
                  </p>
                </div>

                <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{rev.author}</h3>
                    <p className="text-xs text-slate-600">{rev.role}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#122272] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {rev.service}
                  </span>
                </div>
              </div>
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
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#122272] tracking-tight">
              Alles Wichtige rund um unsere Reinigungsdienste
            </h3>
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
