import { NextResponse } from "next/server";
import { clearTokenCookie, laravelFetch } from "@/lib/laravel";

export async function POST() {
  await laravelFetch("/auth/logout", { method: "POST" }).catch(() => null);
  await clearTokenCookie();
  return NextResponse.json({ success: true });
}
