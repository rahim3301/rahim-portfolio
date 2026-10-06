/**
 * ── PROJECTS ───────────────────────────────────────────────
 * Structured project data — adding a new game is just adding
 * an entry here. Icons live in /public/games/ and /public/studio/.
 *
 * Client/company titles: worked on as a Unity Game Developer.
 * Bloop + Offroad Interactive titles: built entirely solo —
 * idea, assets, programming and release.
 */

export type Project = {
  title: string;
  category: string;
  description: string;
  /** What I personally worked on — keep accurate */
  role: string[];
  tech: string[];
  status: "Published" | "In Development";
  featured: boolean;
  playStoreUrl: string;
  appStoreUrl?: string;
  /** Gameplay image used as the card cover */
  cover?: string;
  icon: string;
  downloads?: string;
  rating?: string;
  gradient: string;
};

/** Visual theme for a solo game's showcase panel */
export type GameTheme = "comic" | "neon";

export type OwnGame = Project & {
  theme: GameTheme;
  /** Wide key-art render, blended into the showcase panel */
  render: string;
  /** Optional short muted gameplay clip, plays over the art on hover */
  video?: string;
  /** Short punchy line from the game's own branding */
  hook: string;
  isNew?: boolean;
};

/** My own games — idea, art, assets, programming and release all by me */
export const ownGames: OwnGame[] = [
  {
    title: "Superhero Maker: Dress Up Game",
    category: "Casual · Dress Up · Mobile",
    hook: "Create your own superhero!",
    description:
      "A superhero creator and dress-up game — pick a Comic or Anime style, mix 500+ outfit pieces across 9 costume categories, build a whole team in your Super HQ and play mini games to earn new gear.",
    role: [
      "Game concept & design",
      "All art & outfit assets",
      "UI/UX design",
      "Unity programming",
      "Mini games & economy",
    ],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.offroadstudios.superheromaker",
    icon: "/games/superhero-maker.webp",
    render: "/renders/superhero-maker.webp",
    gradient: "from-sky-400 via-sky-500 to-blue-700",
    theme: "comic",
    isNew: true,
  },
  {
    title: "Bloop: Bounce Shooter",
    category: "Casual · Puzzle Shooter · Mobile",
    hook: "Aim. Bounce. Clear the board.",
    description:
      "Aim, bounce and defeat every Bloop with a single perfect shot — a casual bounce-shooter designed, built and shipped entirely solo, from concept to sprites to gameplay.",
    role: [
      "Game concept & design",
      "Enemy & sprite art",
      "UI/UX design",
      "Unity gameplay programming",
    ],
    tech: ["Unity", "C#", "Android", "iOS"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.offroadinteractives.bloopbounceshooter",
    appStoreUrl: "https://apps.apple.com/app/bloop-bubble-shooter/id6804321336",
    icon: "/games/bloop-bounce-shooter.png",
    render: "/renders/bloop.webp",
    gradient: "from-lilac-600 via-lilac-800 to-night-900",
    theme: "neon",
  },
];

/** Bloop — also powers the playable mini version in the Play section */
export const spotlightProject = ownGames[1];

/** Games I developed professionally as a Unity Game Developer */
export const projects: Project[] = [
  {
    title: "Smash Speed Rush",
    category: "Runner · Action · Mobile",
    description:
      "Fast-paced smash runner — dash down colorful tracks, dodge traps, smash through obstacles and race to the finish line. Developed solo from scratch, with art provided by the design team.",
    role: [
      "Sole developer — built from scratch",
      "Gameplay design & mechanics ideas",
      "Game systems & Unity implementation",
    ],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.lgs.smash.rush",
    icon: "/games/smash-speed-rush.webp",
    cover: "/covers/smash-speed-rush.webp",
    gradient: "from-orange-500/40 via-lilac-700 to-night-900",
  },
  {
    title: "Crazy Park Prank: Fun Games",
    category: "Simulation · Casual · Mobile",
    description:
      "Sneak around a park full of wild animals and pull off hilarious pranks — pick your trick, time it right and watch every animal react in its own funny way.",
    role: ["Gameplay programming", "Game systems", "Unity implementation"],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.aimatlass.crazy.zoo.pranks.simulator",
    icon: "/games/crazy-park-prank.webp",
    cover: "/covers/crazy-park-prank.webp",
    gradient: "from-amber-500/30 via-lilac-700 to-night-900",
  },
  {
    title: "Western Hero: Offline Shooter",
    category: "Action · Mobile · 3D",
    description:
      "Portrait Wild-West shooter with story missions, boss fights across 4 maps and a full weapon arsenal — playable completely offline.",
    role: ["Gameplay programming", "Game systems", "Unity implementation"],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.turbotaxstudio.shooter.western.war.games.cover.survival",
    icon: "/games/western-hero.png",
    cover: "/covers/western-hero.webp",
    downloads: "100K+",
    rating: "4.8",
    gradient: "from-lilac-600 via-lilac-800 to-night-900",
  },
  {
    title: "Dubai Offroad: Desert Racing",
    category: "Racing · Mobile · 3D",
    description:
      "Desert rally racing across Dubai dunes — 4x4 trucks, upgrades and offroad physics. An original title I built solo at my studio.",
    role: [
      "Concept & game design",
      "Art & assets",
      "Unity programming",
      "Play Store release",
    ],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.offroadstudios.dubaioffroad",
    icon: "/studio/dubai-offroad.webp",
    cover: "/covers/dubai-offroad.webp",
    downloads: "1K+",
    rating: "5.0",
    gradient: "from-blush/40 via-lilac-700 to-night-900",
  },
  {
    title: "Island Survival: Open World",
    category: "Adventure · Open World · 3D",
    description:
      "Toon-style open-world survival — craft gear, battle T-Rexes and jungle guardians, and climb the Giant Mountain for legendary treasure.",
    role: ["Gameplay programming", "Game systems", "Unity implementation"],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.turbotax.peaksurvial.treasure.hunt.craft.peakgames",
    icon: "/games/island-survival.png",
    cover: "/covers/island-survival.webp",
    downloads: "1K+",
    gradient: "from-blush/40 via-lilac-700 to-night-900",
  },
  {
    title: "Crazy Bank Office Slap Game",
    category: "Casual · Physics · Mobile",
    description:
      "Hilarious office-chaos simulator — tap, throw and slap your way through a lively bank office packed with interactive objects.",
    role: [
      "Gameplay programming",
      "Interactive object systems",
      "Unity implementation",
    ],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hms.crazy.bank.office.splash.kick.smash.games",
    icon: "/games/crazy-bank.png",
    cover: "/covers/crazy-bank.webp",
    downloads: "1K+",
    gradient: "from-lilac-700 via-night-800 to-night-900",
  },
  {
    title: "Run Solve Survive Task",
    category: "Runner · Survival · 3D",
    description:
      "Fast-paced block-world survival runner — dodge lasers, meteors and chasing enemies across multiple hardcore challenge modes.",
    role: [
      "Gameplay programming",
      "Challenge mode systems",
      "Unity implementation",
    ],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hms.run.solve.survive.tasks",
    icon: "/games/run-solve.png",
    cover: "/covers/run-solve.webp",
    gradient: "from-skysoft/30 via-lilac-800 to-night-900",
  },
  {
    title: "Bus Simulator 3D Driving",
    category: "Simulation · Mobile",
    description:
      "Open-world bus driving with career, racing, off-road and chase modes — real physics, passengers and traffic AI.",
    role: ["Gameplay updates", "Bug fixing", "Feature enhancements"],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: false,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.tbs.driving.bus.games.coach.simulatorworld.fundrive",
    icon: "/games/bus-simulator.png",
    downloads: "5K+",
    gradient: "from-skysoft/40 via-lilac-700 to-night-900",
  },
  {
    title: "Mini Relaxing Games Fidget Toy",
    category: "Casual · Hypercasual",
    description:
      "A satisfying collection of ASMR antistress mini games — pop-its, slime, hydraulic press and dozens more relaxing toys.",
    role: ["Mini-game development", "Unity implementation"],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: false,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.turbotaxstudio.mini.games.relaxing.antistress",
    icon: "/games/mini-relaxing.png",
    gradient: "from-lilac-500 via-lilac-800 to-night-900",
  },
  {
    title: "Rescue Climb: Save Girl Friend",
    category: "Adventure · Parkour · 3D",
    description:
      "A heartfelt 3D parkour adventure — climb floating platforms and scenic cliffs on a mission to rescue your lost companion.",
    role: ["Gameplay programming", "Level implementation"],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: false,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hmd.rescue.climb.games",
    icon: "/games/rescue-climb.png",
    gradient: "from-blush/30 via-lilac-800 to-night-900",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

/** Games built at Offroad Interactive (icons in /public/studio/) */
export type StudioGame = {
  title: string;
  icon: string;
  url: string;
};

export const studioGames: StudioGame[] = [
  {
    title: "Superhero Maker 3D",
    icon: "/studio/superhero-maker-3d.webp",
    url: "https://play.google.com/store/apps/details?id=com.offroadstudios.superheromaker3d",
  },
  {
    title: "Dubai Offroad",
    icon: "/studio/dubai-offroad.webp",
    url: "https://play.google.com/store/apps/details?id=com.offroadstudios.dubaioffroad",
  },
  {
    title: "Pin Tan",
    icon: "/studio/pin-tan.webp",
    url: "https://offroadinteractive.com/games/pin-tan",
  },
  {
    title: "Superhero Maker",
    icon: "/games/superhero-maker.webp",
    url: "https://play.google.com/store/apps/details?id=com.offroadstudios.superheromaker",
  },
  {
    title: "Dubai Racing",
    icon: "/studio/dubai-racing.webp",
    url: "https://offroadinteractive.com/games/dubai-racing",
  },
  {
    title: "Dubai Camel Rider",
    icon: "/studio/dubai-camel-rider.webp",
    url: "https://offroadinteractive.com/games/dubai-camel-rider",
  },
  {
    title: "Zombie Coins",
    icon: "/studio/zombie-coins.webp",
    url: "https://offroadinteractive.com/games/zombie-coins",
  },
  {
    title: "Hopscotch Pakistan",
    icon: "/studio/hopscotch-pakistan.webp",
    url: "https://offroadinteractive.com/games/hopscotch-pakistan",
  },
];
