"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Coffee, Guitar } from "lucide-react";

export default function HobbiesNav({ onNavigate }: { onNavigate: () => void }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const active = pathname === "/music" || pathname === "/cafes";
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      )
        ref.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  const navigate = () => {
    if (ref.current) ref.current.open = false;
    onNavigate();
  };
  return (
    <details
      className="hobbies-nav"
      ref={ref}
      data-active={active || undefined}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current?.open) {
          event.preventDefault();
          event.stopPropagation();
          ref.current.open = false;
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        Hobbies <ChevronDown size={14} aria-hidden="true" />
      </summary>
      <div className="hobbies-links">
        <Link
          href="/music"
          aria-current={pathname === "/music" ? "page" : undefined}
          onClick={navigate}
        >
          <Guitar size={17} aria-hidden="true" />
          <span>
            Music<small>Guitar & what’s on repeat</small>
          </span>
        </Link>
        <Link
          href="/cafes"
          aria-current={pathname === "/cafes" ? "page" : undefined}
          onClick={navigate}
        >
          <Coffee size={17} aria-hidden="true" />
          <span>
            Coffee Stops<small>My orders & favorite cafés</small>
          </span>
        </Link>
      </div>
    </details>
  );
}
