import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createToken, hashPassword, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username & password required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin || admin.password !== hashPassword(password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createToken();
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
