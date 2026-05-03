interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: "indigo" | "green" | "violet" | "amber";
}

const colorMap = {
  indigo: "bg-indigo-50 text-indigo-700",
  green: "bg-green-50 text-green-700",
  violet: "bg-violet-50 text-violet-700",
  amber: "bg-amber-50 text-amber-700",
};

export default function StatCard({ label, value, sub, color = "indigo" }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <p className="text-sm text-gray-500 font-light mb-2">{label}</p>
      <p className={`text-3xl font-display font-bold ${colorMap[color].split(" ")[1]}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-2 font-light">{sub}</p>}
    </div>
  );
}
