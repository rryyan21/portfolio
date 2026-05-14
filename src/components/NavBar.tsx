"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { isNavGroup, mainNav } from "@/data/navigation";

const SPOTIFY_GREEN = "#1ed760";

function pathActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMusicPage = pathname === "/music" || pathname.startsWith("/music/");

  const linkDesktopClass = (active: boolean) =>
    `inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors ${
      active
        ? "font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-[10px]"
        : isMusicPage
          ? "text-neutral-400 hover:text-white"
          : "text-muted hover:text-accent-soft"
    }`;

  const linkMobileClass = (active: boolean) =>
    `block rounded-lg px-4 py-3 text-base font-medium no-underline ${
      active
        ? "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-8"
        : isMusicPage
          ? "text-neutral-400"
          : "text-muted"
    }`;

  return (
    <nav
      className={`navbar fixed top-0 z-50 w-full border-b px-4 py-3 md:px-8 ${
        isMusicPage
          ? "border-white/10 bg-black/90 backdrop-blur-md"
          : "border-white/10 bg-slate-950/70 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2">
        <Link
          href="/"
          className={`font-display text-lg font-semibold tracking-tight no-underline md:text-xl ${
            isMusicPage ? "text-white" : "text-gold"
          }`}
        >
          Ryan Gupta
        </Link>

        <ul className="m-0 hidden list-none flex-row flex-wrap items-center gap-x-0.5 gap-y-1 p-0 md:flex">
          {mainNav.map((item) => {
            if (!isNavGroup(item)) {
              const { href, label } = item;
              const active = pathActive(pathname, href);
              return (
                <li key={href} className="m-0 p-0">
                  <Link href={href} className={linkDesktopClass(active)}>
                    {label}
                  </Link>
                </li>
              );
            }

            const hobbiesActive = item.children.some((c) => pathActive(pathname, c.href));

            return (
              <li key={item.label} className="group relative m-0 p-0">
                <button
                  type="button"
                  className={`inline-flex cursor-pointer items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium ${
                    hobbiesActive
                      ? "font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-[10px]"
                      : isMusicPage
                        ? "text-neutral-400 hover:text-white"
                        : "text-muted hover:text-accent-soft"
                  }`}
                  aria-haspopup="menu"
                >
                  {item.label}
                  <ChevronDown
                    className="h-3.5 w-3.5 opacity-70 transition group-hover:rotate-180"
                    aria-hidden
                  />
                </button>
                <ul
                  role="menu"
                  className="invisible absolute left-0 top-full z-50 mt-0.5 min-w-[11rem] translate-y-1 rounded-lg border border-white/10 bg-slate-950/95 py-1 opacity-0 shadow-xl backdrop-blur-xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                >
                  {item.children.map((child) => {
                    const active = pathActive(pathname, child.href);
                    const musicActive = active && child.href === "/music" && isMusicPage;
                    return (
                      <li key={child.href} role="none" className="m-0 p-0">
                        <Link
                          role="menuitem"
                          href={child.href}
                          className={`block px-3 py-2 text-sm no-underline transition-colors ${
                            musicActive
                              ? "font-semibold text-white underline decoration-2 underline-offset-4"
                              : active
                                ? "bg-white/[0.06] font-semibold text-ink"
                                : isMusicPage
                                  ? "text-neutral-300 hover:bg-white/10 hover:text-white"
                                  : "text-muted hover:bg-white/[0.06] hover:text-ink"
                          }`}
                          style={
                            musicActive
                              ? { textDecorationColor: SPOTIFY_GREEN }
                              : undefined
                          }
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="flex flex-col gap-1.5 rounded-md p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 ${isMusicPage ? "bg-white" : "bg-ink"}`}
          />
          <span
            className={`block h-0.5 w-6 ${isMusicPage ? "bg-white" : "bg-ink"}`}
          />
          <span
            className={`block h-0.5 w-6 ${isMusicPage ? "bg-white" : "bg-ink"}`}
          />
        </button>
      </div>

      {isOpen ? (
        <div
          className={`absolute left-0 top-full w-full border-b py-4 shadow-lg md:hidden ${
            isMusicPage
              ? "border-white/10 bg-black/95 backdrop-blur-md"
              : "border-white/10 bg-slate-950/95 backdrop-blur-xl"
          }`}
        >
          <ul className="m-0 list-none space-y-0 p-0">
            {mainNav.map((item) => {
              if (!isNavGroup(item)) {
                const { href, label } = item;
                const active = pathActive(pathname, href);
                return (
                  <li key={href} className="m-0 p-0">
                    <Link
                      href={href}
                      className={linkMobileClass(active)}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label} className="m-0 p-0">
                  <div className="px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {item.label}
                  </div>
                  <ul className="m-0 list-none p-0">
                    {item.children.map((child) => {
                      const active = pathActive(pathname, child.href);
                      const musicActive = active && child.href === "/music" && isMusicPage;
                      return (
                        <li key={child.href} className="m-0 p-0">
                          <Link
                            href={child.href}
                            className={`block rounded-lg py-2.5 pl-8 pr-4 text-base font-medium no-underline ${
                              musicActive
                                ? "font-semibold text-white underline decoration-2 underline-offset-8"
                                : active
                                  ? "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-8"
                                  : isMusicPage
                                    ? "text-neutral-400"
                                    : "text-muted"
                            }`}
                            style={
                              musicActive
                                ? { textDecorationColor: SPOTIFY_GREEN }
                                : undefined
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
