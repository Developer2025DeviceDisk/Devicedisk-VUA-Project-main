

import type { Metadata } from "next";
import "./globals.css";

import Header from './components/Header';

import Footer from './components/Footer';

// Use different weights based on your needs

export const metadata: Metadata = {
  title: "VUA Prototype",
  description: "Welcome to VUA Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">   
      <body suppressHydrationWarning>


        {/* Wrap the entire page with the children */}
        <Header />
        <main>{children}</main>


        <Footer />

      </body>
    </html>
  );
}
