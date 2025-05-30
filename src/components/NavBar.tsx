"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar fixed top-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <div className="logo text-xl font-bold text-blue-600">Ryan Gupta</div>

      <div className="nav-links hidden md:flex gap-8">
        <Link
          href="/#home"
          className="text-black hover:text-blue-600 font-medium"
        >
          Home
        </Link>
        <Link
          href="/#about"
          className="text-black hover:text-blue-600 font-medium"
        >
          About
        </Link>
        <Link
          href="/#projects"
          className="text-black hover:text-blue-600 font-medium"
        >
          Projects
        </Link>
        <Link
          href="/#contact"
          className="text-black hover:text-blue-600 font-medium"
        >
          Contact
        </Link>
      </div>

      <div
        className="hamburger md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </div>

      {isOpen && (
        <div className="mobile-menu absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 items-center py-4 md:hidden">
          <Link href="/#home" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/#about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/#projects" onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
