import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Genuine Student (GS) Test 2026-2027 Guide | GTE Replaced | EEC Australia',
  description: 'Complete guide to Australia\'s new Genuine Student (GS) requirement that replaced GTE in March 2024. Includes GS questions, 150-word answer strategies, financial evidence (AUD 24,505), and work rights (48 hrs/fortnight).',
  keywords: ['Genuine Student test Australia', 'GS test 2026', 'GTE replaced GS', 'Australia student visa 500', 'GS questions answers', 'Australia visa financial requirements 2026', '48 hours work Australia student', 'genuine student requirement'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/guides/australia-gs-guide',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Genuine Student (GS) Test 2026-2027: Complete Guide to Australia's New Visa Requirement",
  "description": "Comprehensive guide to Australia's Genuine Student (GS) requirement that replaced GTE in March 2024",
  "author": {
    "@type": "Organization",
    "name": "EEC - Enbee Education Center",
    "@id": "https://eecglobal.com/#organization"
  },
  "datePublished": "2024-03-23",
  "dateModified": "2026-01-01",
  "mainEntityOfPage": "https://ai.eecglobal.com/guides/australia-gs-guide"
};

export default function AustraliaGSGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/hub/study-in-australia" className="hover:text-amber-600 dark:hover:text-amber-400">Study in Australia</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">GS Test Guide</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-4 py-2 rounded-full text-amber-300 text-sm font-semibold mb-6">
            <span>🆕</span>
            <span>REGULATORY UPDATE: March 2024</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            The GTE is Dead.<br />
            <span className="text-amber-400">Welcome to the Genuine Student Era.</span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
            Australia replaced the Genuine Temporary Entrant (GTE) statement with targeted 
            <strong className="text-white"> Genuine Student (GS) questions</strong> in March 2024. 
            This comprehensive guide covers everything you need to know about the new requirement.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-amber-400 font-bold text-lg">150</span>
              <span className="text-slate-400 ml-2 text-sm">words per answer</span>
            </div>
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-amber-400 font-bold text-lg">AUD 24,505</span>
              <span className="text-slate-400 ml-2 text-sm">living costs 2026</span>
            </div>
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-amber-400 font-bold text-lg">48 hrs</span>
              <span className="text-slate-400 ml-2 text-sm">work/fortnight</span>
            </div>
            <div className="px-4 py-3 bg-white/10 rounded-lg backdrop-blur">
              <span className="text-amber-400 font-bold text-lg">5-6</span>
              <span className="text-slate-400 ml-2 text-sm">targeted questions</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              🚨 <strong>Critical Change:</strong> As of 23 March 2024, the GTE statement is no longer accepted. 
              All new student visa applications must address the Genuine Student (GS) questions.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The 5-6 GS Questions You Must Answer</h2>
            <ol className="space-y-4">
              {[
                { q: "Details of your current circumstances", desc: "Your current employment, education status, and family situation in your home country." },
                { q: "Why you chose this specific course and education provider", desc: "Specific reasons for course selection, curriculum alignment, and institution choice." },
                { q: "How this course will benefit your future career", desc: "Clear connection between the course and your career goals, with specific examples." },
                { q: "Why you chose Australia over other countries", desc: "Specific advantages of studying in Australia vs. your home country or other destinations." },
                { q: "Your understanding of conditions for the student visa", desc: "Demonstrate knowledge of work rights, visa conditions, and compliance requirements." },
                { q: "Any other relevant information about your genuine intentions", desc: "Additional context that supports your genuine student status." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">{item.q}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Financial Requirements 2026</h2>
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Living Costs:</strong> AUD 24,505 per year (increased from AUD 21,041)<br />
                <strong>Tuition:</strong> First year's tuition fees must be paid<br />
                <strong>OSHC:</strong> Overseas Student Health Cover required<br />
                <strong>Return Airfare:</strong> Evidence of funds for return travel
              </p>
            </div>
          </section>

          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Practice GS Test with AI</h3>
            <p className="text-amber-100 mb-4">
              EEC's AI GS Statement Builder helps you craft compelling 150-word answers for each question.
            </p>
            <a href="/australia-gs-prep" 
               className="inline-block bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
              Try GS Prep Tool →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}




