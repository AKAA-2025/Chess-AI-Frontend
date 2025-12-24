import { Brain, TrendingUp, BarChart3 } from "lucide-react";
import { FeaturesCard } from "../components";

function FeaturesGrid() {
  const featuresItems = [
    { icon: <Brain />, title: "Deep Learning Core", desc: "Neural networks trained on millions of grandmaster games" },
    { icon: <TrendingUp />, title: "Adaptive Strategy", desc: "AI that learns and adapts to your playing style" },
    { icon: <BarChart3 />, title: "Performance Metrics", desc: "Comprehensive analytics and insights dashboard" },
  ]

  return (
    <div id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        {featuresItems.map((item, idx) => (
          <FeaturesCard key={idx} title={item.title} icon={item.icon} desc={item.desc}/>
        ))}
      </div>
    </div>
  )
}

export { FeaturesGrid };