import { notFound } from "next/navigation";
import { fetchProject } from "@/lib/laravel";
import ProjectDetailClient from "./ProjectDetailClient";

export const dynamic = "force-dynamic";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
