

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { PracticeAttempt } from '../types';

interface ScoreTrendChartProps {
  practiceHistory: PracticeAttempt[];
  theme?: 'light' | 'dark';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-glass-bg border border-glass-border p-3 rounded-lg shadow-lg backdrop-blur-xl">
        <p className="text-primary-purple font-bold mb-1">{label}</p>
        <p className="text-gray-200 text-sm">
          Score: <span className="font-bold text-white">{payload[0].value}</span>/10
        </p>
        <p className="text-xs text-gray-400 mt-1">{payload[0].payload.date}</p>
      </div>
    );
  }
  return null;
};

const ScoreTrendChart: React.FC<ScoreTrendChartProps> = ({ practiceHistory, theme = 'dark' }) => {
  
  // Extract unique questions
  const uniqueQuestions = useMemo(() => {
    return Array.from(new Set(practiceHistory.map(p => p.question)));
  }, [practiceHistory]);

  // Set initial selected question
  const [selectedQuestion, setSelectedQuestion] = useState<string>(uniqueQuestions[0] || '');

  // If questions change (e.g., new data loaded), default to the first one if current selection is invalid
  useMemo(() => {
      if (!uniqueQuestions.includes(selectedQuestion) && uniqueQuestions.length > 0) {
          setSelectedQuestion(uniqueQuestions[0]);
      }
  }, [uniqueQuestions, selectedQuestion]);

  // Filter and process data for the selected question
  const chartData = useMemo(() => {
    if (!selectedQuestion) return [];

    return practiceHistory
      .filter(p => p.question === selectedQuestion)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((p, index) => ({
        name: `Attempt ${index + 1}`,
        score: p.score,
        date: new Date(p.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: new Date(p.timestamp).toLocaleString(),
      }));
  }, [practiceHistory, selectedQuestion]);

  if (uniqueQuestions.length === 0) {
      return null;
  }

  return (
    <div className="bg-glass-bg p-6 rounded-3xl backdrop-blur-lg border border-glass-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
            <h3 className="text-xl font-bold">Performance Trend</h3>
            <p className="text-xs text-gray-400 mt-1">Track your improvement over time per question</p>
        </div>
        
        <div className="relative w-full md:w-auto">
            <select 
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="appearance-none w-full md:w-64 bg-white/5 border border-glass-border text-white text-sm rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-purple cursor-pointer truncate hover:bg-white/10 transition-colors"
            >
                {uniqueQuestions.map((q, idx) => (
                    <option key={idx} value={q} className="bg-gray-900 text-white truncate">
                        {q.length > 50 ? q.substring(0, 50) + '...' : q}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
      </div>

      <div className="h-64 w-full">
        {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} vertical={false} />
                <XAxis 
                    dataKey="name" 
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    padding={{ left: 20, right: 20 }}
                />
                <YAxis 
                    domain={[0, 10]} 
                    ticks={[0, 2, 4, 6, 8, 10]}
                    stroke={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(236, 72, 153, 0.5)', strokeWidth: 2 }} />
                <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#EC4899" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#7C3AED", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6, fill: "#EC4899", stroke: "#fff" }}
                    animationDuration={1500}
                />
            </LineChart>
            </ResponsiveContainer>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>No practice data available for this question yet.</p>
            </div>
        )}
      </div>
      
      <div className="flex justify-center gap-6 mt-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-pink"></span>
              <span>Score Trajectory</span>
          </div>
          {chartData.length >= 2 && (
              <div className="flex items-center gap-2">
                  {chartData[chartData.length - 1].score >= chartData[0].score ? (
                      <span className="text-green-400 font-bold">↑ Improving</span>
                  ) : (
                      <span className="text-red-400 font-bold">↓ Needs Focus</span>
                  )}
              </div>
          )}
      </div>
    </div>
  );
};

export default ScoreTrendChart;