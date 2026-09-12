import { NextResponse } from "next/server";
import { extractThemeFromImageBuffer } from "@/lib/paletteFromImage";
import { AsyncCache } from "@/lib/spotifyCache";
import type { SpotifyThemePayload } from "@/lib/spotifyThemeTypes";
import {
  fetchCurrentlyPlayingTrack,
  fetchRecentlyPlayedTrack,
  refreshSpotifyAccessToken,
  spotifyAccountKey,
} from "@/lib/spotifyServer";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const NO_STORE = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
};
const palettes = new AsyncCache<
  Awaited<ReturnType<typeof extractThemeFromImageBuffer>>
>(24);
const responses = new AsyncCache<SpotifyThemePayload>(4);
const quiet: SpotifyThemePayload = { ok: false };
async function loadTheme(
  refreshToken: string,
  clientId: string,
  clientSecret: string,
): Promise<SpotifyThemePayload> {
  try {
    const { access_token: accessToken } = await refreshSpotifyAccessToken(
      refreshToken,
      clientId,
      clientSecret,
    );
    // A failure of one feed must not discard a usable result from the other.
    const [current, history] = await Promise.allSettled([
      fetchCurrentlyPlayingTrack(accessToken),
      fetchRecentlyPlayedTrack(accessToken),
    ]);
    const now = current.status === "fulfilled" ? current.value : null;
    const recent = history.status === "fulfilled" ? history.value : null;
    const track = now ?? recent;
    if (!track) return quiet;
    const artUrl = track.albumImageUrl ?? recent?.albumImageUrl;
    const base: SpotifyThemePayload = {
      ok: true,
      trackSource: now ? "playing" : "recent",
      track,
    };
    if (!artUrl) return base;
    try {
      const url = new URL(artUrl);
      if (
        url.protocol !== "https:" ||
        url.hostname !== "i.scdn.co" ||
        !url.pathname.startsWith("/image/")
      )
        return { ...base, track: { ...track, albumImageUrl: null } };
      // Artwork identity is stable across polls and often across tracks on an album.
      const palette = await palettes.get(
        artUrl,
        24 * 60 * 60 * 1000,
        async () => {
          const response = await fetch(artUrl, {
            cache: "no-store",
            signal: AbortSignal.timeout(5_000),
          });
          if (!response.ok) throw new Error("Artwork unavailable");
          const buffer = Buffer.from(await response.arrayBuffer());
          if (buffer.length > 5_000_000) throw new Error("Artwork too large");
          return extractThemeFromImageBuffer(buffer);
        },
      );
      return {
        ...base,
        track: { ...track, albumImageUrl: artUrl },
        theme: {
          "--page-bg": palette.pageBg,
          "--surface": palette.surface,
          "--surface-elevated": palette.surfaceElevated,
          "--ink": palette.ink,
          "--muted": palette.muted,
          "--border": palette.border,
          "--accent": palette.accent,
          "--accent-soft": palette.accentSoft,
          "--accent-muted": palette.accentMuted,
          "--accent-glow": palette.accentGlow,
          "--gold": palette.gold,
          "--gold-muted": palette.goldMuted,
          "--teal-accent": palette.tealAccent,
        },
      };
    } catch {
      return base;
    }
  } catch {
    return quiet;
  }
}
export async function GET(): Promise<NextResponse<SpotifyThemePayload>> {
  const {
    SPOTIFY_CLIENT_ID: clientId,
    SPOTIFY_CLIENT_SECRET: clientSecret,
    SPOTIFY_REFRESH_TOKEN: refreshToken,
  } = process.env;
  if (!clientId || !clientSecret || !refreshToken)
    return NextResponse.json(quiet, { headers: NO_STORE });
  const data = await responses.get(
    spotifyAccountKey(refreshToken, clientId, clientSecret),
    30_000,
    () => loadTheme(refreshToken, clientId, clientSecret),
  );
  return NextResponse.json(data, { headers: NO_STORE });
}
