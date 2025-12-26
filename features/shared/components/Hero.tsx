import React from 'react';
import { Sparkles, Globe2, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { TOOLS } from '../lib/constants';
import ToolCard from './ToolCard';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen overflow-hidden pt-20 pb-32">

            {/* ==================== 
          BACKGROUND LAYERS 
      ==================== */}

            {/* Noise Texture (Universal) */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-20 pointer-events-none mix-blend-overlay"></div>

            {/* DARK MODE: Cosmic Nebulas */}
            <div className="hidden dark:block absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-blob [animation-delay:2000ms]"></div>
                {/* Stars */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            </div>

            {/* LIGHT MODE: Soft Pastel Meshes */}
            <div className="block dark:hidden absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-b from-blue-100/80 to-transparent rounded-full blur-[80px]"></div>
                <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-purple-100/70 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
                <div className="absolute top-[10%] right-0 w-[600px] h-[600px] bg-indigo-100/70 rounded-full blur-[100px] animate-blob [animation-delay:2000ms] mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">


                <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-3xl mx-auto">
                    <div className="relative h-20 xs:h-28 sm:h-32 md:h-28 w-64 md:w-80">
                        <Image
                            src="/assets/logos/eeclogo-main.png"
                            alt="EEC logo"
                            fill
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </div>
                </div>

                {/* --- Hero Content --- */}
                <div className="max-w-6xl mx-auto text-center mb-24">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
            bg-white/60 dark:bg-white/5 
            border border-blue-100 dark:border-white/10 
            text-blue-600 dark:text-blue-300 
            text-xs font-bold uppercase tracking-widest mb-10 
            backdrop-blur-md shadow-lg shadow-blue-500/5 animate-fade-up cursor-default hover:scale-105 transition-transform"
                    >
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>AI Advantage for Indian Students</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter mb-8 animate-fade-up [animation-delay:100ms] leading-[1.1] drop-shadow-sm text-slate-900 dark:text-white">

                        {/* Word 1: EEC (USA - Blue/Red/White) */}
                        <span className="inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-red-600 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:via-red-400 dark:hover:to-white cursor-default">
                            EEC
                        </span>
                        {" "}

                        {/* Word 2: Study (UK - Red/Blue/White) */}
                        <span className="inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-700 hover:via-blue-800 hover:to-red-600 dark:hover:from-red-500 dark:hover:via-blue-500 dark:hover:to-red-400 cursor-default">
                            Study
                        </span>
                        {" "}

                        {/* Word 3: Abroad (Canada - Red/White) */}
                        <span className="inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:via-slate-400 hover:to-red-600 dark:hover:from-red-500 dark:hover:via-white dark:hover:to-red-500 cursor-default">
                            Abroad
                        </span>
                        <br className="hidden lg:block" />

                        {/* Word 4: AI Evolution (Germany - Black/Red/Gold) */}
                        <span className="inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-slate-900 hover:via-red-600 hover:to-amber-500 dark:hover:from-slate-200 dark:hover:via-red-500 dark:hover:to-yellow-400 cursor-default">
                            AI Evolution
                        </span>
                        {" "}

                        {/* Word 5: 2026 (France - Blue/White/Red) */}
                        <span className="inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-700 hover:via-slate-300 hover:to-red-600 dark:hover:from-blue-400 dark:hover:via-white dark:hover:to-red-400 cursor-default">
                            2026
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-up [animation-delay:200ms] font-medium">
                        Don't guess. Access 10+ specialized AI agents trained on real visa interviews and university data. Check your eligibility, fix your English, and get your visa—<span className="text-slate-900 dark:text-white font-bold underline decoration-blue-500/50 underline-offset-4">100% Free.</span>
                    </p>

                    {/* Stats/Trust */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 animate-fade-up [animation-delay:300ms]">
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                            <Globe2 className="w-5 h-5 text-blue-500" />
                            <span>20+ Years Data</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            <span>Verified Accuracy</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                            <Zap className="w-5 h-5 text-amber-500" />
                            <span>Instant Results</span>
                        </div>
                    </div>
                </div>

                {/* --- The Integrated Grid --- */}
                <div id="tools" className="relative mt-32">
                    {/* Grid Glow Background (Dark Mode only) */}
                    <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl -z-10 rounded-[3rem]"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                        {TOOLS.map((tool, idx) => (
                            <div key={tool.id} className="animate-fade-up" style={{ animationDelay: `${400 + (idx * 50)}ms` }}>
                                <ToolCard tool={tool} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
