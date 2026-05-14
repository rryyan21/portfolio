import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story | Ryan Gupta",
  description:
    "Background — school, research, products, and the languages, frameworks, and tools behind the work.",
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
