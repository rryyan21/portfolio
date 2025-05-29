import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
    <html lang="en" className={poppins.className}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
