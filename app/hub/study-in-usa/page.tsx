import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study in USA 2026 for Indian Students | Complete Guide | EEC',
  description: 'Complete guide to study in USA for Indian students 2026. F1 visa process, top universities, costs (₹25-80 Lakhs), scholarships, OPT/CPT work rights, and STEM courses. AIRC certified guidance.',
  keywords: ['study in USA', 'USA student visa', 'F1 visa India', 'MS in USA', 'MBA in USA', 'US universities for Indian students', 'OPT', 'CPT', 'STEM OPT extension', 'GRE requirements', 'TOEFL IELTS USA'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/hub/study-in-usa',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ai.eecglobal.com/hub/study-in-usa#webpage",
      "url": "https://ai.eecglobal.com/hub/study-in-usa",
      "name": "Study in USA 2026 for Indian Students | Complete Guide",
      "description": "Comprehensive guide covering F1 visa, universities, costs, scholarships, and career pathways for Indian students",
      "isPartOf": {"@id": "https://ai.eecglobal.com/#website"},
      "datePublished": "2024-01-01",
      "dateModified": "2026-01-01",
      "author": {"@id": "https://eecglobal.com/team/amit-jalan#person"},
      "breadcrumb": {"@id": "https://ai.eecglobal.com/hub/study-in-usa#breadcrumb"}
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ai.eecglobal.com/hub/study-in-usa#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://ai.eecglobal.com/"},
        {"@type": "ListItem", "position": 2, "name": "Study Abroad", "item": "https://ai.eecglobal.com/"},
        {"@type": "ListItem", "position": 3, "name": "Study in USA", "item": "https://ai.eecglobal.com/hub/study-in-usa"}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the total cost of studying in USA for Indian students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The total cost ranges from ₹25-80 Lakhs for a 2-year MS program, including tuition (₹15-50 Lakhs), living expenses (₹8-15 Lakhs/year), health insurance (₹1-2 Lakhs/year), and miscellaneous costs. Public universities in states like Texas and Ohio are more affordable than private universities in California or New York."
          }
        },
        {
          "@type": "Question",
          "name": "Is GRE mandatory for MS in USA 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GRE is NOT mandatory for many US universities in 2026. Over 500+ universities now accept applications without GRE, including some top schools like MIT (program-specific), Cornell, and many state universities. However, a strong GRE score (320+) can strengthen applications for competitive programs."
          }
        },
        {
          "@type": "Question",
          "name": "How long is the F1 visa interview?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The F1 visa interview typically lasts only 2-3 minutes. The visa officer asks about your academic background, university choice, funding sources, and post-graduation plans. Practice with EEC's AI Mock Interview tool to prepare for rapid-fire questions."
          }
        }
      ]
    }
  ]
};

export default function StudyInUSAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Study Abroad</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-slate-800 dark:text-slate-200 font-medium">Study in USA</li>
          </ol>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Fall 2026 & Spring 2026 Applications Open
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Study in USA 2026<br />
                <span className="text-blue-300">Complete Guide for Indian Students</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                From F1 visa to job placement — everything you need to know about pursuing higher education in the United States. Based on 28 years of EEC's consular expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/usa-f1-visa" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Try Free AI Tools
                </a>
                <a href="#cost-calculator" className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                  Calculate Costs
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">1.1M+</div>
                <div className="text-blue-300">Indian Students in USA</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">₹25-80L</div>
                <div className="text-blue-300">Total Cost (2 Years)</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">3 Years</div>
                <div className="text-blue-300">STEM Work Rights</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">$75K+</div>
                <div className="text-blue-300">Avg Starting Salary</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-l-4 border-blue-500 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Quick Answer: Cost of Studying in USA for Indian Students</h2>
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Total cost for MS in USA: ₹25-80 Lakhs</strong> (2 years). This includes tuition (₹15-50 Lakhs), living expenses (₹8-15 Lakhs/year), and SEVIS/visa fees (~₹50,000). 
                  Public universities in Texas, Ohio, and Arizona offer tuition under ₹20 Lakhs/year. Scholarships can reduce costs by 20-50%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <section id="why-usa" className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Study in USA?</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                The United States hosts the largest number of international students globally, with over 1.1 million Indian students choosing US universities in 2024. Here's why USA remains the #1 destination:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">🏆</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">World-Class Universities</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">8 of the top 10 global universities are in USA. MIT, Stanford, Harvard, and Caltech lead in research and innovation.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">💼</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">STEM OPT (3-Year Work)</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">STEM graduates can work for up to 3 years after graduation, providing time to secure H1B sponsorship.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">💰</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">Highest ROI</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Average MS graduate earns $75,000-$120,000/year. Investment recovery in 2-3 years.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="text-2xl mb-2">🌐</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">Global Network</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Access to Silicon Valley, Wall Street, and Fortune 500 companies. Strong Indian alumni network.</p>
                </div>
              </div>
            </section>

            <section id="f1-visa" className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">F1 Visa Process: Step-by-Step</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Get University Admission & I-20", desc: "Apply to SEVP-certified universities. Once admitted, receive Form I-20 from the university." },
                  { step: 2, title: "Pay SEVIS Fee ($350)", desc: "Pay the I-901 SEVIS fee at fmjfee.com. Keep the receipt for your interview." },
                  { step: 3, title: "Complete DS-160 Online", desc: "Fill the DS-160 application at ceac.state.gov. Takes 60-90 minutes. Save confirmation number." },
                  { step: 4, title: "Pay Visa Fee ($185) & Schedule Interview", desc: "Pay MRV fee online and book appointment at US Embassy (Mumbai, Delhi, Chennai, Hyderabad, Kolkata)." },
                  { step: 5, title: "Attend Visa Interview", desc: "2-3 minute interview. Be prepared for questions about: Why this university? How will you fund? What are your plans after graduation?" }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">{item.step}</div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-700 p-6 rounded-xl text-white">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🤖</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Practice F1 Interview with AI</h3>
                    <p className="text-indigo-100 mb-4">Our AI Visa Officer simulates real interview conditions. Get scored on clarity, confidence, and content.</p>
                    <a href="/usa-f1-visa" className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition">
                      Start Free Practice →
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-4">🚀 Free AI Tools for USA</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/usa-f1-visa" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition">
                      <span className="text-xl">🎤</span>
                      <span>F1 Visa Mock Interview</span>
                    </a>
                  </li>
                  <li>
                    <a href="/career-counselor" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition">
                      <span className="text-xl">💼</span>
                      <span>Career ROI Calculator</span>
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

