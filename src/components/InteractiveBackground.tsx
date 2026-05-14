"use client";

/**
 * Full-viewport backdrop driven by CSS vars from `/api/spotify/theme` (album palette).
 * Solid base + soft accent bloom — no illustration layers.
 */
export default function InteractiveBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-[background-color] duration-[1.2s] ease-out"
      aria-hidden
    >
      {/* Core fill — Spotify-derived --page-bg from SpotifyThemeProvider */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--page-bg)" }}
      />

      {/* Single soft wash from album accent (reads unique per track) */}
      <div
        className="absolute inset-0 opacity-[0.38] transition-opacity duration-[1.2s] ease-out"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 80% at 50% -20%,
              color-mix(in srgb, var(--accent) 55%, transparent) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 90% 70% at 100% 100%,
              color-mix(in srgb, var(--teal-accent) 22%, transparent) 0%,
              transparent 50%
            )
          `,
        }}
      />

      {/* Film grain — keeps large flat fields from feeling like a default gray */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Bottom read legibility for long pages */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 50%, color-mix(in srgb, var(--surface) 55%, black) 100%)",
        }}
      />
    </div>
  );
}
