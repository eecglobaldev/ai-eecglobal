import React from 'react';

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  theme?: 'light' | 'dark';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value, subtitle, theme = 'dark' }) => {
  const iconClasses =
    theme === 'light'
      ? 'p-2 sm:p-3 rounded-xl bg-primary-purple/10 text-primary-purple'
      : 'p-2 sm:p-3 rounded-xl bg-primary-dark-purple/70 text-secondary-pink';

  const titleClasses =
    theme === 'light' ? 'text-xs sm:text-sm text-gray-500 mb-1' : 'text-xs sm:text-sm text-gray-400 mb-1';
  const subtitleClasses = theme === 'light' ? 'text-xs text-gray-500 line-clamp-2' : 'text-xs text-gray-500 line-clamp-2';

  return (
    <div className="bg-glass-bg p-3 sm:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-lg border border-glass-border flex flex-col justify-between hover:border-primary-purple/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={iconClasses}>
            {icon}
        </div>
      </div>
      <div>
        <h3 className={titleClasses}>{title}</h3>
        <p className="text-xl sm:text-2xl font-bold">{value}</p>
        <p className={subtitleClasses}>{subtitle}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
