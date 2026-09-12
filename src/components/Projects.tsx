"use client";
import { useState } from "react";
import { projects, type ProjectKind } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
const filters: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "app", label: "Apps" },
  { id: "game", label: "Games" },
  { id: "research", label: "Research & hardware" },
];
export default function Projects({
  initialFilter = "all",
}: {
  initialFilter?: "all" | ProjectKind;
}) {
  const [active, setActive] = useState(initialFilter);
  const visible = projects.filter((p) => active === "all" || p.kind === active);
  return (
    <section id="archive">
      <div className="page-heading">
        <p className="eyebrow">THE MISSIONS ARCHIVE</p>
        <h1>The projects so far.</h1>
        <p>Useful tools, playful experiments, and the games I learned on.</p>
      </div>
      <div className="filter-row" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {visible.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
