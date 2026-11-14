import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { ownGames } from "@/data/games";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ClickBurst from "@/components/ClickBurst";
import Motion from "@/components/Motion";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space", display: "swap" });

const title = `${site.shortName} | Unity Game Developer`;
const description =
  "Rahim Khan, Unity Game Developer with 3 years of professional experience. Gameplay programming, game systems, C#, mobile game development. Open to remote opportunities.";
const shareDescription =
  "Unity Game Developer: gameplay programming, game systems and 10+ shipped mobile games, three of them built solo. Open to remote opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: shareDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: shareDescription, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

// Tells Google who this page is about.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: "Unity Game Developer",
  url: site.url,
  image: `${site.url}/me.png`,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  worksFor: { "@type": "Organization", name: site.studio.name, url: site.studio.url },
  sameAs: Object.values(site.socials),
  knowsAbout: ["Unity", "C#", "Gameplay programming", "Mobile game development"],
  owns: ownGames
    .filter((g) => g.playStoreUrl)
    .map((g) => ({ "@type": "MobileApplication", name: g.title, url: g.playStoreUrl, applicationCategory: "GameApplication" })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <a
          href="#about"
          className="sr-only z-[200] rounded-full bg-lilac-600 px-5 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <div data-progress className="fixed inset-x-0 top-0 z-[100] h-1 origin-left scale-x-0 bg-blush" aria-hidden="true" />
        <CustomCursor />
        <ClickBurst />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </body>
    </html>
  );
}
