import Link from "next/link";
export default function ComingSoonPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-width subpage empty-page"
    >
      <p className="eyebrow">A CHAPTER STILL BEING WRITTEN</p>
      <h1>Back at the workbench.</h1>
      <p>
        The next experiment is taking shape. Until then, there’s plenty to
        explore in the archive.
      </p>
      <Link href="/projects" className="button button-primary">
        Explore the archive →
      </Link>
    </main>
  );
}
