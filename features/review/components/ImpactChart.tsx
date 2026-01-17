
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Lighting', 'Common Mistake Impact': 35, 'Best Practice Impact': 95 },
    { name: 'Placement', 'Common Mistake Impact': 30, 'Best Practice Impact': 90 },
    { name: 'Audio Clarity', 'Common Mistake Impact': 40, 'Best Practice Impact': 85 },
    { name: 'Framing', 'Common Mistake Impact': 50, 'Best Practice Impact': 88 },
    { name: 'Content Structure', 'Common Mistake Impact': 60, 'Best Practice Impact': 92 },
];

export const ImpactChart: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const textColor = isDarkMode ? '#E2E8F0' : '#475569'; // slate-200 and slate-600
    const gridColor = isDarkMode ? '#475569' : '#D1D5DB'; // slate-600 and gray-300

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: textColor }} />
                <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: textColor }}
                />
                <Tooltip
                    cursor={{fill: isDarkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(236, 236, 236, 0.5)'}}
                    formatter={(value: number | undefined) => value !== undefined ? `${value}%` : ''}
                    contentStyle={{
                        backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', // slate-800
                        borderColor: isDarkMode ? '#475569' : '#D1D5DB',
                        color: textColor
                    }}
                    labelStyle={{ color: textColor }}
                />
                <Legend wrapperStyle={{top: -10}} formatter={(value) => <span style={{color: textColor}}>{value}</span>}/>
                <Bar dataKey="Common Mistake Impact" fill="#FF6B6B" radius={[5, 5, 0, 0]} />
                <Bar dataKey="Best Practice Impact" fill="#06D6A0" radius={[5, 5, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};
