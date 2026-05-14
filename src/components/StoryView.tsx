"use client";

import type { LucideIcon } from "lucide-react";
import {
  Brain,
  GraduationCap,
  Laptop,
  Music2,
  Rocket,
  Sparkles,
} from "lucide-react";
import ScenePanel from "@/components/ScenePanel";
import { experienceTiles, storyIntro } from "@/data/story";
import type { StoryTileIcon } from "@/data/story";

const icons: Record<StoryTileIcon, LucideIcon> = {
  graduation: GraduationCap,
  music: Music2,
  rocket: Rocket,
  brain: Brain,
  laptop: Laptop,
  spark: Sparkles,
};

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Java",
  "HTML/CSS",
  "Swift",
] as const;

const frameworks = [
  "React",
  "Node.js",
  "Next.js",
  "TensorFlow",
  "PyTorch",
  "NumPy",
  "Pandas",
  "Tailwind",
  "OpenCV",
] as const;

const tools = ["Eclipse", "Git", "GitLab", "Replit"] as const;

const chapters = experienceTiles.filter((t) => t.id !== "throughline");

export default function StoryView() {
  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-24 md:px-6 md:pt-28">
      <ScenePanel className="p-6 md:p-8 lg:p-10">
        <header className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Story
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink/85 md:text-lg">
            {storyIntro}
          </p>
        </header>

        <ul className="mx-auto mt-12 max-w-3xl list-none space-y-6 p-0 md:mt-14 md:space-y-7">
          {chapters.map((tile) => {
            const Icon = icons[tile.icon];
            return (
              <li key={tile.id} className="m-0 p-0">
                <article className="rounded-2xl border border-white/12 bg-slate-950/90 p-6 shadow-sm md:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-gold">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <h2 className="font-display text-xl font-bold leading-snug text-ink md:text-2xl">
                        {tile.title}
                      </h2>
                      <p className="text-sm font-medium text-muted">{tile.era}</p>
                      {tile.questReward ? (
                        <p className="text-sm leading-snug text-ink/80">{tile.questReward}</p>
                      ) : null}
                      <p className="border-t border-white/10 pt-4 text-base leading-relaxed text-ink/85">
                        {tile.body}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <section className="mx-auto mt-16 max-w-5xl border-t border-white/12 pt-12 md:mt-20 md:pt-14">
          <div className="text-center">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Skills</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
              Languages, frameworks, and tools that show up across research, products, and side
              projects.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-10 text-left md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-ink/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {frameworks.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-ink/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-ink/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScenePanel>
    </main>
  );
}
