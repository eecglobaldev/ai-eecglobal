import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'USA vs Canada for Indian Students 2026 | Complete Comparison | EEC',
  description: 'USA vs Canada comparison for Indian students 2026. Compare costs (₹25-80L vs ₹15-40L), work rights (3 years each), PR pathway, and job opportunities. Make the right choice.',
  keywords: ['USA vs Canada', 'USA vs Canada for Indian students', 'study in USA or Canada', 'Canada vs USA PR', 'USA vs Canada cost'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/compare/usa-vs-canada',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ai.eecglobal.com/compare/usa-vs-canada#webpage",
      "url": "https://ai.eecglobal.com/compare/usa-vs-canada",
      "name": "USA vs Canada for Indian Students 2026 - Complete Comparison",
      "description": "Detailed comparison of studying in USA vs Canada including costs, work rights, and PR pathway"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is USA or Canada better for Indian students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on your goals. Choose USA for: highest salaries ($75K-$120K), top-ranked universities, tech industry jobs. Choose Canada for: easier PR pathway, lower costs (₹15-40L), work-life balance, family-friendly policies."
          }
        },
        {
          "@type": "Question",
          "name": "Which is cheaper: USA or Canada?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Canada is 30-50% cheaper. USA: ₹25-80 Lakhs for 2-year MS. Canada: ₹15-40 Lakhs for 2-year program. Canadian colleges cost ₹10-16L/2 years vs US universities at ₹25-60L/2 years."
          }
        }
      ]
    }
  ]
};

export default function USAVsCanadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-6xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">USA vs Canada</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-r from-blue-900 to-red-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            🇺🇸 USA vs Canada 🇨🇦
          </h1>
          <p className="text-xl text-white/80">
            Complete Comparison for Indian Students 2026
          </p>
        </div>
      </header>

      <section className="py-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 border-l-4 border-purple-600 p-6 rounded-r-xl shadow-sm">
            <h2 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">Quick Answer: USA or Canada?</h2>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Choose USA</strong> if you want highest salaries ($75K-$120K), world's top universities, and tech industry opportunities. 
              <strong> Choose Canada</strong> if you want easier PR pathway, lower costs (30-50% cheaper), and work-life balance.
              Both offer 3 years post-study work rights.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">Head-to-Head Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-slate-100 dark:bg-slate-800 text-left font-semibold text-slate-900 dark:text-white">Factor</th>
                <th className="p-4 bg-blue-600 text-white text-center font-semibold">🇺🇸 USA</th>
                <th className="p-4 bg-red-600 text-white text-center font-semibold">🇨🇦 Canada</th>
                <th className="p-4 bg-slate-100 dark:bg-slate-800 text-center font-semibold text-slate-900 dark:text-white">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-white">Total Cost (2 Years)</td>
                <td className="p-4 text-center bg-blue-50 dark:bg-blue-950/20">₹25-80 Lakhs</td>
                <td className="p-4 text-center bg-red-50 dark:bg-red-950/20">₹15-40 Lakhs</td>
                <td className="p-4 text-center font-bold text-red-600 dark:text-red-400">🇨🇦 Canada</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-white">Post-Study Work</td>
                <td className="p-4 text-center bg-blue-50 dark:bg-blue-950/20">3 years (STEM OPT)</td>
                <td className="p-4 text-center bg-red-50 dark:bg-red-950/20">3 years (PGWP)</td>
                <td className="p-4 text-center font-bold text-slate-500">🤝 Tie</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-white">PR Pathway</td>
                <td className="p-4 text-center bg-blue-50 dark:bg-blue-950/20">H1B Lottery (30%)<br /><span className="text-xs text-slate-500">No direct path</span></td>
                <td className="p-4 text-center bg-red-50 dark:bg-red-950/20">Express Entry (90%+)<br /><span className="text-xs text-slate-500">Clear pathway</span></td>
                <td className="p-4 text-center font-bold text-red-600 dark:text-red-400">🇨🇦 Canada</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-white">Starting Salary</td>
                <td className="p-4 text-center bg-blue-50 dark:bg-blue-950/20">$75,000 - $120,000<br /><span className="text-xs text-slate-500">₹62L - ₹1Cr/year</span></td>
                <td className="p-4 text-center bg-red-50 dark:bg-red-950/20">CAD 60,000 - 90,000<br /><span className="text-xs text-slate-500">₹37L - ₹55L/year</span></td>
                <td className="p-4 text-center font-bold text-blue-600 dark:text-blue-400">🇺🇸 USA</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">🇺🇸 Choose USA If...</h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200">
              <li>✅ You want highest possible salary</li>
              <li>✅ You're targeting top-ranked universities</li>
              <li>✅ You're in STEM (3-year work rights)</li>
              <li>✅ You want to work in Silicon Valley/Tech</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4">🇨🇦 Choose Canada If...</h3>
            <ul className="space-y-2 text-red-800 dark:text-red-200">
              <li>✅ You want guaranteed PR pathway</li>
              <li>✅ You have budget constraints</li>
              <li>✅ Your spouse wants to work</li>
              <li>✅ You want work-life balance</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

