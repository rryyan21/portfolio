"use client";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Disc3 } from "lucide-react";
import {
  albumCrate,
  musicIntro,
  onRepeat,
  playlistUrl,
  rotationVibes,
} from "@/data/music";
import { useSpotifyTheme } from "@/components/SpotifyThemeProvider";
import { SPOTIFY_THEME_POLL_MS } from "@/lib/spotifyThemeTypes";
function embedUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "open.spotify.com")
      return null;
    const match = /^\/(?:embed\/)?playlist\/([a-zA-Z0-9]+)\/?$/.exec(
      url.pathname,
    );
    return match ? `https://open.spotify.com/embed/playlist/${match[1]}` : null;
  } catch {
    return null;
  }
}
export default function MusicSection() {
  const { live, liveLoading } = useSpotifyTheme();
  const [showEmbed, setShowEmbed] = useState(false);
  const track = live?.ok ? live.track : undefined;
  const embed = embedUrl(playlistUrl);
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">SIDE CHAPTER / SOUNDTRACK</p>
        <h1>A different kind of practice.</h1>
        <p>{musicIntro}</p>
      </header>
      <section
        className="paper-panel hobby-card now-playing"
        aria-label="Spotify listening activity"
        style={live?.ok && live.theme ? { ...live.theme, color: "var(--ink)" } as CSSProperties : undefined}
      >
        <div className="track-status">
          <h2>On the turntable.</h2>
          {track && (
            <span className="track-badge mono">
              {live?.trackSource === "playing" ? "● LIVE" : "LAST PLAYED"}
            </span>
          )}
        </div>
        <div className="track-row" aria-live="polite">
          {track ? (
            <>
              {track.albumImageUrl && (
                <Image
                  src={track.albumImageUrl}
                  alt={`${track.album} cover art`}
                  width={180}
                  height={180}
                  sizes="150px"
                  className="album-art"
                />
              )}
              <div>
                <h3>{track.name}</h3>
                <p>{track.artist}</p>
                <p>{track.album}</p>
                {live?.trackSource === "recent" && track.playedAt && (
                  <p className="mono">
                    LAST LISTEN ·{" "}
                    {new Date(track.playedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="track-placeholder">
              <Disc3 size={42} strokeWidth={1} aria-hidden="true" />
              <p>
                {liveLoading
                  ? "Finding the latest listen…"
                  : "A quiet moment between records. Until the next listen, here are a few that stay with me."}
              </p>
            </div>
          )}
        </div>
        <p className="music-caption">
          A window into my Spotify listening, with album-inspired colors across
          the portfolio. Updates about every {SPOTIFY_THEME_POLL_MS / 1000}{" "}
          seconds while you’re here. Current playback takes the lead; the last
          listen fills in between tracks.
        </p>
      </section>
      <div className="hobby-layout">
        <section className="paper-panel hobby-card">
          <p className="eyebrow">HEAVY ROTATION</p>
          <h2>One more listen.</h2>
          <div className="repeat-track">
            <h3>{onRepeat.title}</h3>
            <p>{onRepeat.artist}</p>
            <small>{onRepeat.note}</small>
          </div>
          <ul className="tag-list">
            {rotationVibes.map((vibe) => (
              <li key={vibe}>{vibe}</li>
            ))}
          </ul>
        </section>
        <section className="paper-panel hobby-card">
          <p className="eyebrow">THE RECORD SHELF</p>
          <h2>Always within reach.</h2>
          <ol className="album-list">
            {albumCrate.map((album, i) => (
              <li key={album.title}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{album.title}</h3>
                  <p>{album.artist}</p>
                  <small>{album.note ?? album.tag}</small>
                </div>
              </li>
            ))}
          </ol>
          {embed && (
            <>
              <button
                className="text-link"
                type="button"
                aria-expanded={showEmbed}
                aria-controls="playlist"
                onClick={() => setShowEmbed(!showEmbed)}
              >
                {showEmbed ? "Close playlist −" : "Open playlist +"}
              </button>
              {showEmbed && (
                <iframe
                  id="playlist"
                  title="Ryan’s Spotify playlist"
                  src={embed}
                  className="playlist-embed"
                  loading="lazy"
                  allow="encrypted-media"
                />
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}
