
import { GraduationCapIcon, ShieldIcon, CheckIcon } from './Icons';

export const EEATSection = () => {
  const experts = [
    {
      name: "Mr. Amit Jalan",
      role: "Managing Director",
      exp: "27+ Years",
      spec: "US & Canada Immigration Law",
      desc: "Pioneer of study abroad consulting in Gujarat. Expert in challenging INA 214(b) refusals.",
      imageUrl: "https://ai.eecglobal.com/assets/amit.jpeg"
    },
    {
      name: "CA Madhav Gupta",
      role: "Director",
      exp: "18+ Years",
      spec: "Financial Forensics & Compliance",
      desc: "Expert in financial documentation forensics, funds verification, and high-stakes visa compliance.",
      imageUrl: "https://ai.eecglobal.com/assets/Madhav-Gupta.jpeg"
    },
    {
      name: "Mrs. Mohita Gupta",
      role: "Vice President",
      exp: "12+ Years",
      spec: "Global Operations & GS",
      desc: "Specializes in complex GS drafting, academic assessment, and operational excellence for student visas.",
      imageUrl: "https://ai.eecglobal.com/assets/mohita-gupta.jpeg"
    }
  ];

  // Schema for Person entities
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": experts.map(expert => ({
      "@type": "Person",
      "name": expert.name,
      "jobTitle": expert.role,
      "worksFor": {
        "@type": "Organization",
        "name": "Enbee Education Center"
      },
      "description": expert.desc,
      "knowsAbout": expert.spec
    }))
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-8">
       {/* Inject Person Schema */}
       <script 
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
       />

       <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600"></div>
          
          <div className="text-center mb-10">
             <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                The Forensic Visa Board
             </h2>
             <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm font-medium">
                Our AI is trained and supervised by real humans. Meet the senior experts who audit our algorithms and ensure strict adherence to consular guidelines (E-E-A-T Compliance).
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             {experts.map((expert, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center group-hover:ring-2 group-hover:ring-violet-500 transition-all">
                         {expert.imageUrl ? (
                           <img
                             src={expert.imageUrl}
                             alt={expert.name}
                             className="w-full h-full object-cover"
                             loading="lazy"
                           />
                         ) : (
                           <span className="text-slate-500 dark:text-slate-400 font-bold text-lg">
                             {expert.name.charAt(0)}
                           </span>
                         )}
                      </div>
                      <div>
                         <h3 className="font-bold text-slate-900 dark:text-white text-base">{expert.name}</h3>
                         <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">{expert.role}</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                         <ShieldIcon className="w-3.5 h-3.5 text-emerald-500" />
                         <span>Experience: {expert.exp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                         <GraduationCapIcon className="w-3.5 h-3.5 text-fuchsia-500" />
                         <span>Focus: {expert.spec}</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-slate-200 dark:border-slate-800 pl-3 mt-2">
                         "{expert.desc}"
                      </p>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                 <CheckIcon className="w-3.5 h-3.5" />
                 <span>Verified Human Oversight • No hallucinations on critical policy data</span>
              </div>
          </div>
       </div>
    </div>
  );
};
