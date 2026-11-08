import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import { fetchProjects } from "@/lib/laravel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archived Works",
  description:
    "The full archive of selected projects by M. Fajri Ramadhan — web applications, e-commerce systems, and management tools.",
};

export default async function ArchivePage() {
  const projects = await fetchProjects();

  return (
    <main className="bg-[#020202] pt-16 overflow-x-clip [touch-action:pan-y_pinch-zoom]">
      <Projects projects={projects} showCta={false} />
    </main>
  );
}
