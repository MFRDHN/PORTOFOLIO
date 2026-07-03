import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const certificate = await prisma.certificate.findUnique({
    where: { id: Number(id) },
  });
  if (!certificate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(certificate);
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
    const certificate = await prisma.certificate.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        image: body.image || "",
        color: body.color || "#991b1b",
        gradient: body.gradient || "linear-gradient(145deg,#991b1b,#1a1a2e)",
        date: body.date,
        credentialUrl: body.credentialUrl || "",
      },
    });
    return NextResponse.json(certificate);
  } catch {
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
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
    await prisma.certificate.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
