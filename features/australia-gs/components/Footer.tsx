

import React from 'react';
import { portals } from '../data/knowledgeHubData';
import {IMAGES} from '../constant';


const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.54 6.42a2.38 2.38 0 0 0-1.64-1.64C18.33 4 12 4 12 4s-6.33 0-7.9.78a2.38 2.38 0 0 0-1.64 1.64C2 8.07 2 12 2 12s0 3.93.78 5.58a2.38 2.38 0 0 0 1.64 1.64C5.67 20 12 20 12 20s6.33 0 7.9-.78a2.38 2.38 0 0 0 1.64-1.64C22 15.93 22 12 22 12s0-3.93-.46-5.58z"/><polygon points="10 8 16 12 10 16 10 8"/></svg>;
const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const MailIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;


const seoLinks = [
    {
        title: "GS Interview Preparation",
        links: [
            { text: "Genuine Student (GS) interview questions", href: "#gs-interview-questions" },
            { text: "Free AI tool for Australia visa interview", href: "#prep-tool-section" },
            { text: "Australia student visa mock interview online", href: "#prep-tool-section" },
            { text: "How to pass GS interview for subclass 500", href: "#gs-rulebook" },
            { text: "GS questions for married applicants", href: "#gs-interview-questions" },
            { text: "Common red flags in Australia student visa", href: "#gs-rulebook" },
            { text: "GS criteria Australia explained", href: "#gs-rulebook" },
            { text: "GS assessment questions", href: "#gs-interview-questions" },
            { text: "Practice GS interview questions online", href: "#prep-tool-section" },
            { text: "AI visa interview coach Australia", href: "#prep-tool-section" },
            { text: "Subclass 500 visa interview preparation", href: "#prep-tool-section" },
            { text: "Latest GS interview questions 2025", href: "#gs-interview-questions" },
            { text: "Australia visa interview experience India", href: "#success-stories" },
            { text: "GS interview after visa refusal", href: "#gs-interview-questions" },
            { text: "GTE to GS changes Australia", href: "#faq" },
            { text: "Australia High Commission interview questions for students", href: "#gs-interview-questions" },
        ]
    },
    {
        title: "SOP & Documentation",
        links: [
            { text: "How to write GS statement for Australia", href: "#gs-sop-playbook" },
            { text: "SOP for Australia student visa after refusal", href: "#gs-sop-playbook" },
            { text: "Study gap justification sample", href: "#gs-sop-playbook" },
            { text: "Australia student visa document checklist 2025", href: "#financial-dossier" },
            { text: "Incentive to return to home country proof", href: "#gs-sop-playbook" },
            { text: "SOP for Australia with low academic score", href: "#gs-sop-playbook" },
            { text: "GS statement sample for diploma courses", href: "#gs-sop-playbook" },
            { text: "SOP for masters in Australia", href: "#gs-sop-playbook" },
            { text: "How to explain career change in SOP Australia", href: "#gs-sop-playbook" },
            { text: "GS statement word limit", href: "#gs-sop-playbook" },
            { text: "Checklist for Australia student visa documents", href: "#financial-dossier" },
            { text: "Notarized documents for Australia student visa", href: "#financial-dossier" },
            { text: "SOP format for Australian university", href: "#gs-sop-playbook" },
        ]
    },
    {
        title: "Financial Guidance",
        links: [
            { text: "Financial requirements for Australia student visa", href: "#financial-blueprint" },
            { text: "Show money calculation for Australia", href: "#financial-blueprint" },
            { text: "Proof of funds for Indian students", href: "#financial-blueprint" },
            { text: "Approved banks for education loan Australia", href: "#approved-banks" },
            { text: "Financial documents for Australia student visa", href: "#financial-dossier" },
            { text: "How much funds required for Australia student visa from India", href: "#financial-blueprint" },
            { text: "Acceptable funds for Australia visa", href: "#financial-blueprint" },
            { text: "Sponsorship for Australia student visa", href: "#financial-blueprint" },
            { text: "Living expenses in Australia for Indian students 2025", href: "#financial-blueprint" },
            { text: "Proof of income for parents Australia student visa", href: "#financial-dossier" },
            { text: "Education loan sanction letter for visa", href: "#financial-dossier" },
            { text: "How to show old funds for Australia visa", href: "#financial-blueprint" },
            { text: "CA report for Australia student visa", href: "#financial-dossier" },
        ]
    },
    {
        title: "Career & Post-Study",
        links: [
            { text: "Post Study Work (PSW) visa Australia rules", href: "#psw-calculator" },
            { text: "Courses with PR pathway in Australia 2025", href: "#career-hub" },
            { text: "High demand jobs in Australia for graduates", href: "#career-hub" },
            { text: "Part-time job rules for students in Australia", href: "#gs-rulebook" },
            { text: "Temporary Graduate visa 485 requirements", href: "#career-hub" },
            { text: "Australia PR points calculator for student visa", href: "#career-hub" },
            { text: "Regional study bonus PSW Australia", href: "#psw-calculator" },
            { text: "Jobs after masters in IT in Australia", href: "#career-hub" },
            { text: "Highest paying jobs in Australia for international students", href: "#career-hub" },
            { text: "Skilled migration occupation list Australia", href: "#career-hub" },
            { text: "How to find jobs in Australia from India", href: "#career-hub" },
            { text: "485 visa extension rules", href: "#career-hub" },
        ]
    },
    {
        title: "General & Location-Based",
        links: [
            { text: "Study in Australia for Indian students", href: "#knowledge-hub" },
            { text: "Cost of living in Melbourne vs Sydney for students", href: "#career-hub" },
            { text: "Best city in Australia for IT students", href: "#career-hub" },
            { text: "Australia university intake 2025", href: "#faq" },
            { text: "OSHC Australia cost for single student", href: "#financial-blueprint" },
            { text: "VFS Australia student visa tracking India", href: "#knowledge-hub" },
            { text: "Best TAFE courses in Australia for PR", href: "#career-hub" },
            { text: "Cheapest universities in Australia for international students", href: "#career-hub" },
            { text: "Australia student visa success rate India", href: "#success-stories" },
            { text: "Study in regional Australia benefits", href: "#psw-calculator" },
            { text: "Accommodation for students in Sydney", href: "#pre-departure-guide" },
            { text: "Public transport in Melbourne for students", href: "#pre-departure-guide" },
        ]
    },
    {
        title: "EEC & Local Search",
        links: [
            { text: "EEC Global GS prep tool", href: "#prep-tool-section" },
            { text: "Best Australia education consultants in Ahmedabad", href: "#branch-locator" },
            { text: "EEC Vadodara visa success rate", href: "#branch-locator" },
            { text: "Overseas education consultants in Gujarat", href: "#branch-locator" },
            { text: "EEC Surat student visa agent", href: "#branch-locator" },
            { text: "Free Australia visa guidance India", href: "#prep-tool-section" },
            { text: "EEC near me", href: "#branch-locator" },
            { text: "Study abroad consultants in Anand for Australia", href: "#branch-locator" },
            { text: "EEC Mehsana reviews", href: "#success-stories" },
            { text: "Australia student visa processing time India", href: "#faq" },
            { text: "EEC Global free AI tool", href: "#prep-tool-section" },
            { text: "Top visa consultants in India for Australia", href: "#experts" },
        ]
    }
];


