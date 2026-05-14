import type { Metadata } from "next";
import CookingSection from "@/components/CookingSection";

export const metadata: Metadata = {
  title: "Kitchen | Ryan Gupta",
  description: "Cooking, flavors, and the stories behind the stove.",
};

export default function CookingPage() {
  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-24 md:px-6 md:pt-28">
      <CookingSection />
    </main>
  );
}
