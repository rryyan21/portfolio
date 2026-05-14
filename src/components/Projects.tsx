"use client";

import { useMemo, useState } from "react";
import { projects, type ProjectKind } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const filters: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "app", label: "Apps" },
  { id: "game", label: "Games" },
  { id: "research", label: "Research / hardware" },
];

export default function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.kind === active);
  }, [active]);

  return (
    <section className="relative z-10">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-gold">
        Projects
      </p>
      <h1 className="font-display mt-3 text-center text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Missions archive
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted md:text-lg">
        Product builds, playful game experiments, and research-flavored systems
        — including a few titles that started as &quot;what if we tried this in a
        weekend?&quot;
      </p>

      <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-1 gap-y-2 border-b border-border/40 px-2">
        {filters.map(({ id, label }) => {
          const isOn = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${
                isOn
                  ? "text-ink"
                  : "text-muted hover:text-ink/90"
              }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full transition-opacity ${
                  isOn ? "bg-accent opacity-100" : "bg-transparent opacity-0"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="project-grid mt-14 grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
