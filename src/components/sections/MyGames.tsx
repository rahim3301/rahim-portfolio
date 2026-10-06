import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import StoreBadge from "../StoreBadge";
import { Android, Apple } from "../Icons";
import { ownGames, type GameTheme, type OwnGame } from "../../data/games";

/** Per-game styling so each showcase looks like its own game's world */
const themes: Record<
  GameTheme,
  {
    panel: string;
    backdrop: React.ReactNode;
    badge: string;
    title: string;
    titleStyle?: React.CSSProperties;
    hook: string;
    body: string;
    bullet: string;
    chip: string;
    cta: string;
    artPosition: string;
  }
> = {
  comic: {
    panel: "bg-linear-to-br from-sky-300 via-sky-500 to-blue-700",
    backdrop: (
      <>
        {/* halftone dots */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, #facc15 2px, transparent 2.5px)",
            backgroundSize: "18px 18px",
          }}
        />
      </>
    ),
    badge: "bg-red-500 text-white border-2 border-slate-900 -rotate-3",
    title: "text-yellow-300",
    titleStyle: {
      WebkitTextStroke: "2px #1e293b",
      textShadow: "4px 4px 0 #1e293b",
    },
    hook: "text-white font-bold drop-shadow-[2px_2px_0_#1e293b]",
    body: "text-white/95",
    bullet: "bg-yellow-300 ring-1 ring-slate-900",
    chip: "border-2 border-slate-900 bg-white text-slate-900",
    cta: "border-2 border-slate-900 bg-yellow-300 text-slate-900 shadow-[4px_4px_0_#1e293b] hover:bg-yellow-200",
    artPosition: "object-right",
  },
  neon: {
    panel: "bg-linear-to-br from-[#2a1155] via-[#1a0b38] to-night-950",
    backdrop: (
      <>
        {/* starfield */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, #7dd3fc 1px, transparent 1.5px), radial-gradient(circle, #e879f9 1px, transparent 1.5px)",
            backgroundSize: "70px 70px, 110px 110px",
            backgroundPosition: "0 0, 35px 50px",
          }}
        />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-skysoft/20 blur-3xl" />
        {/* neon floor line */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-blush via-skysoft to-blush shadow-[0_0_20px_#e879f9]" />
      </>
    ),
    badge: "bg-blush/20 text-blush border border-blush/50",
    title: "text-white",
    titleStyle: { textShadow: "0 0 24px rgba(232,121,249,0.7)" },
    hook: "text-skysoft font-bold tracking-wide uppercase",
    body: "text-lilac-100/90",
    bullet: "bg-skysoft shadow-[0_0_8px_#7dd3fc]",
    chip: "border border-skysoft/40 bg-black/30 text-skysoft",
    cta: "bg-linear-to-r from-blush to-lilac-600 text-white shadow-[0_0_24px_rgba(232,121,249,0.55)] hover:brightness-110",
    artPosition: "object-center",
  },
};

function GameShowcase({ game }: { game: OwnGame }) {
  const t = themes[game.theme];
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Art drifts slower than the page for a subtle depth effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const playVideo = () => void videoRef.current?.play().catch(() => {});
  const stopVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article
      ref={ref}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
      className={`group relative overflow-hidden rounded-[2.5rem] ${t.panel} shadow-2xl shadow-black/40`}
    >
      {t.backdrop}

      {/* Key art: on top for mobile, filling the right side on desktop —
          masked so it melts into the themed panel instead of a hard edge */}
      <div className="relative h-60 overflow-hidden sm:h-80 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[68%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:[mask-image:linear-gradient(to_left,black_55%,transparent)]">
        <motion.div style={{ y: artY }} className="absolute -inset-y-[8%] inset-x-0">
          <img
            src={game.render}
            alt={`${game.title} key art`}
            className={`h-full w-full object-cover ${t.artPosition} transition-transform duration-700 ease-fluid group-hover:scale-105`}
            loading="lazy"
          />
        </motion.div>
        {game.video && (
          <video
            ref={videoRef}
            src={game.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      <div className="relative -mt-16 p-8 md:mt-0 md:w-[52%] md:p-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <img
              src={game.icon}
              alt={`${game.title} icon`}
              className="h-16 w-16 rounded-2xl shadow-lg shadow-black/40"
              loading="lazy"
            />
            {game.isNew && (
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase ${t.badge}`}
              >
                New release
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}
            >
              {game.category}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${t.chip}`}
              aria-label={`Available on Android${game.appStoreUrl ? " and iOS" : ""}`}
            >
              <Android size={14} />
              {game.appStoreUrl && <Apple size={14} />}
            </span>
          </div>

          <h3
            className={`font-display mt-6 text-4xl leading-tight font-black md:text-5xl ${t.title}`}
            style={t.titleStyle}
          >
            {game.title}
          </h3>
          <p className={`mt-3 text-lg ${t.hook}`}>{game.hook}</p>
          <p className={`mt-4 max-w-xl leading-relaxed ${t.body}`}>
            {game.description}
          </p>

          <p className={`mt-6 text-xs font-bold tracking-widest uppercase ${t.body}`}>
            Made entirely by me
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {game.role.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-2 text-sm font-semibold ${t.body}`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${t.bullet}`} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StoreBadge store="google" href={game.playStoreUrl} />
            {game.appStoreUrl && (
              <StoreBadge store="apple" href={game.appStoreUrl} />
            )}
            {game.theme === "neon" && (
              <a
                href="#play"
                className={`press inline-flex h-14 items-center rounded-xl px-6 font-bold ${t.cta}`}
              >
                Play a mini version
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/** My own games — each staged in its own game's visual world */
export default function MyGames() {
  return (
    <section id="games" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="My Own Games"
          title="Games I made from scratch"
          description="Idea, art, assets, programming and Play Store release — every piece built by me."
        />

        <div className="flex flex-col gap-10">
          {ownGames.map((game) => (
            <Reveal key={game.title}>
              <GameShowcase game={game} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
