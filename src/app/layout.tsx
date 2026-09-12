import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import SpotifyThemeProvider from "@/components/SpotifyThemeProvider";
const inter = localFont({
  src: "./fonts/inter.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
});
const space = localFont({
  src: "./fonts/space-grotesk.woff2",
  display: "swap",
  variable: "--font-space",
  weight: "300 700",
});
export const metadata: Metadata = {
  title: {
    default: "Ryan Gupta | Software & Robotics",
    template: "%s | Ryan Gupta",
  },
  description:
    "Computer Science & Robotics at Michigan. Full-stack products, autonomous systems, and research. Open to Summer 2027 software engineering internships.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SpotifyThemeProvider>
          <InteractiveBackground />
          <NavBar />
          {children}
          <Footer />
        </SpotifyThemeProvider>
      </body>
    </html>
  );
}
