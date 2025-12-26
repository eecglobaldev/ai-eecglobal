import React from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '../types';

interface ToolCardProps {
    tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
    const Icon = tool.icon;
    // Note: Experimental typedRoutes might require specific string literals, 
    // but tool.url is string. We trust the input for now.
    const isInternal = tool.url.startsWith('/');

    // Optimized gradients for distinct themes
    const getGradientTheme = (id: string, flagCode?: string): [string, string] => {

        // Germany
        if (flagCode === 'de') return [
            'from-slate-800 via-red-600 to-amber-500 dark:from-amber-400 dark:via-red-500 dark:to-yellow-400',
            '#F59E0B'
        ];

        // USA
        if (flagCode === 'us') return [
            'from-blue-700 via-red-600 to-blue-800 dark:from-blue-400 dark:via-red-400 dark:to-blue-200',
            '#3B82F6'
        ];

        // UK
        if (flagCode === 'gb') return [
            'from-red-700 via-blue-800 to-red-600 dark:from-red-500 dark:via-blue-500 dark:to-red-400',
            '#1D4ED8'
        ];

        // Australia
        if (flagCode === 'au') return [
            'from-blue-800 via-red-600 to-blue-600 dark:from-blue-400 dark:via-red-400 dark:to-blue-300',
            '#6366F1'
        ];

        // New Zealand
        if (flagCode === 'nz') return [
            'from-slate-800 via-red-600 to-blue-700 dark:from-blue-300 dark:via-red-500 dark:to-blue-500',
            '#14B8A6'
        ];

        // Ireland
        if (flagCode === 'ie' || id === 'ireland-guide') return [
            'from-emerald-700 via-emerald-500 to-orange-500 dark:from-emerald-400 dark:via-emerald-500 dark:to-orange-400',
            '#10B981'
        ];

        // Finland
        if (flagCode === 'fi') return [
            'from-sky-600 via-blue-600 to-sky-900 dark:from-sky-400 dark:via-blue-500 dark:to-white',
            '#0EA5E9'
        ];

        // Functional Gradients
        if (id.includes('career')) return ['from-purple-600 via-fuchsia-600 to-indigo-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-indigo-400', '#A855F7'];
        if (id.includes('travel')) return ['from-cyan-600 via-blue-600 to-teal-600 dark:from-cyan-400 dark:via-blue-400 dark:to-teal-400', '#06B6D4'];
        if (id.includes('course')) return ['from-pink-600 via-rose-600 to-orange-500 dark:from-pink-400 dark:via-rose-400 dark:to-orange-400', '#EC4899'];

        // New Tools
        if (id.includes('pte')) return ['from-orange-500 via-amber-600 to-yellow-500 dark:from-orange-400 dark:via-amber-500 dark:to-yellow-400', '#F97316'];
        if (id.includes('bot') || id.includes('ielts')) return ['from-sky-500 via-blue-500 to-cyan-500 dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400', '#0EA5E9'];

        // Default
        return ['from-slate-600 via-slate-500 to-slate-600 dark:from-slate-400 dark:via-slate-200 dark:to-slate-400', '#64748B'];
    };

    const [gradientColors, glowColor] = getGradientTheme(tool.id, tool.flagCode);

    const CardContent = () => (
        <>
            {/* ==================== 
          CARD GLOW EFFECTS 
      ==================== */}

            {/* 1. The Strong Back Glow (Pulsing) */}
            <div
                className="absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl dark:blur-2xl"
                style={{ background: `linear-gradient(135deg, ${glowColor}40, transparent, ${glowColor}40)` }}
            ></div>

            {/* 2. The Border Glow (Moving Gradient) */}
            <div className={`absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-br ${gradientColors} opacity-0 group-hover:opacity-40 transition-all duration-500 blur-[1px]`}></div>

            {/* ==================== 
          CARD BODY 
      ==================== */}
            <div className="relative flex flex-col h-full rounded-[2.5rem] p-8 overflow-hidden transition-all duration-300
        bg-white dark:bg-[#0F172A] 
        border border-slate-100 dark:border-white/5 
        shadow-xl shadow-slate-200/50 dark:shadow-none
      ">

                {/* Inner Radial Highlight (Top Right) */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${gradientColors} opacity-[0.03] dark:opacity-[0.15] blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 pointer-events-none`}></div>

                {/* Header: Icon & Badge */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="relative">
                        {tool.customIconUrl ? (
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-slate-50 dark:ring-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <Image
                                    src={tool.customIconUrl}
                                    alt={tool.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : tool.flagCode ? (
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-slate-50 dark:ring-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <Image
                                    src={`https://flagcdn.com/w160/${tool.flagCode}.png`}
                                    alt={`${tool.flagCode} flag`}
                                    fill
                                    className="object-cover transform scale-125"
                                />
                            </div>
                        ) : (
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 bg-gradient-to-br ${gradientColors}`}>
                                <Icon className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                        )}
                    </div>

                    {tool.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
              bg-blue-50 dark:bg-blue-900/30 
              border border-blue-100 dark:border-blue-500/30 
              text-blue-600 dark:text-blue-300 
              text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                            <Star className="w-3 h-3 text-blue-500 dark:text-blue-400 fill-current" />
                            {tool.badge}
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="mb-8 relative z-10">
                    <h3 className={`
            text-3xl font-display font-extrabold mb-4 leading-tight
            text-slate-900 dark:text-white
            group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${gradientColors}
            transition-all duration-300
          `}>
                        {tool.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                        {tool.description}
                    </p>
                </div>

                {/* Features List (with connecting lines effect) */}
                <div className="mt-auto space-y-4 relative z-10">
                    {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/feature">
                            <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center 
                 bg-slate-100 dark:bg-slate-800 
                 border border-slate-200 dark:border-slate-700 
                 text-slate-400 dark:text-slate-500 
                 shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-500/30 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all">
                                <Check className="w-3 h-3" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-500 group-hover/feature:text-slate-700 dark:group-hover/feature:text-slate-300 transition-colors">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Hover Arrow (Bottom Right) */}
                <div className="absolute bottom-6 right-6 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                    <div className="p-3 rounded-full text-white dark:text-slate-900 shadow-lg transform hover:scale-110 transition-transform bg-slate-900 dark:bg-white">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </div>

            </div>
        </>
    );

    if (isInternal) {
        return (
            <Link
                href={tool.url as any} // Cast safely due to typed routes
                className="group relative flex flex-col h-full rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 z-10"
            >
                <CardContent />
            </Link>
        );
    }

    return (
        <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col h-full rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 z-10"
        >
            <CardContent />
        </a>
    );
};

export default ToolCard;
