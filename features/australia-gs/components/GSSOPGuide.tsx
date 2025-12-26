import React, { useState, useMemo } from 'react';

// --- NEW ICONS ---
const CheckCircle2Icon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
const XIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>;
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>;


const questionnaireData = [
    { title: "Who you are (fit & background)", points: ["Highest qualification (degree, %/CGPA, year, uni/board)?", "Key subjects/projects that link to your chosen course?", "Any backlogs/gaps? Why, and what did you do in that period?"] },
    { title: "Why this course (academic rationale)", points: ["Exact course name, CRICOS code (if known), duration, intakes?", "Three specific subjects/units and why they matter to your goals?", "Skills you expect to gain (tools, frameworks, labs, certifications)?", "How does this course progress your current profile (not a restart)?"] },
    { title: "Why this provider (institution choice)", points: ["3–4 concrete reasons: rankings in your field, facilities, labs, industry links, campus location, student support, graduate outcomes.", "Which close alternatives in Australia did you compare—and why not them?"] },
    { title: "Why Australia (country choice)", points: ["Learning model (industry projects, internships), safety, multicultural setting.", "What did you compare against India/UK/Canada/US? Be specific on costs, entry, timelines, recognition."] },
    { title: "Career plan (India-anchored)", points: ["Target roles/titles after graduation; 3 Indian employers you’d apply to.", "Expected salary range with source (job portals/reports you’ve seen).", "3–5 year plan: how the course upgrades your trajectory in India."] },
    { title: "Financial capacity (credible funding)", points: ["Tuition (year-wise) + OSHC + estimated living expenses (annual).", "Who sponsors you? Their occupation, annual income, savings, education loan (bank, amount, sanction status).", "Upfront payments done (tuition/OSHC) and evidence you’ll attach."] },
    { title: "Compliance awareness (visa conditions)", points: ["Acknowledge student visa study obligations and work-hours limits.", "State primary intent is study; part-time work is only to gain exposure, not to fund studies.", "Acceptance of attendance/academic performance requirements."] },
    { title: "Personal circumstances & ties to India", points: ["Family background, dependants (if any), assets, responsibilities.", "Property/business ties, return incentives, community links.", "Prior travel/visa history (if any), clean records."] },
    { title: "Accommodation & settlement plan", points: ["City/campus, initial accommodation plan (on-/off-campus), transport plan, arrival timeline."] },
    { title: "Risk factors & mitigations", points: ["English readiness (IELTS/PTE scores, recent use of English).", "Any academic/financial gaps? Explain briefly with supporting proof.", "If you changed field, explain the logical progression."] }
];

const templateData = [
    { title: "Introduction & Objective", content: "“I am [Name], a [Degree, Year, %/CGPA] graduate from [Institution]. I am applying for the [Course, Provider, City] commencing [Intake, Year] to build advanced capability in [field focus], which aligns with my experience in [brief link] and my career plan in India.”" },
    { title: "Academic Fit & Past Prep", content: "“During my studies, I excelled in [subjects] and completed [project/internship], giving me foundations in [skills]. Any performance fluctuations in [semester/year] were due to [reason], which I addressed by [action/outcome].”" },
    { title: "Why This Course", content: "“The program’s structure—especially [Unit 1], [Unit 2], and [Unit 3]—develops [specific skills/tools]. Access to [labs/centres/industry projects] and assessment style [projects/capstones] directly supports the competencies demanded by [target roles].”" },
    { title: "Why This Provider", content: "“I compared [Provider A/B] offering [differences]. I chose [Your Provider] because of [industry links/employability stats/facilities/location/student support], which best matches my goals.”" },
    { title: "Why Australia", content: "“Australia’s [teaching model, internship pathways, safety, multicultural ecosystem] and clear quality standards make it the right destination. Versus [India/UK/Canada/US], [two concrete comparative reasons].”" },
    { title: "Career Plan in India", content: "“After graduation, I will return to India to pursue [roles] at companies such as [Company 1/2/3]. Current salaries for these roles range around [₹X–₹Y] (based on [source seen]). In 3–5 years, I aim to advance to [role] using the capabilities from this program.”" },
    { title: "Funding & Financial Capacity", content: "“Total estimated cost is [tuition per year + OSHC + living]. My studies are funded by [self/sponsor: relation, occupation, annual income] with [savings ₹… + sanctioned loan ₹…]. I have already paid [tuition/OSHC]. Bank statements, ITRs, and loan sanction letters are included.”" },
    { title: "Compliance & Conduct", content: "“I understand student visa conditions: full-time enrolment, satisfactory progress, attendance, and permitted work hours. My primary purpose is study; any part-time work will be limited and secondary.”" },
    { title: "Personal Ties & Return Incentives", content: "“My immediate family resides in [city/state]. We have [assets/responsibilities], reinforcing my return. I have prior travel history to [countries]/or none, with full compliance.”" },
    { title: "Settlement Plan", content: "“I intend to arrive on [date], stay at [accommodation plan], and commute via [transport]. I have reviewed the university’s support services for international students.”" },
    { title: "Closing Statement", content: "“I respectfully request consideration of my application. The program at [Provider] is a necessary step to advance my India-focused career plan, for which I am academically prepared, financially supported, and fully compliant with visa obligations.”" }
];

