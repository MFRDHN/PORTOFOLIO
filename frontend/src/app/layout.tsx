import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import {
  contactEmail,
  personId,
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
  siteUrl,
  socialLinks,
} from "@/lib/site";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "M. Fajri Ramadhan", url: siteUrl }],
  creator: "M. Fajri Ramadhan",
  publisher: "M. Fajri Ramadhan",
  category: "technology",
  applicationName: siteName,
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
    title: siteTitle,
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
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
    creator: "@mfrdhn",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "M. Fajri Ramadhan",
        alternateName: ["MFRDHN", "Muhammad Fajri Ramadhan"],
        url: siteUrl,
        image: `${siteUrl}/aset/pp.png`,
        jobTitle: "Full-Stack Developer",
        description: siteDescription,
        email: `mailto:${contactEmail}`,
        knowsAbout: [
          "Web Development",
          "Laravel",
          "PHP",
          "Next.js",
          "React",
          "MySQL",
          "Flutter",
        ],
        sameAs: socialLinks,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jonggol",
          addressRegion: "West Java",
          addressCountry: "ID",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
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
