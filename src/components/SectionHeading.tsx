import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-lilac-300 uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-slate-400 md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
