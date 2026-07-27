/**
 * ── YOUR GAMES ─────────────────────────────────────────────
 * Every published game rendered by the site. Icons live in
 * /public/games/ (pulled from each Play Store listing).
 */

export type Game = {
  title: string;
  genre: string;
  description: string;
  playStoreUrl: string;
  icon: string;
  downloads?: string;
  rating?: string;
  gradient: string;
};

export const games: Game[] = [
  {
    title: "Western Hero: Offline Shooter",
    genre: "Action",
    description:
      "Portrait Wild-West shooter with story missions, boss fights across 4 maps, a full weapon arsenal — playable completely offline.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.turbotaxstudio.shooter.western.war.games.cover.survival",
    icon: "/games/western-hero.png",
    downloads: "100K+",
    rating: "4.8",
    gradient: "from-lilac-600 via-lilac-800 to-night-900",
  },
  {
    title: "Bus Simulator 3D Driving",
    genre: "Simulation",
    description:
      "Open-world bus driving with career, racing, off-road and chase modes — real physics, passengers, traffic AI and dynamic hazards.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.tbs.driving.bus.games.coach.simulatorworld.fundrive",
    icon: "/games/bus-simulator.png",
    downloads: "5K+",
    gradient: "from-skysoft/40 via-lilac-700 to-night-900",
  },
  {
    title: "Island Survival: Open World",
    genre: "Adventure",
    description:
      "Toon-style open-world survival — craft gear, battle T-Rexes and jungle guardians, and climb the Giant Mountain for legendary treasure.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.turbotax.peaksurvial.treasure.hunt.craft.peakgames",
    icon: "/games/island-survival.png",
    downloads: "1K+",
    gradient: "from-blush/40 via-lilac-700 to-night-900",
  },
  {
    title: "Mini Relaxing Games Fidget Toy",
    genre: "Casual",
    description:
      "A satisfying collection of ASMR antistress mini games — pop-its, slime, hydraulic press, fruit slicing and dozens more relaxing toys.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.turbotaxstudio.mini.games.relaxing.antistress",
    icon: "/games/mini-relaxing.png",
    gradient: "from-lilac-500 via-lilac-800 to-night-900",
  },
  {
    title: "Crazy Bank Office Slap Game",
    genre: "Casual",
    description:
      "Hilarious office-chaos simulator — tap, throw and slap your way through a lively bank office packed with interactive objects.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hms.crazy.bank.office.splash.kick.smash.games",
    icon: "/games/crazy-bank.png",
    downloads: "1K+",
    gradient: "from-lilac-700 via-night-800 to-night-900",
  },
  {
    title: "Run Solve Survive Task",
    genre: "Adventure",
    description:
      "Fast-paced block-world survival runner — dodge lasers, meteors and chasing enemies across multiple hardcore challenge modes.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hms.run.solve.survive.tasks",
    icon: "/games/run-solve.png",
    gradient: "from-skysoft/30 via-lilac-800 to-night-900",
  },
  {
    title: "Rescue Climb: Save Girl Friend",
    genre: "Adventure",
    description:
      "A heartfelt 3D parkour adventure — climb floating platforms and scenic cliffs on an emotional mission to rescue your lost companion.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hmd.rescue.climb.games",
    icon: "/games/rescue-climb.png",
    gradient: "from-blush/30 via-lilac-800 to-night-900",
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
