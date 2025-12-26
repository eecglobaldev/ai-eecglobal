import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study in Ireland 2026 for Indian Students | Stamp 1G, Costs, Visa | EEC',
  description: 'Complete guide to study in Ireland for Indian students 2026. Stamp 1G (2 years work), costs (₹20-35 Lakhs), new Recent Graduate threshold (€35,000), and path to EU citizenship.',
  keywords: ['study in Ireland', 'Ireland student visa 2026', 'Stamp 1G rules', 'Ireland post study work visa salary', 'Ireland vs UK', 'Trinity College Dublin', 'UCD for Indian students'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/hub/study-in-ireland',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "url": "https://ai.eecglobal.com/hub/study-in-ireland",
      "name": "Study in Ireland 2026 for Indian Students",
      "description": "Complete guide covering Stamp 1G, costs, universities, and path to EU citizenship"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Stamp 1G in Ireland?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stamp 1G is Ireland's post-study work permission. Level 8 (Bachelor's Honours) graduates get 12 months. Level 9/10 (Master's/PhD) graduates get 24 months. During Stamp 1G, you can work full-time for any employer without restrictions."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to study in Ireland for Indian students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Total cost for 1-year Master's: ₹20-35 Lakhs. Tuition: €10,000-25,000 (₹9-22L). Living: €10,000-15,000/year (₹9-13L). Ireland is 20-30% cheaper than UK for similar quality education."
          }
        }
      ]
    }
  ]
};

export default function StudyInIrelandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          📢 <strong>NEW:</strong> Ireland lowers work permit threshold for 2026! 
          <Link href="/news/ireland-2026-employment-permit-update" className="underline hover:no-underline ml-2">Read Analysis →</Link>
        </div>
      </div>

      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">Study in Ireland</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Study in Ireland 2026<br />
            <span className="text-emerald-300">Complete Guide for Indian Students</span>
          </h1>
          <p className="text-xl text-emerald-100 mb-8">
            Stamp 1G (2 years work), world-class universities, and path to EU citizenship. Your gateway to European education.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Study in Ireland?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">🇮🇪</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">EU Citizenship Path</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">After 5 years, apply for Irish citizenship which grants EU citizenship and right to work in all 27 EU countries.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">2-Year Stamp 1G</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Master's graduates get 24 months post-study work permission. Work for any employer without restrictions.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

