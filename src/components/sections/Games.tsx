import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import TiltCard from "../TiltCard";
import { Android, ArrowUpRight, Star } from "../Icons";
import { featuredProjects, moreProjects } from "../../data/games";

export default function Games() {
  return (
    <section id="work" className="relative scroll-mt-24 py-28">
      <div className="blob right-[-10%] bottom-[0%] h-md w-md bg-lilac-700/25" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Professional Work"
          title="Games I’ve developed on the job"
          description="Published titles I worked on as a Unity Game Developer — and what I contributed to each."
        />

        <Reveal className="mb-8 flex items-center gap-4">
          <h3 className="font-display text-xl font-bold text-white">
            Shipped titles I’ve worked on
          </h3>
          <span className="h-px flex-1 bg-lilac-400/15" aria-hidden="true" />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.06}>
              <TiltCard className="h-full">
                <article className="glass hover:glow flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-300 ease-fluid">
                  {/* Cover: gameplay art fading into the card, icon overlapping */}
                  <div
                    className={`group/cover relative h-44 overflow-hidden bg-linear-to-br ${project.gradient}`}
                  >
                    {project.cover ? (
                      <img
                        src={project.cover}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-fluid group-hover/cover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid-overlay absolute inset-0" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-night-900 via-night-900/30 to-transparent" />
                    <img
                      src={project.icon}
                      alt={`${project.title} icon`}
                      className="absolute bottom-3 left-5 h-16 w-16 rounded-2xl shadow-xl shadow-black/60 ring-2 ring-white/20"
                      loading="lazy"
                    />
                    <span className="glass absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-lilac-200">
                      {project.category}
                    </span>
                    {project.rating && (
                      <span className="glass absolute top-4 right-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-amber-300">
                        <Star size={12} />
                        <span className="sr-only">Rating</span>
                        {project.rating}
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
                        <Android size={14} />
                        Google Play
                        <ArrowUpRight size={14} />
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
          <div className="mb-6 flex items-center gap-4">
            <h3 className="font-display text-xl font-bold text-white">
              More projects
            </h3>
            <span className="h-px flex-1 bg-lilac-400/15" aria-hidden="true" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {moreProjects.map((project) => (
              <a
                key={project.title}
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center gap-4 rounded-2xl p-4 transition-[transform,box-shadow] duration-200 ease-fluid hover:-translate-y-1 hover:shadow-lg hover:shadow-lilac-700/30"
              >
                <img
                  src={project.icon}
                  alt={`${project.title} icon`}
                  className="h-14 w-14 shrink-0 rounded-xl shadow-md shadow-black/40"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white group-hover:text-lilac-200">
                    {project.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {project.category}
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-slate-500 transition-colors group-hover:text-lilac-300"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
