import type { SpotifyThemePayload } from "@/lib/spotifyThemeTypes";

const THEME_FETCH_MS = 20_000;

/**
 * Browser fetch for `/api/spotify/theme` with timeout so UI never hangs on
 * "Checking Spotify...".
 */
export async function fetchSpotifyThemePayload(): Promise<SpotifyThemePayload> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), THEME_FETCH_MS);
  try {
    const res = await fetch("/api/spotify/theme", {
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (!res.ok) {
      return {
        ok: false,
        error: `Theme request failed (${res.status}). Try a hard refresh or npm run dev:clean.`,
      };
    }
    try {
      return (await res.json()) as SpotifyThemePayload;
    } catch {
      return { ok: false, error: "Theme API returned invalid JSON." };
    }
  } catch (e) {
    const aborted =
      (typeof DOMException !== "undefined" &&
        e instanceof DOMException &&
        e.name === "AbortError") ||
      (e instanceof Error && e.name === "AbortError");
    if (aborted) {
      return {
        ok: false,
        error: "Theme request timed out. Restart dev with: npm run dev:clean",
      };
    }
    return { ok: false, error: "Could not reach the theme API." };
  } finally {
    clearTimeout(tid);
  }
}
