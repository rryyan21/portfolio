"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isFixed, setIsFixed] = useState(false);


  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center px-8 pt-24 gap-12 relative overflow-hidden"
    >

      {/* Hero Text */}
      <div className="flex flex-col gap-4 max-w-lg z-10">
        <h1 className="text-5xl font-bold text-slate-800">
          Hi, I&apos;m{" "}
          <span 
            className={isFixed ? "glow-text cursor-default" : "glitch-text cursor-pointer"}
            data-text="Ryan"
            onClick={() => !isFixed && setIsFixed(true)}
          >
            Ryan
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-600 text-lg">
          Full Stack Developer & Autonomous Engineer
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="#projects"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative w-80 h-80 z-10 flex items-center justify-center">
        <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl">
          <Image
            src="/assets/images/mainImg.jpg"
            alt="Profile Picture"
            width={250}
            height={250}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
