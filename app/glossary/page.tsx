import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study Abroad Glossary | Visa & Immigration Terms Explained | EEC',
  description: 'Authoritative definitions of study abroad terms: F1 visa, GS test, blocked account, SDS, OPT, PGWP, and more. Updated for 2026 by AIRC-certified EEC consultants.',
  alternates: {
    canonical: 'https://ai.eecglobal.com/glossary',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Study Abroad Glossary",
  "description": "Comprehensive glossary of study abroad, visa, and immigration terminology for Indian students",
  "itemListOrder": "https://schema.org/ItemListOrderAlphabetical",
  "numberOfItems": 20,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Genuine Student (GS) Test",
      "url": "https://ai.eecglobal.com/glossary/genuine-student-test"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Modified Bavarian Formula",
      "url": "https://ai.eecglobal.com/glossary/bavarian-formula"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Blocked Account (Sperrkonto)",
      "url": "https://ai.eecglobal.com/glossary/blocked-account"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Section 214(b)",
      "url": "https://ai.eecglobal.com/glossary/section-214b"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Student Direct Stream (SDS)",
      "url": "https://ai.eecglobal.com/glossary/student-direct-stream"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Confirmation of Acceptance for Studies (CAS)",
      "url": "https://ai.eecglobal.com/glossary/cas"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Confirmation of Enrolment (CoE)",
      "url": "https://ai.eecglobal.com/glossary/coe"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "Letter of Acceptance (LOA)",
      "url": "https://ai.eecglobal.com/glossary/loa"
    },
    {
      "@type": "ListItem",
      "position": 9,
      "name": "Statement of Purpose (SOP)",
      "url": "https://ai.eecglobal.com/glossary/sop"
    },
    {
      "@type": "ListItem",
      "position": 10,
      "name": "Form I-20",
      "url": "https://ai.eecglobal.com/glossary/i-20"
    },
    {
      "@type": "ListItem",
      "position": 11,
      "name": "DS-160 Form",
      "url": "https://ai.eecglobal.com/glossary/ds-160"
    },
    {
      "@type": "ListItem",
      "position": 12,
      "name": "Immigration Health Surcharge (IHS)",
      "url": "https://ai.eecglobal.com/glossary/ihs"
    }
  ]
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Glossary</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">Study Abroad Glossary</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Authoritative definitions of visa, immigration, and study abroad terminology.
            Updated for 2026 by EEC's AIRC-certified counselors.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <nav className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            <a href="#australia" className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800">🇦🇺 Australia</a>
            <a href="#canada" className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800">🇨🇦 Canada</a>
            <a href="#germany" className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800">🇩🇪 Germany</a>
            <a href="#ireland" className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800">🇮🇪 Ireland</a>
            <a href="#uk" className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800">🇬🇧 UK</a>
            <a href="#usa" className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800">🇺🇸 USA</a>
            <a href="#general" className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600">📚 General</a>
          </div>
        </nav>

        <div className="space-y-12">
          <section id="australia">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>🇦🇺</span> Australia
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/glossary/genuine-student-test" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-blue-700 dark:text-blue-400">Genuine Student (GS) Test</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Australia's visa assessment replacing GTE, effective March 2024</p>
              </Link>
              <Link href="/glossary/coe" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400">CoE (Confirmation of Enrolment)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Mandatory PRISMS document for Subclass 500 visa application</p>
              </Link>
            </div>
          </section>

          <section id="canada">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>🇨🇦</span> Canada
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/glossary/loa" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-red-300 dark:hover:border-red-600 hover:shadow-md transition">
                <h3 className="font-bold text-red-700 dark:text-red-400">LOA (Letter of Acceptance)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">DLI-issued admission letter required for Study Permit</p>
              </Link>
            </div>
          </section>

          <section id="germany">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>🇩🇪</span> Germany
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/glossary/blocked-account" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-400">Blocked Account (Sperrkonto)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">€11,904 financial proof requirement for German student visa 2026</p>
              </Link>
              <Link href="/guides/german-grade-guide" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-400">Modified Bavarian Formula</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Mathematical formula to convert international grades to German scale</p>
              </Link>
            </div>
          </section>

          <section id="usa">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>🇺🇸</span> USA
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/glossary/f1-visa" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-blue-700 dark:text-blue-400">F1 Visa</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Non-immigrant student visa for full-time study at US universities</p>
              </Link>
              <Link href="/glossary/i-20" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-blue-700 dark:text-blue-400">Form I-20</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Certificate of Eligibility required for SEVIS and Visa Interview</p>
              </Link>
              <Link href="/glossary/ds-160" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-blue-700 dark:text-blue-400">DS-160 Form</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Online Nonimmigrant Visa Application form</p>
              </Link>
              <Link href="/guides/214b-refusal-recovery" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition">
                <h3 className="font-bold text-blue-700 dark:text-blue-400">Section 214(b)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Most common F1 visa refusal reason—immigrant intent presumption</p>
              </Link>
            </div>
          </section>

          <section id="uk">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>🇬🇧</span> UK
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/glossary/cas" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400">CAS (Confirmation of Acceptance)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Mandatory reference number for UK Student Visa application</p>
              </Link>
              <Link href="/glossary/ihs" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400">IHS (Health Surcharge)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Mandatory fee to access the National Health Service (NHS)</p>
              </Link>
            </div>
          </section>

          <section id="general">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>📚</span> General
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/glossary/sop" className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md transition">
                <h3 className="font-bold text-slate-700 dark:text-slate-300">SOP (Statement of Purpose)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Essay explaining career goals and motivations for study</p>
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">📚 About This Glossary</h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            This glossary is maintained by <strong>Enbee Education Center (EEC)</strong>, an AIRC-certified study abroad consultancy
            with 28 years of experience. All definitions are reviewed quarterly and updated to reflect the latest visa policies.
            Last updated: <strong>January 2026</strong>.
          </p>
        </div>
      </main>
    </>
  );
}

