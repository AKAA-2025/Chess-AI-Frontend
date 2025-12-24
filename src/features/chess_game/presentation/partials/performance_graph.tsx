import { BarChart3, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Move } from "chess_game/domain";

type PerformanceGraphProps = {
  moveHistory: Move[]
}

function PerformanceGraph({ moveHistory } : PerformanceGraphProps) {
  const performanceData = moveHistory.map((move, idx) => ({
    move: idx + 1,
    time: move.blackTime || move.whiteTime || 0
  })).filter(d => d.time > 0);

  return (
    <>
      {performanceData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              AI Performance <span className="text-[#6B0D00]">Analysis</span>
            </h2>
            <p className="text-gray-600">Time taken per move throughout the game</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="move" 
                stroke="#666"
                label={{ value: 'Move Number', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="#666"
                label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #6B0D00', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                formatter={(value: any) => [`${value.toFixed(2)}s`, 'Time']}
              />
              <Line 
                type="monotone" 
                dataKey="time" 
                stroke="#6B0D00" 
                strokeWidth={3} 
                dot={{ fill: '#6B0D00', r: 5 }}
                activeDot={{ r: 7, fill: '#8B1000' }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 bg-linear-to-r from-[#6B0D00]/5 to-transparent rounded-xl border border-gray-200">
              <Zap className="w-8 h-8 text-[#6B0D00]" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {(performanceData.reduce((sum, d) => sum + d.time, 0) / performanceData.length).toFixed(2)}s
                </div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-linear-to-r from-[#6B0D00]/5 to-transparent rounded-xl border border-gray-200">
              <Target className="w-8 h-8 text-[#6B0D00]" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.min(...performanceData.map(d => d.time)).toFixed(2)}s
                </div>
                <div className="text-sm text-gray-600">Fastest Move</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-linear-to-r from-[#6B0D00]/5 to-transparent rounded-xl border border-gray-200">
              <BarChart3 className="w-8 h-8 text-[#6B0D00]" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {performanceData.length}
                </div>
                <div className="text-sm text-gray-600">Total AI Moves</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { PerformanceGraph };