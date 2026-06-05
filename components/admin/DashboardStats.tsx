import { Car, CheckCircle, XCircle, Clock, Eye } from "lucide-react";

interface StatsProps {
  total: number;
  active: number;
  sold: number;
  onHold: number;
  totalViews: number;
}

export default function DashboardStats({ total, active, sold, onHold, totalViews }: StatsProps) {
  const stats = [
    { label: "Total Listings", value: total, icon: Car, color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: active, icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "Sold", value: sold, icon: XCircle, color: "bg-red-50 text-red-600" },
    { label: "On Hold", value: onHold, icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Total Views", value: totalViews.toLocaleString("en-IN"), icon: Eye, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-[#0A1628]" style={{ fontFamily: "var(--font-syne)" }}>
            {value}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
