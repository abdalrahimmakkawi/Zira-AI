"use client";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Project = { id: string; client_id: string | null; title: string; status: string; start_date: string | null; end_date: string | null; value: number; notes: string | null; created_at: string; clients?: { name: string } | null };
type Client = { id: string; name: string };

const statusColors: Record<string, string> = {
  in_progress: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  on_hold: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", client_id: "", status: "in_progress", value: 0, start_date: "", end_date: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const fetchData = async () => {
    const [{ data: proj }, { data: cli }] = await Promise.all([
      supabase.from("projects").select("*, clients(name)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").eq("status", "active"),
    ]);
    setProjects(proj ?? []); setClients(cli ?? []); setLoading(false);
  };

  const saveProject = async () => {
    if (!form.title) return;
    setSaving(true);
    const payload = { ...form, client_id: form.client_id || null, value: Number(form.value), start_date: form.start_date || null, end_date: form.end_date || null };
    const { data } = await supabase.from("projects").insert(payload).select("*, clients(name)").single();
    if (data) setProjects((prev) => [data, ...prev]);
    setModal(false); setForm({ title: "", client_id: "", status: "in_progress", value: 0, start_date: "", end_date: "", notes: "" }); setSaving(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-gray-900">Projects</h1>
          <p className="text-gray-500 text-sm font-light mt-1">{projects.length} total projects</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" /> New project
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400 text-sm">Loading...</div> :
          projects.length === 0 ? <div className="p-12 text-center text-gray-400 text-sm">No projects yet.</div> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>{["Project", "Client", "Status", "Value", "Start", "End"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{p.clients?.name ?? "—"}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[p.status] ?? "bg-gray-100 text-gray-500"}`}>{p.status.replace("_", " ")}</span></td>
                  <td className="px-4 py-3 font-medium text-gray-900">${p.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-400">{p.start_date ? new Date(p.start_date).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3 text-gray-400">{p.end_date ? new Date(p.end_date).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg text-gray-900">New Project</h2>
              <button onClick={() => setModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Project title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              <select value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white">
                <option value="">Select client (optional)</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white">
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input type="number" placeholder="Value ($)" value={form.value || ""} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
                <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <textarea placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveProject} disabled={saving} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-60">
                {saving ? "Saving..." : "Save project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
