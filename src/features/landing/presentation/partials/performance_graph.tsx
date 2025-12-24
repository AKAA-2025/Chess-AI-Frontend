import { BarChart3, Target, TrendingUp, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { StatsCard } from "landing/presentation/components";

function PerformanceGraph() {
  const performanceData = [
    { move: 1, accuracy: 95, winRate: 92 },
    { move: 5, accuracy: 96, winRate: 93 },
    { move: 10, accuracy: 97, winRate: 94 },
    { move: 15, accuracy: 98, winRate: 95 },
    { move: 20, accuracy: 97, winRate: 96 },
    { move: 25, accuracy: 98, winRate: 97 },
    { move: 30, accuracy: 99, winRate: 98 },
  ];

  const statsData = [
    { label: "Games Analyzed", value: "2.4M+", icon: <BarChart3 /> },
    { label: "Avg Response Time", value: "0.3s", icon: <Zap /> },
    { label: "ELO Rating", value: "3200+", icon: <TrendingUp /> },
    { label: "Win Rate", value: "98%", icon: <Target /> },
  ];

  return (
    <div id="performance" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unmatched <span className="text-[#6B0D00]">Performance</span>
          </h2>
          <p className="text-xl text-gray-600">Real-time metrics showing AI accuracy and win rate progression</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-[#6B0D00]" />
              Move Accuracy
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B0D00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6B0D00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="move" stroke="#666" />
                <YAxis stroke="#666" domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#6B0D00" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-[#6B0D00]" />
              Win Rate Progression
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="move" stroke="#666" />
                <YAxis stroke="#666" domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="winRate" stroke="#8B1000" strokeWidth={3} dot={{ fill: '#6B0D00', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        { statsData.map((stats, idx) => (
          <StatsCard key={idx} icon={stats.icon} label={stats.label} value={stats.value} />
        ))}
      </div>
  )
}

export { PerformanceGraph };