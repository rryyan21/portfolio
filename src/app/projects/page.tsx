import type { Metadata } from "next";
import Projects from "@/components/Projects";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software products, multiplayer games, and hardware experiments by Ryan Gupta.",
};
export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-width subpage">
      <Projects />
    </main>
  );
}
