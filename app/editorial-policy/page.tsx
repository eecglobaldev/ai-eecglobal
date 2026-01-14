import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Editorial Policy | AI + Human Expert Review | EEC Global',
  description: 'EEC\'s transparent approach to AI-assisted content creation. Every insight is audited by our Senior Council against the Consular Protocol™. Learn how we combine AI efficiency with human expertise.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://eecglobal.com/editorial-policy',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Editorial Policy - AI + Human Expert Review",
  "description": "EEC's transparent approach to AI-assisted content creation with human expert oversight",
  "url": "https://eecglobal.com/editorial-policy",
  "publisher": {
    "@type": "Organization",
    "@id": "https://eecglobal.com/#organization"
  },
  "about": {
    "@type": "Thing",
    "name": "Editorial Standards",
    "description": "AI-assisted content with human expert review"
  }
};

export default function EditorialPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm mb-6">
            <span>🔬</span>
            <span>Transparency in AI-Assisted Content</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Editorial Policy
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            How EEC combines advanced AI analysis with human expertise to deliver
            accurate, trustworthy guidance for international students.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center">📋</span>
              Our Commitment to Accuracy
            </h2>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              At EEC, we believe in harnessing the power of artificial intelligence while maintaining
              the irreplaceable value of human expertise. Our content reflects this philosophy:
            </p>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-blue-100 dark:border-blue-900">
              <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong>AI-Powered Analysis:</strong> EEC uses advanced AI to analyze consular data,
                    immigration patterns, and admission trends across 50+ countries and 5,000+ universities.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong>Human Expert Review:</strong> Every insight, recommendation, and article is
                    audited by our <strong>Senior Council</strong> against EEC's proprietary
                    <strong>Consular Protocol™</strong>—a framework built on 28 years of real-world experience.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong>Transparent Attribution:</strong> All AI-assisted content is clearly labeled
                    and identifies the expert reviewer responsible for accuracy verification.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center">⚖️</span>
            The Consular Protocol™
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our proprietary review framework ensures every piece of content meets the same standards
            that consular officers and immigration authorities apply:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xl mb-3">📊</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Data Verification</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Cross-referenced against official embassy publications, university requirements,
                and government immigration portals.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xl mb-3">🎯</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Practical Accuracy</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Validated against real student outcomes from our network of 100,000+ guided applicants.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xl mb-3">🔄</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Currency Check</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Verified for relevance to current intake cycles, fee structures, and policy changes.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center">👥</span>
            The Senior Council
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our expert reviewers bring decades of combined experience across global education,
            financial compliance, and visa strategy:
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/assets/Amit-Jalan.jpeg" alt="Amit Jalan" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Amit Jalan</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Managing Director | Purdue University Alumnus</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    28+ years in international education. Lead AI Strategist overseeing global admissions
                    content for US Ivy League, UK Russell Group, and European public universities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">US F1 Visa</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">UK Credibility</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">Global Admissions</span>
                  </div>
                </div>
                <a
                  href="https://in.linkedin.com/in/amitjalan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline self-start"
                >
                  LinkedIn →
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/assets/Madhav-Gupta.jpeg" alt="CA Madhav Gupta" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">CA Madhav Gupta</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Director | Chartered Accountant (ICAI 421209)</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    15+ years in global financial compliance. Reviews all content related to visa financials,
                    including German Blocked Accounts, NZ FTS, US I-20, and Canada GIC requirements.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">Financial Compliance</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">Source of Funds</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">Cross-Border Finance</span>
                  </div>
                </div>
                <a
                  href="https://in.linkedin.com/in/madhav-gupta-9027781a7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline self-start"
                >
                  LinkedIn →
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/assets/mohita-gupta.jpeg" alt="Mohita Gupta" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Mohita Gupta</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">VP Counselling Services | Ex-Citibank Global</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    Global visa strategy expert specializing in high-stakes interviews. Reviews content
                    related to US F1 refusals, UK credibility interviews, and Australian GS assessments.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs">Visa Interviews</span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs">Refusal Recovery</span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs">High-Risk Profiles</span>
                  </div>
                </div>
                <a
                  href="https://in.linkedin.com/in/mohita-gupta-233383339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline self-start"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center">🏷️</span>
            How We Label AI-Assisted Content
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Every article, guide, or tool output that uses AI assistance displays a visible
            review badge at the top of the page:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Example review badge:</p>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Expert Reviewed</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Fact-checked by <Link href="/author/ca-madhav-gupta" className="font-bold underline">CA Madhav Gupta</Link>
                      {' '}on Dec 23, 2026
                    </p>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs text-emerald-700 dark:text-emerald-300">
                    <span>🇦🇺</span>
                    <span>Grounded in official Australian consular data</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Clicking the reviewer's name links to their full profile, where you can verify their
            credentials and areas of expertise.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-slate-700 text-white rounded-xl flex items-center justify-center">📚</span>
            Our Data Sources
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our AI systems are trained on and continuously updated from authoritative sources:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">🇺🇸 United States</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• U.S. Department of State (travel.state.gov)</li>
                <li>• USCIS Official Policy Manuals</li>
                <li>• SEVIS/SEVP Guidelines</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">🇬🇧 United Kingdom</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• UK Home Office Immigration Rules</li>
                <li>• UKVI Official Guidance</li>
                <li>• British Council Partner Data</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">🇨🇦 Canada</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• IRCC Official Guidelines</li>
                <li>• Provincial Nominee Programs</li>
                <li>• DLI Institution Data</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">🇦🇺 Australia</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Department of Home Affairs</li>
                <li>• CRICOS Provider Register</li>
                <li>• Genuine Student (GS) Guidelines</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">🇩🇪 Germany & EU</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• DAAD Official Publications</li>
                <li>• Anabin Database</li>
                <li>• Uni-Assist Guidelines</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">🌍 Global</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• QS World University Rankings</li>
                <li>• Times Higher Education Data</li>
                <li>• EEC's 28-Year Outcome Database</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Editorial Process?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            We're committed to transparency. If you have questions about how we create and verify
            our content, reach out to our editorial team.
          </p>
          <a
            href="mailto:editorial@eecglobal.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-colors"
          >
            ✉️ Contact Editorial Team
          </a>
        </section>
      </main>
    </>
  );
}








