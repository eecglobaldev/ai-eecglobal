
import React, { useState, useEffect, useMemo } from 'react';

// --- ICONS ---
const FolderKanbanIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>;
const WalletIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const SmartphoneIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
const LuggageIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/></svg>;
const BookUserIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/><path d="M15 13a3 3 0 1 0-6 0"/></svg>;
const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;
const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const SirenIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5.7 3A4.3 4.3 0 0 1 10 6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a4.3 4.3 0 0 1 2.7-4"/><path d="M14 10a5 5 0 0 1 10 0v5a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-5Z"/><path d="M2 18h20"/><path d="M12 10V2"/><path d="m19 10-1.5-1.5"/></svg>;
const LaptopIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.28 20H3.72a1 1 0 0 1-.99-1.45L4 16"/></svg>;
const PackageCheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16.5 9.4a4 4 0 0 1 0 5.2"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.21 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22v-6"/><path d="m16 20 2 2 4-4"/></svg>;
const BanIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>;
// const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>;
const ChevronDownIcon = ({ className = '' }: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>;
const RefreshCwIcon = ({ className = '' }: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;


const checklistData = [
  { id: 'docs', title: 'Essential Documents', icon: <FolderKanbanIcon />, items: [
    { id: 'doc1', text: 'Passport valid 6+ months' },
    { id: 'doc2', text: 'Student visa grant letter' },
    { id: 'doc3', text: 'CoE(s) for every course/package' },
    { id: 'doc4', text: 'OSHC policy/certificate + app login' },
    { id: 'doc5', text: 'Offer letters + tuition/OSHC payment receipts' },
    { id: 'doc6', text: 'All academic transcripts/marksheets + degree certs' },
    { id: 'doc7', text: 'English test report (IELTS/PTE/TOEFL)' },
    { id: 'doc8', text: 'Medical prescriptions with doctor’s note; 8–10 passport photos' },
    { id: 'doc9', text: 'Cloud folder shared with family containing all above' },
  ]},
  { id: 'money', title: 'Money & Banking', icon: <WalletIcon />, items: [
    { id: 'mon1', text: 'Cash on arrival ~AUD 200–300 (small notes/coins)' },
    { id: 'mon2', text: 'International debit/forex card enabled for overseas + OTP/SMS' },
    { id: 'mon3', text: 'UPI-linked Indian bank ready for INR top-ups; optional Wise/Revolut for FX' },
    { id: 'mon4', text: 'PAN card accessible (for Indian banking/records)' },
    { id: 'mon5', text: 'Proof of funds (bank statements/loan sanction) handy' },
  ]},
  { id: 'connect', title: 'Phone, Apps & Connectivity', icon: <SmartphoneIcon />, items: [
    { id: 'con1', text: 'Phone unlocked; enable roaming for first 24–48h' },
    { id: 'con2', text: 'Buy AU SIM/eSIM (Telstra / Optus / Vodafone) at airport or city' },
    { id: 'con3', text: 'Install: University app, Google/Apple Maps + local transit app, Authenticator, OSHC app, myGovID' },
    { id: 'con4', text: 'Save campus support + emergency numbers in contacts' },
  ]},
  { id: 'baggage', title: 'Baggage & Biosecurity', icon: <LuggageIcon />, items: [
    { id: 'bag1', text: 'Check airline baggage rules; power bank/chargers in cabin bag' },
    { id: 'bag2', text: 'Type-I plug adapter (Australia)' },
    { id: 'bag3', text: 'Do NOT carry food/plant/animal products; if unsure, <strong>declare</strong>' },
    { id: 'bag4', text: 'Medicines only with prescription + original packaging' },
  ]},
  { id: 'travelday', title: 'Travel-Day Folder (Hand Luggage)', icon: <BookUserIcon />, items: [
    { id: 'trav1', text: 'Printed itinerary + address of stay + airport pickup plan' },
    { id: 'trav2', text: 'Offline copies: visa, CoE, OSHC, fee receipts, accommodation booking' },
    { id: 'trav3', text: 'Contact of your counsellor + campus international office' },
  ]},
  { id: 'arrival', title: 'On Arrival (First 48 Hours)', icon: <MapPinIcon />, items: [
    { id: 'arr1', text: 'Reach accommodation; inform family' },
    { id: 'arr2', text: 'Purchase/activate SIM; set up data' },
    { id: 'arr3', text: 'Open student bank account (bring passport, CoE, address)' },
    { id: 'arr4', text: 'Apply for TFN (Tax File Number) online' },
    { id: 'arr5', text: 'Activate OSHC card/app' },
    { id: 'arr6', text: 'Learn local public transport (Opal/Myki/Translink/Metrocard etc.)' },
    { id: 'arr7', text: 'Collect student ID (if available)' },
  ]},
  { id: 'first14', title: 'First 14 Days', icon: <CalendarDaysIcon />, items: [
    { id: 'f14_1', text: 'Enrol subjects; confirm timetable; meet course advisor' },
    { id: 'f14_2', text: 'Attend orientation + mandatory briefings' },
    { id: 'f14_3', text: 'Finalize housing: sign lease correctly, lodge bond, take entry-condition photos' },
    { id: 'f14_4', text: 'Update local address/phone with provider (within 7 days)' },
    { id: 'f14_5', text: 'Start job search ethically (resume ready, TFN on file)' },
  ]},
  { id: 'compliance', title: 'Visa Compliance (Know Your Limits)', icon: <ShieldCheckIcon />, items: [
    { id: 'comp1', text: 'Primary purpose = full-time study; keep satisfactory progress/attendance' },
    { id: 'comp2', text: 'Maintain active OSHC for entire visa length' },
    { id: 'comp3', text: 'Work hours cap: check the current official limit (commonly 48 hours per fortnight during teaching periods; full-time in scheduled breaks)' },
    { id: 'comp4', text: 'Inform provider promptly of any changes (course/load/address)' },
  ]},
  { id: 'academic', title: 'Academic & Career Kit', icon: <LaptopIcon />, items: [
    { id: 'acad1', text: 'Laptop + Type-I adapter; cloud backups; essential software installed' },
    { id: 'acad2', text: 'Updated resume + reference letters; LinkedIn set to AU location' },
    { id: 'acad3', text: 'If planning to drive: home licence + consider International Driving Permit' },
  ]},
  { id: 'packing', title: 'Quick Packing Reminders', icon: <PackageCheckIcon />, items: [
    { id: 'pack1', text: 'Weather-appropriate clothing for your city (check seasonal temps)' },
    { id: 'pack2', text: 'Prescription glasses/contacts; basic first-aid kit' },
    { id: 'pack3', text: 'Extra passport photos; small padlock; spare phone cables' },
    { id: 'pack4', text: 'Copies of immunization records (if applicable)' },
  ]},
];

const safetyInfo = [
    { service: 'Emergency (Police/Ambulance/Fire)', number: '000' },
    { service: 'Lifeline (crisis support)', number: '13 11 14' },
    { service: 'Healthdirect (nurse advice)', number: '1800 022 222' },
    { service: 'Translating & Interpreting Service', number: '131 450' },
    { service: 'Campus security number', number: 'Find & save from your uni site' },
];

const mistakesToAvoid = [
    "<strong>Vague finances:</strong> carry clear proof of funds and receipts",
    "<strong>Non-compliant work expectations:</strong> study first, work is secondary",
    "<strong>Biosecurity breaches:</strong> when unsure, declare",
    "<strong>Missing address update</strong> with provider after moving"
];

const STORAGE_KEY = 'preDepartureChecklistState';

export const PreDepartureIndiaGuide: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checkedItems)));
    }, [checkedItems]);

    const handleCheckChange = (id: string) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset your checklist progress?')) {
            setCheckedItems(new Set());
        }
    };
    
    const progress = useMemo(() => {
        const total = checklistData.reduce((acc, section) => acc + section.items.length, 0);
        return total > 0 ? (checkedItems.size / total) * 100 : 0;
    }, [checkedItems]);

    return (
        <div className="py-8">
            <header className="text-center mb-8 max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">INDIA → AUSTRALIA: Pre-Departure Command Center</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2">
                    Your interactive checklist for a smooth, GS-ready journey. Your progress is saved automatically.
                </p>
            </header>
            
            <div className="max-w-4xl mx-auto px-4 sticky top-20 sm:top-24 z-20 py-2">
                 <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                         <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Progress</h3>
                         <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                 </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-8 space-y-3">
                {checklistData.map((section, index) => (
                    <details key={section.id} className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600" open={index < 2}>
                        <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition-transform duration-300 group-hover:scale-105">{section.icon}</div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">{section.title}</h4>
                            </div>
                            <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700">
                            <ul className="mt-3 space-y-3">
                                {section.items.map(item => (
                                    <li key={item.id}>
                                        <label className={`flex items-start gap-3 p-2 rounded-md transition-colors cursor-pointer ${checkedItems.has(item.id) ? 'bg-green-50 dark:bg-green-900/30' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
                                            <input type="checkbox" checked={checkedItems.has(item.id)} onChange={() => handleCheckChange(item.id)} className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                            <span className={`text-sm text-slate-700 dark:text-slate-300 ${checkedItems.has(item.id) ? 'line-through text-slate-500 dark:text-slate-400' : ''}`} dangerouslySetInnerHTML={{ __html: item.text }} />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                ))}

                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-red-50 dark:bg-red-900/40 rounded-xl border-2 border-dashed border-red-300 dark:border-red-700">
                        <div className="flex items-center gap-3 mb-4">
                            <SirenIcon />
                            <h4 className="font-bold text-red-800 dark:text-red-300">Safety & Wellbeing (SAVE THESE)</h4>
                        </div>
                        <ul className="space-y-2">
                            {safetyInfo.map(info => (
                                <li key={info.service} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-700 dark:text-slate-300">{info.service}:</span>
                                    <strong className="font-mono text-slate-800 dark:text-slate-200">{info.number}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-6 bg-amber-50 dark:bg-amber-900/40 rounded-xl border-2 border-dashed border-amber-300 dark:border-amber-700">
                         <div className="flex items-center gap-3 mb-4">
                            <BanIcon />
                            <h4 className="font-bold text-amber-800 dark:text-amber-300">Common Mistakes to AVOID</h4>
                        </div>
                         <ul className="space-y-3">
                            {mistakesToAvoid.map((mistake, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <BanIcon className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <span dangerouslySetInnerHTML={{ __html: mistake }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <div className="text-center pt-8">
                    <button onClick={handleReset} className="group inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                       <RefreshCwIcon className="transition-transform duration-500 group-hover:rotate-180" />
                        Reset Checklist
                    </button>
                </div>
            </div>
        </div>
    );
};