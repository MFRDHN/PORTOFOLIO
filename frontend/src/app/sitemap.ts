import type { MetadataRoute } from "next";
import { fetchProjects } from "@/lib/laravel";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchProjects();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const toAbsolute = (path: string) =>
    /^https?:\/\//.test(path)
      ? path
      : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
    const cover = project.cover || project.images[0];

    return {
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.createdAt ? new Date(project.createdAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
      ...(cover ? { images: [toAbsolute(cover)] } : {}),
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
