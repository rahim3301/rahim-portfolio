import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { skills } from "../../data/site";

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

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.04}>
              <div className="glass group flex items-center gap-3 rounded-full px-6 py-3.5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-lilac-600/40">
                <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-lilac-500 to-blush" />
                <span className="font-medium text-slate-200">{skill.name}</span>
                <span className="text-xs font-semibold text-lilac-400">
                  {skill.level}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