const Footer: React.FC = () => {
    const baseUrl = '/australia-gs-prep';

    const mainLinks = [
        { href: "#prep-tool-section", text: "GS Prep Tool" },
        { href: "#knowledge-hub", text: "Knowledge Hub" },
        { href: "https://australia.eecglobal.com", text: "Study in Australia", target: "_blank" },
        { href: "https://australia.eecglobal.com/prpointscalculator", text: "PR Points", target: "_blank" },
        { href: "#branch-locator", text: "Find a Branch" },
    ].map(link => ({
        ...link,
        href: link.href.startsWith('#') ? `${baseUrl}${link.href}` : link.href,
    }));

    const knowledgeHubLinks = portals
        .filter(p => p.id !== 'public-api')
        .map(portal => ({
            href: `${baseUrl}#${portal.id}`,
            text: portal.title
        }));

    const updatedSeoLinks = seoLinks.map(category => ({
        ...category,
        links: category.links.map(link => ({
            ...link,
            href: link.href.startsWith('#') ? `${baseUrl}${link.href}` : link.href,
        }))
    }));
    
    const linkClasses = "inline-block text-slate-400 dark:text-slate-600 hover:text-brand dark:hover:text-brand-light hover:underline transition-colors";

    return (
        <footer className="bg-slate-100 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-700/50 mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3">
                        <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="mb-4 inline-block">
                            <img src={IMAGES.eecLogo} alt="EEC Global Logo" className="h-14 w-auto" />
                        </a>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                           Established in 1997, EEC is Gujarat's largest and oldest study abroad company, providing expert test preparation, admissions, and visa guidance to students aiming to study overseas.
                        </p>
                    </div>
                    <div className="lg:col-span-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                             <div>
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Quick Links</h3>
                                <ul className="space-y-2 text-sm">
                                    {mainLinks.map((link, index) => (
                                        <li key={`main-${index}`}><a href={link.href} target={link.target || '_self'} rel={link.target ? 'noopener noreferrer' : undefined} className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-light transition-colors">{link.text}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="sm:col-span-2">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Knowledge Hub</h3>
                                <div className="flex flex-col sm:flex-row sm:gap-12 text-sm">
                                    <ul className="flex-1 space-y-2">
                                        {knowledgeHubLinks
                                            .slice(0, Math.ceil(knowledgeHubLinks.length / 2))
                                            .map((link, index) => (
                                                <li key={`kh-col1-${index}`}>
                                                    <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-light transition-colors">
                                                        {link.text}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                    <ul className="flex-1 space-y-2 mt-4 sm:mt-0">
                                        {knowledgeHubLinks
                                            .slice(Math.ceil(knowledgeHubLinks.length / 2))
                                            .map((link, index) => (
                                                <li key={`kh-col2-${index}`}>
                                                    <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-light transition-colors">
                                                        {link.text}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                         <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Connect with Us</h3>
                         <div className="flex space-x-4">
                            <a href="https://www.instagram.com/eecglobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 dark:text-slate-400 hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-all transform hover:-translate-y-1"><InstagramIcon /></a>
                            <a href="https://www.facebook.com/eecglobal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-500 dark:text-slate-400 hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-all transform hover:-translate-y-1"><FacebookIcon /></a>
                            <a href="https://www.youtube.com/@eecgujarat" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-500 dark:text-slate-400 hover:text-[#FF0000] dark:hover:text-[#FF0000] transition-all transform hover:-translate-y-1"><YoutubeIcon /></a>
                            <a href="https://www.linkedin.com/school/eecindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-all transform hover:-translate-y-1"><LinkedinIcon /></a>
                         </div>
                         <div className="mt-6 flex items-center gap-3">
                            <MailIcon className="h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] flex-shrink-0" />
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Feedback & Suggestions</p>
                                <a href="mailto:info@eecglobal.com" className="text-sm font-semibold text-slate-600 dark:text-slate-300  hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors">info@eecglobal.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 dark:border-slate-700/50 pt-8">
                     <div className="mb-8">
                        <div className="text-[10px] leading-relaxed text-left space-y-2">
                            {updatedSeoLinks.map(category => (
                                <div key={category.title}>
                                    <strong className="text-slate-500 dark:text-slate-400">{category.title}:</strong>{' '}
                                    {category.links.map((link, index) => (
                                        <React.Fragment key={link.href + index}>
                                            <a href={link.href} className={linkClasses}>{link.text}</a>
                                            {index < category.links.length - 1 && <span className="mx-1 text-slate-400 dark:text-slate-600">&bull;</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <p>&copy; {new Date().getFullYear()} Enbee Education Center Private Limited. All Rights Reserved.</p>
                        <div className="mt-4 flex justify-between items-center text-xs text-slate-400 dark:text-slate-300">
                            <a href="#public-api" className="hover:text-brand dark:hover:text-brand-light transition-colors">
                                Public Data API
                            </a>
                            <a href="/australiagsprep/llm.txt" target="_blank" rel="noopener noreferrer" className="hover:text-brand dark:hover:text-brand-light transition-colors">
                                LLM & Generative Engines read here
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;