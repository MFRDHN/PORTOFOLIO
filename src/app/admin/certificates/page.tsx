"use client";
import { useEffect, useState, useCallback } from "react";
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

const emptyForm = {
  title: "",
  subtitle: "",
  image: "",
  color: "#991b1b",
  gradient: "linear-gradient(145deg,#991b1b,#1a1a2e)",
  date: "",
  credentialUrl: "",
};

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<"title" | "date" | "subtitle">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const load = useCallback(async () => {
    const res = await fetch("/api/certificates");
    setCertificates(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (c: Certificate) => {
    setForm({
      title: c.title,
      subtitle: c.subtitle,
      image: c.image,
      color: c.color,
      gradient: c.gradient,
      date: c.date,
      credentialUrl: c.credentialUrl,
    });
    setEditing(c.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = { ...form };

    const url = editing ? `/api/certificates/${editing}` : "/api/certificates";
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
    if (!confirm("Delete this certificate?")) return;
    await fetch(`/api/certificates/${id}`, { method: "DELETE" });
    load();
  };

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const sorted = [...certificates].sort((a: any, b: any) => {
    const av = a[sortField] || "";
    const bv = b[sortField] || "";
    const cmp = av.localeCompare(bv);
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
          <h1 className="font-monument text-3xl text-white uppercase tracking-tight">Certificates</h1>
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-2">{certificates.length} total</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-3 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors">
          <FaPlus size={10} />
          New Certificate
        </button>
      </div>

      {/* Slide-in drawer */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 h-full overflow-y-auto">
            <div className="sticky top-0 bg-[#0a0a0a] z-10 p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-monument text-sm text-white uppercase tracking-tight">{editing ? "Edit Certificate" : "New Certificate"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Title</label>
                <input placeholder="Certificate Name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Subtitle (Issuer)</label>
                <input placeholder="Organization Name" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Image URL</label>
                <input placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Color</label>
                  <input placeholder="#991b1b" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Date</label>
                  <input placeholder="2025" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Credential URL</label>
                <input placeholder="https://..." value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-widest block ml-1">Gradient CSS</label>
                <input placeholder="linear-gradient(145deg,#991b1b,#1a1a2e)" value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 transition-colors" />
              </div>

              {/* Preview */}
              {(form.title || form.subtitle || form.image) && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Preview</p>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                    {form.image && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white/5">
                        <img src={form.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-monument text-xs text-white/80 uppercase truncate">{form.title || "Certificate Title"}</p>
                      <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-1">{form.subtitle || "Issuer"}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 py-3.5 bg-red-600 rounded-xl font-monument text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-colors">
                  {editing ? "Update Certificate" : "Create Certificate"}
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
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest">Preview</th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest cursor-pointer select-none" onClick={() => toggleSort("title")}>
                  <span className="flex items-center gap-1">Title <SortIcon field="title" /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest hidden md:table-cell cursor-pointer select-none" onClick={() => toggleSort("subtitle")}>
                  <span className="flex items-center gap-1">Issuer <SortIcon field="subtitle" /></span>
                </th>
                <th className="text-left py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest hidden md:table-cell cursor-pointer select-none" onClick={() => toggleSort("date")}>
                  <span className="flex items-center gap-1">Date <SortIcon field="date" /></span>
                </th>
                <th className="text-center py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest">Link</th>
                <th className="text-right py-4 px-5 font-monument text-[9px] text-white/30 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">No certificates found</p>
                    <button onClick={openNew} className="mt-4 font-mono text-[10px] text-red-600 uppercase tracking-widest hover:underline">Create your first certificate</button>
                  </td>
                </tr>
              )}
              {sorted.map((c) => (
                <tr key={c.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5">
                      {c.image ? (
                        <img src={c.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-monument text-[8px] text-white/20 uppercase" style={{ background: c.color }}>{c.title[0]}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-monument text-xs text-white/80 uppercase truncate max-w-[200px]">{c.title}</p>
                    <p className="font-mono text-[8px] text-white/20 mt-1 md:hidden">{c.subtitle} · {c.date}</p>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{c.subtitle}</span>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="font-mono text-[9px] text-white/30">{c.date}</span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {c.credentialUrl && (
                      <a href={c.credentialUrl} target="_blank" className="text-white/20 hover:text-white transition-colors">
                        <FaExternalLinkAlt size={10} />
                      </a>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all">
                        <FaEdit size={13} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg text-red-600/30 hover:text-red-600 hover:bg-red-600/10 transition-all">
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
