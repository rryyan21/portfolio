export interface DishMoment {
  title: string;
  detail: string;
}

export const cookingIntro =
  "Cooking is where I go off-script — same curiosity as engineering, but the feedback loop is tastier. I chase bold flavor, share meals with friends, and treat the kitchen like a lab with better music.";

/** Cuisines or styles you gravitate toward — edit freely */
export const flavors = [
  "South Indian comfort",
  "Late-night pasta",
  "Taco nights",
  "Baking experiments",
  "Feeding a crowd",
] as const;

/** Short vignettes — swap for your real stories */
export const signatureMoves: DishMoment[] = [
  {
    title: "The Sunday simmer",
    detail: "Low-and-slow sauces while I debug side projects in my head.",
  },
  {
    title: "Spice cabinet confidence",
    detail: "Toast the seeds first — same patience as tuning a controller.",
  },
  {
    title: "Friends at the table",
    detail: "The best reviews are laughter and someone asking for seconds.",
  },
];

/** Optional: paths under /public for food photos you add later */
export const cookingPhotos: { src: string; caption: string }[] = [
  // { src: "/assets/images/cooking-01.jpg", caption: "Homemade dosa night" },
];
