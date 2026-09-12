import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-width subpage empty-page"
    >
      <Image
        src="/assets/images/snoopy.png"
        alt="Snoopy taking a break on his doghouse"
        width={240}
        height={240}
        className="snoopy"
      />
      <p className="eyebrow">404 / UNCHARTED CHAPTER</p>
      <h1>A little off-script.</h1>
      <p>This page took the day off. Snoopy has the right idea.</p>
      <div className="hero-actions">
        <Link href="/" className="button button-primary">
          Back to the beginning
        </Link>
        <Link href="/arcade" className="button button-outline">
          Take a small detour ↗
        </Link>
      </div>
    </main>
  );
}
