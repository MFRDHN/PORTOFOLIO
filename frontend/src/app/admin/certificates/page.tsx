"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaTimes, FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaSortDown, FaSortUp } from "react-icons/fa";

interface Certificate {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  gradient: string;
  date: string;
  credentialUrl: string;
}

type CertificateSortField = "title" | "date";

const emptyForm = {
  title: "",
  subtitle: "",
  image: "",
  date: "",
  credentialUrl: "",
};

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: CertificateSortField;
  sortField: CertificateSortField;
  sortDir: "asc" | "desc";
}) {
  if (sortField !== field) return null;
  return sortDir === "asc" ? <FaSortUp size={10} /> : <FaSortDown size={10} />;
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<CertificateSortField>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const previewUrl = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : ""), [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const shownImage = previewUrl || form.image;

  const load = useCallback(async () => {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    setCertificates(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((data) => setCertificates(Array.isArray(data) ? data : []));
  }, []);

  const resetFile = () => {
    setImageFile(null);
    setFileInputKey((k) => k + 1);
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setError("");
    resetFile();
    setShowForm(true);
  };

  const openEdit = (c: Certificate) => {
    setForm({
      title: c.title,
      subtitle: c.subtitle,
      image: c.image,
      date: c.date,
      credentialUrl: c.credentialUrl,
    });
    setEditing(c.id);
    setError("");
    resetFile();
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);

    const body = new FormData();
    body.append("title", form.title);
    body.append("subtitle", form.subtitle);
    body.append("date", form.date);
    body.append("credentialUrl", form.credentialUrl);
    if (imageFile) body.append("image_file", imageFile);

    const res = await fetch(editing ? `/api/certificates/${editing}` : "/api/certificates", {
      method: "POST",
      body,
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.message || "Gagal menyimpan sertifikat");
      return;
    }

    setShowForm(false);
    resetFile();
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this certificate?")) return;
    await fetch(`/api/certificates/${id}`, { method: "DELETE" });
    load();
  };

  const toggleSort = (field: CertificateSortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const sorted = [...certificates].sort((a, b) => {
    const av = String(a[sortField] ?? "");
    const bv = String(b[sortField] ?? "");
    const cmp = av.localeCompare(bv);
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-monument text-3xl text-neutral-900 uppercase tracking-tight">Certificates</h1>
          <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-2">{certificates.length} total</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-3 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors">
          <FaPlus size={10} />
          New Certificate
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl border-l border-white/60 h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-10 p-6 border-b border-white/50 flex items-center justify-between">
              <h2 className="font-monument text-sm text-neutral-900 uppercase tracking-tight">{editing ? "Edit Certificate" : "New Certificate"}</h2>
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
                <input placeholder="Certificate Name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Issuer</label>
                <input placeholder="Organization / Platform" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Date</label>
                <input placeholder="2025" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Upload Image</label>
                <input key={fileInputKey} type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:font-mono file:text-[10px] file:uppercase file:text-white" />
                <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest ml-1">
                  {imageFile ? imageFile.name : "JPG, PNG, WebP — maks 5MB"}
                </p>
                {shownImage && (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shownImage} alt="Preview sertifikat" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block ml-1">Credential URL</label>
                <input placeholder="https://..." value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 font-mono text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors" />
              </div>

              {(form.title || form.date) && (
                <div className="p-4 rounded-xl glass-soft space-y-2">
                  <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest">Preview</p>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/50 border border-white/50">
                    <div className="min-w-0">
                      <p className="font-monument text-xs text-neutral-800 uppercase truncate">{form.title || "Certificate Title"}</p>
                      <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-1">{form.subtitle || "Issuer"}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving} className="flex-1 py-3.5 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update Certificate" : "Create Certificate"}
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
                <th className="text-left py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest">Preview</th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest cursor-pointer select-none" onClick={() => toggleSort("title")}>
                  <span className="flex items-center gap-1">Title <SortIcon field="title" sortField={sortField} sortDir={sortDir} /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest hidden md:table-cell cursor-pointer select-none" onClick={() => toggleSort("date")}>
                  <span className="flex items-center gap-1">Date <SortIcon field="date" sortField={sortField} sortDir={sortDir} /></span>
                </th>
                <th className="text-center py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest">Link</th>
                <th className="text-right py-4 px-5 font-monument text-[9px] text-neutral-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <p className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest">No certificates found</p>
                    <button onClick={openNew} className="mt-4 font-mono text-[10px] text-red-600 uppercase tracking-widest hover:underline">Create your first certificate</button>
                  </td>
                </tr>
              )}
              {sorted.map((c) => (
                <tr key={c.id} className="border-b border-white/40 hover:bg-white/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/50">
                      {c.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-monument text-[8px] text-white uppercase" style={{ background: c.color }}>{c.title[0]}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-monument text-xs text-neutral-800 uppercase truncate max-w-[200px]">{c.title}</p>
                    <p className="font-mono text-[8px] text-neutral-400 mt-1 md:hidden">{c.date}</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="font-mono text-[9px] text-neutral-400">{c.date}</span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {c.credentialUrl && (
                      <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-neutral-900 transition-colors">
                        <FaExternalLinkAlt size={10} />
                      </a>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all">
                        <FaEdit size={13} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg text-red-300 hover:text-red-600 hover:bg-red-50 transition-all">
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
