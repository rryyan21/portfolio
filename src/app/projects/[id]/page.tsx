import type { Metadata } from "next";
import { access } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
export function generateStaticParams() {
  return projects.filter((p) => p.id !== "WIP").map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project?.title ?? "Project not found",
    description: project?.description,
  };
}
async function existingVideo(src: string) {
  if (!src.startsWith("/assets/images/") || src.includes("..")) return false;
  try {
    await access(path.join(process.cwd(), "public", src));
    return true;
  } catch {
    return false;
  }
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  if (id === "WIP") redirect("/projects/coming-soon");
  const hasVideo = await existingVideo(project.video);
  return (
    <main id="main-content" tabIndex={-1} className="site-width subpage">
      <div className="detail-top">
        <Link href="/projects" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> Missions archive
        </Link>
        <span className="mono">
          {project.category.toUpperCase()} / {project.year}
        </span>
      </div>
      <header className="page-heading detail-intro">
        <p className="eyebrow">A BUILD IN DETAIL</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {project.attribution && (
          <div className="project-attribution">
            <a
              href={project.attribution.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.attribution.label}
            </a>
          </div>
        )}
        <div className="hero-actions">
          {/^https:\/\/github\.com\//.test(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <Github size={16} aria-hidden="true" /> View code{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {project.demo.startsWith("https://") && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
            >
              Live demo <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          <details className="build-tools">
            <summary>Tools used</summary>
            <ul className="tag-list">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </details>
        </div>
      </header>
      <div className="detail-media">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          priority
          sizes="(max-width: 767px) 92vw, 1180px"
        />
      </div>
      {hasVideo && (
        <details className="detail-video">
          <summary>Watch the recorded walkthrough</summary>
          <video
            controls
            preload="none"
            poster={project.image}
            width={1280}
            height={720}
            aria-label={`${project.title} recorded demonstration`}
          >
            <source src={project.video} type="video/mp4" />
            <p>
              Your browser does not support this video.{" "}
              <a href={project.video}>Download the walkthrough</a>.
            </p>
          </video>
        </details>
      )}
      <article
        className="case-study"
        aria-label={`${project.title}: the story`}
      >
        <section className="case-section">
          <h2>The idea</h2>
          <p>{project.caseStudy.problem}</p>
          <p>{project.caseStudy.role}</p>
        </section>
        <section className="case-section">
          <h2>Bringing it to life</h2>
          <p>{project.caseStudy.constraints}</p>
          <p>{project.caseStudy.decisions}</p>
        </section>
        <section className="case-section">
          <h2>The finished project</h2>
          <p>{project.caseStudy.result}</p>
          <details className="case-features">
            <summary>Explore the features</summary>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </details>
        </section>
        <section className="case-learned">
          <h2>What I’m taking with me</h2>
          <p>{project.caseStudy.learned}</p>
        </section>
      </article>
      <div className="archive-link">
        <Link href="/projects" className="text-link">
          <ArrowLeft size={15} aria-hidden="true" /> Back to all projects
        </Link>
        <Link href="/#contact" className="text-link">
          Let’s talk about it <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
