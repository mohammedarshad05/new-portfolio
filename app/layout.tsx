import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arshad-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohammed Arshad — Frontend-Focused Full Stack Developer",
    template: "%s | Mohammed Arshad",
  },
  description:
    "Software Developer specializing in building modern, responsive, and user-friendly web applications with React, Next.js, TypeScript, and PHP/Symfony.",
  openGraph: {
    title: "Mohammed Arshad — Frontend-Focused Full Stack Developer",
    description:
      "Software Developer specializing in building modern, responsive, and user-friendly web applications.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Arshad — Frontend-Focused Full Stack Developer",
    description:
      "Software Developer specializing in building modern, responsive, and user-friendly web applications.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
