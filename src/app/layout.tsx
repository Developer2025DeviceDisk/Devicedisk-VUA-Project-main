

import type { Metadata } from "next";
import "./globals.css";

import Header from './components/Header';

import Footer from './components/Footer';

// Use different weights based on your needs

export const metadata: Metadata = {
  title: "VVWorx Future Forward Marketing",
  description: "VVWorx Future Forward Marketing",
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
      </head>  
            <body suppressHydrationWarning>


        {/* Wrap the entire page with the children */}
        <Header />
        <main>{children}</main>


        <Footer />

      </body>
    </html>
  );
}
