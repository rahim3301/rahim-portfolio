const items = [
  "Unity",
  "C#",
  "Gameplay Programming",
  "Game Systems",
  "URP",
  "Cinemachine",
  "Addressables",
  "Mobile Optimization",
  "2D / 3D",
  "Hypercasual",
  "Google Play",
  "Git",
];

/** Infinite scrolling keyword strip */
export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-lilac-800/40 bg-night-900/60 py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-sm font-semibold tracking-[0.25em] text-lilac-400/70 uppercase"
          >
            {item}
            <span className="h-1.5 w-1.5 rotate-45 bg-blush/80" />
          </span>
        ))}
      </div>
    </div>
  );
}
