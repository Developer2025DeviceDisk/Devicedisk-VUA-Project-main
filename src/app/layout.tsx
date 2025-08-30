import type { Metadata } from "next";
import Script from "next/script"; // ✅ import next/script
import "./globals.css";
import Header from "./components/Header";
import FooterWrapper from "./components/FooterWrapper";

export const metadata: Metadata = {
  title: "VVWorx Future Forward Marketing",
  description: "VVWorx Future Forward Marketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning>
        {/* ✅ Google Analytics Scripts */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0LW2ES5PCM"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0LW2ES5PCM');
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
