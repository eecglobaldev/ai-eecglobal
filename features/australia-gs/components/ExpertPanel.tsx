

import React from 'react';
import {IMAGES} from '../constant';


const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/></svg>;



const experts = [
    {
        name: 'Amit Jalan',
        titles: [
            'Study Abroad Industry Veteran & Lead AI Strategist',
            'Managing Director, EEC',
            'Alumnus – Purdue University, USA'
        ],
        experience: '28+ Years in Australian GS Framework, Go8 Admissions, Visa Processes & Immigration Updates',
        bio: 'Amit is a study abroad industry veteran and the driving force behind EEC’s AI-led systems and strategy. With 28+ years of deep expertise in the **Australian GS framework**, **Group of Eight university admissions**, and **complex visa and immigration updates**, he is a go-to authority for high-stakes Australian study plans.',
        imageUrl: IMAGES.Amit_Jalan,
        linkedinUrl: 'https://in.linkedin.com/in/amitjalan',
        quote: "This tool isn't just practice; it's a strategic simulation of the real interview. It finds the questions you don't want to be asked, and prepares you for them."
    },
    {
        name: 'CA Madhav Gupta',
        titles: [
            'Director, EEC',
            'Chartered Accountant (2012) – Membership No. 421209',
        ],
        experience: '15+ Years Experience | Australia GS Financial & Compliance Expert | DfAT & AI-ECTA PSW Rules Specialist',
        bio: 'Madhav is one of India’s leading study abroad experts in the **financial and compliance side of Australian visas**. He specialises in **Australia GS financial requirements**, airtight fund structuring, and **DfAT & AI-ECTA based PSW rules**, ensuring student files are clean, compliant, and visa-officer friendly.',
        imageUrl: IMAGES.Madhav_Gupta,
        linkedinUrl: 'https://in.linkedin.com/in/madhav-gupta-9027781a7',
        quote: "Financials are the foundation of your GS case. This AI helps you build a clean, transparent, and irrefutable financial story, leaving no room for doubt."
    },
    {
        name: 'Anirudh Gupta',
        titles: [
            'Vice President, EEC',
            'Bond University, Australia – Class of 2004',
        ],
        experience: '20+ Years Experience in Study Abroad | Everything-Australia Destination Expert | GS Processes & Lead GS Questions Auditor',
        bio: 'Anirudh brings over two decades of experience across global education, with a sharp focus on **Australia as a destination**. A Bond University alumnus, he leads on **GS processes** and serves as EEC’s **Lead GS Questions Auditor**, ensuring every student’s interview and statement are aligned with visa officer expectations.',
        imageUrl:  IMAGES.Anirudh_Gupta,
        linkedinUrl: 'https://in.linkedin.com/in/anirudhkrgupta',
        quote: "A successful GS interview is about understanding the 'why' behind each question. Our AI trains you to think like a visa officer, so your genuine intent shines through."
    },
    {
        name: 'Ridhika Jalan',
        titles: [
            'Head – Corporate Strategy, EEC',
            'Bradford University, United Kingdom',
        ],
        experience: 'Certified Australia Expert | Study Abroad Author | Australia OHSC & Pre-Departure Orientation Specialist',
        bio: 'Ridhika leads **Corporate Strategy at EEC**, combining global education insight with on-ground student needs. A **Certified Australia Expert** and study abroad author, she specialises in **Australia OHSC** and **pre-departure orientation**, designing frameworks that prepare students and families for real life in Australia.',
        imageUrl:  IMAGES.Ridhika_Jalan,
        linkedinUrl: 'https://in.linkedin.com/in/ridhika-jalan-0892961ab',
        quote: "The visa is just the first step. This tool prepares you for the interview by grounding your answers in the reality of student life, from OSHC to campus culture."
    },
    {
        name: 'Mohita Gupta',
        titles: [
            'Vice President – Counselling Services, EEC',
            'Ex–Investment Banker, Citibank Global'
        ],
        experience: 'Australian Visa Strategy & Interview Preparation Specialist',
        bio: 'Mohita heads **Counselling Services at EEC** and is a recognised authority on **visa interview strategy and GS requirements**. With a background as an **investment banker at Citibank Global**, she brings sharp analytical skills to each profile and is a leading expert in **Australian visa strategy and high-impact interview preparation**.',
        imageUrl:  IMAGES.mohita_gupta,
        linkedinUrl: 'https://in.linkedin.com/in/mohita-gupta-233383339',
        quote: "The new GS criteria require a narrative, not just facts. Our AI helps you build that story with confidence."
    }
];

