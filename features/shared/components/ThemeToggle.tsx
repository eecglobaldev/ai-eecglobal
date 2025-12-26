'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { darkMode, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95
        bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700
        text-slate-800 dark:text-yellow-400 group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6">
                <Sun className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${darkMode ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
                <Moon className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${darkMode ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} />
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-yellow-500/20 blur-xl -z-10 group-hover:blur-2xl transition-all"></div>
        </button>
    );
};

export default ThemeToggle;
