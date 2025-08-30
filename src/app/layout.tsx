
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import FooterWrapper from "./components/FooterWrapper";



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
         {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0LW2ES5PCM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
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
