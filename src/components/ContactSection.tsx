"use client";

import { useState } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fieldClass =
    "w-full border-0 border-b border-border/60 bg-transparent px-0 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent/60";

  return (
    <section className="relative z-10">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-gold">
        Contact
      </p>
      <h1 className="font-display mt-3 text-center text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Open comms
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">
        Research collaborations, internships, or a weird idea worth prototyping
        — I am always happy to hear from curious people.
      </p>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-12 border-t border-border/40 pt-14 md:grid-cols-2 md:gap-16">
        <div className="space-y-5 text-muted">
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
            <span className="text-ink/90">ryangpt@umich.edu</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 shrink-0 text-teal-accent" strokeWidth={1.75} />
            <span className="text-ink/90">+1 (530) 786-9574</span>
          </div>
          <div className="flex items-center gap-4">
            <Linkedin className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.75} />
            <a
              href="https://www.linkedin.com/in/ryan--gupta/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink transition hover:text-accent"
            >
              LinkedIn profile
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Github className="h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} />
            <a
              href="https://github.com/rryyan21"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink transition hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-1 rounded-xl bg-surface/40 p-6 ring-1 ring-white/[0.06] md:p-8"
        >
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className={fieldClass}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className={`${fieldClass} mt-2 resize-y`}
            required
          />
          <button
            type="submit"
            className="mt-6 rounded-lg bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
          >
            Send message
          </button>
          {submitted ? (
            <p className="text-center text-sm font-medium text-teal-accent">
              Thanks — I will get back to you soon.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
