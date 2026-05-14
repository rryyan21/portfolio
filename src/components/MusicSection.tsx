"use client";

import { useState } from "react";
import { Disc3, Music, ExternalLink, Headphones, Library } from "lucide-react";
import {
  albumCrate,
  musicIntro,
  onRepeat,
  playlistUrl,
  rotationVibes,
} from "@/data/music";
import { useSpotifyTheme } from "@/components/SpotifyThemeProvider";
import { SPOTIFY_THEME_POLL_MS } from "@/lib/spotifyThemeTypes";

const spotify = {
  green: "#1ed760",
  subtext: "#a7a7a7",
  card: "#181818",
  elevated: "#282828",
  border: "rgba(255, 255, 255, 0.1)",
} as const;

export default function MusicSection() {
  const { live, liveLoading } = useSpotifyTheme();
  const [showEmbed, setShowEmbed] = useState(false);
  const pollSeconds = SPOTIFY_THEME_POLL_MS / 1000;

  return (
    <section className="relative">
      <div
        className="rounded-xl border p-5 shadow-2xl md:p-8"
        style={{
          backgroundColor: "rgba(18, 18, 18, 0.94)",
          borderColor: spotify.border,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header — dashboard strip */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: spotify.green }}
            >
              Soundtrack
            </p>
            <h1 className="font-display mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              What I listen to when building
            </h1>
          </div>
          <p
            className="flex max-w-md items-center gap-2 text-sm"
            style={{ color: spotify.subtext }}
          >
            <Disc3 className="h-4 w-4 shrink-0" style={{ color: spotify.green }} aria-hidden />
            <span>No in-browser playback — metadata only from Spotify.</span>
          </p>
        </div>

        <p
          className="mt-6 max-w-2xl text-sm leading-relaxed md:text-base"
          style={{ color: spotify.subtext }}
        >
          {musicIntro}
        </p>

        {/* Now playing — hero row */}
        <div
          className="mt-8 rounded-lg border p-5 md:p-6"
          style={{ backgroundColor: spotify.card, borderColor: spotify.border }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Headphones
                className="h-5 w-5"
                strokeWidth={1.75}
                style={{ color: spotify.green }}
                aria-hidden
              />
              <h2 className="font-display text-base font-semibold text-white">
                Now playing
              </h2>
            </div>
            {live?.ok && live.track && live.trackSource ? (
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide"
                style={
                  live.trackSource === "playing"
                    ? {
                        borderColor: "rgba(30, 215, 96, 0.45)",
                        backgroundColor: "rgba(30, 215, 96, 0.12)",
                        color: spotify.green,
                      }
                    : {
                        borderColor: "rgba(255, 205, 80, 0.35)",
                        backgroundColor: "rgba(255, 205, 80, 0.08)",
                        color: "rgb(253 224 71)",
                      }
                }
              >
                {live.trackSource === "playing" ? (
                  <>
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: spotify.green }}
                      aria-hidden
                    />
                    Live
                  </>
                ) : (
                  "Last played"
                )}
              </span>
            ) : null}
          </div>

          {liveLoading ? (
            <p className="mt-6 text-sm" style={{ color: spotify.subtext }}>
              Checking Spotify…
            </p>
          ) : live?.ok && live.track ? (
            <div className="mt-6 flex flex-col items-stretch gap-6 sm:flex-row sm:items-center">
              {live.track.albumImageUrl ? (
                <div className="shrink-0 flex justify-center sm:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote Spotify CDN */}
                  <img
                    src={live.track.albumImageUrl}
                    alt={`${live.track.album} cover art`}
                    width={200}
                    height={200}
                    className="h-44 w-44 rounded-md object-cover shadow-lg ring-1 ring-white/10 sm:h-48 sm:w-48"
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                  {live.track.name}
                </p>
                <p className="mt-2 text-base font-medium" style={{ color: spotify.subtext }}>
                  {live.track.artist}
                </p>
                <p className="mt-1 text-sm" style={{ color: spotify.subtext }}>
                  {live.track.album}
                </p>
                {live.trackSource === "recent" && live.track.playedAt ? (
                  <p className="mt-3 text-xs opacity-80" style={{ color: spotify.subtext }}>
                    Logged at{" "}
                    {(() => {
                      const d = new Date(live.track.playedAt);
                      return Number.isNaN(d.getTime())
                        ? live.track.playedAt
                        : d.toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          });
                    })()}
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm" style={{ color: spotify.subtext }}>
              {live?.error ??
                "Nothing to show yet. Play something on Spotify or check back after listening."}
            </p>
          )}

          <p
            className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed"
            style={{ color: spotify.subtext }}
          >
            Colors on this page follow your{" "}
            <strong className="font-medium text-white/90">now playing</strong> track when
            Spotify reports one (cover art may fall back if missing). Otherwise they follow your{" "}
            <strong className="font-medium text-white/90">most recent</strong> listen from the
            Spotify account you authorized. Refreshes about every {pollSeconds} seconds on this
            page only.
          </p>
        </div>

        {/* Library-style grid */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <article
            className="flex flex-col rounded-lg border p-5 md:p-6"
            style={{ backgroundColor: spotify.card, borderColor: spotify.border }}
          >
            <div className="flex items-center gap-2 text-accent">
              <Music className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              <h2 className="font-display text-base font-semibold text-white">Heavy rotation</h2>
            </div>
            <p className="mt-1 text-sm" style={{ color: spotify.subtext }}>
              One track I keep coming back to — edit in{" "}
              <code
                className="rounded px-1.5 py-0.5 text-xs text-white/90"
                style={{ backgroundColor: spotify.elevated }}
              >
                src/data/music.ts
              </code>
              .
            </p>

            <div
              className="mt-6 rounded-lg border p-5"
              style={{ backgroundColor: spotify.elevated, borderColor: spotify.border }}
            >
              <p className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                {onRepeat.title}
              </p>
              <p className="mt-2 text-base font-semibold text-accent">{onRepeat.artist}</p>
              {onRepeat.note ? (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: spotify.subtext }}>
                  {onRepeat.note}
                </p>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {rotationVibes.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <div
            className="flex flex-col rounded-lg border p-5 md:p-6"
            style={{ backgroundColor: spotify.card, borderColor: spotify.border }}
          >
            <div className="flex items-center gap-2 text-gold">
              <Library className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              <h2 className="font-display text-base font-semibold text-white">Shelf picks</h2>
            </div>
            <p className="mt-1 text-sm" style={{ color: spotify.subtext }}>
              Albums that shaped how I think about space, tension, and payoff.
            </p>

            <div className="mt-6 grid flex-1 gap-3 sm:grid-cols-2">
              {albumCrate.map((album) => (
                <div
                  key={`${album.artist}-${album.title}`}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 transition duration-300 hover:border-accent/35 hover:shadow-[0_0_28px_-10px_color-mix(in_srgb,var(--accent)_40%,transparent)]"
                >
                  {album.tag ? (
                    <span className="mb-2 w-fit rounded border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-soft">
                      {album.tag}
                    </span>
                  ) : null}
                  <p className="font-display text-base font-semibold leading-snug text-white transition-colors group-hover:text-accent-soft">
                    {album.title}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: spotify.subtext }}>
                    {album.artist}
                  </p>
                  {album.note ? (
                    <p className="mt-2 text-xs leading-relaxed opacity-90" style={{ color: spotify.subtext }}>
                      {album.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            {playlistUrl ? (
              <div className="mt-6 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setShowEmbed((v) => !v)}
                  className="inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
                  style={{ color: spotify.green }}
                >
                  <ExternalLink className="h-4 w-4" />
                  {showEmbed ? "Hide playlist" : "Open playlist embed"}
                </button>
                {showEmbed ? (
                  <div className="mt-4 overflow-hidden rounded-lg ring-1 ring-white/10">
                    <iframe
                      title="Playlist"
                      src={playlistUrl}
                      className="h-80 w-full"
                      loading="lazy"
                      allow="encrypted-media"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
