import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(
    projects.map((p) => ({
      ...p,
      images: JSON.parse(p.images),
      technologies: JSON.parse(p.technologies),
    }))
  );
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = body.slug || body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const project = await prisma.project.create({
      data: {
        slug,
        title: body.title,
        category: body.category,
        desc: body.desc,
        images: JSON.stringify(body.images || []),
        technologies: JSON.stringify(body.technologies || []),
        repoUrl: body.repoUrl || "",
        liveUrl: body.liveUrl || "",
        featured: body.featured || false,
      },
    });

    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images),
      technologies: JSON.parse(project.technologies),
    });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
