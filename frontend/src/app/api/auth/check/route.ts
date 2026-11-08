import { NextResponse } from "next/server";
import { laravelFetch } from "@/lib/laravel";

export async function GET() {
  const res = await laravelFetch("/auth/me");
  return NextResponse.json({ authenticated: res.ok });
}
