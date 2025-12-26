import React, { useState } from 'react';

// --- ICONS ---
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;
const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const PlaneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 16l-3.5 3.5c-.4.4-.8 1-.8 1.5s.4 1 .8 1.5L7 23l8.8-8.8.5-.3Z"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const LandmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const PiggyBankIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 7.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5-2.5 1.1-2.5 2.5c0 .3 0 .5.1.8"/><path d="M10 2c-1.3 1-2 2.5-2 4 0 2.2 1.8 4 4 4h1a3 3 0 0 0 3-3V5"/><path d="M21.5 13c-1.3 0-2.5 1.1-2.5 2.5s1.2 2.5 2.5 2.5 2.5-1.1 2.5-2.5c0-.3 0-.5-.1-.8"/><path d="M16 20c0-4.4-3.6-8-8-8s-8 3.6-8 8h16z"/><path d="M10 13v-1"/><path d="M16 16v1"/></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;
const UniversityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7c3.13-.5 6-3.4 6-6.7v-4L12 5l-6 6v4c0 3.2 2.87 6.2 6 6.7Z"/><path d="M12 5V1"/></svg>;
const Tooltip: React.FC<{ children: React.ReactNode; tip: string }> = ({ children, tip }) => {
    return (
        <span className="group has-tooltip">
            {children}
            <span className="tooltip-content">
                {tip}
            </span>
        </span>
    );
};

const CurrencyConverter: React.FC = () => {
    const CONVERSION_RATE = 55; // 1 AUD = 55 INR
    const [values, setValues] = useState({ aud: '', inr: '' });

    const handleAudChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audValue = e.target.value;
        if (audValue === '' || isNaN(parseFloat(audValue))) {
            setValues({ aud: audValue, inr: '' });
        } else {
            const numAud = parseFloat(audValue);
            setValues({ aud: audValue, inr: (numAud * CONVERSION_RATE).toLocaleString('en-IN', { maximumFractionDigits: 2 }) });
        }
    };

    const handleInrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inrValue = e.target.value;
        if (inrValue === '' || isNaN(parseFloat(inrValue.replace(/,/g, '')))) {
            setValues({ aud: '', inr: inrValue });
        } else {
            const numInr = parseFloat(inrValue.replace(/,/g, ''));
            setValues({ inr: inrValue, aud: (numInr / CONVERSION_RATE).toFixed(2) });
        }
    };
    
    return (
        <div className="currency-converter">
             <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 text-center mb-4">Quick Currency Converter</h4>
             <div className="converter-grid">
                <div>
                    <label htmlFor="aud-input" className="converter-label">Australian Dollar (AUD)</label>
                    <input id="aud-input" type="number" placeholder="e.g., 29710" value={values.aud} onChange={handleAudChange} className="converter-input" />
                </div>
                
                <div>
                    <label htmlFor="inr-input" className="converter-label">Indian Rupee (INR)</label>
                    <input id="inr-input" type="text" placeholder="e.g., 16,34,050" value={values.inr} onChange={handleInrChange} className="converter-input" />
                </div>
             </div>
             <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3">Using an exchange rate of 1 AUD ≈ {CONVERSION_RATE} INR. For estimation purposes only.</p>
        </div>
    );
};


const FinancialListItem: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, children, title }) => (
     <li className="group flex items-start p-2 -ml-2 rounded-lg transition-colors dark:hover:bg-slate-800/40">
        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 mr-4 mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
            <div className="text-slate-600 dark:text-slate-400 text-sm">{children}</div>
        </div>
    </li>
);

