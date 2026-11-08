"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FaCube, FaProjectDiagram, FaCertificate, FaExternalLinkAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FaCube },
  { href: "/admin/projects", label: "Projects", icon: FaProjectDiagram },
  { href: "/admin/certificates", label: "Certificates", icon: FaCertificate },
  { href: "/", label: "View Site", icon: FaExternalLinkAlt, external: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        else setAuthed(true);
      });
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (authed === null) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!authed) return null;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="relative min-h-screen text-neutral-900 flex">
      <div aria-hidden className="fixed inset-0 -z-10 bg-neutral-50" />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 overflow-y-auto bg-white/60 backdrop-blur-2xl border-r border-white/60 shadow-xl shadow-black/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-white/50">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <FaCube size={14} />
            </div>
            <div>
              <p className="font-monument text-sm text-neutral-900 uppercase tracking-tight">Admin</p>
              <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest">Portfolio</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? "bg-red-600/15 text-red-700 border border-red-600/25 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/50 border border-transparent"
                }`}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/50">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-xs uppercase tracking-widest text-red-600/60 hover:text-red-600 hover:bg-red-600/5 transition-all duration-200"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 md:ml-64">
        <div className="sticky top-0 z-30 md:hidden bg-white/60 backdrop-blur-2xl border-b border-white/60 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-neutral-400 hover:text-neutral-900">
            <FaBars size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white">
              <FaCube size={10} />
            </div>
            <span className="font-monument text-xs uppercase tracking-tight">Admin</span>
          </div>
          <button onClick={logout} className="text-red-600/50 hover:text-red-600">
            <FaSignOutAlt size={16} />
          </button>
        </div>

        <div className="p-4 md:p-8 lg:p-10">{children}</div>
      </div>

      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed top-4 right-4 z-50 md:hidden text-neutral-500"
          aria-label="Close menu"
        >
          <FaTimes size={20} />
        </button>
      )}
    </div>
  );
}
