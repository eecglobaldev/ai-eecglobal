
import React from 'react';

const buttonVariants = ({ variant, size }: { variant?: string, size?: string }) => {
  let base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  if (variant === 'secondary') {
    base += ' bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700';
  } else if (variant === 'ghost') {
    base += ' hover:bg-slate-100 dark:hover:bg-slate-800';
  } else { // default
    base += ' bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90';
  }

  if (size === 'sm') {
    base += ' h-9 px-3 rounded-md';
  } else if (size === 'xs') {
    base += ' h-7 px-2 rounded-md text-xs';
  } else { // default
    base += ' h-10 py-2 px-4';
  }
  
  return base;
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={`${buttonVariants({ variant, size })} ${className || ''}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
