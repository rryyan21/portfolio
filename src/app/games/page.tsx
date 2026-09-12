import type { Metadata } from "next";
import Projects from "@/components/Projects";
export const metadata: Metadata = {
  title: "Games",
  description: "Grappling hooks, enemy AI, and game experiments.",
};
export default function GamesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-width subpage">
      <Projects initialFilter="game" />
    </main>
  );
}
