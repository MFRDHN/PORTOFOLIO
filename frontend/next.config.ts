import type { NextConfig } from "next";

const apiBase = process.env.LARAVEL_API_URL ?? "http://127.0.0.1:8000/api/v1";

let apiImagePattern: {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
} | null = null;

try {
  const api = new URL(apiBase);
  apiImagePattern = {
    protocol: api.protocol.replace(":", "") as "http" | "https",
    hostname: api.hostname,
    ...(api.port ? { port: api.port } : {}),
    pathname: "/**",
  };
} catch {
  apiImagePattern = null;
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      ...(apiImagePattern ? [apiImagePattern] : []),
    ],
  },
  async headers() {
    const isProduction = process.env.NODE_ENV === "production";

    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
      "connect-src 'self' https: ws: wss:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
