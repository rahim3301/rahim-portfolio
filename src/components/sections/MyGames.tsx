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
    card: string;
    bullet: string;
    chip: string;
    cta: string;
    bar: string;
  }
> = {
  comic: {
    panel: "bg-linear-to-br from-sky-300 via-sky-500 to-blue-700",
    backdrop: (
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle, #facc15 2px, transparent 2.5px)", backgroundSize: "18px 18px" }}
      />
    ),
    badge: "bg-red-500 text-white border-2 border-slate-900 -rotate-3",
    title: "text-yellow-300",
    titleStyle: { WebkitTextStroke: "2px #1e293b", textShadow: "4px 4px 0 #1e293b" },
    hook: "text-white font-bold drop-shadow-[2px_2px_0_#1e293b]",
    body: "text-slate-900",
    card: "border-[3px] border-slate-900 bg-white shadow-[6px_6px_0_#1e293b]",
    bullet: "bg-yellow-300 ring-1 ring-slate-900",
    chip: "border-2 border-slate-900 bg-white text-slate-900",
    cta: "border-2 border-slate-900 bg-yellow-300 text-slate-900 shadow-[4px_4px_0_#1e293b] hover:bg-yellow-200",
    bar: "bg-yellow-300",
  },
  neon: {
    panel: "bg-linear-to-br from-[#2a1155] via-[#1a0b38] to-night-950",
    backdrop: (
      <>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8af3ff 1px, transparent 1.5px), radial-gradient(circle, #00e5ff 1px, transparent 1.5px)",
            backgroundSize: "70px 70px, 110px 110px",
            backgroundPosition: "0 0, 35px 50px",
          }}
        />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-skysoft/20 blur-3xl" />
      </>
    ),
    badge: "bg-blush/20 text-blush border border-blush/50",
    title: "text-white",
    titleStyle: { textShadow: "0 0 24px rgba(0,229,255,0.7)" },
    hook: "text-skysoft font-bold tracking-wide uppercase",
    body: "text-lilac-100/90",
    card: "border border-skysoft/30 bg-black/35 backdrop-blur",
    bullet: "bg-skysoft shadow-[0_0_8px_#8af3ff]",
    chip: "border border-skysoft/40 bg-black/30 text-skysoft",
    cta: "bg-linear-to-r from-blush to-lilac-600 text-white shadow-[0_0_24px_rgba(0,229,255,0.55)] hover:brightness-110",
    bar: "bg-linear-to-r from-blush to-skysoft",
  },
  cozy: {
    panel: "bg-linear-to-br from-[#fde7d6] via-[#f9d0c0] to-[#f3b8a8]",
    backdrop: (
      <>
        {/* soft quilt dots, like the game's patchwork rooms */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(circle, #fff7ef 3px, transparent 3.5px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-white/50 blur-3xl" />
      </>
    ),
    badge: "bg-[#e86a5c] text-white rotate-2",
    title: "text-[#b93a2e]",
    titleStyle: { textShadow: "0 3px 0 #fff4ea" },
    hook: "text-[#7a3f2c] font-bold",
    body: "text-[#5b3326]",
    card: "bg-[#fff8f1] ring-2 ring-[#f2c3ad] shadow-[0_10px_30px_rgba(150,80,60,0.18)]",
    bullet: "bg-[#f19a6a]",
    chip: "bg-white/80 text-[#7a3f2c] ring-1 ring-[#eab7a3]",
    cta: "bg-[#e86a5c] text-white",
    bar: "bg-[#e86a5c]",
  },
};

/** Lines the first card of each rail up with the page's 72rem content column */
const railInset = "pl-6 pr-6 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]";
const railHeight = "h-[440px] lg:h-[min(56svh,540px)]";
const cardHeight = "min-h-[440px] lg:min-h-[min(56svh,540px)]";

function GameScene({ game }: { game: OwnGame }) {
  const t = themes[game.theme];
  const soon = game.status === "Coming Soon";

  return (
    <article
      data-rail
      aria-label={game.title}
      className={`relative flex flex-col justify-center overflow-hidden py-16 lg:h-svh lg:py-0 lg:pt-20 ${t.panel}`}
    >
      {t.backdrop}

      {/* Header: who the game is */}
      <header className="relative mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-6 px-6">
        <div className="flex items-center gap-5">
          <img src={game.icon} alt={`${game.title} icon`} className="h-16 w-16 shrink-0 rounded-2xl shadow-lg shadow-black/30 md:h-20 md:w-20" loading="lazy" />
          <div>
            <h3 className={`font-display text-2xl leading-tight font-black sm:text-3xl md:text-5xl ${t.title}`} style={t.titleStyle}>
              {game.title}
            </h3>
            <p className={`mt-1 text-base md:text-lg ${t.hook}`}>{game.hook}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {game.isNew && (
            <span className={`rounded-full px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase ${t.badge}`}>
              {soon ? "Coming soon" : "New release"}
            </span>
          )}
          {game.playStoreUrl && <StoreBadge store="google" href={game.playStoreUrl} />}
          {game.appStoreUrl && <StoreBadge store="apple" href={game.appStoreUrl} />}
          {soon && (
            <span className={`inline-flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-bold ${t.chip}`}>
              <Android size={16} /> In testing for Google Play
            </span>
          )}
        </div>
      </header>

      {/* The rail: a story card, the key art, then the store screenshots.
          Wide screens: the scene holds and the scroll slides it sideways (see Motion).
          Phones: a native swipe row. */}
      <div data-rail-track className={`swipe-row relative mt-8 flex min-w-0 items-start gap-5 overflow-x-auto pb-4 ${railInset}`}>
        <div data-shot className={`flex w-[82vw] max-w-[420px] shrink-0 flex-col rounded-3xl p-6 md:p-7 ${cardHeight} ${t.card}`}>
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}>{game.category}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${t.chip}`} aria-label={`Android${game.appStoreUrl ? " and iOS" : ""}`}>
              <Android size={14} />
              {game.appStoreUrl && <Apple size={14} />}
            </span>
          </div>
          <p className={`mt-4 text-[15px] leading-relaxed ${t.body}`}>{game.description}</p>
          <p className={`mt-auto pt-5 text-xs font-bold tracking-widest uppercase ${t.body}`}>Made entirely by me</p>
          <ul className="mt-3 grid gap-2">
            {game.role.map((item) => (
              <li key={item} className={`flex items-center gap-2 text-sm font-semibold ${t.body}`}>
                <span className={`h-2 w-2 shrink-0 rounded-full ${t.bullet}`} />
                {item}
              </li>
            ))}
          </ul>
          {game.theme === "neon" && (
            <a href="#play" className={`mt-6 inline-flex h-12 items-center justify-center rounded-xl px-6 font-bold ${t.cta}`}>
              Play a mini version
            </a>
          )}
        </div>

        <div data-shot className={`aspect-[2/1] shrink-0 overflow-hidden rounded-3xl shadow-2xl shadow-black/30 ring-2 ring-white/40 ${railHeight}`}>
          <img src={game.render} alt={`${game.title} key art`} className="h-full w-full object-cover" loading="lazy" />
        </div>

        {game.shots.map((src, i) => (
          <div key={src} data-shot className={`aspect-[9/16] shrink-0 overflow-hidden rounded-[1.75rem] shadow-2xl shadow-black/30 ring-4 ring-white/70 ${railHeight}`}>
            <img src={src} alt={`${game.title} screenshot ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>

      {/* Progress through the rail (wide screens) */}
      <div className="relative mx-auto mt-6 hidden h-1 w-full max-w-6xl px-6 lg:block" aria-hidden="true">
        <div className="h-full w-full overflow-hidden rounded-full bg-black/10">
          <div data-rail-bar className={`h-full origin-left scale-x-0 rounded-full ${t.bar}`} />
        </div>
      </div>
    </article>
  );
}

/** My own games: each staged in its own game's world, one full scene per game */
export default function MyGames() {
  return (
    <section id="games" className="relative scroll-mt-24 pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="My Own Games"
          title="Games I made from scratch"
          description="Idea, art direction, levels, programming and store release. Every piece built by me."
        />
      </div>

      <div>
        {ownGames.map((game) => (
          <GameScene key={game.title} game={game} />
        ))}
      </div>
    </section>
  );
}
