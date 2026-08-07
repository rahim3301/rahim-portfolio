import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import { stats } from "../../data/site";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28">
      <div className="blob top-[10%] left-[-12%] h-104 w-104 bg-lilac-700/25" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Gamer at heart, developer by craft"
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Portrait (drop the image at /public/me.png) */}
          <Reveal>
            <div className="relative mx-auto aspect-4/5 w-full max-w-sm">
              <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-linear-to-br from-lilac-600 via-blush to-skysoft opacity-40" />
              <div className="glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem]">
                {/* Fallback initials show until /me.png exists */}
                <span className="font-display text-8xl font-bold text-gradient">
                  RK
                </span>
                <img
                  src="/me.png"
                  alt="Portrait of Rahim Khan"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-slate-300">
                I’m a{" "}
                <strong className="text-lilac-300">Unity developer</strong> with
                3 years of professional experience turning gameplay ideas into
                working systems — player controllers, game modes, progression,
                UI integration and mobile optimization. I’ve shipped
                hypercasual, action, simulation and adventure titles to Google
                Play.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Alongside professional work, I direct{" "}
                <strong className="text-lilac-300">Offroad Interactive</strong>,
                where I build and publish my own games — taking projects from
                concept to release. When I’m not developing, I’m sketching
                anime, a lifelong hobby that keeps a creative edge in my work.
              </p>
            </Reveal>

            <Reveal
              delay={0.15}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl px-4 py-5 text-center"
                >
                  <div className="font-display text-3xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Development philosophy */}
        <Reveal delay={0.1} className="mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Clean Code",
                text: "Code should be understandable, maintainable and practical — written for the next developer, not just the compiler.",
              },
              {
                title: "Simplicity First",
                text: "Don’t build complexity until the project actually requires it. Simple systems ship; clever ones stall.",
              },
              {
                title: "Production Mindset",
                text: "Stability, performance and iteration speed matter. A game isn’t done until players are holding it.",
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-3xl p-7">
                <h3 className="font-display text-lg font-bold text-lilac-200">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
