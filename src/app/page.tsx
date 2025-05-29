import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/About";
import ProjectsSection from "@/components/Projects";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
