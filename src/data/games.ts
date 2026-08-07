/**
 * ── PROJECTS ───────────────────────────────────────────────
 * Structured project data — adding a new game is just adding
 * an entry here. Icons live in /public/games/ and /public/studio/.
 *
 * TODO (Rahim): refine the `role` bullets per project with your
 * exact contributions (e.g. "player controller", "level system",
 * "Addressables pipeline"). Keep them accurate — never invent.
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
  icon: string;
  downloads?: string;
  rating?: string;
  gradient: string;
};

export const projects: Project[] = [
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
    downloads: "100K+",
    rating: "4.8",
    gradient: "from-lilac-600 via-lilac-800 to-night-900",
  },
  {
    title: "Dubai Offroad: Desert Racing",
    category: "Racing · Mobile · 3D",
    description:
      "Desert rally racing across Dubai dunes — 4x4 trucks, upgrades and offroad physics. An original title built at my studio.",
    role: [
      "Game design & production",
      "Unity development",
      "Play Store release",
    ],
    tech: ["Unity", "C#", "Android"],
    status: "Published",
    featured: true,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.offroadstudios.dubaioffroad",
    icon: "/studio/dubai-offroad.webp",
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

/** Independent projects currently in progress */
export type IndieProject = {
  title: string;
  status: string;
  description: string;
};

export const indieProjects: IndieProject[] = [
  {
    title: "Mystic Adventure",
    status: "In Development",
    // TODO (Rahim): add a 1-2 sentence concept description
    description:
      "Independent game project currently in development — details coming soon.",
  },
];

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
    icon: "/studio/superhero-maker.webp",
    url: "https://offroadinteractive.com/games/superhero-maker",
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
