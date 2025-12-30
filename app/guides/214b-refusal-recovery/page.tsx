import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'F1 Visa 214(b) Refusal Recovery | How to Reapply After Rejection | EEC',
  description: 'Got rejected under INA 214(b)? It\'s NOT a permanent ban. Learn how to overcome \'failure to establish non-immigrant intent\' with our AI Mock Interview + expert forensic analysis by Mohita Gupta. Success stories included.',
  keywords: ['214b refusal', 'F1 visa rejected', 'US student visa denial', 'immigrant intent refusal', 'F1 visa reapply', 'visa refusal recovery', '214b overcome', 'student visa second attempt', 'US visa rejection reasons'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/guides/214b-refusal-recovery',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Overcoming 214(b) Refusals: How AI + Human Forensics Can Save Your US Student Visa",
  "description": "Comprehensive guide to recovering from INA Section 214(b) visa refusals",
  "author": {
    "@type": "Person",
    "name": "Mohita Gupta",
    "jobTitle": "VP Visa Strategy, F1 Visa Refusal Expert"
  },
  "datePublished": "2024-06-01",
  "dateModified": "2026-01-01"
};

export default function RefusalRecoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-red-600 dark:hover:text-red-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/hub/study-in-usa" className="hover:text-red-600 dark:hover:text-red-400">Study in USA</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">214(b) Recovery</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-red-900 via-red-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <span>🤝</span>
            <span>You're Not Alone. 30%+ of F1 Applicants Face This.</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            Rejected Under 214(b)?<br />
            <span className="text-green-400">It's NOT a Permanent Ban.</span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
            A 214(b) refusal doesn't mean "no forever." It means <strong className="text-white">"not yet, 
            not like this."</strong> Learn how EEC's AI-powered forensics and expert human review 
            have helped hundreds of students overturn their refusals and secure their visas.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-green-400 font-bold text-lg">68%</span>
              <span className="text-slate-300 ml-2 text-sm">success rate on reapplications</span>
            </div>
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-green-400 font-bold text-lg">500+</span>
              <span className="text-slate-300 ml-2 text-sm">refusals overturned</span>
            </div>
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-green-400 font-bold text-lg">28 yrs</span>
              <span className="text-slate-300 ml-2 text-sm">consular experience</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="bg-green-600 text-white rounded-2xl p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">💚</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">A Message for You</h2>
              <p className="text-green-100">
                I've personally reviewed over 2,000 refusal cases. In almost every case, the problem 
                wasn't the student—it was how their story was told. A 214(b) refusal is a 
                <strong className="text-white"> communication failure</strong>, not a character judgment. 
                Let's fix how you communicate.
              </p>
              <p className="text-green-200 text-sm mt-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs">MG</span>
                <span><strong>Mohita Gupta</strong> — VP Visa Strategy, 214(b) Specialist</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What Does Section 214(b) Actually Mean?</h2>
            <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 font-mono text-sm">
              <p className="text-slate-400 mb-2">// From the Immigration and Nationality Act (INA)</p>
              <p className="text-amber-400">Section 214(b):</p>
              <p className="mt-2">"Every alien shall be presumed to be an immigrant until they establish to the 
              satisfaction of the consular officer [...] that they are entitled to a nonimmigrant status."</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <h4 className="font-bold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                  <span>❌</span> What 214(b) Does NOT Mean
                </h4>
                <ul className="text-red-800 dark:text-red-200 text-sm space-y-1">
                  <li>• You are banned from the US</li>
                  <li>• You can never get a visa</li>
                  <li>• Your character is in question</li>
                  <li>• You did something wrong</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                  <span>✓</span> What 214(b) DOES Mean
                </h4>
                <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                  <li>• Your case wasn't compelling <em>enough</em></li>
                  <li>• You can reapply immediately</li>
                  <li>• Different presentation can succeed</li>
                  <li>• This is a communication problem</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Common 214(b) Refusal Reasons</h2>
            <ul className="space-y-3">
              {[
                "Weak ties to home country (no property, job, or family business)",
                "Generic or vague interview answers",
                "Mismatch between course choice and career plans",
                "Insufficient financial documentation",
                "Gaps in education/employment without explanation",
                "Low academic scores without compelling justification",
                "Perceived 'immigrant profile' (relatives in US, prior visa attempts)"
              ].map((reason, idx) => (
                <li key={idx} className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-red-500 font-bold">{idx + 1}.</span>
                  <span className="text-slate-700 dark:text-slate-300">{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Practice F1 Interview with AI</h3>
            <p className="text-red-100 mb-4">
              Our AI Visa Officer simulates real interview conditions. Get scored on clarity, confidence, and content.
            </p>
            <a href="/usavisaprep" 
               className="inline-block bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
              Start Free Practice →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}





