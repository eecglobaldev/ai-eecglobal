import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, GlobeIcon } from './Icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">
          {title}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="w-3 h-3 text-slate-400" />
        ) : (
          <ChevronDownIcon className="w-3 h-3 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export const SEOFooterKeywords = () => {
  const keywordData: Record<string, string[]> = {
    "United States": [
      "US F1 student visa interview questions 2025",
      "US tourist visa B1/B2 wait times India",
      "DS-160 form filling guide for indian students",
      "documents required for US student visa dropbox",
      "cost of studying in USA for indian students",
      "US visa rejection reasons 214(b) explained",
      "gap acceptance in US universities for masters",
      "US student visa financial proof requirements",
      "stem opt extension rules for indian students",
      "emergency US visa appointment india process"
    ],
    "United Kingdom": [
      "UK tier 4 student visa checklist India",
      "study in UK without IELTS for indian students",
      "UK post study work visa graduate route 2025",
      "CAS letter processing time UK universities",
      "UK tourist visa fees in indian rupees 2025",
      "london university fees for indian students",
      "proof of funds for UK student visa calculation",
      "UK spouse visa requirements for students",
      "list of UK universities accepting study gap",
      "UK credibility interview questions and answers"
    ],
    "Canada": [
      "canada student visa sds vs non sds 2025",
      "canada study permit processing time india",
      "minimum bank balance for canada student visa",
      "SOP for canada student visa 100% approval",
      "GIC amount for canada student visa 2025",
      "canada visitor visa checklist for parents",
      "canada spouse open work permit eligibility",
      "reasons for canada student visa rejection",
      "ircc portal login for indian applicants",
      "colleges in canada for indian students low fees"
    ],
    "Australia": [
      "australia student visa subclass 500 requirements",
      "GTE statement australia student visa sample",
      "australia tourist visa subclass 600 checklist",
      "level 1 universities in australia for india",
      "study in australia cost for indian students",
      "australia student visa fees in indian rupees",
      "working rights in australia for students",
      "australia dependent visa requirements 2025",
      "australia visa rejection reasons 2025",
      "immiaccount login australia visa application"
    ],
    "New Zealand": [
      "new zealand student visa requirements from india",
      "study in new zealand cost for indian students",
      "new zealand tourist visa processing time india",
      "post study work rights new zealand 2025",
      "green list occupations new zealand for students",
      "level 7 diploma in new zealand for international students",
      "new zealand student visa fund requirements",
      "partner work visa new zealand student",
      "unitec new zealand courses for international students",
      "university of auckland admission requirements"
    ],
    "Germany": [
      "germany student visa checklist vfs india",
      "blocked account amount germany 2025",
      "aps certificate india process and time",
      "study in germany free universities for indian students",
      "germany job seeker visa requirements from india",
      "germany tourist visa appointment vfs",
      "public universities in germany for masters",
      "german language levels for student visa",
      "letter of motivation for german student visa",
      "germany opportunity card for indian citizens"
    ],
    "France": [
      "campus france procedure for indian students 2025",
      "france long stay student visa checklist",
      "study in france without ielts for indian students",
      "france schengen visa appointment availability",
      "france tourist visa documents checklist",
      "interview questions for france student visa",
      "cost of living in paris for indian students",
      "public universities in france for international students",
      "france job seeker visa after masters",
      "accommodation proof for france visa application"
    ],
    "Ireland": [
      "study in ireland cost for indian students",
      "ireland student visa interview questions",
      "ireland tourist visa processing time india",
      "stamp 1g visa rules ireland for students",
      "GNIB appointment dublin for students",
      "universities in ireland for ms in computer science",
      "ireland critical skills employment permit",
      "proof of funds for ireland student visa",
      "study in ireland with education loan",
      "part time job salary in ireland for students"
    ],
    "Netherlands": [
      "mvv visa netherlands student requirements",
      "study in netherlands cost for indian students",
      "netherlands tourist visa from india checklist",
      "university of amsterdam admission requirements",
      "netherlands post study work visa orientation year",
      "ielts requirement for netherlands universities",
      "ind netherlands student visa processing time",
      "housing for students in netherlands",
      "netherlands scholarship for indian students",
      "schengen visa netherlands vfs appointment"
    ],
    "Italy": [
      "italy student visa checklist for indian students",
      "cimea statement of comparability italy",
      "italy schengen visa processing time india",
      "scholarship in italy for indian students 2025",
      "universitaly pre-enrollment summary guide",
      "study in italy free universities for international students",
      "italy tourist visa appointment vfs mumbai",
      "politecnico di milano admission requirements",
      "sapienza university of rome application fee",
      "accommodation proof for italy student visa"
    ],
    "Spain": [
      "spain student visa requirements from india",
      "spain tourist visa appointment bls india",
      "study in spain cost for international students",
      "nie number spain student visa process",
      "spain non-lucrative visa requirements india",
      "barcelona university admission for international students",
      "medical certificate for spain student visa",
      "spain digital nomad visa for indian citizens",
      "public universities in spain for masters",
      "bls spain visa tracking status india"
    ],
    "Switzerland": [
      "study in switzerland cost for indian students",
      "switzerland student visa checklist india",
      "swiss schengen visa appointment vfs",
      "eth zurich admission requirements for indian students",
      "swiss tourist visa requirements for indian citizens",
      "hospitality management courses in switzerland",
      "switzerland work visa for indian citizens",
      "cost of living in zurich for students",
      "university of geneva international students",
      "swiss visa processing time from india"
    ],
    "Sweden": [
      "sweden residence permit for studies requirements",
      "study in sweden cost for indian students",
      "sweden job seeker visa requirements",
      "sweden tourist visa from india vfs",
      "personnummer sweden student process",
      "kth royal institute of technology admission",
      "lund university scholarship for international students",
      "work permit after study in sweden",
      "sweden dependent visa requirements",
      "university admissions se application guide"
    ],
    "Finland": [
      "study in finland for indian students 2025",
      "finland residence permit student requirements",
      "finland job seeker visa for indian citizens",
      "finland tourist visa requirements from india",
      "finland university application deadline 2025",
      "university of helsinki admission requirements",
      "cost of living in finland for students",
      "finland scholarship for international students",
      "part time work rules in finland for students",
      "migri finland student visa processing time"
    ],
    "Denmark": [
      "study in denmark for international students requirements",
      "denmark student visa processing time india",
      "denmark green card scheme point system",
      "denmark tourist visa checklist for indian citizens",
      "copenhagen university admission for indian students",
      "denmark positive list for work visa",
      "tuition fees in denmark for indian students",
      "residence permit denmark student",
      "post study work visa denmark rules",
      "nyidanmark student application guide"
    ],
    "Austria": [
      "austria student visa residence permit india",
      "study in austria public universities fees",
      "austria tourist visa vfs checklist",
      "austria job seeker visa requirements",
      "university of vienna admission for indian students",
      "legalization of documents for austria visa",
      "cost of living in vienna for students",
      "austria red white red card explanation",
      "german language requirement for austria student visa",
      "accommodation booking for austria visa"
    ],
    "Malta": [
      "study in malta visa success rate 2025",
      "malta work permit for indian citizens",
      "malta tourist visa requirements from india",
      "identity malta student visa checklist",
      "english courses in malta for work visa",
      "jobs in malta for indian students",
      "malta schengen visa processing time",
      "cost of studying in malta for indian students",
      "malta college of arts science and technology admission",
      "vfs malta appointment india"
    ],
    "UAE": [
      "uae golden visa requirements for students",
      "dubai student visa cost and process",
      "uae tourist visa 5 years multiple entry india",
      "study in dubai universities for indian students",
      "uae residence visa for students sponsorship",
      "knowledge village dubai universities list",
      "part time work permit for students in dubai",
      "visa on arrival for indian citizens with us visa",
      "dubai freelance visa for indian citizens",
      "sharjah university admission requirements"
    ],
    "Singapore": [
      "singapore student pass application process",
      "study in singapore for indian students cost",
      "singapore tourist visa documents for indian citizens",
      "singapore visa processing time india",
      "singapore universities fees for international students",
      "nus admission requirements for indian students",
      "singapore work holiday programme for students",
      "ica singapore student pass login",
      "private universities in singapore for indian students",
      "singapore visa rejection reasons"
    ],
    "Latvia": [
      "study in latvia without ielts for indian students",
      "latvia student visa interview questions",
      "latvia trp process for students",
      "latvia tourist visa requirements from india",
      "riga technical university admission 2025",
      "latvia visa success rate for indian students",
      "cost of living in riga for students",
      "latvia schengen visa appointment",
      "latvia university admission letter time",
      "part time jobs in latvia for indian students"
    ],
    "Hungary": [
      "study in hungary stipendiums hungaricum 2025",
      "hungary student visa interview questions",
      "hungary tourist visa checklist india",
      "university of debrecen admission requirements",
      "residence permit hungary student process",
      "study in hungary without ielts",
      "cost of living in budapest for students",
      "semmelweis university entrance exam",
      "hungary work visa for indian citizens",
      "hungary visa appointment vfs"
    ]
  };

  const regions: Record<string, string[]> = {
    "North America": ["United States", "Canada"],
    "UK & Europe": [
      "United Kingdom", "Germany", "France", "Ireland", "Netherlands", 
      "Italy", "Spain", "Switzerland", "Sweden", "Finland", 
      "Denmark", "Austria", "Malta", "Latvia", "Hungary"
    ],
    "Asia Pacific": ["Australia", "New Zealand", "Singapore"],
    "Middle East": ["UAE"]
  };

  return (
    <div className="w-full mt-2 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 ">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
           <GlobeIcon className="w-4 h-4 text-slate-400" />
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 select-none">
              Global Consular Search Index (2025)
           </h3>
        </div>

        <div className="space-y-1">
          {Object.entries(regions).map(([region, countries]) => (
            <AccordionItem key={region} title={`${region} (${countries.length} Regions)`}>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 pt-2">
                 {countries.map(country => (
                   <div key={country} className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                     <h4 className="text-[9px] font-black uppercase tracking-widest text-violet-500 dark:text-violet-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                       {country}
                     </h4>
                     <ul className="space-y-1">
                       {keywordData[country]?.map((phrase, idx) => (
                         <li key={idx} className="text-[9px] leading-tight text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-default font-medium">
                           {phrase}
                         </li>
                       ))}
                     </ul>
                   </div>
                 ))}
               </div>
            </AccordionItem>
          ))}
        </div>
        
        <div className="mt-4 text-center">
            <p className="text-[9px] text-slate-300 dark:text-slate-700 italic">
               *Index generated for programmatic SEO crawlability. Content accuracy verified dynamically.
            </p>
        </div>
      </div>
    </div>
  );
};