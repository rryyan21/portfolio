export interface AlbumPick {
  title: string;
  artist: string;
  note?: string;
  /** Small label on the card, e.g. "Late night" */
  tag?: string;
}

export const musicIntro =
  "Music keeps me in flow: rhythm for debugging, harmony for design, and a good bridge for celebrating when tests finally pass.";

/** Short phrases - shown as chips under "Heavy rotation". Edit freely. */
export const rotationVibes = [
  "Piano / keys",
  "Genre-hopping",
  "Deep-work playlists",
] as const;

/** Alias for older imports; prefer `rotationVibes`. */
export const instrumentsAndTools = rotationVibes;

/** Your standout track - edit title/artist in this file. */
export const onRepeat = {
  title: "Disillusioned",
  artist: "Daniel Caesar",
  note: "The kind of track I loop when a refactor finally clicks.",
};

export const albumCrate: AlbumPick[] = [
  {
    title: "Kind of Blue",
    artist: "Miles Davis",
    note: "Breathing room between commits",
    tag: "Late night",
  },
  {
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    tag: "Storytelling",
  },
  {
    title: "Selected Ambient Works 85-92",
    artist: "Aphex Twin",
    note: "Headphones on, notifications off",
    tag: "Focus",
  },
  {
    title: "In Rainbows",
    artist: "Radiohead",
    tag: "Tension & release",
  },
];

/** Optional: set to a public Spotify playlist URL to show an embed behind a button. */
export const playlistUrl: string | null = null;
