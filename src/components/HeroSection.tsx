"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, Github, Linkedin } from "lucide-react";
import { heroSignals, heroTagline } from "@/data/hero";
import { titleMenu } from "@/data/navigation";
import ScenePanel from "@/components/ScenePanel";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-12 pt-24 md:px-6 md:pb-16 md:pt-28 lg:px-8"
    >
      <ScenePanel className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:gap-12 md:px-10 md:py-12 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="pointer-events-none absolute left-5 top-10 hidden h-[min(62vh,480px)] w-[3px] bg-gradient-to-b from-accent via-accent/70 to-accent/10 md:left-8 md:block"
          aria-hidden
        />

        <div className="relative z-10 flex max-w-xl flex-col gap-6 lg:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Main menu
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
            <span className="text-ink">Ryan Gupta</span>
            <br />
            <span className="text-ink md:mt-2 md:inline-block">
              Hi, I&apos;m{" "}
              <span className="hero-name-accent hero-name-glow">Ryan</span>
            </span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            {heroTagline}
          </p>

          <dl className="max-w-lg divide-y divide-border/60 border-t border-border/50">
            {heroSignals.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(0,5.5rem)_1fr] gap-x-4 gap-y-1 py-3 sm:grid-cols-[7rem_1fr]"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {label}
                </dt>
                <dd className="text-sm font-medium leading-snug text-ink md:text-[15px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="tel:+15307869574"
              className="rounded-md p-2 text-muted transition-colors hover:bg-accent-muted hover:text-accent-soft"
              aria-label="Phone"
            >
              <Phone size={20} strokeWidth={1.75} />
            </a>
            <a
              href="https://www.linkedin.com/in/ryan--gupta/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted transition-colors hover:bg-accent-muted hover:text-accent-soft"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.75} />
            </a>
            <a
              href="https://github.com/rryyan21"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted transition-colors hover:bg-accent-muted hover:text-accent-soft"
              aria-label="GitHub"
            >
              <Github size={20} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-1 flex-col gap-2 lg:max-w-md">
          <p className="pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Select chapter
          </p>
          <nav aria-label="Site sections" className="border-t border-border/50">
            <ul className="m-0 list-none p-0">
              {titleMenu.map((item) => (
                <li key={item.href} className="m-0 border-b border-border/50 p-0">
                  <Link
                    href={item.href}
                    className="menu-row group flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3.5 no-underline md:py-4"
                  >
                    <span className="font-mono text-xs font-semibold text-accent-soft tabular-nums">
                      {item.num}
                    </span>{" "}
                    <span className="min-w-[4rem] font-display text-base font-semibold tracking-wide text-ink md:text-lg">
                      {item.title}
                    </span>
                    <span className="hidden flex-1 text-right text-xs text-muted sm:block sm:max-w-[140px]">
                      {item.hint}
                    </span>
                    <ChevronRight
                      className="h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex justify-center pt-6 lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full ring-2 ring-gold/35 ring-offset-2 ring-offset-slate-950 md:h-52 md:w-52">
                <Image
                  src="/assets/images/RyanHeadshot.jpg"
                  alt="Ryan Gupta"
                  width={280}
                  height={280}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </ScenePanel>
    </section>
  );
}
