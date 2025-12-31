import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { PracticeAttempt } from '../types';

interface Props {
  practiceHistory: PracticeAttempt[];
  theme?: 'light' | 'dark';
}

const QuestionProgressChart: React.FC<Props> = ({ practiceHistory, theme = 'dark' }) => {
  const [selectedQuestion, setSelectedQuestion] = useState('');

  // Extract sorted unique IDs like question_1, question_2...
  const questionIds = useMemo(() => {
    const ids = new Set(
      practiceHistory
        .map((p) => p.questionId)
        .filter((id): id is string => Boolean(id))
    );
    const getNumericId = (value: string) => {
      const [, num] = value.split('_');
      return Number(num) || 0;
    };

    return Array.from(ids).sort(
      (aId, bId) => getNumericId(aId as string) - getNumericId(bId as string)
    );
  }, [practiceHistory]);

  const filteredAttempts = useMemo(() => {
    if (!selectedQuestion) return [];

    return practiceHistory
      .filter((p) => p.questionId === selectedQuestion)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
      .map((attempt, index) => ({
        attemptNumber: index + 1,
        score: attempt.score,
        date: new Date(attempt.timestamp).toLocaleDateString(),
      }));
  }, [practiceHistory, selectedQuestion]);

  const renderBody = () => {
    if (!selectedQuestion) {
      return (
        <p className="text-gray-400 text-sm">
          Choose a question to view score improvement over time.
        </p>
      );
    }

    if (filteredAttempts.length === 0) {
      return (
        <p className="text-gray-400 text-sm">
          No attempts recorded for this question yet.
        </p>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={filteredAttempts}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="attemptNumber"
            stroke={theme === 'light' ? '#4b5563' : 'rgba(255,255,255,0.7)'}
            fontSize={12}
            label={{ value: 'Attempt #', position: 'insideBottom', offset: -1, fill: theme === 'light' ? '#4b5563' : '#d1d5db' }}
          />
          <YAxis
            domain={[0, 10]}
            stroke={theme === 'light' ? '#4b5563' : 'rgba(255,255,255,0.7)'}
            fontSize={12}
            label={{ value: 'Score', angle: -90, dx: -12, fill: theme === 'light' ? '#4b5563' : '#d1d5db' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'light' ? '#f9fafb' : 'rgba(17, 24, 39, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.75rem',
              color: theme === 'light' ? '#0f172a' : '#fff',
            }}
            labelFormatter={(value) => `Attempt ${value}`}
            formatter={(value: number | undefined, name?: string, payload?: any) => [
              `${value ?? 0}/10`,
              `Score (${payload?.payload?.date || ''})`,
            ]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#34D399"
            strokeWidth={3}
            dot={{ r: 5, fill: '#34D399', stroke: '#1f2937', strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-glass-bg p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-glass-border backdrop-blur-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">Score Improvement Per Question</h2>
          <p className="text-xs text-gray-400">
            Track how your score changes for each interview question.
          </p>
        </div>
        <select
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
          className="bg-white/10 border border-glass-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple w-full sm:w-56 text-white placeholder:text-gray-400"
        //   style={{ backgroundColor: 'rgba(23, 15, 48, 0.95)' }}
        >
          <option value="" className="bg-primary-dark-purple text-white">
            Select Question
          </option>
          {questionIds.map((id) => (
            <option
              key={id}
              value={id}
              className="bg-primary-dark-purple text-white"
            >
              {`Question ${id.split('_')[1] || id}`}
            </option>
          ))}
        </select>
      </div>

      <div className="min-h-[128px] flex items-center justify-center">
        {renderBody()}
      </div>
    </div>
  );
};

export default QuestionProgressChart;

