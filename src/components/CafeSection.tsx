"use client";
import { useState } from "react";
import { ArrowUpRight, Coffee, MapPin } from "lucide-react";
import {
  cafes,
  cafeCategories,
  sortCafes,
  cafeRank,
  type CafeSort,
} from "@/data/cafes";
export default function CafeSection() {
  const [sort, setSort] = useState<CafeSort>("visited");
  const ordered = sortCafes(cafes, sort);
  const incomplete = cafes.some(
    (cafe) =>
      !cafe.order ||
      !cafe.description ||
      Object.values(cafe.ratings).some((rating) => rating === null),
  );
  const ratedCount =
    sort === "visited"
      ? 0
      : cafes.filter((cafe) => cafe.ratings[sort] !== null).length;
  return (
    <>
      <header className="page-heading cafe-heading">
        <p className="eyebrow">SIDE CHAPTER / COFFEE STOPS</p>
        <h1>One more café.</h1>
        <p>
          I’m big on coffee. These are a few cafés I’ve been to, with room for
          my usual order, a few notes, and how each one stacks up.
        </p>
        <div className="cafe-intro-note">
          <Coffee size={18} aria-hidden="true" />
          <span>
            Good coffee. Somewhere to study. A reason to stay a little longer.
          </span>
        </div>
      </header>
      <section aria-label="My café guide">
        <div className="cafe-toolbar">
          <p className="mono">{cafes.length} STOPS / MY PERSONAL SHORTLIST</p>
          <div className="cafe-sort">
            <label htmlFor="cafe-sort">Sort by</label>
            <select
              id="cafe-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as CafeSort)}
            >
              <option value="visited">My café list</option>
              {cafeCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.sortLabel}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="cafe-sort-note" role="status">
          {sort === "visited"
            ? incomplete
              ? "Three personal scores, each out of 5. Visit notes are still being filled in."
              : "Three personal scores, each out of 5. Pick a category to see my favorites."
            : ratedCount === 0
              ? "No scores for this category yet. The ranking will appear once I’ve added my ratings."
              : `${ratedCount} of ${cafes.length} cafés rated. Highest scores first; ties share a rank. Unrated stops follow.`}
        </p>
        <div className="cafe-grid">
          {ordered.map((cafe) => {
            const rank =
              sort === "visited" ? null : cafeRank(cafes, cafe, sort);
            return (
              <article className="paper-panel cafe-card" key={cafe.id}>
                <div className="cafe-card-top">
                  <span className="cafe-cup">
                    <Coffee size={25} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  {sort !== "visited" && (
                    <span className="cafe-rank mono">
                      {rank === null
                        ? "UNRATED"
                        : `#${rank} / ${cafeCategories.find((category) => category.id === sort)?.label.toUpperCase()}`}
                    </span>
                  )}
                </div>
                <h2>{cafe.name}</h2>
                <p className="cafe-location">
                  <MapPin size={14} aria-hidden="true" />
                  {cafe.location}
                </p>
                <div className="cafe-order">
                  <p className="eyebrow">MY ORDER</p>
                  <p>{cafe.order ?? "Order to come."}</p>
                </div>
                <div className="cafe-note">
                  <p className="eyebrow">A LITTLE NOTE</p>
                  <p>
                    {cafe.description ?? "I haven’t written up this visit yet."}
                  </p>
                </div>
                <dl className="cafe-ratings">
                  {cafeCategories.map((category) => (
                    <div
                      key={category.id}
                      className={sort === category.id ? "is-selected" : ""}
                    >
                      <dt>{category.label}</dt>
                      <dd>
                        {cafe.ratings[category.id] === null ? (
                          <span className="cafe-unrated">Not rated</span>
                        ) : (
                          <>
                            <strong>{cafe.ratings[category.id]}</strong>
                            <span> / 5</span>
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  className="text-link cafe-website"
                  href={cafe.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cafe.name} website`}
                >
                  Visit the café <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
