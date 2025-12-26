
import React from 'react';

const badgeVariants = ({ variant }: { variant?: string }) => {
    let base = 'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    if (variant === 'secondary') {
        base += ' border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80';
    } else if (variant === 'outline') {
        base += ' text-slate-950 dark:text-slate-50';
    } else { // default
        base += ' border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80';
    }
    return base;
}

const Badge = ({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) => {
  return (
    <div className={`${badgeVariants({ variant })} ${className}`} {...props} />
  );
};

export { Badge };
