"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
        className="project-card bg-white rounded-xl overflow-hidden shadow-md transform transition-transform hover:-translate-y-1"
      >
        <div className="relative w-full aspect-video overflow-hidden group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
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
                className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700"
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
