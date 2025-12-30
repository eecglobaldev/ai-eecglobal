import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study in UK 2026 for Indian Students | Complete Guide | EEC',
  description: 'Complete guide to study in UK for Indian students 2026. Student visa, Russell Group universities, costs (₹25-50 Lakhs), Graduate Route visa (2 years), and credibility interview tips.',
  keywords: ['study in UK', 'UK student visa', 'Russell Group universities', 'Graduate Route visa UK', 'UK credibility interview', 'UK universities for Indian students'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/hub/study-in-uk',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "url": "https://ai.eecglobal.com/hub/study-in-uk",
      "name": "Study in UK 2026 for Indian Students",
      "description": "Complete guide covering UK student visa, universities, costs, and Graduate Route"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Graduate Route visa UK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Graduate Route allows international students to stay in UK for 2 years after completing degree (3 years for PhD). You can work in any job, any sector, without employer sponsorship. Apply before student visa expires."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to study in UK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Total cost for 1-year Master's: ₹25-50 Lakhs. Tuition: £15,000-40,000 (₹15-40L). Living: £12,006/year London, £9,207 outside (28-day rule). IHS: £1,035. Visa: £490."
          }
        }
      ]
    }
  ]
};

export default function StudyInUKPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">Study in UK</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                September 2026 & January 2026 Intake Open
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Study in UK 2026<br />
                <span className="text-violet-300">Complete Guide for Indian Students</span>
              </h1>
              <p className="text-xl text-violet-100 mb-8">
                1-year Master's, world-class universities, and 2-year Graduate Route work visa. Your gateway to British education.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/uk-precas" className="bg-white text-violet-900 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition">
                  Practice Credibility Interview
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">₹25-50L</div>
                <div className="text-violet-300">Total Cost (1 Year)</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">2 Years</div>
                <div className="text-violet-300">Graduate Route</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Study in UK?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">1-Year Master's</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Complete your Master's in just 1 year, saving time and money compared to 2-year programs.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Russell Group Universities</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">24 world-class universities including Oxford, Cambridge, Imperial, LSE, and UCL.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}




