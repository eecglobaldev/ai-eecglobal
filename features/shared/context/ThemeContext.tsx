'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
    mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true); // Default to dark server-side
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check local storage or preference on mount
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        console.log('Theme Effect Triggered:', { darkMode });
        const root = document.documentElement;

        if (darkMode) {
            console.log('Adding dark class');
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            console.log('Removing dark class');
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        console.log('Root classes after update:', root.classList.toString());
    }, [darkMode, mounted]);

    const toggleTheme = () => setDarkMode(prev => !prev);

    // Return mounted state so consumers can hide mismatched content
    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
