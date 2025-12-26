import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
    text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <button 
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 group"
            title="Copy to clipboard"
        >
            {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
            ) : (
                <Copy className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
            )}
        </button>
    );
};

