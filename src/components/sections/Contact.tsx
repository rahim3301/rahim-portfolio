import Reveal from "../Reveal";
import ContactForm from "../ContactForm";
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

        <Reveal delay={0.15} className="mt-10">
          <ContactForm />
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400"
        >
          <span>Prefer email?</span>
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-lilac-300 hover:underline"
          >
            {site.email}
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
