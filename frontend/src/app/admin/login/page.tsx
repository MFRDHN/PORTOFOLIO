"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCube, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-neutral-50 text-neutral-900">
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0a0a0a] text-white p-12 xl:p-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(153,27,27,0.35),transparent_55%)]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
            <FaCube size={18} />
          </div>
          <span className="font-monument text-lg uppercase tracking-tight">
            MFR<span className="text-red-600">DHN</span>
          </span>
        </div>

        <div className="relative max-w-md">
          <span className="font-mono text-[10px] text-red-500 uppercase tracking-[0.5em]">(01) Secure Access</span>
          <h1 className="font-monument text-4xl xl:text-5xl uppercase leading-[1.05] tracking-tight mt-6">
            Portfolio
            <br />
            <span className="text-red-600 italic">Control</span> Room
          </h1>
          <p className="font-mono text-[11px] text-white/50 leading-relaxed mt-6 max-w-sm">
            Kelola project, sertifikat, dan pesan masuk dalam satu dashboard.
          </p>

          <ul className="mt-10 space-y-3">
            {["Projects & media", "Certificates", "Contact inbox"].map((item) => (
              <li key={item} className="flex items-center gap-3 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative font-mono text-[9px] text-white/25 uppercase tracking-widest">
          © 2026 MFR DHN — Admin Panel
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-10">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
              <FaCube size={18} />
            </div>
            <span className="font-monument text-lg uppercase tracking-tight">
              MFR<span className="text-red-600">DHN</span>
            </span>
          </div>

          <div className="mb-10">
            <h2 className="font-monument text-2xl uppercase tracking-tight">Admin Access</h2>
            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-3">Sign in to manage portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="font-mono text-[10px] text-red-600 text-center uppercase tracking-widest">{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="username" className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Username</label>
              <input
                id="username"
                type="text"
                placeholder="admin"
                autoComplete="username"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-3.5 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3.5 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-2 font-mono text-[9px] text-neutral-400 uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            <FaArrowLeft size={9} />
            Back to portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}
