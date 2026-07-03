import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...project,
    images: JSON.parse(project.images),
    technologies: JSON.parse(project.technologies),
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        slug: body.slug,
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
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
