import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import { fetchProjects } from "@/lib/laravel";
import { siteName, siteUrl } from "@/lib/site";

export const revalidate = 60;

const title = "Archived Works";
const description =
  "The full archive of selected projects by M. Fajri Ramadhan — web applications, e-commerce systems, and management tools.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    siteName,
    title: `${title} | ${siteName}`,
    description,
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
    title: `${title} | ${siteName}`,
    description,
    images: ["/og-image.jpg"],
  },
};

export default async function ArchivePage() {
  const projects = await fetchProjects();

  return (
    <main className="bg-[#020202] pt-16 overflow-x-clip [touch-action:pan-y_pinch-zoom]">
      <Projects projects={projects} showCta={false} />
    </main>
  );
}
