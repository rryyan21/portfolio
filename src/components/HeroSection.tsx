import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center px-8 pt-24 gap-12 relative overflow-hidden bg-gradient-to-br from-white to-slate-100"
    >
      {/* Floating Background Dots */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 w-4 h-4 animate-pulse-color"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.9}s`,
          }}
        />
      ))}

      {/* Hero Text */}
      <div className="flex flex-col gap-4 max-w-lg z-10">
        <h1 className="text-5xl font-bold text-slate-800">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-blue-600 via-yellow-500 to-green-500 text-transparent bg-clip-text">
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

      {/* Profile Image + Blob */}
      <div className="relative w-80 h-80 z-10">
        <div className="absolute w-full h-full rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-r from-blue-600 to-blue-800 animate-[morph_8s_ease-in-out_infinite]"></div>
        <div className="absolute w-56 h-56 rounded-full overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
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
