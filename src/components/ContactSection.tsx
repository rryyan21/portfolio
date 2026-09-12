import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { socialLinks } from "@/data/navigation";
import { availability } from "@/data/hero";
export default function ContactSection() {
  return (
    <div className="contact-panel">
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
      <div className="contact-bottom">
        <span className="mono">DIRECT LINE. REAL HUMAN.</span>
        <div className="social-row">
          <a href={socialLinks.email}>
            <Mail size={17} aria-hidden="true" /> Email
          </a>
          <a href={socialLinks.phone}>
            <Phone size={17} aria-hidden="true" /> +1 (530) 786-9574
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} aria-hidden="true" /> GitHub
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={17} aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
