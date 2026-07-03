"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCube, FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaCube size={24} />
          </div>
          <h1 className="font-monument text-2xl text-white uppercase tracking-tight">Admin Access</h1>
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-3">Sign in to manage portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-red-600/10 border border-red-600/20">
              <p className="font-mono text-[10px] text-red-600 text-center uppercase tracking-widest">{error}</p>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Username</label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
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
      </div>
    </div>
  );
}
