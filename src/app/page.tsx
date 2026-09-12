import HeroSection from "@/components/HeroSection";
import StoryView from "@/components/StoryView";
import SelectedWork from "@/components/SelectedWork";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="site-width">
      <HeroSection />
      <SelectedWork />
      <StoryView />
      <section id="contact" className="chapter section-anchor">
        <Reveal>
          <ContactSection />
        </Reveal>
      </section>
    </main>
  );
}
