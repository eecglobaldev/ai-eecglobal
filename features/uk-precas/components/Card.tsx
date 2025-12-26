import React from 'react';
import { CardData } from '../types';
import Badge from './Badge';

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const cssVars = {
    '--glow-color': data.glowColor,
  } as React.CSSProperties;

  const MainIcon = data.mainIcon;

  return (
    <div 
      className="relative group w-full h-full"
      style={cssVars}
    >
      {/* 
         Back Glow
         Light Mode: Subtle colored aura
         Dark Mode: Stronger glow
      */}
      <div 
        className="absolute inset-0 rounded-2xl sm:rounded-[2rem] transition-all duration-500 opacity-30 dark:opacity-20 group-hover:opacity-60 dark:group-hover:opacity-50 blur-2xl group-hover:blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${data.glowColor}, transparent 70%)`,
          transform: 'scale(0.95)',
        }}
      />
      
      {/* 
         Main Card Container 
         Light Mode: White bg, slate border
         Dark Mode: Dark gray bg, colored border
      */}
      <div 
        className="relative h-full flex flex-col items-center text-center p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] border-2 sm:border-[3px] transition-all duration-500 ease-out group-hover:-translate-y-2 z-10 overflow-hidden
          bg-white/95 dark:bg-[#111827] 
          backdrop-blur-xl"
        style={{
          borderColor: `${data.glowColor}40`,
          boxShadow: `0 0 0 1px inset ${data.glowColor}10`
        }}
      >
        {/* Hover Border Overlay */}
        <div 
          className="absolute inset-0 rounded-2xl sm:rounded-[2rem] border-2 sm:border-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ 
            borderColor: data.glowColor,
            boxShadow: `0 0 40px -5px ${data.glowColor}80` 
          }}
        />

        {/* 
            Icon Section 
        */}
        <div className="relative mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 ease-in-out">
           {/* Icon Background Glow */}
           <div 
             className="absolute inset-0 blur-xl opacity-30 dark:opacity-40 animate-pulse-glow"
             style={{ backgroundColor: data.glowColor }}
           />
           
           {/* The Icon */}
           <div className="relative z-10 animate-float">
             <MainIcon 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] drop-shadow-lg"
                strokeWidth={1.5} 
                color={data.glowColor}
             />
           </div>
        </div>

        {/* Top Badge */}
        <div className="mb-3 sm:mb-4 md:mb-6 relative z-20">
          <Badge text={data.badgeText} icon={data.badgeIcon} glowColor={data.glowColor} />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-sm text-slate-900 dark:text-white">
          {data.title}
        </h2>

        {/* Description */}
        <div className="text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto text-slate-600 dark:text-slate-300">
          {data.description}
        </div>

        {/* Bottom subtle gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-b-2xl sm:rounded-b-[2rem] pointer-events-none"
          style={{ background: `linear-gradient(to top, ${data.glowColor}30, transparent)` }}
        />
      </div>
    </div>
  );
};

export default Card;