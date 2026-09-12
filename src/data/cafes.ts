export type CafeRating = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type CafeCategory = "coffee" | "study" | "overall";
export type CafeSort = "visited" | CafeCategory;
export interface Cafe {
  id: string;
  name: string;
  location: string;
  website: string;
  order: string | null;
  description: string | null;
  ratings: Record<CafeCategory, CafeRating | null>;
}
export const cafeCategories: {
  id: CafeCategory;
  label: string;
  sortLabel: string;
}[] = [
  { id: "coffee", label: "Coffee", sortLabel: "Best coffee" },
  { id: "study", label: "Study spot", sortLabel: "Best study spot" },
  { id: "overall", label: "Overall", sortLabel: "Best overall experience" },
];
// Ryan's personal notes and scores. null means not rated, never a zero score.
export const cafes: Cafe[] = [
  {
    id: "blossom",
    name: "Blossom Café",
    location: "Milton, Ontario",
    website: "https://www.chudleighs.com/blossom-cafe/",
    order: "Cappuccino with an extra shot",
    description: null,
    ratings: { coffee: 3.5, study: 3, overall: 3 },
  },
  {
    id: "cannelle",
    name: "Cannelle",
    location: "Ann Arbor, MI",
    website: "https://www.mkcannelle.com/cannelle-annarbor",
    order: "Cappuccino",
    description: null,
    ratings: { coffee: 4.5, study: 4, overall: 4.5 },
  },
  {
    id: "m36",
    name: "M36 Coffee",
    location: "Ann Arbor, MI",
    website:
      "https://m36coffeeroasters.com/pages/m36-coffee-south-university-cafe",
    order: "Overdrive cappuccino",
    description: null,
    ratings: { coffee: 3, study: 4, overall: 3.5 },
  },
  {
    id: "caphein",
    name: "Caphein",
    location: "Austin, TX",
    website: "https://caphein.myshopify.com/",
    order: "Vietnamese coffee with ube foam",
    description: null,
    ratings: { coffee: 5, study: 1.5, overall: 3 },
  },
];

/** Descending scores, unrated last, preserving list order for ties. */
export function sortCafes(entries: readonly Cafe[], sort: CafeSort): Cafe[] {
  if (sort === "visited") return [...entries];
  return entries
    .map((cafe, index) => ({ cafe, index }))
    .sort(
      (a, b) =>
        (b.cafe.ratings[sort] ?? -1) - (a.cafe.ratings[sort] ?? -1) ||
        a.index - b.index,
    )
    .map(({ cafe }) => cafe);
}
export function cafeRank(
  entries: readonly Cafe[],
  cafe: Cafe,
  category: CafeCategory,
): number | null {
  const score = cafe.ratings[category];
  if (score === null) return null;
  return (
    1 +
    entries.filter((entry) => (entry.ratings[category] ?? -1) > score).length
  );
}
