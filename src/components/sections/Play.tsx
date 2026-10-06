import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import BloopMini from "../BloopMini";
import { ArrowUpRight } from "../Icons";
import { spotlightProject } from "../../data/games";

const controls = [
  { keys: "Mouse / touch", action: "Aim and click or tap to shoot" },
  { keys: "← →  ·  Space", action: "Aim and shoot with the keyboard" },
  { keys: "Wall bounces", action: "Bonus points for trick shots and combos" },
];

export default function Play() {
  return (
    <section id="play" className="relative scroll-mt-24 py-28">
      <div className="blob top-[20%] right-[-10%] h-104 w-104 bg-blush/10" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Take a Break"
          title="Play a mini Bloop"
          description="A tiny browser version of my solo game, rebuilt in TypeScript and Canvas for this site."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <Reveal className="flex flex-col gap-6">
            <ul className="glass divide-y divide-lilac-400/10 rounded-3xl">
              {controls.map((c) => (
                <li key={c.keys} className="p-5">
                  <p className="font-display text-sm font-bold text-lilac-200">
                    {c.keys}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{c.action}</p>
                </li>
              ))}
            </ul>

            <div className="glass flex items-center gap-4 rounded-3xl p-5">
              <img
                src={spotlightProject.icon}
                alt=""
                className="h-14 w-14 shrink-0 rounded-2xl"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="text-sm text-slate-400">Enjoyed it?</p>
                <a
                  href={spotlightProject.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-lilac-200"
                >
                  Get the full game
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BloopMini />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
