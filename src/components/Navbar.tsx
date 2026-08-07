import { useEffect, useState } from "react";
import { site } from "../data/site";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Studio", href: "#studio" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass flex w-full max-w-4xl items-center justify-between rounded-full px-6 py-3 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-lilac-900/50" : ""
        }`}
      >
        <a href="#home" className="font-display text-lg font-bold text-white">
          Rahim<span className="text-gradient">.dev</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-lilac-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className="glow hidden rounded-full bg-lilac-600 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 md:block"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass absolute top-20 right-4 left-4 z-50 rounded-3xl bg-night-900/90 p-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-slate-200 hover:text-lilac-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="block rounded-full bg-lilac-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
