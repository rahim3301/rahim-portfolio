import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import { spotlightProject } from "../../data/games";

/** Standalone callout for a solo-built title — designed to pop out from the rest of the grid */
export default function Spotlight() {
  const project = spotlightProject;

  return (
    <section className="relative py-20">
      <div className="blob top-[10%] left-[5%] h-md w-md bg-lilac-600/25" />
      <div className="blob right-[5%] bottom-[-10%] h-md w-md bg-blush/15" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <TiltCard>
            <article className="glass glow relative overflow-hidden rounded-[2.5rem] border border-lilac-500/40">
              <div className="grid-overlay absolute inset-0" />
              <div
                className={`absolute inset-0 bg-linear-to-br opacity-90 ${project.gradient}`}
              />

              <div className="relative grid gap-10 p-8 md:grid-cols-[auto_1fr] md:items-center md:p-14">
                {/* Icon with pulsing glow ring */}
                <div className="relative mx-auto shrink-0 md:mx-0">
                  <div className="absolute inset-0 animate-pulse rounded-4xl bg-lilac-400/40 blur-2xl" />
                  <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    className="relative h-32 w-32 rounded-4xl shadow-2xl shadow-black/60 md:h-40 md:w-40"
                  />
                </div>

                <div className="text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full bg-lilac-500 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      New · Solo Release
                    </span>
                    <span className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-lilac-200">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="font-display mt-5 text-3xl font-bold text-white md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                    {project.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
                    {project.role.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm font-medium text-slate-200"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lilac-400" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium text-lilac-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-night-900 transition-transform hover:scale-105"
                  >
                    Get it on Google Play
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
