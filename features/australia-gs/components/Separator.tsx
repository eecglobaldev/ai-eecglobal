import React, { useState, useEffect, useRef, RefObject } from 'react';

// --- Custom Hook to detect when an element is in the viewport ---
const useGlowOnScroll = (ref: RefObject<HTMLElement>): boolean => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                rootMargin: '0px',
                threshold: 0.1 // Trigger when 10% of the element is visible
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref]);

    return isIntersecting;
};


// Gem Icon
const GemIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-600">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="m12 22 4-13-3-6" />
        <path d="m12 22-4-13 3-6" />
    </svg>
);

export const Separator: React.FC<{ glowColor?: string }> = ({ glowColor }) => {
    const separatorRef = useRef<HTMLDivElement>(null);
    const isGlowing = useGlowOnScroll(separatorRef as React.RefObject<HTMLElement>);
    const glowClass = glowColor ? `glow-${glowColor}` : '';


    return (
        <div
            ref={separatorRef}
            className={`my-12 md:my-16 flex items-center justify-center separator-glow-effect ${glowClass} ${isGlowing ? 'is-glowing' : ''}`}
            aria-hidden="true"
        >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-slate-50 dark:bg-slate-900 rounded-full">
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center">
                        <GemIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};


export const SubtleSeparator: React.FC<{ glowColor?: string }> = ({ glowColor }) => {
    const separatorRef = useRef<HTMLDivElement>(null);
    const isGlowing = useGlowOnScroll(separatorRef as React.RefObject<HTMLElement>);
    const glowClass = glowColor ? `glow-${glowColor}` : '';


    return (
        <div
            ref={separatorRef}
            className={`my-10 separator-glow-effect subtle-separator ${glowClass} ${isGlowing ? 'is-glowing' : ''}`}
            aria-hidden="true"
        >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/50 to-transparent"></div>
        </div>
    );
};