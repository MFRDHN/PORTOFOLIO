"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaProjectDiagram, FaCertificate, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

interface Certificate {
  id: number;
  title: string;
  subtitle: string;
  date: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []));
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((data) => setCertificates(Array.isArray(data) ? data : []));
  }, []);

  const stats = [
    { label: "Projects", value: projects.length, icon: FaProjectDiagram, href: "/admin/projects" },
    { label: "Certificates", value: certificates.length, icon: FaCertificate, href: "/admin/certificates" },
    { label: "Live Site", value: "View", icon: FaExternalLinkAlt, href: "/" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
        <h1 className="font-monument text-3xl text-neutral-900 uppercase tracking-tight">Dashboard</h1>
        <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-2">Overview of your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="glass p-6 rounded-2xl hover:border-red-300/60 hover:shadow-xl hover:shadow-red-600/5 transition-all duration-300 group relative overflow-hidden"
              target={s.label === "Live Site" ? "_blank" : undefined}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-monument text-4xl text-neutral-900">{s.value}</p>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-2">{s.label}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur flex items-center justify-center text-neutral-400 group-hover:text-red-600 group-hover:bg-red-50 transition-all duration-300">
                  <Icon size={18} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[9px] font-mono text-neutral-300 uppercase tracking-widest group-hover:text-red-600 transition-colors">
                <span>Manage</span>
                <FaArrowRight size={8} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/50">
            <h2 className="font-monument text-xs uppercase tracking-widest text-neutral-500">Recent Projects</h2>
            <Link href="/admin/projects" className="font-mono text-[9px] text-red-600 uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {projects.length === 0 && (
              <p className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest text-center py-8">No projects yet</p>
            )}
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/40 backdrop-blur border border-white/50 hover:border-red-200/70 transition-colors">
                <div className="min-w-0">
                  <p className="font-monument text-xs text-neutral-800 uppercase truncate">{p.title}</p>
                  <p className="font-mono text-[9px] text-red-600/60 uppercase tracking-widest mt-1">{p.category}</p>
                </div>
                <span className="font-mono text-[8px] text-neutral-400 whitespace-nowrap ml-3">
                  {p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/50">
            <h2 className="font-monument text-xs uppercase tracking-widest text-neutral-500">Recent Certificates</h2>
            <Link href="/admin/certificates" className="font-mono text-[9px] text-red-600 uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {certificates.length === 0 && (
              <p className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest text-center py-8">No certificates yet</p>
            )}
            {certificates.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-white/40 backdrop-blur border border-white/50 hover:border-red-200/70 transition-colors">
                <div className="min-w-0">
                  <p className="font-monument text-xs text-neutral-800 uppercase truncate">{c.title}</p>
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-1">{c.subtitle}</p>
                </div>
                <span className="font-mono text-[8px] text-neutral-400 whitespace-nowrap ml-3">{c.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
