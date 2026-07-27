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
                I grew up exploring game worlds — now I build them. I specialize
                in <strong className="text-lilac-300">Unity 3D</strong> and have
                shipped everything from hyper-casual and FPS titles to
                parkour-style adventures on the Play Store.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Today I lead{" "}
                <strong className="text-lilac-300">Offroad Interactive</strong>{" "}
                as Director, where we craft original games. When I’m not
                developing, I’m sketching anime — a hobby since childhood that
                keeps a creative edge in everything I make.
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
      </div>
    </section>
  );
}
