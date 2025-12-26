import React from 'react';

// --- ICONS ---
// const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>;
const ChevronDownIcon = ({ className = '' }: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>;
const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;

// For PDF generation from CDN
declare const html2canvas: any;
declare const jspdf: any;


const ChecklistItem: React.FC<{ children: React.ReactNode, isCritical?: boolean }> = ({ children, isCritical }) => (
    <li className="flex items-start gap-3">
        <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 ${isCritical ? 'bg-red-500' : 'bg-green-500'}`}>
            <CheckIcon className="h-3 w-3 text-white" />
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{children}</span>
    </li>
);

const SectionAccordion: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen }) => (
    <details className="group bg-white dark:bg-slate-800/60 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 open:shadow-lg open:border-slate-300 dark:open:border-slate-600" open={defaultOpen}>
        <summary className="flex justify-between items-center p-4 list-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">{title}</h4>
            <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700">
            {children}
        </div>
    </details>
);

export const FinancialDocumentsGuide: React.FC = () => {
    // const [isDownloading, setIsDownloading] = useState(false);

    // const handleDownloadPdf = async () => {
    //     setIsDownloading(true);
    //     const { jsPDF } = jspdf;
    //     const contentToPrint = document.getElementById('financial-dossier-content');
    //     if (!contentToPrint) {
    //         setIsDownloading(false);
    //         return;
    //     }

    //     const detailsElements = contentToPrint.querySelectorAll('details');
    //     const wasOpen: boolean[] = [];
    //     detailsElements.forEach(d => {
    //         wasOpen.push(d.open);
    //         d.open = true;
    //     });

    //     // Allow browser to render open accordions
    //     await new Promise(r => setTimeout(r, 100));

    //     try {
    //         const canvas = await html2canvas(contentToPrint, {
    //             scale: 2,
    //             backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
    //         });
    //         const imgData = canvas.toDataURL('image/png');
            
    //         const pdf = new jsPDF({
    //             orientation: 'p',
    //             unit: 'mm',
    //             format: 'a4',
    //         });

    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
    //         const imgRatio = canvas.width / canvas.height;
    //         let finalImgWidth = pdfWidth;
    //         let finalImgHeight = pdfWidth / imgRatio;
    //         if (finalImgHeight > pdfHeight) {
    //             finalImgHeight = pdfHeight;
    //             finalImgWidth = pdfHeight * imgRatio;
    //         }
            
    //         pdf.addImage(imgData, 'PNG', 0, 0, finalImgWidth, finalImgHeight);
    //         pdf.save('EEC_Financial_Dossier.pdf');

    //     } catch (error) {
    //         console.error("Error generating PDF:", error);
    //         alert("Could not generate PDF. Please try again.");
    //     } finally {
    //         // Restore original accordion states
    //         detailsElements.forEach((d, i) => d.open = wasOpen[i]);
    //         setIsDownloading(false);
    //     }
    // };
    
    return (
        <div className="py-8">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">The Financial Dossier</h2>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                    Your ultimate checklist for a visa-winning financial file.
                </p>
               
            </header>

            <div id="financial-dossier-content" className="max-w-3xl mx-auto">
                <div className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-lg">
                    <SectionAccordion title="General Sponsor Documents (Mandatory for All)" defaultOpen>
                        <ul className="mt-3 space-y-3">
                            <ChecklistItem isCritical><strong>Income Tax Returns (ITR) / Form-16:</strong> Must provide for the last <strong>3 years</strong>. All pages must be notarized.</ChecklistItem>
                            <ChecklistItem><strong>Aadhar Card & PAN Card</strong> of all sponsors.</ChecklistItem>
                            <ChecklistItem><strong>Affidavit of Sponsorship:</strong> A legal document where the sponsor declares their support.</ChecklistItem>
                            <ChecklistItem><strong>Affidavit of Same Name (Optional):</strong> Required if there are variations in the sponsor's name across documents.</ChecklistItem>
                            <ChecklistItem><strong>Relationship Proof with Sponsors:</strong> Documents proving your relationship (e.g., birth certificate). Often prepared by EEC.</ChecklistItem>
                        </ul>
                    </SectionAccordion>
                    
                    <SectionAccordion title="Sponsor's Professional Documents">
                        <div className="mt-3 space-y-6">
                            <div>
                                <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">If Sponsor is a Salaried Professional:</h5>
                                <ul className="space-y-3">
                                    <ChecklistItem>Offer Letter / Appointment Letter</ChecklistItem>
                                    <ChecklistItem>Experience Letter</ChecklistItem>
                                    <ChecklistItem isCritical>Salary Slips of the last <strong>6 months</strong></ChecklistItem>
                                    <ChecklistItem isCritical>Salary Bank Account Statement of the last <strong>6 months</strong></ChecklistItem>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">If Sponsor has a Business:</h5>
                                <ul className="space-y-3">
                                    <ChecklistItem>Business Proof</ChecklistItem>
                                    <ChecklistItem>GST Registration / Shop License Certificate</ChecklistItem>
                                    <ChecklistItem isCritical>Business Bank Account Statement (Current/Savings) of the last <strong>6 months</strong></ChecklistItem>
                                </ul>
                            </div>
                        </div>
                    </SectionAccordion>

                    <SectionAccordion title="Fund Source Documents">
                        <div className="mt-3 space-y-6">
                            <div>
                                <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">If funds are in a Savings Account:</h5>
                                <ul className="space-y-3">
                                    <ChecklistItem isCritical>Bank Statement for the last <strong>6 months</strong>.</ChecklistItem>
                                    <ChecklistItem>Balance Certificate from the bank.</ChecklistItem>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">If funds are in Fixed Deposits (FDs):</h5>
                                <ul className="space-y-3">
                                    <ChecklistItem isCritical>The Fixed Deposit must be at least <strong>1 year old</strong>.</ChecklistItem>
                                    <ChecklistItem>FD Receipts / Certificate.</ChecklistItem>
                                    <ChecklistItem>Balance Certificate.</ChecklistItem>
                                    <ChecklistItem>No Lien Certificate (Optional but recommended).</ChecklistItem>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">If using an Education Loan:</h5>
                                <ul className="space-y-3">
                                    <ChecklistItem isCritical>Loan Sanction Letter from an approved bank.</ChecklistItem>
                                    <ChecklistItem>Disbursement Letter (if any amount has been disbursed).</ChecklistItem>
                                    <ChecklistItem>Loan Account Statement.</ChecklistItem>
                                    <ChecklistItem>Property Papers (if it's a secured loan against property).</ChecklistItem>
                                </ul>
                            </div>
                        </div>
                    </SectionAccordion>

                    <SectionAccordion title="Other Key Financial & Supporting Documents">
                        <ul className="mt-3 space-y-3">
                            <ChecklistItem><strong>Networth Report / Valuation Report:</strong> A Chartered Accountant's report summarizing assets and liabilities.</ChecklistItem>
                            <ChecklistItem><strong>Affidavit of Genuineness:</strong> A declaration confirming the authenticity of all submitted documents.</ChecklistItem>
                            <ChecklistItem><strong>Form 956A:</strong> Appointment of a registered migration agent, student agent or exempt person (often prepared by EEC).</ChecklistItem>
                            <ChecklistItem><strong>Financial Matrix:</strong> A summary of all funds being shown for the visa (often prepared by EEC).</ChecklistItem>
                        </ul>
                    </SectionAccordion>
                    
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/40 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl text-center flex items-center gap-4">
                        <AlertTriangleIcon className="h-8 w-8 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <p className="text-sm text-amber-800 dark:text-amber-200 text-left">
                            <strong>Critical Note:</strong> This is a comprehensive guide based on current requirements. Always confirm the final checklist with your EEC counsellor, as requirements can vary based on your specific profile and the latest immigration updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};