import { Home, Phone } from "lucide-react";
import { Link } from "wouter";
import { CKR_INFO } from "@/data/ckrData";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f6f7fb] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg sm:p-12">
        <p className="text-6xl font-bold tracking-tight text-[#122272]">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Diese Seite gibt es nicht
        </h1>

        <p className="mt-3 leading-relaxed text-slate-600">
          Der Link ist vermutlich veraltet oder enthält einen Tippfehler.
          Rufen Sie uns einfach an – wir helfen Ihnen gerne weiter.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#122272] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Zur Startseite
          </Link>

          <a
            href={`tel:${CKR_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#122272] px-6 py-3 font-medium text-[#122272] transition-colors hover:bg-[#122272]/5"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CKR_INFO.phone}
          </a>
        </div>
      </div>
    </main>
  );
}
