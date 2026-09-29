import { navLinks, site } from "../data/site";
import SocialLinks from "./SocialLinks";
import { ArrowUp } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-lilac-400/10 bg-night-900/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <a href="#home" className="font-display text-xl font-bold text-white">
            Rahim<span className="text-lilac-400">.dev</span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            {site.role}. Building gameplay systems and shipping games from{" "}
            {site.location}.
          </p>
          <div className="mt-5">
            <SocialLinks compact />
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Navigate
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:text-right">
          <a
            href="#home"
            className="press glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-lilac-100 hover:text-white"
          >
            Back to top
            <ArrowUp />
          </a>
        </div>
      </div>

      <div className="border-t border-lilac-400/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
