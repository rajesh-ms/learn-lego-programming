import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEGO Python Programming - Learn Robotics with Code",
  description: "Master LEGO robotics programming with Python through interactive lessons, hands-on projects, and step-by-step tutorials. Perfect for students and educators.",
  keywords: "LEGO, robotics, Python programming, education, STEM, learning, coding",
  authors: [{ name: "LEGO Programming Learning Platform" }],
  openGraph: {
    title: "LEGO Python Programming - Learn Robotics with Code",
    description: "Master LEGO robotics programming with Python through interactive lessons and projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
