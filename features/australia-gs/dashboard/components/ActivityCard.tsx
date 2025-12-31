
import React from 'react';

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  progress: number;
  progressText: string;
  daysLeft: string;
  bgColor: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ icon, title, progress, progressText, daysLeft, bgColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-3xl backdrop-blur-lg bg-opacity-70 border border-glass-border`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary-purple rounded-xl">{icon}</div>
        <button className="text-gray-400">...</button>
      </div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-3">56 km / weeks</p>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-400">Progress</span>
        <span className="font-bold">{progressText}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
       <div className="text-right text-xs text-rose-400 font-semibold mt-2">{daysLeft}</div>
    </div>
  );
};

export default ActivityCard;
