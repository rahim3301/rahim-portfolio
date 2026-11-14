/** Two rows of giant words that slide in opposite directions, driven by the scroll (see Motion). */
export default function WordRows({ rows, quiet = false }: { rows: [string, string]; quiet?: boolean }) {
  return (
    <div className="relative overflow-hidden py-10 select-none md:py-16" aria-hidden="true">
      {rows.map((text, i) => (
        <div
          key={text}
          data-scroll-x={i === 0 ? -25 : 25}
          className={`font-display flex w-max gap-[0.4em] text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] font-bold tracking-tight whitespace-nowrap uppercase ${
            i === 0
              ? quiet ? "text-lilac-300/15" : "text-white"
              : "text-transparent [-webkit-text-stroke:1.5px_rgba(157,110,216,0.55)]"
          }`}
        >
          {Array.from({ length: 4 }, (_, k) => (
            <span key={k}>{text}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
