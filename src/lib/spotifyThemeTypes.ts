/** Keep in sync with any client that polls `/api/spotify/theme` (e.g. MusicThemeShell). */
export const SPOTIFY_THEME_POLL_MS = 90_000;

export type SpotifyThemePayload = {
  ok: boolean;
  /** Which Spotify feed the theme + track metadata came from (when `ok`). */
  trackSource?: "playing" | "recent";
  track?: {
    name: string;
    artist: string;
    album: string;
    albumImageUrl: string | null;
    /** When source is recent: Spotify's `played_at` for that listen (ISO 8601). */
    playedAt?: string;
  };
  theme?: {
    "--page-bg": string;
    "--surface": string;
    "--surface-elevated": string;
    "--accent": string;
    "--accent-soft": string;
    "--accent-muted": string;
    "--accent-glow": string;
    "--gold": string;
    "--gold-muted": string;
    "--teal-accent": string;
  };
  error?: string;
};
