import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What is F1 Visa? | F1 Student Visa Explained | EEC',
  description: 'F1 Visa is a non-immigrant student visa for international students studying at US universities. Learn about F1 requirements, processing time, work rights (OPT/CPT), and how to apply.',
  keywords: ['F1 visa', 'F1 student visa', 'what is F1 visa', 'F1 visa requirements', 'F1 visa interview', 'F1 visa processing time', 'F1 visa OPT CPT'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/glossary/f1-visa',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "@id": "https://ai.eecglobal.com/glossary/f1-visa#term",
      "name": "F1 Visa",
      "description": "F1 Visa is a non-immigrant student visa issued to international students enrolled full-time at an accredited US academic institution. It allows students to stay in the US for the duration of their study program plus 60 days grace period.",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "EEC Study Abroad Glossary"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://ai.eecglobal.com/glossary/f1-visa#webpage",
      "url": "https://ai.eecglobal.com/glossary/f1-visa",
      "name": "What is F1 Visa? - Complete Guide",
      "description": "Comprehensive explanation of F1 student visa for US",
      "isPartOf": {"@id": "https://ai.eecglobal.com/#website"},
      "breadcrumb": {"@id": "https://ai.eecglobal.com/glossary/f1-visa#breadcrumb"}
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ai.eecglobal.com/glossary/f1-visa#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://ai.eecglobal.com/"},
        {"@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://ai.eecglobal.com/glossary"},
        {"@type": "ListItem", "position": 3, "name": "F1 Visa", "item": "https://ai.eecglobal.com/glossary/f1-visa"}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is F1 Visa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "F1 Visa is a non-immigrant student visa for international students studying full-time at accredited US universities, colleges, or language schools. It is the most common student visa type for academic programs."
          }
        },
        {
          "@type": "Question",
          "name": "How long is F1 Visa valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "F1 Visa is valid for 'Duration of Status' (D/S), meaning you can stay as long as you're enrolled as a full-time student. After completion, you get 60 days grace period to leave or change status."
          }
        },
        {
          "@type": "Question",
          "name": "Can I work on F1 Visa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, F1 students can work: 1) On-campus: 20 hours/week during semester, full-time during breaks. 2) CPT: For internships related to major. 3) OPT: 12 months after graduation (36 months for STEM)."
          }
        }
      ]
    }
  ]
};

export default function F1VisaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/glossary" className="hover:text-blue-600 dark:hover:text-blue-400">Glossary</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">F1 Visa</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
          What is F1 Visa?
        </h1>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-l-4 border-blue-500 p-6 rounded-xl mb-8">
          <p className="text-lg text-blue-900 dark:text-blue-100">
            <strong>F1 Visa</strong> is a non-immigrant student visa issued by the United States to international students 
            enrolled full-time at an accredited US academic institution (university, college, or language school). 
            It allows students to stay in the US for the duration of their study program.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-slate-500 dark:text-slate-400">Visa Type</div>
            <div className="font-semibold text-slate-900 dark:text-white">Non-Immigrant Student Visa</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-slate-500 dark:text-slate-400">Valid For</div>
            <div className="font-semibold text-slate-900 dark:text-white">Duration of Status (D/S)</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-slate-500 dark:text-slate-400">Application Fee</div>
            <div className="font-semibold text-slate-900 dark:text-white">$185 (MRV) + $350 (SEVIS)</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-slate-500 dark:text-slate-400">Work Rights</div>
            <div className="font-semibold text-slate-900 dark:text-white">OPT/CPT (Up to 3 years STEM)</div>
          </div>
        </div>

        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">F1 Visa Requirements</h2>
          <ul className="space-y-2 mb-8 text-slate-700 dark:text-slate-300">
            <li>✅ Admission to a SEVP-certified institution</li>
            <li>✅ Form I-20 from your university</li>
            <li>✅ Proof of financial support (tuition + living expenses)</li>
            <li>✅ SEVIS fee payment receipt</li>
            <li>✅ Valid passport (6+ months validity)</li>
            <li>✅ DS-160 confirmation page</li>
            <li>✅ Visa interview appointment</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Work Authorization on F1</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-3 text-left border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">Type</th>
                  <th className="p-3 text-left border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">When</th>
                  <th className="p-3 text-left border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-white">On-Campus</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">During study</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">20 hrs/week (semester), Full-time (breaks)</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-white">CPT</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">After 1 year (with employer)</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Part-time or Full-time</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-white">OPT</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">After graduation</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">12 months</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-white">STEM OPT</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">STEM degree graduates</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Additional 24 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl text-white mt-12">
          <h3 className="text-xl font-bold mb-2">Preparing for F1 Visa Interview?</h3>
          <p className="text-blue-100 mb-4">Practice with our AI Visa Officer that simulates real interview conditions.</p>
          <Link href="/usavisaprep" className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Start Free Practice →
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Terms</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/glossary/blocked-account" className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">Blocked Account</Link>
            <Link href="/glossary/genuine-student-test" className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">Genuine Student Test</Link>
            <Link href="/guides/214b-refusal-recovery" className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">214(b) Recovery</Link>
          </div>
        </section>
      </main>
    </>
  );
}

