import type { Metadata } from "next";
import CafeSection from "@/components/CafeSection";
export const metadata: Metadata = {
  title: "Coffee stops",
  description:
    "Cafés I’ve visited, my orders, and personal ratings for coffee, studying, and the overall experience.",
};
export default function CafesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-width subpage">
      <CafeSection />
    </main>
  );
}
