import { NextResponse } from "next/server";
import { extractThemeFromImageBuffer } from "@/lib/paletteFromImage";
import type { SpotifyThemePayload } from "@/lib/spotifyThemeTypes";
import {
  fetchCurrentlyPlayingTrack,
  fetchRecentlyPlayedTrack,
  refreshSpotifyAccessToken,
  type RecentTrackMeta,
} from "@/lib/spotifyServer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
} as const;

export async function GET(): Promise<NextResponse<SpotifyThemePayload>> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "Spotify theme disabled: missing env (see .env.example).",
      },
      { status: 200, headers: NO_STORE }
    );
  }

  try {
    const { access_token: accessToken } = await refreshSpotifyAccessToken(
      refreshToken,
      clientId,
      clientSecret
    );

    const now = await fetchCurrentlyPlayingTrack(accessToken);
    const recent = await fetchRecentlyPlayedTrack(accessToken);

    const artUrl = now?.albumImageUrl ?? recent?.albumImageUrl ?? null;
    const trackSource: "playing" | "recent" = now ? "playing" : "recent";
    const baseMeta: RecentTrackMeta | null = now ?? recent;

    if (!baseMeta) {
      return NextResponse.json(
        {
          ok: false,
          error: "No playback or listening history yet.",
        },
        { headers: NO_STORE }
      );
    }

    if (!artUrl) {
      return NextResponse.json(
        {
          ok: false,
          track: { ...baseMeta, albumImageUrl: null },
          trackSource,
          error: "No album art URL available for theme.",
        },
        { headers: NO_STORE }
      );
    }

    const imgRes = await fetch(artUrl, { cache: "no-store" });
    if (!imgRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          track: {
            name: baseMeta.name,
            artist: baseMeta.artist,
            album: baseMeta.album,
            albumImageUrl: artUrl,
            playedAt: !now ? recent?.playedAt : undefined,
          },
          trackSource,
          error: `Album image fetch failed: ${imgRes.status}`,
        },
        { headers: NO_STORE }
      );
    }

    const buf = Buffer.from(await imgRes.arrayBuffer());
    const palette = await extractThemeFromImageBuffer(buf);

    const theme: SpotifyThemePayload["theme"] = {
      "--page-bg": palette.pageBg,
      "--surface": palette.surface,
      "--surface-elevated": palette.surfaceElevated,
      "--accent": palette.accent,
      "--accent-soft": palette.accentSoft,
      "--accent-muted": palette.accentMuted,
      "--accent-glow": palette.accentGlow,
      "--gold": palette.gold,
      "--gold-muted": palette.goldMuted,
      "--teal-accent": palette.tealAccent,
    };

    return NextResponse.json(
      {
        ok: true,
        trackSource,
        track: {
          name: baseMeta.name,
          artist: baseMeta.artist,
          album: baseMeta.album,
          albumImageUrl: artUrl,
          playedAt: !now ? recent?.playedAt : undefined,
        },
        theme,
      },
      { headers: NO_STORE }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 200, headers: NO_STORE }
    );
  }
}
