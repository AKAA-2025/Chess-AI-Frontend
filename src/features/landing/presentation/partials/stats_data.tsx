import { StatsCard } from "landing/presentation/components";
import { BarChart3, Target, TrendingUp, Zap } from "lucide-react";

function StatsCards() {
    const statsData = [
        { label: "Games Analyzed", value: "2.4M+", icon: <BarChart3 /> },
        { label: "Avg Response Time", value: "0.3s", icon: <Zap /> },
        { label: "ELO Rating", value: "3200+", icon: <TrendingUp /> },
        { label: "Win Rate", value: "98%", icon: <Target /> },
    ];

    return (
        <div className="w-full grid place-items-center">
            <div className="w-full max-w-310 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-8">
                { statsData.map((stats, idx) => (
                    <StatsCard key={idx} icon={stats.icon} label={stats.label} value={stats.value} />
                ))}
            </div>
        </div>
    );
}

export { StatsCards }