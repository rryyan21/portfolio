"use client";

import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import ScenePanel from "@/components/ScenePanel";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  ExternalLink,
  Rocket,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) return notFound();

  const hasVideo = Boolean(project.video?.trim());
  const hasGithub = Boolean(project.github?.trim());
  const hasDemo = Boolean(project.demo?.trim());

  return (
    <section className="min-h-screen px-4 py-24 text-ink md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScenePanel className="p-6 md:p-8 lg:p-10">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4 border-b border-border/40 pb-8">
          <h1 className="font-display max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.category ? (
              <span className="bg-white/[0.06] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {project.category}
              </span>
            ) : null}
            {project.year ? (
              <span className="bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent-soft">
                {project.year}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            {hasVideo ? (
              <video
                src={project.video}
                controls
                className="w-full rounded-lg ring-1 ring-white/10"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03] text-sm text-muted">
                No demo video for this entry yet.
              </div>
            )}
          </div>

          <div className="space-y-6 border-t border-border/40 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                About the project
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gold">
                Technologies
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium text-ink/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {hasGithub ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-soft"
                >
                  <Code2 className="h-4 w-4" />
                  View code
                </a>
              ) : null}
              {hasDemo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gold underline-offset-4 hover:text-accent hover:underline"
                >
                  <Rocket className="h-4 w-4" />
                  Live demo
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-12 border-t border-border/40 pt-14">
          {project.details?.length > 0 ? (
            <Section
              title="Project details"
              icon={<BookOpen className="h-5 w-5 text-accent" />}
              items={project.details}
            />
          ) : null}
          {project.features?.length > 0 ? (
            <Section
              title="Key features"
              icon={<Sparkles className="h-5 w-5 text-teal-accent" />}
              items={project.features}
            />
          ) : null}
          {project.challenges?.length > 0 ? (
            <Section
              title="Challenges"
              icon={<Wrench className="h-5 w-5 text-accent" />}
              items={project.challenges}
            />
          ) : null}
          {project.achievements?.length > 0 ? (
            <Section
              title="Achievements"
              icon={<Trophy className="h-5 w-5 text-teal-accent" />}
              items={project.achievements}
            />
          ) : null}
        </div>

        <div className="mt-12 border-t border-border/40 pt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to missions
          </Link>
        </div>
        </ScenePanel>
      </div>
    </section>
  );
}

function Section({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 border-b border-border/40 pb-3 font-display text-xl font-bold text-ink">
        {icon}
        {title}
      </h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-[15px] leading-relaxed text-muted">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
