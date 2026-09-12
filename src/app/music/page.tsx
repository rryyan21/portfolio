import type { Metadata } from "next";
import MusicSection from "@/components/MusicSection";
export const metadata: Metadata = {
  title: "Soundtrack",
  description:
    "Guitar, records, and what’s on repeat. A side chapter by Ryan Gupta.",
};
export default function MusicPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-width subpage">
      <MusicSection />
    </main>
  );
}
