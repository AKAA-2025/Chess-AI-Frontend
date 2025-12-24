import { BarChart3, Target, TrendingUp, Zap } from "lucide-react";

function StatsCards() {
 return (
    <div className="grid md:grid-cols-4 gap-6 mt-12">
      {[
        { label: "Games Analyzed", value: "2.4M+", icon: <BarChart3 /> },
        { label: "Avg Response Time", value: "0.3s", icon: <Zap /> },
        { label: "ELO Rating", value: "3200+", icon: <TrendingUp /> },
        { label: "Win Rate", value: "98%", icon: <Target /> },
      ].map((stat, idx) => (
        <div key={idx} className="bg-linear-to-br from-white to-[#6B0D00]/5 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
          <div className="text-[#6B0D00] mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
 )
}

export { StatsCards };