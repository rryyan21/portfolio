import type { Metadata } from "next";
import ProjectsSection from "@/components/Projects";
import ScenePanel from "@/components/ScenePanel";

export const metadata: Metadata = {
  title: "Projects | Ryan Gupta",
  description: "Selected software, game experiments, and research projects.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pt-28">
      <ScenePanel className="p-6 md:p-8 lg:p-10">
        <ProjectsSection />
      </ScenePanel>
    </main>
  );
}
