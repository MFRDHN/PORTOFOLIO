import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProject, fetchProjects } from "@/lib/laravel";
import { personId, siteName, siteUrl } from "@/lib/site";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

function summarize(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteUrl}/projects/${project.slug}`;
  const description = summarize(project.desc);
  const image = project.cover || project.images[0];

  return {
    title: project.title,
    description,
    keywords: [project.title, project.category, ...project.technologies],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} | ${siteName}`,
      description,
      siteName,
      ...(project.createdAt ? { publishedTime: project.createdAt } : {}),
      images: image
        ? [{ url: image, alt: project.title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteName}`,
      description,
      images: image ? [image] : ["/og-image.jpg"],
    },
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) notFound();

  const url = `${siteUrl}/projects/${project.slug}`;
  const image = project.cover || project.images[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.desc,
        url,
        image: image ? [image] : undefined,
        keywords: project.technologies.join(", "),
        genre: project.category,
        dateCreated: project.createdAt ?? undefined,
        author: { "@id": personId },
        creator: { "@id": personId },
        ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
