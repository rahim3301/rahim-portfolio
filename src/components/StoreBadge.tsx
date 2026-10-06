import { Apple, GooglePlayLogo } from "./Icons";

type StoreBadgeProps = {
  store: "google" | "apple";
  href: string;
  className?: string;
};

/** Black store badge in the familiar Google Play / App Store style */
export default function StoreBadge({ store, href, className = "" }: StoreBadgeProps) {
  const google = store === "google";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={google ? "Get it on Google Play" : "Download on the App Store"}
      className={`press inline-flex h-14 items-center gap-3 rounded-xl border border-white/25 bg-black px-4 text-white shadow-lg shadow-black/40 transition-colors hover:bg-neutral-900 ${className}`}
    >
      {google ? <GooglePlayLogo size={26} /> : <Apple size={28} />}
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium tracking-wide uppercase">
          {google ? "Get it on" : "Download on the"}
        </span>
        <span className="mt-1 text-lg font-semibold">
          {google ? "Google Play" : "App Store"}
        </span>
      </span>
    </a>
  );
}
