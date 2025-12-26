import React from 'react';
import UsaVisaApp from '@/features/usa-visa/components/UsaVisaApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'USA F-1 Visa Interview Prep - AI Powered | EEC',
    description: 'Practice for your USA F-1 Student Visa Interview with our advanced AI interviewer. Get real-time feedback, pronunciation guides, and personalized prep plans.',
};

export default function UsaVisaPrepPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
            <UsaVisaApp />
        </div>
    );
}
