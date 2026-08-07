import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import TiltCard from "../TiltCard";
import { featuredProjects, moreProjects } from "../../data/games";

export default function Games() {
  return (
    <section id="work" className="relative scroll-mt-24 py-28">
      <div className="blob right-[-10%] bottom-[0%] h-md w-md bg-lilac-700/25" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Games I’ve built & shipped"
          description="Published titles on the Google Play Store — and what I personally contributed to each."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <article className="glass hover:glow flex h-full flex-col overflow-hidden rounded-3xl transition-shadow">
                  {/* Cover: real game icon on a purple gradient */}
                  <div
                    className={`relative flex h-40 items-center justify-center bg-linear-to-br ${project.gradient}`}
                  >
                    <div className="grid-overlay absolute inset-0" />
                    <img
                      src={project.icon}
                      alt={`${project.title} icon`}
                      className="relative h-22 w-22 rounded-3xl shadow-2xl shadow-black/50"
                      loading="lazy"
                    />
                    <span className="glass absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-lilac-200">
                      {project.category}
                    </span>
                    {project.rating && (
                      <span className="glass absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold text-amber-300">
                        ★ {project.rating}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    {/* My contribution */}
                    <div className="mt-4">
                      <p className="text-xs font-semibold tracking-widest text-lilac-400 uppercase">
                        My Role
                      </p>
                      <ul className="mt-2 space-y-1">
                        {project.role.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-slate-300"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lilac-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-lilac-800/60 bg-night-800/60 px-2.5 py-0.5 text-xs font-medium text-lilac-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-lilac-300 hover:text-lilac-200 hover:underline"
                        aria-label={`${project.title} on Google Play`}
                      >
                        Google Play
                        <svg
                          width="14"
                          height="14"
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
                      {project.downloads && (
                        <span className="rounded-full bg-lilac-800/50 px-3 py-1 text-xs font-semibold text-lilac-200">
                          {project.downloads} downloads
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* More projects — compact strip */}
        <Reveal delay={0.1} className="mt-16">
          <h3 className="font-display mb-6 text-center text-xl font-bold text-white">
            More Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {moreProjects.map((project) => (
              <a
                key={project.title}
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-lilac-700/30"
              >
                <img
                  src={project.icon}
                  alt={`${project.title} icon`}
                  className="h-14 w-14 shrink-0 rounded-xl shadow-md shadow-black/40"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white group-hover:text-lilac-200">
                    {project.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {project.category}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
