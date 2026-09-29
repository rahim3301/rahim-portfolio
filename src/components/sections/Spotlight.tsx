import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import { ArrowUpRight, Star } from "../Icons";
import { spotlightProject } from "../../data/games";

/** Solo-built title, staged as the headline piece of the Work section */
export default function Spotlight() {
  const project = spotlightProject;

  return (
    <div className="relative mb-20">
      <div className="blob top-[5%] left-[-8%] h-md w-md bg-lilac-600/35" />
      <div className="blob right-[-6%] bottom-[-10%] h-md w-md bg-blush/20" />

      <Reveal className="mb-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-amber-300 uppercase">
          <Star size={14} />
          Featured release
        </span>
        <span className="h-px flex-1 bg-linear-to-r from-amber-300/40 to-transparent" aria-hidden="true" />
      </Reveal>

      <Reveal>
        <TiltCard>
          {/* Gradient frame sets the spotlight apart from the regular cards */}
          <div className="rounded-[2.65rem] bg-linear-to-br from-blush via-lilac-500 to-skysoft p-0.5 shadow-[0_0_60px_rgba(139,92,246,0.45),0_0_140px_rgba(232,121,249,0.2)]">
            <article className="relative overflow-hidden rounded-[2.5rem] bg-night-900">
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.gradient}`}
              />
              <div className="grid-overlay absolute inset-0" />
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blush/25 blur-3xl" />

              <div className="relative grid gap-10 p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:p-16">
                <div className="animate-float relative mx-auto shrink-0 md:mx-0">
                  <div className="absolute -inset-4 rounded-[3rem] bg-lilac-400/40 blur-3xl" />
                  <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    className="relative h-40 w-40 rounded-[2.25rem] shadow-2xl shadow-black/60 ring-1 ring-white/20 md:h-56 md:w-56"
                  />
                </div>

                <div className="text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-lilac-800 uppercase">
                      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-blush" />
                      New · Solo Release
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-lilac-100">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-4xl leading-tight font-bold text-white md:text-6xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-lilac-100/90 md:text-lg">
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

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-night-900 hover:bg-lilac-100"
                    >
                      Get it on Google Play
                      <ArrowUpRight />
                    </a>
                    <a
                      href="#play"
                      className="press rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
                    >
                      Play a mini version
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </TiltCard>
      </Reveal>
    </div>
  );
}
