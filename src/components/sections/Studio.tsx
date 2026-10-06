import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { ArrowUpRight, Star } from "../Icons";
import { site } from "../../data/site";
import { ownGames, studioGames } from "../../data/games";

/** Studio titles that already have a full showcase in My Games */
const showcased = new Set(ownGames.map((g) => g.playStoreUrl));

export default function Studio() {
  return (
    <section id="studio" className="relative scroll-mt-24 py-28">
      <div className="blob top-[15%] left-[-10%] h-104 w-104 bg-lilac-600/25" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="My Studio"
          title="Building & publishing my own games"
          description="Original titles I built solo — from idea and assets to code and Play Store release."
        />

        <Reveal>
          {/* Rotating gradient border to spotlight the studio */}
          <div className="animated-border shadow-2xl shadow-lilac-700/30">
            <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-lilac-700 via-lilac-800 to-night-900 p-10 text-white md:p-16">
              {/* decorative rings */}
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full border-[3rem] border-white/5" />
              <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full border-[3rem] border-white/5" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-5">
                  <img
                    src="/studio/logo.png"
                    alt="Offroad Interactive logo"
                    className="h-20 w-20 rounded-2xl bg-white/10 object-contain p-2 backdrop-blur"
                  />
                  <div>
                    <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold tracking-widest uppercase backdrop-blur">
                      {site.studio.role} · Founder
                    </span>
                    <h3 className="font-display mt-2 text-4xl font-bold md:text-6xl">
                      {site.studio.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                  Alongside professional development, I build and publish my own
                  games under Offroad Interactive — small, focused projects I
                  can develop, release and keep improving. Every title here I
                  built entirely solo — idea, art, assets, programming and
                  Play Store release.
                </p>

                {/* Studio stats */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "8+ games shipped",
                    "100% solo-built",
                    "Free to play, forever",
                  ].map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Studio games grid */}
                <div className="mt-10 grid grid-cols-4 gap-4 sm:grid-cols-8">
                  {studioGames.map((game) => (
                    <a
                      key={game.title}
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={game.title}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span className="relative w-full">
                        <img
                          src={game.icon}
                          alt={game.title}
                          className="aspect-square w-full rounded-2xl shadow-lg shadow-black/40 transition-transform duration-300 ease-fluid group-hover:-translate-y-1.5 group-hover:scale-110"
                          loading="lazy"
                        />
                        {showcased.has(game.url) && (
                          <span
                            className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-amber-300 text-night-900 shadow-md"
                            title="Featured in My Games"
                          >
                            <Star size={12} />
                          </span>
                        )}
                      </span>
                      <span className="line-clamp-1 text-center text-xs font-medium text-white/60 group-hover:text-white">
                        {game.title}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={site.studio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-lilac-800 shadow-lg hover:bg-lilac-100"
                  >
                    Visit the Studio
                    <ArrowUpRight />
                  </a>
                  <a
                    href="#contact"
                    className="press rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white backdrop-blur hover:bg-white/10"
                  >
                    Partner With Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
