import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Genuine Student (GS) Test Explained | Australia Visa 2026 | EEC',
  description: 'The Genuine Student test is Australia\'s visa requirement that replaced GTE in March 2024. Learn the 5 GS questions, how to answer them, and EEC\'s success strategies.',
  keywords: ['Genuine Student test', 'GS test Australia', 'Australia GS requirement', 'GTE replacement', 'Subclass 500', 'Australia student visa'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/glossary/genuine-student-test',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "@id": "https://ai.eecglobal.com/glossary/genuine-student-test#definition",
      "name": "Genuine Student (GS) Test",
      "alternateName": ["GS Test", "GS Assessment", "GS Requirement", "Genuine Student Requirement"],
      "description": "The Genuine Student test is Australia's visa assessment criterion, effective March 23, 2024, replacing the Genuine Temporary Entrant (GTE) requirement. It evaluates Subclass 500 (Student Visa) applicants across 5 core questions about study intentions, education provider choice, destination rationale, course benefits, and home country circumstances.",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "EEC Study Abroad Glossary",
        "url": "https://ai.eecglobal.com/glossary"
      },
      "termCode": "GS-TEST-AUS"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Genuine Student (GS) test for Australia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Genuine Student (GS) test is Australia's visa assessment requirement that replaced the Genuine Temporary Entrant (GTE) test on March 23, 2024. It requires Subclass 500 student visa applicants to answer 5 specific questions about their study intentions, choice of education provider, reasons for choosing Australia, expected benefits from the course, and circumstances in their home country."
          }
        },
        {
          "@type": "Question",
          "name": "What are the 5 GS questions for Australia student visa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 5 GS questions are: 1) Why did you choose this course? 2) Why did you choose this education provider? 3) Why did you choose Australia instead of your home country? 4) How will this course benefit you? 5) What are your circumstances in your home country? Each answer must demonstrate genuine study intent without explicitly mentioning permanent residency goals."
          }
        }
      ]
    }
  ]
};

export default function GenuineStudentTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/glossary" className="hover:text-white">Glossary</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Genuine Student Test</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">Genuine Student (GS) Test</h1>
          <p className="text-blue-100">Australia's visa assessment requirement, effective March 2024</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 mb-8 border-l-4 border-blue-500">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide mb-2">📖 Definition</div>
          <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed">
            <strong>The Genuine Student (GS) test</strong> is Australia's visa assessment criterion, effective 
            <strong> March 23, 2024</strong>, replacing the Genuine Temporary Entrant (GTE) requirement. 
            It evaluates Subclass 500 (Student Visa) applicants across <strong>5 core questions</strong> 
            about study intentions, education provider choice, destination rationale, course benefits, 
            and home country circumstances.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">Quick Facts: Genuine Student Test</h2>
          <dl className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Also Known As</dt>
              <dd className="font-medium text-slate-800 dark:text-white">GS Test, GS Assessment, GS Requirement</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Replaced</dt>
              <dd className="font-medium text-slate-800 dark:text-white">Genuine Temporary Entrant (GTE) Test</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Effective Date</dt>
              <dd className="font-medium text-slate-800 dark:text-white">March 23, 2024</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Applies To</dt>
              <dd className="font-medium text-slate-800 dark:text-white">Subclass 500 (Student Visa) applicants</dd>
            </div>
          </dl>
        </div>

        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">The 5 GS Questions You Must Answer</h2>
          <ol className="space-y-6">
            {[
              { num: 1, q: "Why did you choose this course?", desc: "Explain how this specific course aligns with your academic background and career goals. Reference curriculum elements, not just rankings." },
              { num: 2, q: "Why did you choose this education provider?", desc: "Demonstrate research into the specific university—faculty, research centers, industry partnerships, or location advantages." },
              { num: 3, q: "Why Australia and not your home country?", desc: "Identify specific gaps in your home country's education system that Australia fills. Avoid implying your country is inferior." },
              { num: 4, q: "How will this course benefit you?", desc: "Connect current limitations to specific skills you'll gain, then explain post-return application." },
              { num: 5, q: "What are your circumstances in your home country?", desc: "Provide concrete evidence of ties: family business, property, career progression, or community involvement." }
            ].map((item) => (
              <li key={item.num} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center font-bold">{item.num}</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">{item.q}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">EEC's GS Statement Builder</h2>
          <p className="text-blue-100 mb-4">
            Since March 2024, EEC has processed <strong>400+ GS applications</strong> with an 
            <strong> 89% approval rate</strong>—compared to the 65% industry average for Indian applicants.
          </p>
          <a href="/australiagsprep/" 
             className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Try GS Statement Builder →
          </a>
        </div>
      </main>
    </>
  );
}





