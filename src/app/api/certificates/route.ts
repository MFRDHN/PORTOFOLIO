import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(certificates);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const certificate = await prisma.certificate.create({
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
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
