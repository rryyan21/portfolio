"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title-screen",
  weight: ["400", "600", "700"],
});

const STORAGE_KEY = "portfolio-title-screen-dismissed";

/** Set to a public path (e.g. `/assets/video/hero.mp4`) when you have a background clip. */
const TITLE_VIDEO_SRC: string | null = null;

export default function TitleScreen() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  });
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  const onExitTransition = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity") return;
    if (!exiting) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    setExiting(false);
  }, [exiting]);

  const skipAnimationDismiss = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${cinzel.variable} fixed inset-0 z-[100] flex flex-col font-serif transition-[opacity,visibility] duration-700 ease-out motion-reduce:transition-none ${
        exiting ? "pointer-events-none invisible opacity-0" : "opacity-100"
      }`}
      style={{ fontFamily: "var(--font-title-screen), ui-serif, Georgia, serif" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="title-screen-name"
      aria-describedby="title-screen-tag"
      onTransitionEnd={onExitTransition}
    >
      {/* Background: swap TITLE_VIDEO_SRC when your clip is ready */}
      {TITLE_VIDEO_SRC ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={TITLE_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950 via-emerald-950/80 to-black"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(20,50,35,0.35)_0%,transparent_65%)]"
        aria-hidden
      />
      {/* Soft “ember” motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[12, 28, 44, 58, 72, 18, 65, 38, 82, 22, 50, 88].map((left, i) => (
          <span
            key={i}
            className="title-screen-ember absolute h-1 w-1 rounded-full bg-amber-200/70 blur-[0.5px]"
            style={{
              left: `${left}%`,
              top: `${55 + (i % 4) * 8}%`,
              animationDelay: `${i * 0.45}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-32 pt-24 text-center md:pb-36">
        <h1
          id="title-screen-name"
          className="text-[clamp(2.25rem,6vw,4rem)] font-semibold tracking-[0.18em] text-white drop-shadow-[0_0_48px_rgba(255,255,255,0.35)]"
        >
          RYAN GUPTA
        </h1>
        <p
          id="title-screen-tag"
          className="mt-5 text-sm tracking-[0.55em] text-white/75 md:text-base"
        >
          — PORTFOLIO —
        </p>
      </div>

      <nav
        className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-4 px-8 pb-10 pt-6 text-sm tracking-[0.28em] text-white/90 md:px-16 md:pb-14 md:text-[15px]"
        aria-label="Title screen"
      >
        <button
          type="button"
          onClick={dismiss}
          className="border-none bg-transparent p-2 text-left text-white/80 transition hover:text-white"
        >
          Exit
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="border-none bg-transparent p-2 text-center font-semibold text-white transition hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        >
          New Game
        </button>
        <Link
          href="/story"
          onClick={skipAnimationDismiss}
          className="p-2 text-right text-white/80 no-underline transition hover:text-white"
        >
          Options
        </Link>
      </nav>

      <p
        className="pointer-events-none absolute bottom-3 right-6 text-[10px] tracking-widest text-white/35"
        aria-hidden
      >
        v 20.26
      </p>
    </div>
  );
}
