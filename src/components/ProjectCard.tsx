"use client";

import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

function tagClassForKind(kind: Project["kind"]): string {
  switch (kind) {
    case "game":
      return "bg-teal-accent/12 text-teal-accent";
    case "research":
      return "bg-accent-muted text-accent-soft";
    default:
      return "bg-white/[0.06] text-ink/90";
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  const isWip = project.id === "WIP";
  const href = isWip ? "/projects/coming-soon" : `/projects/${project.id}`;

  return (
    <div className="group">
      <Link href={href} className="project-card block">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg ring-1 ring-white/10 transition group-hover:ring-white/20">
          <Image
            src={project.image}
            alt={project.title || "Project"}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {!isWip ? (
            <span className="absolute left-3 top-3 bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
              {project.kind === "game"
                ? "Game"
                : project.kind === "research"
                  ? "Research"
                  : "App"}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <h2 className="font-display text-lg font-semibold text-ink transition group-hover:text-accent">
            {project.title}
          </h2>
          {project.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${tagClassForKind(project.kind)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {project.description ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
