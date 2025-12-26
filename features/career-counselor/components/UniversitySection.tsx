
import React from 'react';
import { UniversityInfo } from '../types';
import { categoryIcons } from '../constants';

interface UniversitySectionProps {
  title: string;
  items: UniversityInfo[];
  iconKey: string;
}

const UniversitySection: React.FC<UniversitySectionProps> = ({ title, items, iconKey }) => {
  const Icon = categoryIcons[iconKey];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 animate-fadeIn">
      <div className="flex items-center mb-4">
        <span className="text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4">
          {Icon && <Icon className="w-6 h-6" />}
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((uni, idx) => (
          <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-700/50">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
              {uni.institution_name || "N/A"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex flex-col sm:flex-row sm:items-start">
                <strong className="w-40 flex-shrink-0 font-semibold text-slate-700 dark:text-slate-200">Related Courses:</strong>
                <span>{uni.related_courses || "N/A"}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <strong className="w-40 flex-shrink-0 font-semibold text-slate-700 dark:text-slate-200">Tuition Fees:</strong>
                <span>{uni.tuition_fees_local_inr || "N/A"}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <strong className="w-40 flex-shrink-0 font-semibold text-slate-700 dark:text-slate-200">Academic Reqs:</strong>
                <span>{uni.academic_requirements || "N/A"}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <strong className="w-40 flex-shrink-0 font-semibold text-slate-700 dark:text-slate-200">English Tests:</strong>
                <span>{uni.english_test_scores || "N/A"}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <strong className="w-40 flex-shrink-0 font-semibold text-slate-700 dark:text-slate-200">Other Tests:</strong>
                <span>{uni.other_test_scores || "N/A"}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start">
                <strong className="w-40 flex-shrink-0 font-semibold text-slate-700 dark:text-slate-200">Deadlines:</strong>
                <span>{uni.application_deadlines || "N/A"}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitySection;
