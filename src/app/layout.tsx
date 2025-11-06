import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import InteractiveBackground from "@/components/InteractiveBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ryan Gupta | Portfolio",
  description: "Full Stack Developer & Designer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <InteractiveBackground />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
