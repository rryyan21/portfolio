import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import ScenePanel from "@/components/ScenePanel";

export const metadata: Metadata = {
  title: "Contact | Ryan Gupta",
  description: "Get in touch for collaborations and opportunities.",
};

export default function ContactPage() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 md:pt-28">
      <ScenePanel className="p-6 md:p-8 lg:p-10">
        <ContactSection />
      </ScenePanel>
    </main>
  );
}
