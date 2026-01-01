import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study in Germany 2026 for Indian Students | Free Education | EEC',
  description: 'Study in Germany for FREE! Complete guide for Indian students 2026. Public universities, blocked account (€11,904), German grade conversion, APS certificate, and work visa.',
  keywords: ['study in Germany', 'free education Germany', 'Germany student visa', 'blocked account Germany', 'German grade calculator', 'APS certificate India', 'TU9 universities'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/hub/study-in-germany',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "url": "https://ai.eecglobal.com/hub/study-in-germany",
      "name": "Study in Germany 2026 for Indian Students - Free Education",
      "description": "Complete guide to studying in Germany with zero tuition fees"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is education really free in Germany?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Public universities in Germany charge €0 tuition for international students (except Baden-Württemberg: €1,500/semester). You only pay semester contribution (€150-350) which includes public transport. Living costs: €11,904/year (blocked account requirement)."
          }
        },
        {
          "@type": "Question",
          "name": "What is blocked account for Germany?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A blocked account (Sperrkonto) is a special bank account you must open before applying for German student visa. Amount: €11,904/year (2026). You can withdraw €992/month for living expenses. Providers: Expatrio, Fintiba, Deutsche Bank."
          }
        }
      ]
    }
  ]
};

export default function StudyInGermanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">Study in Germany</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full text-sm mb-6 text-white font-semibold">
            ✨ €0 TUITION at Public Universities
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Study in Germany 2026<br />
            <span className="text-yellow-400">FREE Education for Indian Students</span>
          </h1>
          <p className="text-xl text-yellow-100 mb-8">
            Zero tuition fees at public universities. Only living costs: €11,904/year. World-class education at fraction of cost.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://germany.eecglobal.com/public/" className="bg-white text-yellow-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition">
              German Grade Calculator
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Study in Germany?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">Free Education</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">€0 tuition at public universities. Only pay semester contribution (€150-350) which includes public transport pass.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">TU9 Universities</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">9 elite technical universities including TUM, RWTH Aachen, and TU Berlin. World-class engineering programs.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}