const DocumentationCard: React.FC<{ icon: React.ReactNode; title: string; items: string[] }> = ({ icon, title, items }) => (
    <div className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/80">
        <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {icon}
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300">{title}</h4>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-sm">
            {items.map((item, index) => (
                <li key={index} className="text-slate-600 dark:text-slate-400" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
        </ul>
    </div>
);


export const FinancialGuide: React.FC = () => {
    return (
        <section id="financial-guide" className="py-12">
            <div className="max-w-4xl mx-auto px-4">
                 <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-lime-400 dark:to-green-500">Financials 101: Show Money</h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-3xl mx-auto">
                        A rock-solid financial plan is non-negotiable. Here’s a breakdown of what you need to show, and how to show it.
                    </p>
                </header>
                 <div className="p-8 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600 pb-3 mb-6">Step 1: Calculating Your "Show Money"</h3>
                            <ul className="space-y-6">
                                <FinancialListItem title="1 Year's Living Costs:" icon={<BuildingIcon />}>
                                    <p>You must show <mark><Tooltip tip="This is the official minimum living cost for a primary student applicant for 12 months, as set by the Department of Home Affairs. This amount is non-negotiable.">AUD $29,710</Tooltip></mark> for yourself.</p>
                                </FinancialListItem>
                                 <FinancialListItem title="1 Year's Tuition Fees:" icon={<GraduationCapIcon />}>
                                    <p>The full amount for your first 12 months of study.</p>
                                </FinancialListItem>
                                 <FinancialListItem title="Travel Costs:" icon={<PlaneIcon />}>
                                    <p>Approximately <mark><Tooltip tip="This is an estimated amount for a return airfare from India to Australia. It's a standard component in the 'show money' calculation.">AUD $2,500</Tooltip></mark> for return airfare from India.</p>
                                </FinancialListItem>
                                 <FinancialListItem title="Dependents (if any):" icon={<UsersIcon />}>
                                    <p>Add <mark><Tooltip tip="The official minimum living cost for a dependent spouse or partner for 12 months. This amount is added on top of the primary applicant's funds.">AUD $10,394</Tooltip></mark> for a spouse/partner <br /> <br /> <br /> and <br /> <br /> <br /><mark><Tooltip tip="The official minimum living cost for each dependent child for 12 months. This is added for every child included in the visa application.">AUD $4,464</Tooltip></mark> for each child.</p>
                                </FinancialListItem>
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600 pb-3 mb-6">Step 2: Proving Your Financial Capacity</h3>
                            <ul className="space-y-6">
                                 <FinancialListItem title="Sponsor's Annual Income:" icon={<BriefcaseIcon />}>
                                     <p>Parents' income + education loan + savings must be over <mark><Tooltip tip="This is the minimum annual income a sponsor (or combined sponsors) must show, as per Department of Home Affairs guidelines for a single applicant. The figure increases if dependents are included.">AUD $87,856</Tooltip></mark> (for a single applicant). Evidence includes official tax returns (ITRs) and other documents. 3 years of ITRs are compulsory, with parents' income of approximately <mark><Tooltip tip="This is the approximate INR equivalent that Australian universities often look for from sponsors. The exact amount can depend on the university's 'risk level' (Level 1, 2, or 3) and the chosen course.">8 to 15+ lakhs per annum</Tooltip></mark> (depending on university).</p>
                                </FinancialListItem>
                                 <FinancialListItem title="Education Loan:" icon={<LandmarkIcon />}>
                                    <p>A sanction letter for an education loan from an approved financial institution in India is strong evidence.</p>
                                </FinancialListItem>
                                 <FinancialListItem title="Savings & Deposits:" icon={<PiggyBankIcon />}>
                                    <p>Funds from savings accounts require the last <strong>6 months of statements</strong>. For Fixed Deposits, they must be at least <strong>1 year old</strong> to be considered genuine.</p>
                                </FinancialListItem>
                            </ul>
                        </div>
                    </div>
                    
                    <CurrencyConverter />

                     <blockquote className="mt-8 p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/30 text-left">
                        <p className="text-sm italic text-amber-800 dark:text-amber-200"><strong className="font-semibold">Pro Tip from EEC Experts:</strong> Avoid large, last-minute cash deposits into your or your sponsor's accounts. Visa officers will scrutinize these as non-genuine funds arranged solely for the visa application.</p>
                    </blockquote>
                    <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-600/50">
                         <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-center mb-6">Step 3: Key Documentation</h3>
                         <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6 -mt-4">This is a summary. For a complete checklist, visit the <strong>Financial Dossier</strong> in the Knowledge Hub.</p>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DocumentationCard 
                                icon={<UniversityIcon />} 
                                title="Academic Documents" 
                                items={[
                                    "All mark sheets & transcripts",
                                    "Degree/provisional certificates",
                                    "IELTS/PTE scorecard",
                                    "Work experience letters (if any)"
                                ]}
                            />
                             <DocumentationCard 
                                icon={<FileTextIcon />} 
                                title="For Sponsor's Income" 
                                items={[
                                    "ITR-V (Income Tax Return) for last <strong>3 financial years (notarized)</strong>.",
                                    "Form 16 / Salary Slips (if salaried).",
                                    "Business registration & GST returns (if self-employed)."
                                ]}
                            />
                            <DocumentationCard 
                                icon={<PiggyBankIcon />} 
                                title="For Savings & Deposits" 
                                items={[
                                    "Savings account statements for the last <strong>6 months</strong>.",
                                    "Bank balance certificate.",
                                    "Fixed Deposit (FD) receipts (must be <strong>over 1 year old</strong>).",
                                    "Proof of other liquid assets."
                                ]}
                            />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};