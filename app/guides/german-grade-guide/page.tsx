import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'German Grade Calculator Guide | Modified Bavarian Formula Explained | EEC',
  description: 'The definitive guide to converting Indian CGPA & percentage to German grades using the Modified Bavarian Formula. Includes APS certificate requirements, university eligibility thresholds, and CGPA-to-German-Grade conversion tables.',
  keywords: ['German grade calculator', 'Bavarian formula', 'Indian CGPA to German grade', 'APS certificate India', 'study in Germany eligibility', 'TU Munich grade requirement', 'RWTH Aachen admission', 'German university grading system', 'Nmax Nmin formula'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/guides/german-grade-guide',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "German Grade Calculator: The Complete Guide to the Modified Bavarian Formula",
  "description": "A comprehensive mathematical guide to converting Indian academic scores to the German grading system",
  "author": {
    "@type": "Organization",
    "name": "EEC - Enbee Education Center"
  },
  "datePublished": "2024-01-01",
  "dateModified": "2026-01-01"
};

export default function GermanGradeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/hub/study-in-germany" className="hover:text-yellow-600 dark:hover:text-yellow-400">Study in Germany</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">German Grade Guide</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-50 dark:to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full text-amber-300 text-sm font-medium mb-6">
            <span>🇩🇪</span>
            <span>Official Modified Bavarian Formula</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            German Grade Calculator:<br />
            <span className="text-amber-400">The Complete Mathematical Guide</span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
            Understanding how your Indian CGPA or percentage converts to the German grading scale 
            is crucial for university applications. This guide explains the <strong className="text-white">Modified Bavarian Formula</strong> 
            with mathematical precision.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-amber-400 font-bold">1.0 - 5.0</span>
              <span className="text-slate-400 ml-2">German Scale</span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-amber-400 font-bold">≤ 2.5</span>
              <span className="text-slate-400 ml-2">Typical Requirement</span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <span className="text-amber-400 font-bold">APS Required</span>
              <span className="text-slate-400 ml-2">for Indian Students</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Modified Bavarian Formula</h2>
            <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 font-mono">
              <p className="text-amber-400 text-sm mb-2">Formula:</p>
              <p className="text-2xl">X = 1 + 3 × (N<sub>max</sub> - N<sub>d</sub>) / (N<sub>max</sub> - N<sub>min</sub>)</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">X</p>
                <p className="text-slate-600 dark:text-slate-300">The resulting German grade (1.0 to 5.0)</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">N<sub>max</sub></p>
                <p className="text-slate-600 dark:text-slate-300">Maximum possible score (e.g., 10.0 or 100%)</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">N<sub>d</sub></p>
                <p className="text-slate-600 dark:text-slate-300">Your actual score/CGPA</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">N<sub>min</sub></p>
                <p className="text-slate-600 dark:text-slate-300">Minimum passing score (e.g., 4.0 or 40%)</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">German Grade Scale</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">German Grade</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Term</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-3 font-mono font-bold text-green-600 dark:text-green-400">1.0 - 1.5</td>
                    <td className="px-4 py-3 font-medium">Sehr Gut</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Outstanding, top 5-10%</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">1.6 - 2.5</td>
                    <td className="px-4 py-3 font-medium">Gut</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Good, competitive for most programs</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-3 font-mono font-bold text-yellow-600 dark:text-yellow-400">2.6 - 3.5</td>
                    <td className="px-4 py-3 font-medium">Befriedigend</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Satisfactory, limited options</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-red-600 dark:text-red-400">3.6 - 5.0</td>
                    <td className="px-4 py-3 font-medium">Ausreichend/Nicht Bestanden</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Sufficient/Failed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="bg-gradient-to-r from-yellow-600 to-amber-700 text-white rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Use Our Free German Grade Calculator</h3>
            <p className="text-yellow-100 mb-4">
              Instantly convert your Indian CGPA to German grades using the official Modified Bavarian Formula.
            </p>
            <a href="https://germany.eecglobal.com/public/" 
               className="inline-block bg-white text-yellow-700 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition">
              Open Calculator →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

