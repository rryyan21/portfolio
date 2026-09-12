"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import HobbiesNav from "@/components/HobbiesNav";
import { socialLinks } from "@/data/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("chapter-toggle")?.focus();
      }
    };
    if (open) document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="site-width nav-inner" aria-label="Main navigation">
        <Link href="/#home" className="wordmark" onClick={() => setOpen(false)}>
          rg<span className="text-accent">.</span>
          <span className="sr-only"> Ryan Gupta: home</span>
        </Link>
        <span className="nav-caption mono">A WORK IN PROGRESS, ALWAYS.</span>
        <button
          id="chapter-toggle"
          type="button"
          className="mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="chapter-links"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div
          id="chapter-links"
          className={`chapter-links ${open ? "is-open" : ""}`}
        >
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About me
          </Link>
          <HobbiesNav onNavigate={() => setOpen(false)} />
          <a
            className="nav-resume"
            href={socialLinks.resume}
            download
            onClick={() => setOpen(false)}
          >
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
