"use client";
import { useEffect, useState, useCallback } from "react";
import { FaTimes, FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaGithub, FaCheck, FaTimesCircle, FaSortDown, FaSortUp } from "react-icons/fa";

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  desc: string;
  images: string[];
  technologies: string[];
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
}

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  desc: "",
  images: "",
  technologies: "",
  repoUrl: "",
  liveUrl: "",
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<"title" | "category" | "createdAt">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const load = useCallback(async () => {
    const res = await fetch("/api/projects");
    setProjects(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category,
      desc: p.desc,
      images: p.images.join("\n"),
      technologies: p.technologies.join(", "),
      repoUrl: p.repoUrl,
      liveUrl: p.liveUrl,
      featured: p.featured,
    });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
      category: form.category,
      desc: form.desc,
      images: form.images.split("\n").filter(Boolean),
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      repoUrl: form.repoUrl,
      liveUrl: form.liveUrl,
      featured: form.featured,
    };

    const url = editing ? `/api/projects/${editing}` : "/api/projects";
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowForm(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  const toggleSort = (field: "title" | "category" | "createdAt") => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...projects].sort((a: any, b: any) => {
    const av = a[sortField] || "";
    const bv = b[sortField] || "";
    const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? <FaSortUp size={10} /> : <FaSortDown size={10} />;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-monument text-3xl text-white uppercase tracking-tight">Projects</h1>
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-2">{projects.length} total</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-3 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors">
          <FaPlus size={10} />
          New Project
        </button>
      </div>

      {/* Slide-in drawer */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 h-full overflow-y-auto">
            <div className="sticky top-0 bg-[#0a0a0a] z-10 p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-monument text-sm text-white uppercase tracking-tight">{editing ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Title</label>
                <input placeholder="Project Name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Slug</label>
                  <input placeholder="Auto-generated" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Category</label>
                  <input placeholder="Web App" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Description</label>
                <textarea placeholder="Project description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors min-h-[120px] resize-none" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Technologies</label>
                <input placeholder="React, Node.js, TypeScript" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Images (one URL per line)</label>
                <textarea placeholder="https://..." value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors min-h-[80px] resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Repo URL</label>
                  <input placeholder="https://github.com/..." value={form.repoUrl} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Live URL</label>
                  <input placeholder="https://..." value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-colors">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-red-600 w-4 h-4" />
                <div>
                  <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest">Featured Project</p>
                  <p className="font-mono text-[8px] text-white/20 mt-1">Show this project prominently on the portfolio</p>
                </div>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 py-3.5 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors">
                  {editing ? "Update Project" : "Create Project"}
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl font-monument text-[10px] text-white/60 uppercase tracking-widest hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest cursor-pointer select-none" onClick={() => toggleSort("title")}>
                  <span className="flex items-center gap-1">Title <SortIcon field="title" /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest hidden md:table-cell cursor-pointer select-none" onClick={() => toggleSort("category")}>
                  <span className="flex items-center gap-1">Category <SortIcon field="category" /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest hidden md:table-cell">Tech</th>
                <th className="text-center py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest">Featured</th>
                <th className="text-center py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest">Links</th>
                <th className="text-right py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">No projects found</p>
                    <button onClick={openNew} className="mt-4 font-mono text-[10px] text-red-600 uppercase tracking-widest hover:underline">Create your first project</button>
                  </td>
                </tr>
              )}
              {sorted.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-monument text-xs text-white/80 uppercase truncate max-w-[200px]">{p.title}</p>
                    <p className="font-mono text-[8px] text-white/20 mt-1 md:hidden">{p.category}</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="font-mono text-[9px] text-red-600/60 uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 font-mono text-[8px] text-white/30 uppercase">{t}</span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="font-mono text-[8px] text-white/20">+{p.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {p.featured ? (
                      <FaCheck size={12} className="text-red-600 inline" />
                    ) : (
                      <FaTimesCircle size={12} className="text-white/20 inline" />
                    )}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {p.repoUrl && (
                        <a href={p.repoUrl} target="_blank" className="text-white/20 hover:text-white transition-colors">
                          <FaGithub size={12} />
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" className="text-white/20 hover:text-white transition-colors">
                          <FaExternalLinkAlt size={10} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all">
                        <FaEdit size={13} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-red-600/30 hover:text-red-600 hover:bg-red-600/10 transition-all">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
