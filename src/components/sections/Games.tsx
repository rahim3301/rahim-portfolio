import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import TiltCard from "../TiltCard";
import { games } from "../../data/games";

export default function Games() {
  return (
    <section id="games" className="relative scroll-mt-24 py-28">
      <div className="blob right-[-10%] bottom-[0%] h-md w-md bg-lilac-700/25" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="My Work"
          title="Games I’ve built & shipped"
          description="Published titles on the Google Play Store — from 100K+ download shooters to open-world survival."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <Reveal key={game.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <a
                  href={game.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <article className="glass hover:glow flex h-full flex-col overflow-hidden rounded-3xl transition-shadow">
                    {/* Cover: real game icon on a purple gradient */}
                    <div
                      className={`relative flex h-44 items-center justify-center bg-linear-to-br ${game.gradient}`}
                    >
                      <div className="grid-overlay absolute inset-0" />
                      <img
                        src={game.icon}
                        alt={`${game.title} icon`}
                        className="relative h-24 w-24 rounded-3xl shadow-2xl shadow-black/50 transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <span className="glass absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-lilac-200">
                        {game.genre}
                      </span>
                      {game.rating && (
                        <span className="glass absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-amber-300">
                          ★ {game.rating}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold text-white">
                        {game.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                        {game.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lilac-300">
                          Google Play
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </span>
                        {game.downloads && (
                          <span className="rounded-full bg-lilac-800/50 px-3 py-1 text-xs font-semibold text-lilac-200">
                            {game.downloads} downloads
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
