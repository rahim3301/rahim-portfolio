import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { skillGroups } from "../../data/site";

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28">
      <div className="blob top-[20%] left-[-10%] h-96 w-96 bg-skysoft/10" />

      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills & technologies"
          description="The tools I use to take a game from first prototype to published product."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.1}>
              <div className="glass h-full rounded-3xl p-7">
                <h3 className="font-display text-lg font-bold text-white">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-lilac-800/60 bg-night-800/60 px-3.5 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-lilac-500 hover:text-lilac-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
