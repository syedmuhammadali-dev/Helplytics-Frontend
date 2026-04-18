import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "HelpHub AI | Find help faster. Become help that matters.",
  description: "HelpHub AI is a community-powered support network for students, mentors, creators, and builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col font-outfit antialiased">
        <div className="bg-gradient-blur" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
