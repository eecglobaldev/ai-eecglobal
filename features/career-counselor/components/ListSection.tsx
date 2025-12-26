
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { categoryIcons } from '../constants';

interface ListSectionProps {
  title: string;
  items: string[];
  iconKey: string;
}

const ListSection: React.FC<ListSectionProps> = ({ title, items, iconKey }) => {
  const Icon = categoryIcons[iconKey];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 animate-fadeIn">
      <div className="flex items-center mb-4">
        <span className="text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4">
          {Icon && <Icon className="w-6 h-6" />}
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <ul className="space-y-3 text-slate-700 dark:text-slate-300">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-indigo-500 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSection;
