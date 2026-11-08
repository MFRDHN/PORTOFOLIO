import { NextResponse } from "next/server";
import { laravelFetch } from "@/lib/laravel";

async function forwardJson(res: Response) {
  const json = await res.json().catch(() => ({ message: "Laravel request failed" }));
  return NextResponse.json(json, { status: res.status });
}

export async function GET() {
  const res = await laravelFetch("/public/certificates");
  const json = await res.json().catch(() => ({ data: [] }));
  return NextResponse.json(json.data ?? [], { status: res.status });
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const res = await laravelFetch("/admin/certificates", { method: "POST", body: form });
    return forwardJson(res);
  }

  const res = await laravelFetch("/admin/certificates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await req.text(),
  });
  return forwardJson(res);
}
