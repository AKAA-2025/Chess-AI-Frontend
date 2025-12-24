import { Brain, TrendingUp, BarChart3 } from "lucide-react";

function FeaturesGrid() {
  return (
    <div id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Brain />, title: "Deep Learning Core", desc: "Neural networks trained on millions of grandmaster games" },
          { icon: <TrendingUp />, title: "Adaptive Strategy", desc: "AI that learns and adapts to your playing style" },
          { icon: <BarChart3 />, title: "Performance Metrics", desc: "Comprehensive analytics and insights dashboard" },
        ].map((item, idx) => (
          <div key={idx} className="group p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#6B0D00] hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-linear-to-br from-[#6B0D00] to-[#8B1000] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { FeaturesGrid };