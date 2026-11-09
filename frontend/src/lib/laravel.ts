import { cookies } from "next/headers";
import type { Certificate, Project } from "./types";

const API_URL = process.env.LARAVEL_API_URL ?? "http://127.0.0.1:8000/api/v1";
export const AUTH_COOKIE = "portfolio_token";

type Envelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getToken(): Promise<string | undefined> {
  return (await cookies()).get(AUTH_COOKIE)?.value;
}

export async function setTokenCookie(token: string): Promise<void> {
  (await cookies()).set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearTokenCookie(): Promise<void> {
  (await cookies()).set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function laravelFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  const token = await getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

async function readData<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => null)) as Envelope<T> | null;
  if (!res.ok) {
    throw new Error(json?.message ?? `Laravel request failed (${res.status})`);
  }
  return json?.data as T;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/public/projects`, { next: { revalidate: 60 } });
    return await readData<Project[]>(res);
  } catch (error) {
    console.warn("Failed to load projects from Laravel:", error);
    return [];
  }
}

export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/public/projects/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    return await readData<Project>(res);
  } catch (error) {
    console.warn("Failed to load project from Laravel:", error);
    return null;
  }
}

export async function fetchCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(`${API_URL}/public/certificates`, { next: { revalidate: 60 } });
    return await readData<Certificate[]>(res);
  } catch (error) {
    console.warn("Failed to load certificates from Laravel:", error);
    return [];
  }
}
