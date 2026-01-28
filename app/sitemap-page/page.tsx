import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap | EEC AI Tools - Complete Site Navigation',
  description: 'Complete sitemap of EEC AI Tools - Find all study abroad guides, AI tools, country information, branch locations, and resources.',
  alternates: {
    canonical: 'https://ai.eecglobal.com/sitemap-page/',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "EEC AI Tools Sitemap",
  "description": "Complete navigation directory for EEC AI Tools platform",
  "url": "https://ai.eecglobal.com/sitemap-page",
  "isPartOf": { "@id": "https://ai.eecglobal.com/#website" }
};

export default function SitemapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="bg-slate-900 dark:bg-slate-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-2">›</span> <span className="text-white">Sitemap</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">Site Map</h1>
          <p className="text-slate-300">Complete navigation directory for EEC AI Tools</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
              <span>🤖</span> AI Tools
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/usavisaprep/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → USA F1 Visa Mock Interview
                </Link>
              </li>
              <li>
                <Link href="/australiagsprep/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → Australia GS Prep AI
                </Link>
              </li>
              <li>
                <Link href="/ukprecas/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → UK Credibility Interview Prep
                </Link>
              </li>
              <li>
                <Link href="/nzvisaprep/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → New Zealand Visa Prep
                </Link>
              </li>
              <li>
                <a href="https://germany.eecglobal.com/public/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                  → German Grade Calculator
                </a>
              </li>
              <li>
                <a href="https://australia.eecglobal.com/prpointscalculator" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                  → Australia PR Points Calculator
                </a>
              </li>
              <li>
                <Link href="/careercounselor/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → Career Counselor AI
                </Link>
              </li>
              <li>
                <Link href="/travelagent/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → Travel Agent & Visa Checker
                </Link>
              </li>
              <li>
                <Link href="/review/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  → AI Testimonial Coach
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
              <span>🌍</span> Country Guides
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/hub/study-in-usa" className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                  → Study in USA 2026
                </Link>
                <ul className="ml-4 mt-2 space-y-1 text-sm">
                  <li><Link href="/glossary/f1-visa" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• F1 Visa Explained</Link></li>
                  <li><Link href="/guides/214b-refusal-recovery" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• 214(b) Recovery Guide</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/hub/study-in-canada" className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                  → Study in Canada 2026
                </Link>
              </li>
              <li>
                <Link href="/hub/study-in-uk" className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                  → Study in UK 2026
                </Link>
              </li>
              <li>
                <Link href="/hub/study-in-australia" className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                  → Study in Australia 2026
                </Link>
                <ul className="ml-4 mt-2 space-y-1 text-sm">
                  <li><Link href="/guides/australia-gs-guide" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• GS Test Guide 2026-2027</Link></li>
                  <li><Link href="/glossary/genuine-student-test" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• GS Glossary</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/hub/study-in-germany" className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                  → Study in Germany 2026
                </Link>
                <ul className="ml-4 mt-2 space-y-1 text-sm">
                  <li><Link href="/guides/german-grade-guide" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• Grade Conversion Guide</Link></li>
                  <li><Link href="/guides/germany-blocked-account-guide" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• Blocked Account Guide</Link></li>
                  <li><Link href="/glossary/blocked-account" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• Blocked Account Glossary</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/hub/study-in-ireland" className="text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium">
                  → Study in Ireland 2026
                </Link>
                <ul className="ml-4 mt-2 space-y-1 text-sm">
                  <li><Link href="/news/ireland-2026-employment-permit-update" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400">• 2026 Employment Update</Link></li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
              <span>📖</span> Glossary
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/glossary/f1-visa" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400">→ What is F1 Visa?</Link></li>
              <li><Link href="/glossary/genuine-student-test" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400">→ What is Genuine Student (GS)?</Link></li>
              <li><Link href="/glossary/blocked-account" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400">→ What is Blocked Account?</Link></li>
              <li><Link href="/glossary" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium">→ View Full Glossary</Link></li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
              <span>⚖️</span> Comparisons
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compare/usa-vs-canada" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400">→ USA vs Canada for Indian Students</Link></li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <span>🏢</span> Branch Locations
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Vadodara (4)</h3>
                <ul className="space-y-1 ml-2">
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Alkapuri (HQ)</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Nizampura</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Manjalpur</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC New VIP Road</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Ahmedabad (8)</h3>
                <ul className="space-y-1 ml-2">
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Memnagar</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Ghatlodiya</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Nikol</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Chandkheda</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Maninagar</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Odhav</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Bapunagar</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Naroda</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Surat (5)</h3>
                <ul className="space-y-1 ml-2">
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Parvat Patia</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Mota Varachha</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Katargam</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Ghod Dod Road</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Vesu</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Other Cities (9)</h3>
                <ul className="space-y-1 ml-2">
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Nadiad</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Anand (V.V. Nagar)</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Vapi</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Navsari</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Bharuch</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Mehsana</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Kalol</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Himatnagar</a></li>
                  <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" target="_blank" rel="noopener noreferrer">• EEC Visnagar</a></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-2">
              <span>ℹ️</span> About & Trust
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">→ About EEC</Link></li>
              <li><Link href="/editorial-policy" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">→ Editorial Policy</Link></li>
              <li><Link href="/author/ca-madhav-gupta" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">→ CA Madhav Gupta - Financial Expert</Link></li>
              <li><a href="https://eecglobal.com/locations" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" target="_blank" rel="noopener noreferrer">→ Contact Us</a></li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <span>📚</span> Expert Guides
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides/australia-gs-guide" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">→ Australia GS Guide 2026-2027</Link></li>
              <li><Link href="/guides/german-grade-guide" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">→ German Grade Calculator Guide</Link></li>
              <li><Link href="/guides/germany-blocked-account-guide" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">→ Germany Blocked Account Guide</Link></li>
              <li><Link href="/guides/214b-refusal-recovery" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">→ 214(b) Refusal Recovery</Link></li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

