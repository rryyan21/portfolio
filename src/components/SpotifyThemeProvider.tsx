"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchSpotifyThemePayload } from "@/lib/spotifyThemeClient";
import {
  SPOTIFY_THEME_POLL_MS,
  type SpotifyThemePayload,
} from "@/lib/spotifyThemeTypes";

export type SpotifyThemeContextValue = {
  live: SpotifyThemePayload | null;
  liveLoading: boolean;
};

const SpotifyThemeContext = createContext<SpotifyThemeContextValue | null>(
  null,
);

export function useSpotifyTheme(): SpotifyThemeContextValue {
  const ctx = useContext(SpotifyThemeContext);
  if (!ctx) {
    throw new Error("useSpotifyTheme must be used within SpotifyThemeProvider");
  }
  return ctx;
}

export default function SpotifyThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [live, setLive] = useState<SpotifyThemePayload | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let running = false;
    const controller = new AbortController();

    const run = async () => {
      if (running || document.visibilityState === "hidden") return;
      running = true;
      const data = await fetchSpotifyThemePayload(controller.signal);
      running = false;
      if (cancelled) return;
      setLive(data);
      setLiveLoading(false);
    };

    void run();
    const visible = () => {
      if (document.visibilityState === "visible") void run();
    };
    document.addEventListener("visibilitychange", visible);
    const timer = setInterval(() => void run(), SPOTIFY_THEME_POLL_MS);

    return () => {
      cancelled = true;
      controller.abort();
      document.removeEventListener("visibilitychange", visible);
      clearInterval(timer);
    };
  }, []);

  const value: SpotifyThemeContextValue = { live, liveLoading };

  return (
    <SpotifyThemeContext.Provider value={value}>
      {children}
    </SpotifyThemeContext.Provider>
  );
}
