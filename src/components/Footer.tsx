import Link from "next/link";
import { ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-width site-footer">
      <p className="mono">
        © {new Date().getFullYear()} RYAN GUPTA{" "}
        <Link
          href="/arcade"
          className="secret-link"
          aria-label="A small detour: arcade"
        >
          ✳
        </Link>
      </p>
      <p>Made with care. Still curious.</p>
      <a className="text-link" href="#main-content">
        Back to top <ArrowUp size={15} aria-hidden="true" />
      </a>
    </footer>
  );
}
