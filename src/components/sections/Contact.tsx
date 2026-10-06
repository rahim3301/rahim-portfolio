import { useState } from "react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ContactForm from "../ContactForm";
import SocialLinks from "../SocialLinks";
import { site } from "../../data/site";
import { Check, Copy, Mail, MapPin } from "../Icons";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="press grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-lilac-500/15 hover:text-white"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? (
        <Check key="check" className="icon-swap text-green-400" />
      ) : (
        <Copy key="copy" className="icon-swap" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-28">
      <div className="blob right-[-8%] bottom-[10%] h-104 w-104 bg-lilac-700/25" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let’s build something players love"
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-slate-300">
              Whether you’re hiring a remote Unity developer, want to partner
              with my studio, or just want to talk game dev — my inbox is open.
            </p>

            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-300">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-400" />
              {site.availability}
            </p>

            <ul className="glass divide-y divide-lilac-400/10 rounded-3xl">
              <li className="flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lilac-600/20 text-lilac-300">
                  <Mail size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="block font-semibold break-all text-white hover:text-lilac-200"
                  >
                    {site.email}
                  </a>
                </div>
                <CopyEmail />
              </li>
              <li className="flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lilac-600/20 text-lilac-300">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                    Based in
                  </p>
                  <p className="font-semibold text-white">
                    {site.location} · Remote-friendly
                  </p>
                </div>
              </li>
            </ul>

            <SocialLinks />
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
