import { NextResponse } from "next/server";
import { laravelFetch } from "@/lib/laravel";

async function forwardJson(res: Response) {
  const json = await res.json().catch(() => ({ message: "Laravel request failed" }));
  return NextResponse.json(json, { status: res.status });
}

function invalidId(id: string) {
  return !/^\d+$/.test(id)
    ? NextResponse.json({ message: "ID tidak valid" }, { status: 400 })
    : null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bad = invalidId(id);
  if (bad) return bad;
  const res = await laravelFetch(`/admin/projects/${id}`);
  return forwardJson(res);
}

async function update(req: Request, id: string) {
  const bad = invalidId(id);
  if (bad) return bad;
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    form.set("_method", "PUT");
    const res = await laravelFetch(`/admin/projects/${id}`, { method: "POST", body: form });
    return forwardJson(res);
  }

  const res = await laravelFetch(`/admin/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: await req.text(),
  });
  return forwardJson(res);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return update(req, id);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return update(req, id);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bad = invalidId(id);
  if (bad) return bad;
  const res = await laravelFetch(`/admin/projects/${id}`, { method: "DELETE" });
  return forwardJson(res);
}
