import React, { ElementType } from 'react';

interface BadgeProps {
  text: string;
  icon: ElementType;
  glowColor: string;
}

const Badge: React.FC<BadgeProps> = ({ text, icon: Icon, glowColor }) => {
  return (
    <div 
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full border
        text-[10px] md:text-xs font-bold tracking-wider uppercase
        bg-opacity-10 backdrop-blur-sm shadow-sm
        text-slate-700 dark:text-slate-200
      `}
      style={{
        borderColor: `${glowColor}40`,
        backgroundColor: `${glowColor}15`, 
        boxShadow: `0 0 15px -5px ${glowColor}30`
      }}
    >
      <Icon size={12} strokeWidth={3} style={{ color: glowColor }} />
      <span className="opacity-90">{text}</span>
    </div>
  );
};

export default Badge;