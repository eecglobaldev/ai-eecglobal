import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study in Canada 2026 for Indian Students | Complete Guide | EEC',
  description: 'Complete guide to study in Canada for Indian students 2026. SDS visa, top universities, costs (₹15-40 Lakhs), PGWP work permit, and PR pathway. AIRC certified guidance.',
  keywords: ['study in Canada', 'Canada student visa', 'SDS visa India', 'study permit Canada', 'PGWP', 'Canada PR after study', 'colleges in Canada', 'universities in Canada for Indian students'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/hub/study-in-canada',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ai.eecglobal.com/hub/study-in-canada#webpage",
      "url": "https://ai.eecglobal.com/hub/study-in-canada",
      "name": "Study in Canada 2026 for Indian Students | Complete Guide",
      "description": "Comprehensive guide covering study permit, universities, costs, PGWP, and PR pathway for Indian students",
      "isPartOf": {"@id": "https://ai.eecglobal.com/#website"},
      "datePublished": "2024-01-01",
      "dateModified": "2026-01-01",
      "author": {"@id": "https://eecglobal.com/team/amit-jalan#person"},
      "breadcrumb": {"@id": "https://ai.eecglobal.com/hub/study-in-canada#breadcrumb"}
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ai.eecglobal.com/hub/study-in-canada#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://ai.eecglobal.com/"},
        {"@type": "ListItem", "position": 2, "name": "Study Abroad", "item": "https://ai.eecglobal.com/"},
        {"@type": "ListItem", "position": 3, "name": "Study in Canada", "item": "https://ai.eecglobal.com/hub/study-in-canada"}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is SDS visa for Canada?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Student Direct Stream (SDS) is a fast-track study permit processing for students from India. Requirements: IELTS 6.0+ (no band below 6.0), GIC of CAD 20,635, first year tuition paid, admission to DLI. Processing time: 20 days vs 8-12 weeks for regular stream."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to study in Canada for Indian students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Total cost for 2-year PG Diploma: ₹15-25 Lakhs. For 2-year Master's: ₹25-40 Lakhs. This includes tuition (₹10-25 Lakhs), living (₹8-12 Lakhs/year), and initial costs. Colleges are cheaper than universities."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get PR in Canada after study?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Canada offers clear PR pathway through Canadian Experience Class (CEC). After 1 year of skilled work experience on PGWP, you can apply for PR through Express Entry. Additional points for Canadian education, French language, and provincial nomination (PNP)."
          }
        }
      ]
    }
  ]
};

export default function StudyInCanadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-red-600 dark:hover:text-red-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/" className="hover:text-red-600 dark:hover:text-red-400">Study Abroad</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">Study in Canada</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-red-900 via-red-800 to-rose-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                September 2026 & January 2026 Intake Open
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Study in Canada 2026<br />
                <span className="text-red-300">Complete Guide for Indian Students</span>
              </h1>
              <p className="text-xl text-red-100 mb-8">
                SDS visa, PGWP work permit, and clear PR pathway. Your gateway to Canadian education and permanent residency.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://ai.eecglobal.com/careercounselor" className="bg-white text-red-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
                  Calculate PR Points
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">₹15-40L</div>
                <div className="text-red-300">Total Cost (2 Years)</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">3 Years</div>
                <div className="text-red-300">PGWP Work Rights</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">90%+</div>
                <div className="text-red-300">PR Success Rate</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">CAD 60K+</div>
                <div className="text-red-300">Avg Starting Salary</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-l-4 border-red-500 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">Quick Answer: Cost of Studying in Canada for Indian Students</h2>
                <p className="text-red-800 dark:text-red-200">
                  <strong>Total cost for 2-year program: ₹15-40 Lakhs</strong>. This includes tuition (₹10-25 Lakhs), living expenses (₹8-12 Lakhs/year), and GIC/visa fees. 
                  Canadian colleges offer programs at ₹10-16 Lakhs for 2 years, making Canada 30-50% cheaper than USA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <section id="why-canada" className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Study in Canada?</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Canada is the #1 destination for Indian students seeking permanent residency. With clear PR pathways, affordable education, and excellent quality of life, here's why Canada stands out:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">🇨🇦</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">Clear PR Pathway</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">90%+ success rate through Express Entry after 1 year work experience. No lottery system like USA H1B.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">💰</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">Affordable Education</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">30-50% cheaper than USA. Colleges offer quality programs at ₹10-16L for 2 years.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">💼</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">3-Year PGWP</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">2-year programs grant 3-year Post-Graduation Work Permit. Work for any employer, any sector.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">Family-Friendly</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Spouse gets open work permit. Children study for free in public schools. Family can immigrate together.</p>
                </div>
              </div>
            </section>

            <section id="sds-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">SDS Visa Process: Step-by-Step</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Get Admission to DLI", desc: "Apply to Designated Learning Institution (DLI) and receive Letter of Acceptance." },
                  { step: 2, title: "Pay First Year Tuition", desc: "Pay first year tuition fees and get receipt from the institution." },
                  { step: 3, title: "Purchase GIC (CAD 20,635)", desc: "Buy Guaranteed Investment Certificate from approved Canadian bank (Scotia, CIBC, etc.)." },
                  { step: 4, title: "Take IELTS (6.0+ all bands)", desc: "Score minimum 6.0 in each band (Reading, Writing, Listening, Speaking)." },
                  { step: 5, title: "Apply Online via IRCC Portal", desc: "Submit study permit application online with all documents. Processing: 20 days (SDS) vs 8-12 weeks (regular)." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">{item.step}</div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-gradient-to-br from-red-600 to-rose-700 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4">🚀 Free AI Tools for Canada</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://ai.eecglobal.com/careercounselor" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition">
                      <span className="text-xl">📊</span>
                      <span>PR Points Calculator</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

