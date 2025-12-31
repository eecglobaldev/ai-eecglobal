import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PracticeAttempt } from '../types';

interface ScoreDistributionProps {
  practiceHistory: PracticeAttempt[];
  theme?: 'light' | 'dark';
}

const COLORS = {
    fail: '#F472B6', // Pink
    borderline: '#FBBF24', // Yellow
    excellent: '#34D399', // Green
};

const ScoreDistribution: React.FC<ScoreDistributionProps> = ({ practiceHistory, theme = 'dark' }) => {
  const axisColor = theme === 'light' ? '#4b5563' : 'rgba(255,255,255,0.7)';
  const gridColor = theme === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255, 255, 255, 0.1)';
  const tooltipBg = theme === 'light' ? '#f9fafb' : 'rgba(46, 26, 71, 0.8)';
  const tooltipText = theme === 'light' ? '#0f172a' : '#fff';
  const { scoreDistribution, analysis } = useMemo(() => {
    if (!practiceHistory || practiceHistory.length === 0) {
      return { scoreDistribution: [], analysis: null };
    }

    const brackets = {
      fail: 0,
      borderline: 0,
      excellent: 0,
    };

    practiceHistory.forEach(attempt => {
      const score = attempt.score;
      if (score <= 4) brackets.fail++;
      else if (score <= 7) brackets.borderline++;
      else brackets.excellent++;
    });

    const data = [
      { name: 'Fail (0-4)', count: brackets.fail, fill: COLORS.fail },
      { name: 'Borderline (5-7)', count: brackets.borderline, fill: COLORS.borderline },
      { name: 'Excellent (8-10)', count: brackets.excellent, fill: COLORS.excellent },
    ];
    
    let analysisText;
    if (brackets.excellent > brackets.fail) {
        analysisText = `Great job! You have ${brackets.excellent} excellent attempt${brackets.excellent === 1 ? '' : 's'}. Keep refining the others.`;
    } else if (brackets.fail > 0) {
        analysisText = `You're making progress! Focus on improving the ${brackets.fail} attempt${brackets.fail === 1 ? '' : 's'} in the 'Fail' category.`;
    } else {
        analysisText = "You're consistently scoring well. Keep up the great work!";
    }

    return { 
        scoreDistribution: data, 
        analysis: {
            text: analysisText,
            counts: brackets
        }
    };
  }, [practiceHistory]);

  if (practiceHistory.length === 0) {
      return (
         <div className="bg-glass-bg p-6 rounded-3xl backdrop-blur-lg border border-glass-border">
            <h3 className="text-xl font-bold mb-4">Performance by Question</h3>
            <div className="flex items-center justify-center h-48 text-gray-400">
                <p>Complete your first practice session to see your score distribution.</p>
            </div>
        </div>
      )
  }

  return (
    <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border">
      <h3 className="text-lg sm:text-xl font-bold mb-4">Score Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
        <div className="md:col-span-2 h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" stroke={axisColor} fontSize={10} domain={[0, dataMax => (dataMax === 0 ? 5 : dataMax + 1)]} allowDecimals={false} tick={{ fill: axisColor }} />
              <YAxis type="category" dataKey="name" stroke={axisColor} width={100} tick={{ fontSize: 10, fill: axisColor }} />
              <Tooltip
                cursor={{ fill: 'rgba(124, 58, 237, 0.2)' }}
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '1rem',
                  color: tooltipText,
                }}
                labelStyle={{ color: tooltipText }}
                itemStyle={{ color: tooltipText }}
                formatter={(value) => [`${value} attempt${value === 1 ? '' : 's'}`, 'Count']}
              />
              <Bar dataKey="count" barSize={20} radius={[0, 10, 10, 0]}>
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="md:col-span-1 space-y-4">
            <h4 className="font-bold text-center text-primary-purple mb-2 text-sm sm:text-base">Analysis</h4>
            {analysis && (
                 <div className="bg-white/5 p-3 sm:p-4 rounded-xl text-center">
                    <div className="flex justify-around mb-3 sm:mb-4">
                        <div className="text-center">
                            <p className="text-xl sm:text-2xl font-bold" style={{color: COLORS.fail}}>{analysis.counts.fail}</p>
                            <p className="text-xs text-gray-400">Fail</p>
                        </div>
                        <div className="text-center">
                             <p className="text-xl sm:text-2xl font-bold" style={{color: COLORS.borderline}}>{analysis.counts.borderline}</p>
                            <p className="text-xs text-gray-400">Borderline</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl sm:text-2xl font-bold" style={{color: COLORS.excellent}}>{analysis.counts.excellent}</p>
                            <p className="text-xs text-gray-400">Excellent</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-300 italic">{analysis.text}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ScoreDistribution;