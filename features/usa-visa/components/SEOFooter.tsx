import React from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.54 6.42a2.38 2.38 0 0 0-1.64-1.64C18.33 4 12 4 12 4s-6.33 0-7.9.78a2.38 2.38 0 0 0-1.64 1.64C2 8.07 2 12 2 12s0 3.93.78 5.58a2.38 2.38 0 0 0 1.64 1.64C5.67 20 12 20 12 20s6.33 0 7.9-.78a2.38 2.38 0 0 0 1.64-1.64C22 15.93 22 12 22 12s0-3.93-.46-5.58z" /><polygon points="10 8 16 12 10 16 10 8" /></svg>;
const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const MailIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;

const SEOFooter: React.FC = () => {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo Section with Rich Description */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3">
                            <img src="/assets/logos/eeclogo-main.png" alt="EEC - Enbee Education Center Logo - Gujarat's Best USA Study Abroad Consultant" className="h-8" />
                            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                                USA F-1 Visa Prep
                            </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md">
                            Established in 1997, <strong>EEC (Enbee Education Center)</strong> is Gujarat's largest and oldest study abroad
                            company for USA. AIRC certified till 2031, U.S. News Global Education certified
                            (only in India), ICEF IAS accredited. 26 branches across 12 cities in Gujarat.
                        </p>
                        {/* Trust Badges */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded">
                                AIRC Certified
                            </span>
                            <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                                U.S. News Certified
                            </span>
                            <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                ICEF Accredited
                            </span>
                        </div>
                    </div>

                    {/* Quick Links + Company Side by Side */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Quick Links - Internal Navigation */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wider uppercase">
                                    F-1 Visa Resources
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <a href="#setup" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            Start Prep Plan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#interview-flow" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            Practice Interview
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#visa-interview-prep" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            Interview Guide
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#214b-refusal" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            214(b) Help
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#knowledge-hub" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            Knowledge Hub
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#branches" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            26 Branches
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Company - External Links */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wider uppercase">
                                    About EEC
                                </h3>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <a href="#faq" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            FAQs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#experts" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            Our Experts
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#methodology" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            Methodology
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://eecglobal.com/about-us/" target="_blank" rel="noopener noreferrer" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            About Us ↗
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/usavisaprep/llms.txt" target="_blank" rel="noopener noreferrer" className="text-base text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                                            For AI/LLMs
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <div className="lg:col-span-3">
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Connect with EEC</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.instagram.com/eecglobal" target="_blank" rel="noopener noreferrer" aria-label="EEC Instagram" className="text-slate-500 dark:text-slate-400 hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-all transform hover:-translate-y-1"><InstagramIcon /></a>
                                <a href="https://www.facebook.com/eecglobal" target="_blank" rel="noopener noreferrer" aria-label="EEC Facebook" className="text-slate-500 dark:text-slate-400 hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-all transform hover:-translate-y-1"><FacebookIcon /></a>
                                <a href="https://www.youtube.com/@eecgujarat" target="_blank" rel="noopener noreferrer" aria-label="EEC YouTube Channel" className="text-slate-500 dark:text-slate-400 hover:text-[#FF0000] dark:hover:text-[#FF0000] transition-all transform hover:-translate-y-1"><YoutubeIcon /></a>
                                <a href="https://www.linkedin.com/school/eecindia" target="_blank" rel="noopener noreferrer" aria-label="EEC LinkedIn" className="text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-all transform hover:-translate-y-1"><LinkedinIcon /></a>
                            </div>
                            <div className="mt-6 flex items-center gap-3">
                                <MailIcon className="h-6 w-6 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Contact & Support</p>
                                    <a href="mailto:info@eecglobal.com" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors">info@eecglobal.com</a>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <svg className="h-6 w-6 text-slate-500 dark:text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Call Us (HQ)</p>
                                    <a href="tel:+918758750036" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors">+91 875 875 0036</a>
                                    <br />
                                    <a href="tel:+918758880034" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors">+91 875 888 0034</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Keywords Row - Visible but subtle */}
                <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                        <strong>Services:</strong> F-1 Visa Interview Preparation • 214(b) Refusal Recovery • IELTS Coaching • TOEFL Training • GRE Preparation • GMAT Classes •
                        SAT Prep • USA University Admission • Study Abroad Counseling • Financial Documentation • Mock Interviews • DS-160 Help • I-20 Guidance
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed mt-2">
                        <strong>Locations:</strong> Vadodara • Ahmedabad • Surat • Anand • Nadiad • Bharuch • Vapi • Navsari • Mehsana • Kalol • Himatnagar • Visnagar
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} <strong>Enbee Education Center Private Limited</strong>. All Rights Reserved.
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                        AIRC Certified till 2031 • U.S. News Global Education Certified • ICEF IAS Accredited •
                        <a href="https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 ml-1">Verify AIRC ↗</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default SEOFooter;
