"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const tagStyleMap: Record<string, string> = {
  JavaScript: "border-blue-500 text-blue-500",
  TypeScript: "border-blue-500 text-blue-500",
  Python: "border-blue-500 text-blue-500",
  "C++": "border-blue-500 text-blue-500",
  Java: "border-blue-500 text-blue-500",
  HTML: "border-blue-500 text-blue-500",
  CSS: "border-blue-500 text-blue-500",
  Swift: "border-blue-500 text-blue-500",
  React: "border-yellow-500 text-yellow-500",
  "Next.js": "border-yellow-500 text-yellow-500",
  "Node.js": "border-lime-500 text-lime-500",
  Tensorflow: "border-yellow-500 text-yellow-500",
  Pytorch: "border-yellow-500 text-yellow-500",
  Numpy: "border-yellow-500 text-yellow-500",
  Pandas: "border-yellow-500 text-yellow-500",
  Tailwind: "border-blue-500 text-blue-500",
  Eclipse: "border-green-500 text-green-500",
  Git: "border-green-500 text-green-500",
  GitLab: "border-green-600 text-green-600",
  Replit: "border-green-500 text-green-500",
  Greenfoot: "border-green-500 text-green-500",
  OpenCV: "border-green-500 text-green-500",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group"
    >
      <Link
        href={
          project.id === "WIP"
            ? "/projects/coming-soon"
            : `/projects/${project.id}`
        }
        className="project-card block bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-black/10 border-2 border-transparent hover:border-black/30"
      >
        <div className="relative w-full aspect-video overflow-hidden group/image rounded-t-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover/image:scale-105 rounded-t-xl"
          />
        </div>

        <div className="p-6 flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-full font-medium border-2 bg-white transition-all duration-300 group-hover:scale-105 ${
                  tagStyleMap[tag] || "border-gray-300 text-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
