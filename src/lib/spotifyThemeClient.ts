import type { SpotifyThemePayload } from "@/lib/spotifyThemeTypes";
/** Spotify is optional: failures leave a quiet UI and the default paper theme. */
export async function fetchSpotifyThemePayload(
  signal?: AbortSignal,
): Promise<SpotifyThemePayload> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(abort, 20_000);
  try {
    const response = await fetch("/api/spotify/theme", {
      cache: "no-store",
      signal: controller.signal,
    });
    return response.ok
      ? ((await response.json()) as SpotifyThemePayload)
      : { ok: false };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}
