"use client";
import Image from "next/image";
import { useState } from "react";
export default function Portrait() {
  const [clicks, setClicks] = useState(0);
  return (
    <figure className="portrait-figure">
      <div className="portrait-outline" aria-hidden="true" />
      <button
        className="portrait-button"
        type="button"
        aria-label="Portrait of Ryan Gupta"
        onClick={() => setClicks((n) => n + 1)}
      >
        <Image
          src="/assets/images/RyanHeadshot.jpg"
          alt="Ryan Gupta on campus in autumn"
          width={1362}
          height={2047}
          priority
          fetchPriority="high"
          quality={65}
          sizes="(max-width: 767px) 294px, (max-width: 1023px) 274px, 339px"
          className="portrait-image"
        />
      </button>
      <figcaption className="portrait-caption">
        <span className="mono">FIG. 01: THE HUMAN</span>
        <span className="portrait-note" aria-live="polite">
          {clicks >= 5
            ? "Side quest unlocked: go make something."
            : "Usually building something."}
        </span>
      </figcaption>
      <span className="portrait-stamp mono" aria-hidden="true">
        IDEA → CODE → REAL WORLD
      </span>
    </figure>
  );
}
