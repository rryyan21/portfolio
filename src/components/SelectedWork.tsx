import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ChapterHeading from "@/components/ChapterHeading";
import Reveal from "@/components/Reveal";

/** Keep the homepage catalog on the server; only the archive needs filter state. */
export default function SelectedWork() {
  return (
    <section id="projects" className="chapter section-anchor">
      <Reveal>
        <ChapterHeading
          number="01"
          title="Things I’ve made."
          note="A few ideas I wanted to see through."
        />
        <div className="project-grid">
          {projects
            .filter((project) => project.selected)
            .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                showTags={false}
              />
            ))}
        </div>
        <div className="archive-link">
          <p className="mono">MORE EXPERIMENTS IN THE ARCHIVE</p>
          <Link className="text-link" href="/projects">
            All projects <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
