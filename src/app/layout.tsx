import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import SiteNav from "@/components/SiteNav";
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
  metadataBase: new URL("https://galaqua.dev"),
  title: {
    default: "Gal's Portfolio | Building AI-Driven Products",
    template: "%s | Gal's Portfolio"
  },
  description: "A software engineer specializing in AI-first workflows and building modern products.",
  icons: {
    icon: "/projects/portfolio.png",
    apple: "/projects/portfolio.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <SiteNav />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}