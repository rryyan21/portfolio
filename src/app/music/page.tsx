import type { Metadata } from "next";
import MusicThemeShell from "@/components/music/MusicThemeShell";
import MusicSection from "@/components/MusicSection";

export const metadata: Metadata = {
  title: "Soundtrack | Ryan Gupta",
  description: "Music, listening habits, and what is on repeat.",
};

export default function MusicPage() {
  return (
    <MusicThemeShell>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-20 md:px-8 md:pt-24">
        <MusicSection />
      </main>
    </MusicThemeShell>
  );
}
