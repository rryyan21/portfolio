"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-[#fffdf8]">
      <Image
        src="/assets/images/snoopy.png"
        alt="Snoopy sitting on his doghouse"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-xl font-semibold text-gray-700 mb-1">
        This page doesn’t exist...
      </p>
      <p className="text-gray-500 italic mb-6">...just like Mondays 💤</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
