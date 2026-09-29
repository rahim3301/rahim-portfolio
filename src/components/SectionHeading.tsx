import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

/** Numbered, left-aligned heading so every section reads as a step in one flow */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 grid gap-6 md:mb-16 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-lilac-300 uppercase">
          <span className="font-display text-lilac-400">{index}</span>
          <span className="h-px w-10 bg-lilac-500/60" aria-hidden="true" />
          {eyebrow}
        </div>
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-bold text-balance text-white md:text-5xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-sm text-base leading-relaxed text-slate-400 md:text-right">
          {description}
        </p>
      )}
    </Reveal>
  );
}
