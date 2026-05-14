/** Opening blurb — shown in the featured story tile */
export const storyIntro =
  "I care about autonomy, safety, and tools people actually use. Along the way I have chased hard problems in research, racing, and products — always learning from teammates and from the craft.";

export type StoryTileIcon =
  | "graduation"
  | "music"
  | "rocket"
  | "brain"
  | "laptop"
  | "spark";

/** Quest log line item — `completed` shows the gold “cleared” treatment */
export type QuestStatus = "completed" | "active" | "side";

export interface StoryTile {
  id: string;
  title: string;
  era: string;
  body: string;
  icon: StoryTileIcon;
  /** Left accent color group (legacy, still used for icon tint hints) */
  tone: "featured" | "gold" | "accent" | "teal";
  questStatus: QuestStatus;
  /** Short subtitle (plain language — shows under the timeframe) */
  questReward?: string;
}

/**
 * Experiences as quest board entries — reorder or edit anytime.
 * `questStatus` drives completed vs active presentation.
 */
export const experienceTiles: StoryTile[] = [
  {
    id: "throughline",
    title: "The through-line",
    era: "Always",
    body: storyIntro,
    icon: "spark",
    tone: "featured",
    questStatus: "active",
    questReward: "Ongoing arc — autonomy, products, and research.",
  },
  {
    id: "hs",
    title: "Early builds",
    era: "Before 2023",
    body: "Programming, robotics, and engineering projects that sparked a passion for autonomy and systems design.",
    icon: "graduation",
    tone: "accent",
    questStatus: "completed",
    questReward: "Where the engineering habit started.",
  },
  {
    id: "music",
    title: "Music in parallel",
    era: "Ongoing",
    body: "Piano and deep listening — patience when integrations misbehave, rhythm when things finally click.",
    icon: "music",
    tone: "teal",
    questStatus: "side",
    questReward: "Side thread — listening and patience under load.",
  },
  {
    id: "michigan",
    title: "University of Michigan",
    era: "2024 — Present",
    body: "Computer Science & Robotics. Contributing to MRacing's autonomous vehicle stack.",
    icon: "rocket",
    tone: "gold",
    questStatus: "active",
    questReward: "Degree + racing stack — autonomy on track.",
  },
  {
    id: "research",
    title: "Research & teaching",
    era: "2024 — Present",
    body: "Model predictive control for lane centering with the University of Waterloo Alternate Fuels Team.",
    icon: "brain",
    tone: "accent",
    questStatus: "active",
    questReward: "MPC lane centering with Waterloo alternate fuels.",
  },
  {
    id: "work",
    title: "Youphoria & ProofIt",
    era: "2025 — Present",
    body: "Shipping real-world tools with Youphoria and building renter-focused products like ProofIt.",
    icon: "laptop",
    tone: "gold",
    questStatus: "active",
    questReward: "Product work — real users, real deploys.",
  },
];
