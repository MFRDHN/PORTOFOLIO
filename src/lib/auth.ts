import { createHmac, randomBytes } from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SECRET || "portfolio-secret-key";
const COOKIE_NAME = "admin_token";

export function createToken(): string {
  const payload = `admin:${Date.now()}:${randomBytes(16).toString("hex")}`;
  const signature = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = createHmac("sha256", SECRET).update(payload).digest("hex");
  return signature === expected;
}

export function hashPassword(password: string): string {
  return createHmac("sha256", SECRET).update(password).digest("hex");
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
