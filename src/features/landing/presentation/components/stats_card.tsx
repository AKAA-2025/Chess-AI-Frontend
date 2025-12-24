import type { JSX } from "react";

type StatsCardProps = {
  icon: JSX.Element,
  value: string,
  label: string,
};

function StatsCard({ icon, value, label }: StatsCardProps) {
  return (
    <div className="bg-linear-to-br from-white to-[#6B0D00]/5 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
      <div className="text-[#6B0D00] mb-2">{icon}</div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export { StatsCard };