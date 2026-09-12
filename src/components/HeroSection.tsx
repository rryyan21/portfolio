import Link from "next/link";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { heroTagline } from "@/data/hero";
import { socialLinks } from "@/data/navigation";
import Portrait from "@/components/Portrait";
export default function HeroSection() {
  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> UNIVERSITY OF MICHIGAN · CS & ROBOTICS
        </p>
        <h1>
          Ryan Gupta<span className="text-accent">.</span>
        </h1>
        <p className="hero-headline">{heroTagline}</p>
        <p className="hero-description">
          I make tools, tinker with robots, and sometimes turn an idea into a
          game. Here are a few things I’ve been working on.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#projects">
            Explore projects <ArrowDown size={17} aria-hidden="true" />
          </Link>
          <a
            className="button button-outline"
            href={socialLinks.resume}
            download
          >
            Download resume <ArrowDownToLine size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="social-row">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} aria-hidden="true" /> GitHub{" "}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={17} aria-hidden="true" /> LinkedIn{" "}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href={socialLinks.email}>
            <Mail size={17} aria-hidden="true" /> Email{" "}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
      <Portrait />
      <div className="hero-bottom mono">
        <span>PORTFOLIO / 2026</span>
        <a href="#projects">
          SCROLL TO EXPLORE <ArrowDown size={13} aria-hidden="true" />
        </a>
        <span>ANN ARBOR, MI</span>
      </div>
    </section>
  );
}
