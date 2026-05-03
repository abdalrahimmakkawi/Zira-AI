"use client";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Client = { id: string; name: string; email: string; company: string | null; service: string | null; status: string; value: number; notes: string | null; created_at: string };
type NewClient = Omit<Client, "id" | "created_at">;

const blank: NewClient = { name: "", email: "", company: "", service: "", status: "active", value: 0, notes: "" };

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<NewClient>(blank);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const fetchClients = async () => {
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients(data ?? []); setLoading(false);
  };

  const saveClient = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    const { data } = await supabase.from("clients").insert(form).select().single();
    if (data) setClients((prev) => [data, ...prev]);
    setModal(false); setForm(blank); setSaving(false);
  };

  useEffect(() => { fetchClients(); }, []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-gray-900">Clients</h1>
          <p className="text-gray-500 text-sm font-light mt-1">{clients.length} total clients</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" /> Add client
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400 text-sm">Loading...</div> :
          clients.length === 0 ? <div className="p-12 text-center text-gray-400 text-sm">No clients yet.</div> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>{["Name", "Company", "Service", "Status", "Value", "Since"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{c.name}</div><div className="text-gray-400 text-xs">{c.email}</div></td>
                  <td className="px-4 py-3 text-gray-500">{c.company ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{c.service ?? "—"}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.status}</span></td>
                  <td className="px-4 py-3 font-medium text-gray-900">${c.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-400">{new Date(c.created_at).toLocaleDateString()}</td>
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
              <h2 className="font-display text-lg text-gray-900">New Client</h2>
              <button onClick={() => setModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              {[["name","Name *"],["email","Email *"],["company","Company"],["service","Service"]].map(([key, label]) => (
                <input key={key} placeholder={label} value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              ))}
              <input type="number" placeholder="Contract value ($)" value={form.value || ""}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              <textarea placeholder="Notes (optional)" value={form.notes ?? ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveClient} disabled={saving} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-60">
                {saving ? "Saving..." : "Save client"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
