
import React from 'react';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ${className}`}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
