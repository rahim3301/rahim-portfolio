import { site } from "../data/site";
import { GitHub, Instagram, LinkedIn, YouTube } from "./Icons";

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedIn },
  { label: "GitHub", href: site.socials.github, Icon: GitHub },
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "YouTube", href: site.socials.youtube, Icon: YouTube },
];

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  const size = compact ? "h-10 w-10 rounded-xl" : "h-12 w-12 rounded-2xl";
  return (
    <ul className="flex flex-wrap gap-3">
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`press glass grid ${size} place-items-center text-slate-300 hover:border-lilac-300/50 hover:text-white`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
