import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Play } from "lucide-react";
import type { Project } from "@/data/projects";
export default function ProjectCard({
  project,
  index = 0,
  showTags = true,
}: {
  project: Project;
  index?: number;
  showTags?: boolean;
}) {
  const wip = project.id === "WIP";
  const href = wip ? "/projects/coming-soon" : `/projects/${project.id}`;
  return (
    <article className={`project-card ${wip ? "project-wip" : ""}`}>
      <Link
        href={href}
        className="project-image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 360px"
          className="project-image"
        />
        <span className="project-index mono">0{index + 1}</span>
      </Link>
      <div className="project-card-body">
        <p className="eyebrow">
          {wip
            ? "STILL IN THE WORKSHOP"
            : `${project.category} / ${project.year}`}
        </p>
        <h3>
          <Link href={href}>
            {project.title}
            <ArrowUpRight size={21} aria-hidden="true" />
          </Link>
        </h3>
        <p className="project-description">
          {wip
            ? "The next experiment is taking shape. More when it’s ready."
            : project.description}
        </p>
        {showTags && (
          <ul className="tag-list">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <div className="project-links">
          <Link href={href}>
            {wip ? "Next chapter" : "Explore project"}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          {/^https:\/\/github\.com\//.test(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
            >
              <Github size={15} aria-hidden="true" /> Code
            </a>
          )}
          {project.demo.startsWith("https://") && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Play size={14} aria-hidden="true" /> Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
