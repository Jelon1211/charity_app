import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ColorProvider from "./ColorProvider";
import { NODE_ENV } from "../../config/const";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charity app",
  description: "App to track charity money",
};

export default function RootLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams?: { [key: string]: string | undefined };
}) {
  const bg = searchParams?.bg || "#333";
  const text = searchParams?.text || "#fff";
  const bgs = searchParams?.bgs || "#222";
  const colorsecond = searchParams?.colorsecond || "#444";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ColorProvider
          bg={bg}
          text={text}
          bgs={bgs}
          colorsecond={colorsecond}
        />
        {children}
      </body>
    </html>
  );
}
