import { NextResponse } from "next/server";
import { laravelFetch, setTokenCookie } from "@/lib/laravel";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.username || !body?.password) {
    return NextResponse.json({ error: "Username & password required" }, { status: 400 });
  }

  const res = await laravelFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: body.username, password: body.password }),
  });

  const json = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: json.message ?? "Login failed" }, { status: res.status });
  }

  await setTokenCookie(json.data.token);
  return NextResponse.json({ success: true });
}
