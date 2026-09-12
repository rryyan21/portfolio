import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Coffee, Guitar, Camera } from "lucide-react";
import { personalStory, personalPhotos } from "@/data/about";

export const metadata: Metadata = {
  title: "About me",
  description:
    "Meet Ryan Gupta: software, robotics, guitar, and a growing list of favorite coffee stops.",
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-width subpage about-page"
    >
      <section className="about-intro" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">A LITTLE MORE ABOUT ME</p>
          <h1 id="about-title">Hey, I’m Ryan.</h1>
          <p className="about-lead">
            A computer science and robotics student at Michigan, usually
            building something or looking for my next coffee stop.
          </p>
          <p>
            This is a little space for the person behind the projects: what I’m
            working toward, the things I enjoy, and a few moments along the way.
          </p>
        </div>
        <figure className="about-portrait">
          <Image
            src="/assets/images/RyanHeadshot.jpg"
            alt="Ryan Gupta on campus in autumn"
            width={1362}
            height={2047}
            priority
            sizes="(max-width: 767px) 90vw, 360px"
          />
          <figcaption>On campus, in between everything else.</figcaption>
        </figure>
      </section>
      <section className="about-story" aria-label="Software and robotics">
        {personalStory.map(({ title, body }) => (
          <div key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
        <Link className="about-journey-link" href="/#experience">
          Follow my journey <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
      <section className="about-hobbies" aria-labelledby="hobbies-title">
        <p className="eyebrow">AWAY FROM THE SCREEN</p>
        <h2 id="hobbies-title">A few things I make time for.</h2>
        <div className="about-hobby-grid">
          <Link href="/music">
            <Guitar size={28} aria-hidden="true" />
            <h3>Guitar & music</h3>
            <p>
              What I play, what I listen to, and what keeps finding its way back
              into the rotation.
            </p>
            <span>Explore my soundtrack ↗</span>
          </Link>
          <Link href="/cafes">
            <Coffee size={28} aria-hidden="true" />
            <h3>Really good coffee</h3>
            <p>
              My café stops, usual orders, and personal rankings for coffee,
              studying, and the whole experience.
            </p>
            <span>Find my favorite cafés ↗</span>
          </Link>
        </div>
      </section>
      <section className="about-album" aria-labelledby="album-title">
        <p className="eyebrow">THE CAMERA ROLL</p>
        <h2 id="album-title">A few moments along the way.</h2>
        <div className="about-photo-grid">
          {personalPhotos.map((photo) => (
            <figure key={photo.caption}>
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={1000}
                  sizes="(max-width: 767px) 90vw, 33vw"
                />
              ) : (
                <div className="about-photo-placeholder">
                  <Camera size={28} aria-hidden="true" />
                  <span>Photo coming soon</span>
                </div>
              )}
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
