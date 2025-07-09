import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Varad Ramesh Nikharage",
  description:
    "Personal website of Varad Nikharage. Explore my web projects, skills, resume, and contact info.",
  keywords:
    "Varad Nikharage, web developer, portfolio, React, Next.js, JavaScript, data entry",
  author: "Varad Nikharage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense> {children}</Suspense>
      </body>
    </html>
  );
}
