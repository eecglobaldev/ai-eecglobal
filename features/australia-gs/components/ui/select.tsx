
import React from 'react';

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { onValueChange?: (value: string) => void; children?: React.ReactNode }
>(({ className = "", children, onValueChange, ...props }, ref) => {
    const childArray = React.Children.toArray(children) as any[];
    const trigger = childArray.find((child) => child && child.type === SelectTrigger);

    // Extract options from SelectContent children
    const options = childArray
        .filter((child) => child && child.type === SelectContent)
        .flatMap((child) => React.Children.toArray(child.props.children));

    const triggerClassName = trigger?.props?.className ?? "";

    return (
        <select
            ref={ref}
            className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white dark:bg-slate-900 py-2 px-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-light focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 ${triggerClassName} ${className}`}
            onChange={(e) => onValueChange?.(e.target.value)}
            {...props}
        >
            {options}
        </select>
    );
});
Select.displayName = 'Select';

// These components are dummies to make the parent component render without errors.
// Their children are extracted by the main Select component above.
const SelectTrigger: React.FC<{ children?: React.ReactNode; className?: string }> = () => null;
const SelectValue: React.FC<{ placeholder?: string }> = () => null;
const SelectContent: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children }) => <>{children}</>;

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>((props, ref) => <option ref={ref} {...props} />);
SelectItem.displayName = 'SelectItem';

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
