import Reveal from "../Reveal";
import { site } from "../../data/site";

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Instagram", href: site.socials.instagram },
  { label: "YouTube", href: site.socials.youtube },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 pt-28 pb-10">
      <div className="blob right-[-8%] bottom-[10%] h-104 w-104 bg-lilac-700/25" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-lilac-300 uppercase">
            Contact
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-6xl">
            Let’s build something
            <br />
            <span className="text-gradient">players love</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Whether you want to publish a game, partner with my studio, or just
            talk game dev — my inbox is open.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${site.email}`}
            className="glow rounded-full bg-lilac-600 px-8 py-4 font-semibold text-white transition-transform hover:scale-105"
          >
            {site.email}
          </a>
          <a
            href={`mailto:${site.email}?subject=CV%20Request%20—%20Rahim%20Khan&body=Hi%20Rahim,%20I'd%20love%20a%20copy%20of%20your%20latest%20CV.`}
            className="glass rounded-full px-8 py-4 font-semibold text-lilac-200 transition-transform hover:scale-105"
          >
            Request CV
          </a>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 flex justify-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-400 transition-colors hover:text-lilac-300"
            >
              {s.label}
            </a>
          ))}
        </Reveal>

        <footer className="mt-20 border-t border-night-700 pt-8 pb-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
        </footer>
      </div>
    </section>
  );
}
