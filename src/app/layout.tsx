
import "./globals.css";
import Header from './components/Header';
import FooterWrapper from './components/FooterWrapper';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Digital Marketing, Branding and MarTech Solutions",
  description: "VVWorx is a future-forward AI-driven marketing agency offering branding, content creation, digital marketing, VR/AR solutions, and AI calling agents. Serving Dubai, Mumbai & Pune.",
  keywords: "ai digital marketing company, ai branding agency, martech solutions dubai, martech solutions mumbai, martech solutions pune, ai-powered marketing services, vr and ar marketing solutions, ai calling agent services"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preload" href="/fonts/PetrovSans-Book.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Outfit-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
