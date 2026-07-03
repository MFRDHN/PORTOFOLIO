import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  const existing = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (existing) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashPassword("admin123"),
    },
  });

  return NextResponse.json({ message: "Admin created: admin / admin123" });
}
