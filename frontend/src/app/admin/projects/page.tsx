"use client";
import { useEffect, useState, useCallback } from "react";
import { FaTimes, FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaGithub, FaCheck, FaTimesCircle, FaSortDown, FaSortUp } from "react-icons/fa";

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  desc: string;
  cover: string;
  images: string[];
  technologies: string[];
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
  createdAt?: string | null;
}

type ProjectSortField = "title" | "category" | "createdAt";

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  desc: "",
  cover: "",
  images: "",
  technologies: "",
  repoUrl: "",
  liveUrl: "",
  featured: false,
};

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: ProjectSortField;
  sortField: ProjectSortField;
  sortDir: "asc" | "desc";
}) {
  if (sortField !== field) return null;
  return sortDir === "asc" ? <FaSortUp size={10} /> : <FaSortDown size={10} />;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [coverInputKey, setCoverInputKey] = useState(0);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<ProjectSortField>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const load = useCallback(async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []));
  }, []);

  const resetFiles = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setImageFiles([]);
    setPreviews([]);
    setCoverFile(null);
    setCoverPreview("");
    setCoverInputKey((k) => k + 1);
    setFileInputKey((k) => k + 1);
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setError("");
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(null);
    setCoverPreview("");
    setForm((f) => ({ ...f, cover: "" }));
    setCoverInputKey((k) => k + 1);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (picked.length === 0) return;
    const room = 3 - imageFiles.length;
    if (room <= 0) {
      setError("Maksimal 3 gambar per project.");
      return;
    }
    setError("");
    const added = picked.slice(0, room);
    setImageFiles([...imageFiles, ...added]);
    setPreviews([...previews, ...added.map((file) => URL.createObjectURL(file))]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImageFiles((files) => files.filter((_, i) => i !== index));
    setPreviews((urls) => urls.filter((_, i) => i !== index));
    setFileInputKey((k) => k + 1);
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setError("");
    resetFiles();
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category,
      desc: p.desc,
      cover: p.cover ?? "",
      images: p.images.join("\n"),
      technologies: p.technologies.join(", "),
      repoUrl: p.repoUrl,
      liveUrl: p.liveUrl,
      featured: p.featured,
    });
    setEditing(p.id);
    setError("");
    resetFiles();
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);

    const slug =
      form.slug.trim() ||
      form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const urls = form.images.split("\n").map((url) => url.trim()).filter(Boolean);
    const technologies = form.technologies.split(",").map((tech) => tech.trim()).filter(Boolean);

    const body = new FormData();
    body.append("title", form.title);
    body.append("slug", slug);
    body.append("category", form.category);
    body.append("desc", form.desc);
    body.append("repoUrl", form.repoUrl);
    body.append("liveUrl", form.liveUrl);
    body.append("featured", form.featured ? "1" : "0");
    body.append("cover", form.cover);
    if (coverFile) body.append("cover_file", coverFile);
    if (urls.length === 0) body.append("images[]", "");
    else urls.forEach((url) => body.append("images[]", url));
    technologies.forEach((tech) => body.append("technologies[]", tech));
    imageFiles.forEach((file) => body.append("image_files[]", file));

    const res = await fetch(editing ? `/api/projects/${editing}` : "/api/projects", {
      method: "POST",
      body,
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.message || "Gagal menyimpan project");
      return;
    }

    setShowForm(false);
    resetFiles();
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  const toggleSort = (field: ProjectSortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...projects].sort((a, b) => {
    const av = String(a[sortField] ?? "");
    const bv = String(b[sortField] ?? "");
    const cmp = av.localeCompare(bv);
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-monument text-3xl text-neutral-900 uppercase tracking-tight">Projects</h1>
          <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-2">{projects.length} total</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-3 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors">
          <FaPlus size={10} />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl border-l border-white/60 h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-10 p-6 border-b border-white/50 flex items-center justify-between">
              <h2 className="font-monument text-sm text-neutral-900 uppercase tracking-tight">{editing ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-white/80 transition-colors">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="font-mono text-[10px] text-red-600 uppercase tracking-widest">{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Title</label>
                <input placeholder="Project Name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Slug</label>
                  <input placeholder="Auto-generated" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Category</label>
                  <input placeholder="Web App" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1 flex items-center justify-between">
                  <span>Description</span>
                  <span className={form.desc.length > 1500 ? "text-red-600" : "text-neutral-400"}>{form.desc.length}/1500</span>
                </label>
                <textarea placeholder="Project description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  maxLength={1500}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors min-h-[120px] resize-none" />
                <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest ml-1">Maks 1500 karakter</p>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Technologies</label>
                <input placeholder="React, Node.js, TypeScript" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Cover Image</label>
                <input key={coverInputKey} type="file" accept="image/*" onChange={handleCover}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase file:text-white" />
                <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest ml-1">
                  Foto sampul untuk thumbnail project — JPG, PNG, WebP, maks 5MB
                </p>
                {(coverPreview || form.cover) && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/60 mt-2">
                    <img src={coverPreview || form.cover} alt="Preview cover" className="w-full h-full object-cover" />
                    <button type="button" onClick={removeCover} aria-label="Hapus foto sampul"
                      className="absolute top-2 right-2 w-6 h-6 rounded-md bg-black/50 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                      <FaTimes size={10} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Images (one URL per line)</label>
                <textarea placeholder="https://..." value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors min-h-[80px] resize-none" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Upload Images</label>
                <input key={fileInputKey} type="file" accept="image/*" multiple onChange={handleFiles}
                  disabled={imageFiles.length >= 3}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase file:text-white disabled:opacity-50" />
                <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest ml-1">
                  {imageFiles.length > 0 ? `${imageFiles.length}/3 gambar dipilih` : "JPG, PNG, WebP — maks 3 gambar, 5MB/file"}
                </p>
                {previews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {previews.map((src, i) => (
                      <div key={src} className="relative aspect-square rounded-xl overflow-hidden border border-white/60">
                        <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(i)} aria-label="Hapus gambar"
                          className="absolute top-1 right-1 w-5 h-5 rounded-md bg-black/50 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                          <FaTimes size={9} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Repo URL</label>
                  <input placeholder="https://github.com/..." value={form.repoUrl} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Live URL</label>
                  <input placeholder="https://..." value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 rounded-xl glass-input cursor-pointer hover:bg-white/80 transition-colors">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-red-600 w-4 h-4" />
                <div>
                  <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">Featured Project</p>
                  <p className="font-mono text-[8px] text-neutral-400 mt-1">Show this project prominently on the portfolio</p>
                </div>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving} className="flex-1 py-3.5 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update Project" : "Create Project"}
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-3.5 glass-soft rounded-xl font-monument text-[10px] text-neutral-600 uppercase tracking-widest hover:text-neutral-900 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/50">
                <th className="text-left py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest cursor-pointer select-none" onClick={() => toggleSort("title")}>
                  <span className="flex items-center gap-1">Title <SortIcon field="title" sortField={sortField} sortDir={sortDir} /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest hidden md:table-cell cursor-pointer select-none" onClick={() => toggleSort("category")}>
                  <span className="flex items-center gap-1">Category <SortIcon field="category" sortField={sortField} sortDir={sortDir} /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest hidden md:table-cell">Tech</th>
                <th className="text-center py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest">Featured</th>
                <th className="text-center py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest">Links</th>
                <th className="text-right py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <p className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest">No projects found</p>
                    <button onClick={openNew} className="mt-4 font-mono text-[10px] text-red-600 uppercase tracking-widest hover:underline">Create your first project</button>
                  </td>
                </tr>
              )}
              {sorted.map((p) => (
                <tr key={p.id} className="border-b border-white/40 hover:bg-white/40 transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-monument text-xs text-neutral-800 uppercase truncate max-w-[200px]">{p.title}</p>
                    <p className="font-mono text-[8px] text-neutral-400 mt-1 md:hidden">{p.category}</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-white/50 font-mono text-[8px] text-neutral-500 uppercase">{t}</span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="font-mono text-[8px] text-neutral-400">+{p.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {p.featured ? (
                      <FaCheck size={12} className="text-red-600 inline" />
                    ) : (
                      <FaTimesCircle size={12} className="text-neutral-300 inline" />
                    )}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {p.repoUrl && (
                        <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-neutral-900 transition-colors">
                          <FaGithub size={12} />
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-neutral-900 transition-colors">
                          <FaExternalLinkAlt size={10} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all">
                        <FaEdit size={13} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-red-300 hover:text-red-600 hover:bg-red-50 transition-all">
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
