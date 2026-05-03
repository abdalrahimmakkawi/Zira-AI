import { createClient } from "@/lib/supabase/server";
import StatCard from "@/components/admin/StatCard";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: leadsCount }, { count: clientsCount }, { count: projectsCount }, { data: revenue }] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("clients").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "in_progress"),
    supabase.from("projects").select("value"),
  ]);

  const totalRevenue = revenue?.reduce((sum, p) => sum + (p.value || 0), 0) ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm font-light mt-1">Overview of your consulting pipeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Leads" value={leadsCount ?? 0} sub="All time" color="indigo" />
        <StatCard label="Active Clients" value={clientsCount ?? 0} sub="Currently engaged" color="green" />
        <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} sub="From all projects" color="violet" />
        <StatCard label="Open Projects" value={projectsCount ?? 0} sub="In progress" color="amber" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-display text-lg text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/leads" className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm hover:bg-indigo-100 transition-colors">View new leads →</a>
          <a href="/admin/clients" className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm hover:bg-indigo-100 transition-colors">Manage clients →</a>
          <a href="/admin/projects" className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm hover:bg-indigo-100 transition-colors">Track projects →</a>
          <a href="/" target="_blank" className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">View public site ↗</a>
        </div>
      </div>
    </div>
  );
}
