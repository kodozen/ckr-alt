import { CKR_INFO } from "@/data/ckrData";

/**
 * Das Meistersiegel.
 *
 * Vorbild ist der Abschnitt bei starclean, in dem die TÜV-Zertifizierung
 * eine eigene Fläche bekommt statt in einer Aufzählung unterzugehen. Hier
 * steht das Meistersiegel an dieser Stelle — und es wiegt schwerer: der
 * Meistertitel ist in Österreich geschützt, und die meisten Mitbewerber in
 * Kufstein führen ihn nicht.
 *
 * Der Text bleibt bei dem, was das Siegel wirklich aussagt: eine abgelegte
 * Meisterprüfung und die Berechtigung auszubilden. Was daraus NICHT folgt —
 * Versicherung, Garantien, Zertifikate — steht bewusst nicht dabei.
 */
export default function MeisterSection() {
  return (
    <section
      id="meisterbetrieb"
      className="bg-[#0c164a] text-white py-20 sm:py-28"
      aria-labelledby="meister-titel"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Das Siegel. Der runde Beschnitt blendet die Ecken aus, in denen
              noch der grüne Bogen des Logos steht. */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="rounded-full bg-white p-4 shadow-2xl">
              <img
                src={CKR_INFO.meisterSiegel}
                alt="Siegel: Meisterbetrieb, österreichisches Handwerk"
                width={270}
                height={270}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Qualität mit Siegel
            </p>

            <h2
              id="meister-titel"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
            >
              CKR ist ein eingetragener Meisterbetrieb.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              Der Meistertitel ist in Österreich geschützt. Er steht für eine
              abgelegte Meisterprüfung im Handwerk und für die Berechtigung,
              selbst auszubilden — beides muss man nachweisen, nicht behaupten.
            </p>

            <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-2xl">
              Für Sie heißt das vor allem eines: Wer bei uns auf eine Baustelle,
              in ein Stiegenhaus oder an eine historische Fassade geht, ist dafür
              ausgebildet worden. Bei Denkmal- und Fassadenarbeiten ist das kein
              Nebensatz, sondern der Unterschied zwischen sauber und beschädigt.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-200">
              <li>Denkmalreinigung</li>
              <li aria-hidden="true" className="text-slate-400">·</li>
              <li>Fassadenreinigung</li>
              <li aria-hidden="true" className="text-slate-400">·</li>
              <li>Gebäudereinigung</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
