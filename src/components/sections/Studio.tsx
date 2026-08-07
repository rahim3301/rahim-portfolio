import Reveal from "../Reveal";
import { site } from "../../data/site";
import { studioGames, indieProjects } from "../../data/games";

export default function Studio() {
  return (
    <section id="studio" className="relative scroll-mt-24 py-28">
      <div className="blob top-[15%] left-[-10%] h-104 w-104 bg-lilac-600/25" />

      <div className="mx-auto max-w-6xl px-6">
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
                      ✦ Building My Own Games
                    </span>
                    <h2 className="font-display mt-2 text-4xl font-bold md:text-6xl">
                      {site.studio.name}
                    </h2>
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                  Alongside professional development, I build and publish my own
                  games under Offroad Interactive — small, focused projects I
                  can develop, release and keep improving. Every title here I
                  took from concept to Play Store.
                </p>

                {/* Studio stats */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "8+ games shipped",
                    "100% original IPs",
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
                      <img
                        src={game.icon}
                        alt={game.title}
                        className="aspect-square w-full rounded-2xl shadow-lg shadow-black/40 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-110"
                        loading="lazy"
                      />
                      <span className="line-clamp-1 text-center text-[10px] font-medium text-white/60 group-hover:text-white">
                        {game.title}
                      </span>
                    </a>
                  ))}
                </div>

                {/* In development */}
                {indieProjects.map((project) => (
                  <div
                    key={project.title}
                    className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur"
                  >
                    <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold tracking-wide text-amber-300 uppercase">
                      {project.status}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-white">
                        {project.title}
                      </p>
                      <p className="text-sm text-white/60">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={site.studio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-7 py-3.5 font-semibold text-lilac-800 shadow-lg transition-transform hover:scale-105"
                  >
                    Visit the Studio ↗
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
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
