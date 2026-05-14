import Link from "next/link";
import ScenePanel from "@/components/ScenePanel";

export default function ComingSoonPage() {
  return (
    <section className="min-h-screen px-4 py-28 text-ink md:px-6">
      <div className="mx-auto max-w-lg">
        <ScenePanel className="p-8 text-center md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Work in progress
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Something new is loading
          </h1>
          <p className="mt-4 text-muted">
            This project is still under construction. Check back soon, or browse
            shipped work on the home page.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
          >
            Back to missions
          </Link>
        </ScenePanel>
      </div>
    </section>
  );
}
