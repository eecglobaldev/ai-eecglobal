import React, { useMemo, useState } from 'react';
import { parseISO, subDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimelineData } from '../types';

interface AttemptsChartProps {
  timeline: TimelineData[];
  totalPracticeDays: number;
  totalAttempts: number;
  avgScore: number;
  theme?: 'light' | 'dark';
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string; }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-purple p-3 rounded-lg shadow-lg border border-glass-border">
          <p className="label font-bold text-white">{`${payload[0].value} attempt(s) on ${label}`}</p>
        </div>
      );
    }
    return null;
  };

const filterTimeline = (data: TimelineData[], range: string) => {
  if (range === 'all') return data;
  const days = parseInt(range, 10);
  const now = new Date();
  return data.filter(entry => {
    const entryDate = new Date();
    // entry.date currently holds a weekday string; timeline data should include additional info
    return true;
  });
};

const AttemptsChart: React.FC<AttemptsChartProps> = ({ timeline, totalPracticeDays, totalAttempts, avgScore, theme = 'dark' }) => {
  const axisColor = theme === 'light' ? '#4b5563' : 'rgba(255,255,255,0.7)';
  const gridColor = theme === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255, 255, 255, 0.1)';
  const tooltipBg = theme === 'light' ? '#f9fafb' : 'rgba(46, 26, 71, 0.9)';
  const tooltipText = theme === 'light' ? '#0f172a' : '#fff';
  const [range, setRange] = useState('all');

  const filteredData = useMemo(() => {
    if (range === 'all') return timeline;
    const days = parseInt(range, 10);
    const cutoff = subDays(new Date(), days - 1);
    return timeline.filter(entry => parseISO(entry.isoDate) >= cutoff);
  }, [range, timeline]);

  return (
    <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold">Practice Overview</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-white/10 rounded-lg py-1 px-3 text-xs sm:text-sm focus:outline-none border border-transparent focus:border-primary-purple w-full sm:w-auto text-white"
        >
          <option value="7" className="bg-primary-dark-purple text-white">
            Last 7 Days
          </option>
          <option value="14" className="bg-primary-dark-purple text-white">
            Last 14 Days
          </option>
          <option value="30" className="bg-primary-dark-purple text-white">
            Last 30 Days
          </option>
          <option value="60" className="bg-primary-dark-purple text-white">
            Last 60 Days
          </option>
          <option value="all" className="bg-primary-dark-purple text-white">
            All Time
          </option>
        </select>
      </div>
      <div className="h-40 sm:h-48 mb-4 sm:mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="label" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} tick={{ fill: axisColor }} />
            <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} tick={{ fill: axisColor }} />
            <Tooltip
              contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, border: '1px solid rgba(255,255,255,0.1)' }}
              cursor={{ fill: 'rgba(124, 58, 237, 0.15)' }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="attempts" fill="#EC4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/10 rounded-2xl overflow-hidden bg-white/5 sm:bg-transparent">
        <div className="py-4 px-3 sm:px-4">
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Total Practice Days</p>
          <p className="text-xl sm:text-2xl font-bold mt-1">{totalPracticeDays}</p>
          <p className="text-gray-400 text-xs mt-1">unique days practiced</p>
        </div>
        <div className="py-4 px-3 sm:px-4">
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Total Attempts</p>
          <p className="text-xl sm:text-2xl font-bold mt-1">{totalAttempts}</p>
           <p className="text-gray-400 text-xs mt-1">since starting</p>
        </div>
        <div className="py-4 px-3 sm:px-4">
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Average Score</p>
          <p className="text-xl sm:text-2xl font-bold mt-1">{avgScore.toFixed(1)}</p>
          <p className="text-gray-400 text-xs mt-1">across all attempts</p>
        </div>
      </div>
    </div>
  );
};

export default AttemptsChart;