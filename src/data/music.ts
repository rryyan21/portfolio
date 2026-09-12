export interface AlbumPick {
  title: string;
  artist: string;
  note?: string;
  /** Small label on the card, e.g. "Late night" */
  tag?: string;
}

export const musicIntro =
  "Guitar is what I reach for when I step away from the screen. Here’s a little of what I listen to, play, and keep coming back to.";

/** Short phrases - shown as chips under "Heavy rotation". Edit freely. */
export const rotationVibes = [
  "Guitar",
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
