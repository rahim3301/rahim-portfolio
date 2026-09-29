import { useEffect, useState } from "react";
import { navLinks } from "../data/site";
import { Close, Menu } from "./Icons";

/** Tracks which section is currently in view for nav highlighting */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 ease-fluid md:px-6 ${
          scrolled
            ? "border-lilac-400/20 bg-night-900/75 shadow-lg shadow-black/40 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#home"
          className="font-display flex items-center gap-2 text-lg font-bold text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-lilac-600 text-sm">
            RK
          </span>
          <span className="hidden sm:inline">
            Rahim<span className="text-lilac-400">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-lilac-500/15 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="press hidden rounded-full bg-lilac-600 px-5 py-2 text-sm font-semibold text-white hover:bg-lilac-500 md:block"
        >
          Hire Me
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="press grid h-10 w-10 place-items-center rounded-full text-slate-200 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="menu-enter absolute top-20 right-4 left-4 z-50 rounded-3xl border border-lilac-400/20 bg-night-900/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                    active === link.id
                      ? "bg-lilac-500/15 text-white"
                      : "text-slate-300"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-lilac-600 px-5 py-3 text-center text-sm font-semibold text-white"
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
