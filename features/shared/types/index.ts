import { LucideIcon } from 'lucide-react';

export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    url: string;
    color: string;
    badge?: string;
    features: string[];
    flagCode?: string; // ISO 2-letter country code for flag display
    customIconUrl?: string; // New: Full URL for a custom brand asset
    popular?: boolean;
}

export interface WorkflowStep {
    id: number;
    title: string;
    tagline: string;
    description: string;
    icon: LucideIcon;
    bullets: string[];
    colorTheme: string; // e.g., 'blue', 'purple' for dynamic tailwind classes
}
