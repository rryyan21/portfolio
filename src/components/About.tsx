"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { GraduationCap, Rocket, Laptop, Brain } from "lucide-react";

export default function About() {
  const milestones = [
    {
      icon: <GraduationCap className="text-blue-600 w-6 h-6" />,
      title: "High School & Early Projects",
      timeframe: "Before 2023",
      description:
        "Started programming, robotics, and engineering projects that sparked a passion for autonomy and systems design.",
    },
    {
      icon: <Rocket className="text-purple-600 w-6 h-6" />,
      title: "University of Michigan",
      timeframe: "2023 – Present",
      description:
        "Studying Computer Science & Robotics. Contributing to MRacing and UWAFT on perception and control systems.",
    },
    {
      icon: <Brain className="text-red-500 w-6 h-6" />,
      title: "Research & Teaching",
      timeframe: "2024 – Present",
      description:
        "Involved in research on autonomous systems and mentoring peers through IA/TA positions.",
    },
    {
      icon: <Laptop className="text-green-600 w-6 h-6" />,
      title: "Youphoria + ProofIt",
      timeframe: "2025 – Present",
      description:
        "Building real-world tools with Youphoria and developing personal projects like ProofIt and GaslightingBot.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section
      id="about"
      className="about py-24 px-6 bg-gradient-to-br from-slate-100 to-white relative z-10"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Me</h2>
        <p className="text-lg text-gray-700 mb-12">
          I'm a passionate developer with a keen eye for design. I create
          beautiful, user‑focused applications that solve real problems and make
          a difference.
        </p>

        {/* Skills Grid */}
        <div className="skills grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-20">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Programming Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript",
                "TypeScript",
                "Python",
                "C++",
                "Java",
                "HTML/CSS",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-2 border-blue-600 text-blue-600 px-4 py-1 text-sm shadow-sm bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">
              Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Node.js",
                "Tensorflow",
                "Pytorch",
                "Numpy",
                "Pandas",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-2 border-yellow-500 text-yellow-500 px-4 py-1 text-sm shadow-sm bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-500 mb-4">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {["Eclipse", "GitHub", "GitLab", "Replit"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-2 border-green-500 text-green-500 px-4 py-1 text-sm shadow-sm bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <h3 className="text-3xl font-bold text-gray-800 mb-12">My Journey</h3>
        <div
          ref={ref}
          className="relative border-l-4 border-blue-200 pl-6 space-y-12 text-left max-w-3xl mx-auto"
        >
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              variants={{ visible: { opacity: 1, y: 0 } }}
            >
              <div className="bg-white rounded-full shadow p-2 -ml-[35px] z-10">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 italic mb-1">
                  {item.timeframe}
                </p>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
