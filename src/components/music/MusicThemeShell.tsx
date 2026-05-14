"use client";

import type { ReactNode } from "react";

/**
 * Music page layout shell. Spotify palette vars are set on `document.documentElement`
 * by {@link SpotifyThemeProvider} in the root layout (single poll for the whole site).
 */
export default function MusicThemeShell({ children }: { children: ReactNode }) {
  return (
    <div className="music-theme-shell relative z-10 min-h-[calc(100vh-3.5rem)] w-full">
      {children}
    </div>
  );
}
