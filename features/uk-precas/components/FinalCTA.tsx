import React from 'react';
import { Sparkles, Zap, ArrowRight, Phone, Shield, Award, Users } from 'lucide-react';

export const FinalCTA: React.FC = () => {
    return (
        <section className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl mb-10 sm:mb-16 lg:mb-20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 animate-gradient-xy" />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute -bottom-20 -left-20 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-white/5 rounded-full blur-3xl" />
            </div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            <div className="relative text-center py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-6">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-white/20">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    100% Free • No Card Required
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
                    Ready to Ace Your
                    <br />
                    <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">UK Pre-CAS Interview?</span>
                </h3>
                
                <p className="text-indigo-100 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                    Join 50,000+ students who chose EEC for UK visa success. Start your free AI practice now or visit any of our 26 Gujarat branches.
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5">
                    <a 
                        href="/uk-precas/"
                        className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-white text-indigo-700 font-bold rounded-lg sm:rounded-xl shadow-2xl shadow-black/20 hover:shadow-white/25 hover:scale-105 transition-all duration-300 overflow-hidden text-sm sm:text-base"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Zap className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                        <span className="relative">Start Free AI Practice</span>
                        <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                        href="https://wa.me/918758880170?text=Hi, I need UK Pre-CAS interview guidance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                    >
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-wiggle" />
                        <span>WhatsApp EEC</span>
                    </a>
                </div>
                
                {/* Trust badges */}
                <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 text-white/60 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>AIRC Certified</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block" />
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>29 Years</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/40 hidden sm:block" />
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>50K+ Students</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

