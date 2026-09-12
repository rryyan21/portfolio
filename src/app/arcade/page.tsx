import type { Metadata } from "next";
import Link from "next/link";
import Arcade from "@/components/Arcade";
export const metadata: Metadata = {
  title: "Side quest",
  robots: { index: false, follow: false },
};
export default function ArcadePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-width subpage empty-page"
    >
      <p className="eyebrow">SECRET CHAPTER / YOU FOUND IT</p>
      <h1>A tiny intermission.</h1>
      <p>
        No leaderboard. No timer. Just a small lights-out puzzle.
        <br />
        Switch off every light. Each press flips its neighbors, too.
      </p>
      <Arcade />
      <Link className="text-link" href="/games">
        Back to the bigger experiments ↗
      </Link>
    </main>
  );
}
