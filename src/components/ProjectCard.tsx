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
    >
      <Link
        href={`/projects/${project.id}`}
        className="project-card bg-white rounded-xl overflow-hidden shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="relative w-full aspect-video overflow-hidden group rounded-t-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center rounded-t-xl">
            <video
              src={project.video}
              controls
              className="max-w-[90%] max-h-[90%] rounded-md"
            />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-full font-medium border-2 bg-white ${
                  tagStyleMap[tag] || "border-gray-300 text-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
