import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study in Australia 2026 for Indian Students | Complete Guide | EEC',
  description: 'Complete guide to study in Australia for Indian students 2026. Genuine Student (GS) test, costs (₹20-50 Lakhs), PR pathway, and post-study work visa. AIRC certified guidance.',
  keywords: ['study in Australia', 'Australia student visa', 'Genuine Student test', 'subclass 500', 'Australia PR after study', 'universities in Australia', 'IELTS Australia'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/hub/study-in-australia',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "url": "https://ai.eecglobal.com/hub/study-in-australia",
      "name": "Study in Australia 2026 for Indian Students",
      "description": "Complete guide covering Genuine Student test, costs, universities, and PR pathway"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Genuine Student (GS) requirement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Genuine Student (GS) replaced the old GTE requirement in March 2024. Instead of writing a 300-word statement, you now answer specific questions about your circumstances, course choice, and career plans. Each answer has a 150-word limit."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to study in Australia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Total cost for 2-year Master's: ₹20-50 Lakhs. This includes tuition (₹15-35 Lakhs for 2 years), living (AUD 24,505/year minimum), OSHC health insurance, and visa fees. Regional universities are 20-30% cheaper."
          }
        }
      ]
    }
  ]
};

export default function StudyInAustraliaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">Study in Australia</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Study in Australia 2026<br />
            <span className="text-amber-300">Complete Guide for Indian Students</span>
          </h1>
          <p className="text-xl text-amber-100 mb-8">
            Genuine Student (GS) test, world-class universities, and clear PR pathway. Your gateway to Australian education.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/australiagsprep/" className="bg-white text-amber-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
              Practice GS Test
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Study in Australia?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">🇦🇺</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">PR Pathway</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Clear pathway to permanent residency through Skilled Migration after completing degree on SOL.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Top Universities</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">8 Australian universities in top 100 globally. Group of Eight (Go8) universities offer world-class education.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}





