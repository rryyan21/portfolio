import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { socialLinks } from "@/data/navigation";
import { availability } from "@/data/hero";
export default function ContactSection() {
  return (
    <div className="contact-panel">
      <div className="contact-main">
        <div className="contact-copy">
          <p className="eyebrow">CHAPTER 03 / OPEN COMMS</p>
          <h2>
            Good work starts
            <br />
            with a conversation<span className="text-accent">.</span>
          </h2>
          <p>
            {availability}.<br />
            Working on something interesting, or curious about a project? Let’s
            talk.
          </p>
          <a className="contact-email" href={socialLinks.email}>
            {socialLinks.email.slice("mailto:".length)}{" "}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <nav className="contact-profiles" aria-label="Social profiles">
          <p className="eyebrow">FIND ME ONLINE</p>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={28} aria-hidden="true" /> <span>GitHub</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={28} aria-hidden="true" /> <span>LinkedIn</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </nav>
      </div>
      <div className="contact-bottom">
        <div className="social-row">
          <a href={socialLinks.email}>
            <Mail size={17} aria-hidden="true" /> Email
          </a>
          <a href={socialLinks.phone}>
            <Phone size={17} aria-hidden="true" /> +1 (530) 786-9574
          </a>
        </div>
      </div>
    </div>
  );
}
