import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="projects py-24 px-6 bg-gradient-to-br from-white to-slate-100"
    >
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        My Projects
      </h2>
      <div className="project-grid grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
