import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";


// Daftarkan Monument Extended
const monument = localFont({
  src: [
    {
      path: "../../public/fonts/MonumentExtended-Ultrabold.otf", // Pastikan file ada di folder ini
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-monument", // Nama variabel CSS
});

export const metadata: Metadata = {
  title: "M FAJRI RAMADHAN | Creative Developer 2026",
  description: "Built with Next.js 15, Framer Motion, and Monument Extended Font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${monument.variable} scroll-smooth`}>
      <body className="antialiased bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
