import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const monument = localFont({
  src: [
    {
      path: "../../public/fonts/MonumentExtended-Ultrabold.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-monument",
});

const siteUrl = "https://mfajriramadhan.vercel.app";
const siteName = "M Fajri Ramadhan";
const siteDescription =
  "Full-Stack Developer portfolio — crafting clean interfaces with React & Next.js and powering them with Laravel. Explore projects, certificates, and get in touch.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Creative Developer 2026`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "M Fajri Ramadhan",
    "MFRDHN",
    "Full-Stack Developer",
    "Laravel Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Web Developer Indonesia",
    "Jonggol",
  ],
  authors: [{ name: "M. Fajri Ramadhan", url: siteUrl }],
  creator: "M. Fajri Ramadhan",
  publisher: "M. Fajri Ramadhan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Creative Developer 2026`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Creative Developer 2026`,
    description: siteDescription,
    images: ["/og-image.jpg"],
    creator: "@mfrdhn",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "M. Fajri Ramadhan",
    url: siteUrl,
    jobTitle: "Full-Stack Developer",
    description: siteDescription,
    sameAs: [
      "https://github.com/MFRDHN",
      "https://www.linkedin.com/in/m-fajri-ramadhan-919058373/",
      "https://www.instagram.com/_mf.ramadhan_",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jonggol",
      addressRegion: "West Java",
      addressCountry: "ID",
    },
  };

  return (
    <html lang="en" className={`${monument.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
