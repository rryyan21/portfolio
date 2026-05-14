"use client";

import Image from "next/image";
import { ChefHat, Flame, UtensilsCrossed } from "lucide-react";
import {
  cookingIntro,
  flavors,
  signatureMoves,
  cookingPhotos,
} from "@/data/cooking";
import ScenePanel from "@/components/ScenePanel";

export default function CookingSection() {
  return (
    <section className="relative z-10">
      <ScenePanel className="p-6 md:p-10 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Passage
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          The kitchen log
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {cookingIntro}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {flavors.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-ink/90"
            >
              <Flame className="h-3.5 w-3.5 text-accent-soft/90" aria-hidden />
              {f}
            </span>
          ))}
        </div>

        <div className="mt-12 border-t border-border/40 lg:grid lg:grid-cols-2 lg:gap-0">
          <div className="border-b border-border/40 py-10 lg:border-b-0 lg:border-r lg:py-12 lg:pr-10">
            <div className="flex items-center gap-2 text-gold">
              <ChefHat className="h-6 w-6" strokeWidth={1.75} />
              <h2 className="font-display text-lg font-semibold text-ink md:text-xl">
                Field notes
              </h2>
            </div>
            <ul className="mt-6 divide-y divide-border/40">
              {signatureMoves.map((m) => (
                <li key={m.title} className="py-5 first:pt-0">
                  <p className="font-semibold text-ink">{m.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {m.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-10 lg:py-12 lg:pl-10">
            <div className="flex items-center gap-2 text-teal-accent">
              <UtensilsCrossed className="h-5 w-5" strokeWidth={1.75} />
              <h2 className="font-display text-lg font-semibold text-ink">
                Photo wall
              </h2>
            </div>
            {cookingPhotos.length > 0 ? (
              <ul className="mt-6 grid grid-cols-2 gap-4">
                {cookingPhotos.map((ph) => (
                  <li key={ph.src} className="overflow-hidden rounded-lg ring-1 ring-white/10">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={ph.src}
                        alt={ph.caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <p className="p-2 text-center text-xs text-muted">{ph.caption}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Drop food photos in{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-gold">
                  public/assets/images/
                </code>{" "}
                and list them in{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-gold">
                  src/data/cooking.ts
                </code>{" "}
                as <code className="text-xs">cookingPhotos</code> — this panel will
                render them automatically.
              </p>
            )}
          </div>
        </div>
      </ScenePanel>
    </section>
  );
}
