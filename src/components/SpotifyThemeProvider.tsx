"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchSpotifyThemePayload } from "@/lib/spotifyThemeClient";
import {
  SPOTIFY_THEME_POLL_MS,
  type SpotifyThemePayload,
} from "@/lib/spotifyThemeTypes";

const THEME_STYLE_KEYS = [
  "--page-bg",
  "--surface",
  "--surface-elevated",
  "--accent",
  "--accent-soft",
  "--accent-muted",
  "--accent-glow",
  "--gold",
  "--gold-muted",
  "--teal-accent",
] as const;

function clearThemeStyles(el: HTMLElement) {
  for (const key of THEME_STYLE_KEYS) {
    el.style.removeProperty(key);
  }
}

function applyThemeToElement(
  el: HTMLElement,
  data: SpotifyThemePayload,
  lastSignature: { current: string | null }
) {
  if (!data.ok || !data.theme) {
    lastSignature.current = null;
    clearThemeStyles(el);
    return;
  }

  const sig = JSON.stringify(data.theme);
  if (sig === lastSignature.current) return;
  lastSignature.current = sig;

  for (const [key, value] of Object.entries(data.theme)) {
    el.style.setProperty(key, value);
  }
}

export type SpotifyThemeContextValue = {
  live: SpotifyThemePayload | null;
  liveLoading: boolean;
};

const SpotifyThemeContext = createContext<SpotifyThemeContextValue | null>(null);

export function useSpotifyTheme(): SpotifyThemeContextValue {
  const ctx = useContext(SpotifyThemeContext);
  if (!ctx) {
    throw new Error("useSpotifyTheme must be used within SpotifyThemeProvider");
  }
  return ctx;
}

export default function SpotifyThemeProvider({ children }: { children: ReactNode }) {
  const lastSignature = useRef<string | null>(null);
  const [live, setLive] = useState<SpotifyThemePayload | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;

    const run = async () => {
      const data = await fetchSpotifyThemePayload();
      if (cancelled) return;
      setLive(data);
      setLiveLoading(false);
      applyThemeToElement(root, data, lastSignature);
    };

    void run();
    const timer = setInterval(() => void run(), SPOTIFY_THEME_POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
      lastSignature.current = null;
      clearThemeStyles(root);
    };
  }, []);

  const value: SpotifyThemeContextValue = { live, liveLoading };

  return (
    <SpotifyThemeContext.Provider value={value}>{children}</SpotifyThemeContext.Provider>
  );
}