const ExpertCard: React.FC<typeof experts[0]> = ({ name, titles, experience, bio, imageUrl, linkedinUrl, quote }) => (
    <div className="group bg-white dark:bg-slate-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-lg text-center transform transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-600 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 h-full flex flex-col">
        <div className="relative w-24 h-24 mx-auto">
            <img className="w-full h-full rounded-full object-cover shadow-md transition-all duration-300 group-hover:scale-105" src={imageUrl} alt={`Headshot of ${name}`} />
            <div className="absolute inset-0 rounded-full ring-4 ring-blue-500/50 dark:ring-blue-400/50 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{name}</h3>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn profile of ${name}`} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                <LinkedinIcon className="w-5 h-5"/>
            </a>
        </div>
        
        <div className="mt-1 space-y-0.5">
            {titles.map((title, index) => (
                 <p key={index} className="text-xs font-semibold text-blue-600 dark:text-blue-400">{title}</p>
            ))}
        </div>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2" dangerouslySetInnerHTML={{ __html: experience.replace(/\|/g, '<br/>') }} />
        
        <p 
            className="mt-3 text-sm text-slate-600 dark:text-slate-400 text-left flex-grow"
            dangerouslySetInnerHTML={{ __html: bio.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />

        <blockquote className="relative text-left mt-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
            <QuoteIcon className="absolute top-0 left-0 h-10 w-10 text-slate-200 dark:text-slate-700/50 transform -translate-x-4 -translate-y-2" />
            <p className="relative z-10 italic text-slate-600 dark:text-slate-300">
                “{quote}”
            </p>
        </blockquote>
    </div>
);


export const ExpertPanel: React.FC = () => {
    return (
        <section id="experts" className="py-12 bg-white dark:bg-slate-800/40 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-indigo-400 dark:to-purple-500">Meet The Minds Behind The AI</h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">This tool is powered by decades of real-world expertise in Australian student visas.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experts.map(expert => (
                         <div key={expert.name}>
                            <ExpertCard {...expert} />
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <header className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-sky-400 dark:to-indigo-500">The EEC Advantage: Expertise Powering Your Success</h2>
                         <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">Why trust our AI tool? Because it's built on a foundation of real-world success.</p>
                    </header>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">25+ Years of Experience</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Since 1997, EEC has helped thousands of Indian students achieve their dream of studying in Australia. Our AI is trained on insights from over two decades of successful visa applications.</p>
                        </div>
                         <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Data-Driven Intelligence</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">This isn't generic advice. Our tool analyzes your unique profile against a constantly updated model of GS criteria and real-world interview scenarios to provide truly personalized preparation.</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center p-6 bg-teal-50 dark:bg-teal-900/30 rounded-lg border border-teal-200 dark:border-teal-800/50">
                        <h4 className="font-semibold text-lg text-teal-800 dark:text-teal-200">The Human Touch: When You Need More</h4>
                        <p className="mt-2 text-teal-700 dark:text-teal-300">This AI tool is a powerful starting point. For a comprehensive strategy, mock interviews, and personalized application assistance, connect with our certified counsellors.</p>
                        <a href="https://eecglobal.com/contact-us/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">Book a Free Consultation</a>
                    </div>
                 </div>
            </div>
        </section>
    );
};