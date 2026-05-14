"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Loads the title screen only on the client (sessionStorage + optional video)
 * without `next/dynamic(..., { ssr: false })` on the route, which can confuse
 * Turbopack manifest generation.
 */
export default function HomeIntro() {
  const [TitleScreen, setTitleScreen] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("@/components/TitleScreen").then((m) => {
      // Must use updater form: setState(fn) is "functional update". Passing the
      // component function directly would make React call it as an updater and
      // run hooks in an invalid context (see rules-of-hooks).
      if (!cancelled) setTitleScreen(() => m.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!TitleScreen) {
    return <div className="fixed inset-0 z-[100] bg-black" aria-hidden />;
  }

  return <TitleScreen />;
}
