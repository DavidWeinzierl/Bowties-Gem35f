import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Bowties | Premium Austrian Wedding & Event Band",
  description: "The Bowties are a premium Austrian wedding and event band playing 60s Rock 'n' Roll, 80s Disco, Modern Hits, and Austropop. The soundtrack to your unforgettable event.",
  keywords: "The Bowties, Wedding Band Austria, Event Band, Live Music Austria, Austropop, Rock n Roll, Disco Band",
  openGraph: {
    title: "The Bowties | Premium Austrian Wedding & Event Band",
    description: "The Bowties are a premium Austrian wedding and event band playing 60s Rock 'n' Roll, 80s Disco, Modern Hits, and Austropop.",
    url: "https://thebowties.at",
    siteName: "The Bowties",
    locale: "de_AT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
