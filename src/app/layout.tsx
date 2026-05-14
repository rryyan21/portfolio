import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import InteractiveBackground from "@/components/InteractiveBackground";
import SpotifyThemeProvider from "@/components/SpotifyThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Ryan Gupta | Engineer, builder, player",
  description:
    "Computer science and robotics at Michigan. Full-stack projects, research, music, and cooking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-transparent font-sans antialiased text-ink"
        suppressHydrationWarning
      >
        <SpotifyThemeProvider>
          <InteractiveBackground />
          <NavBar />
          {children}
        </SpotifyThemeProvider>
      </body>
    </html>
  );
}