const QuestionnaireAccordion: React.FC<{ item: typeof questionnaireData[0], index: number }> = ({ item, index }) => (
     <details className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 details-arrow hover:border-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/80">
        <summary className="flex justify-between items-center p-4 list-none cursor-pointer">
            <div className="flex items-center gap-4">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-sm">{index + 1}</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
            </div>
            <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300" />
        </summary>
        <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-400 marker:text-sky-500">
                {item.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
        </div>
    </details>
);

const QuestionnaireContent = () => (
    <div className="space-y-4">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">Answer these prompts; your answers become the core of your SOP.</p>
        {questionnaireData.map((item, index) => <QuestionnaireAccordion key={index} item={item} index={index} />)}
    </div>
);

const TemplateCard: React.FC<{ item: typeof templateData[0], index: number }> = ({ item, index }) => {
    const [copied, setCopied] = useState(false);
    
    // Parse content into parts: static text and placeholders
    const parts = useMemo(() => {
        const regex = /\[([^\]]+)\]/g;
        let lastIndex = 0;
        const result: ({ type: 'text'; value: string } | { type: 'input'; placeholder: string })[] = [];
        let match;
        while ((match = regex.exec(item.content)) !== null) {
            if (match.index > lastIndex) {
                result.push({ type: 'text', value: item.content.substring(lastIndex, match.index) });
            }
            result.push({ type: 'input', placeholder: match[1] });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < item.content.length) {
            result.push({ type: 'text', value: item.content.substring(lastIndex) });
        }
        return result;
    }, [item.content]);

    const [inputs, setInputs] = useState<Record<number, string>>({});

    const handleInputChange = (index: number, value: string) => {
        setInputs(prev => ({ ...prev, [index]: value }));
    };

    const handleCopy = () => {
        const finalString = parts.map((part, i) => {
            if (part.type === 'text') return part.value;
            // Return user input, or an empty string if not filled
            return inputs[i] || '';
        }).join('');
        navigator.clipboard.writeText(finalString.trim()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="p-4 bg-white dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 relative">
            <button onClick={handleCopy} className="absolute top-3 right-3 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand dark:hover:text-brand-light transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600">
                {copied ? <CheckIcon /> : <ClipboardIcon />}
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 pr-20">Paragraph {index + 1}: {item.title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {parts.map((part, i) => {
                    if (part.type === 'text') {
                        return <span key={i}>{part.value}</span>;
                    }
                    return (
                        <input
                            key={i}
                            type="text"
                            placeholder={part.placeholder}
                            value={inputs[i] || ''}
                            onChange={(e) => handleInputChange(i, e.target.value)}
                            className="sop-input"
                            size={Math.max(part.placeholder.length, 10)}
                        />
                    );
                })}
            </p>
        </div>
    );
};

const TemplateContent = () => (
    <div className="space-y-4">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">Fill in the blanks below, then copy each paragraph to build your SOP. Aim for 700-900 words total.</p>
        {templateData.map((item, index) => (
            <TemplateCard key={index} item={item} index={index} />
        ))}
    </div>
);

const ChecklistContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-green-50 dark:bg-green-900/30 rounded-xl border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
                <CheckCircle2Icon className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                <h4 className="text-2xl font-bold text-green-800 dark:text-green-300">DO</h4>
            </div>
            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Be specific (units, labs, city facts, Indian employers, rupee figures).</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Show a credible, India-anchored career path.</span>
                </li>
                <li className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Quantify fees/funds and name documents you’re attaching.</span>
                </li>
            </ul>
        </div>
        <div className="p-6 bg-red-50 dark:bg-red-900/30 rounded-xl border-2 border-red-200 dark:border-red-800">
             <div className="flex items-center gap-3 mb-4">
                <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0" />
                <h4 className="text-2xl font-bold text-red-800 dark:text-red-300">DON'T</h4>
            </div>
            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <XIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Center the SOP on part-time work, migration intent, or vague “PR plans.”</span>
                </li>
                <li className="flex items-start gap-3">
                    <XIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Copy generic web lines; match to your course/provider profile.</span>
                </li>
            </ul>
        </div>
    </div>
);


export const GSSOPGuide: React.FC = () => {
    const [activeTab, setActiveTab] = useState('questionnaire');

    const tabs = [
        { id: 'questionnaire', label: 'Master Questionnaire' },
        { id: 'template', label: 'Interactive Template' },
        { id: 'checklist', label: 'Fast Checklist' },
    ];

    return (
        <div className="py-8">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-500">The GS SOP Playbook</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                    Your step-by-step guide to crafting a compelling Statement of Purpose that meets the Genuine Student criteria.
                </p>
            </header>

            <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
                <nav className="-mb-px flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                    ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="max-w-4xl mx-auto">
                <div key={activeTab} className="fade-in">
                    {activeTab === 'questionnaire' && <QuestionnaireContent />}
                    {activeTab === 'template' && <TemplateContent />}
                    {activeTab === 'checklist' && <ChecklistContent />}
                </div>
            </div>
        </div>
    );
};