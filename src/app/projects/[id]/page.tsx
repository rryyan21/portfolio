"use client";

import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";
import Link from "next/link";

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Use React.use() to unwrap the Promise
  const resolvedParams = use(params);
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) return notFound();

  return (
    <section className="min-h-screen py-24 px-6 bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Title Row */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">{project.title}</h1>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              {project.year}
            </span>
          </div>
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Video Only */}
          <div className="col-span-2">
            <video
              src={project.video}
              controls
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Right: About Card */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">About the Project</h2>
            <p className="text-sm mb-6 text-gray-600">{project.description}</p>

            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-medium border-2 border-blue-300 text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={project.github}
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2"
              >
                🔗 View Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2"
              >
                🚀 Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        <motion.div
          className="mt-16 bg-white p-8 rounded-xl shadow-md space-y-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {project.details?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 border-blue-100">
                📘 Project Details
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {project.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {project.features?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 border-blue-100">
                🚀 Key Features
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {project.challenges?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 border-blue-100">
                🧩 Challenges Faced
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {project.challenges.map((challenge, i) => (
                  <li key={i}>{challenge}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {project.achievements?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 border-blue-100">
                🏆 Achievements
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {project.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* Back Link */}
        <div className="mt-16">
          <Link href="/#projects" className="text-blue-600 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
