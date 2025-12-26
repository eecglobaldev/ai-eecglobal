import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
    value, 
    suffix = '', 
    prefix = '', 
    duration = 2000 
}) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let start = 0;
        const end = value;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value, duration]);
    
    return <span className="tabular-nums">{prefix}{count.toLocaleString()}{suffix}</span>;
};

