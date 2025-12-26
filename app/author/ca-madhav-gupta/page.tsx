import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CA Madhav Gupta | Visa Financial Forensics Expert | Student Visa Financial Audit',
  description: 'CA Madhav Gupta (ICAI 421209) is India\'s foremost expert on visa financial compliance. 15+ years auditing student finances for US, Canada, UK, Australia & Germany visas. Director at EEC, specializing in Source of Funds verification.',
  keywords: ['Chartered Accountant Visa Consultant', 'Funds Verification Australia', 'Student Visa Financial Audit', 'CA for visa', 'source of funds visa', 'German blocked account expert', 'I-20 financial proof', 'visa financial compliance'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/author/ca-madhav-gupta',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ai.eecglobal.com/author/ca-madhav-gupta#person",
  "name": "CA Madhav Gupta",
  "givenName": "Madhav",
  "familyName": "Gupta",
  "honorificPrefix": "CA",
  "jobTitle": "Director & Chartered Accountant",
  "description": "India's leading Visa Financial Forensics Expert. Chartered Accountant specializing in auditing student financial documents for international visa applications.",
  "image": "/assets/Madhav-Gupta.jpeg",
  "url": "https://ai.eecglobal.com/author/ca-madhav-gupta",
  "worksFor": {
    "@type": "Organization",
    "name": "Enbee Education Center",
    "url": "https://eecglobal.com"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Chartered Accountant (CA)",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Institute of Chartered Accountants of India",
        "url": "https://www.icai.org"
      },
      "identifier": "421209"
    }
  ]
};

export default function CAMadhavGuptaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/about" className="hover:text-white">About Us</Link>
            <span className="mx-2">›</span>
            <span className="text-blue-300">CA Madhav Gupta</span>
          </nav>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <img src="/assets/Madhav-Gupta.jpeg"
                alt="CA Madhav Gupta" className="rounded-2xl w-full h-full object-cover" />
              </div>
              <div className="bg-amber-100 dark:bg-amber-900 px-4 py-2 rounded-full text-amber-800 dark:text-amber-200 font-semibold text-sm text-center mt-4">
                CA (ICAI) • Member No. 421209
              </div>
            </div>
            
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm mb-4">
                <span>🔬</span>
                <span>Visa Financial Forensics</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                CA Madhav Gupta
              </h1>
              
              <p className="text-xl text-blue-200 mb-6">
                Director & Chartered Accountant<br />
                <span className="text-white">Enbee Education Center</span>
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
                <div>
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-slate-400">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">50,000+</p>
                  <p className="text-slate-400">Files Audited</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-slate-400">Financial Clearance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            The Visa Financial Forensics Expert
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            When embassies scrutinize your funds, CA Madhav Gupta has already audited them 
            with the same rigour—ensuring your application is bulletproof before it ever 
            leaves your hands.
          </p>
        </div>

        <article className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            In the high-stakes world of international student visas, where a single inconsistency 
            in financial documents can result in a devastating rejection, <strong>CA Madhav Gupta</strong> 
            has carved out a unique and indispensable niche: <em>Visa Financial Forensics</em>.
          </p>
          
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            As a <strong>Chartered Accountant</strong> certified by the Institute of Chartered Accountants 
            of India (ICAI) since 2012 (Membership No. 421209), Madhav brings the same forensic rigour 
            to student visa applications that corporate auditors bring to billion-dollar balance sheets. 
            His methodology is simple yet transformative: <strong>audit the file before the embassy does</strong>.
          </p>

          <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Expertise Across Global Financial Matrices
          </h3>
          
          <ul className="text-slate-700 dark:text-slate-300 space-y-3">
            <li>
              <strong>🇩🇪 Germany:</strong> Expert in <em>Sperrkonto</em> (Blocked Account) structuring, 
              ensuring €11,904 is correctly deposited and documented for visa officers.
            </li>
            <li>
              <strong>🇳🇿 New Zealand:</strong> Navigates the complex <em>Financial Threshold Scheme (FTS)</em>, 
              ensuring funds meet the NZ$20,000+ threshold with proper evidence.
            </li>
            <li>
              <strong>🇺🇸 United States:</strong> Prepares airtight <em>I-20 financial affidavits</em> that 
              withstand consular scrutiny, cross-referencing bank statements, ITRs, and sponsor declarations.
            </li>
            <li>
              <strong>🇨🇦 Canada:</strong> Structures <em>GIC investments</em> and tuition payment proofs 
              to meet IRCC's stringent "Genuine Intent to Leave" financial markers.
            </li>
            <li>
              <strong>🇦🇺 Australia:</strong> Audits files for the new <em>Genuine Student (GS)</em> 
              financial requirements, ensuring 12 months of living costs are demonstrable.
            </li>
            <li>
              <strong>🇮🇪 Ireland:</strong> Verifies €10,000+ evidence aligned with Irish Naturalisation 
              and Immigration Service (INIS) standards.
            </li>
          </ul>
        </article>

        <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-serif font-bold mb-6 text-center">
            Credentials & Affiliations
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-bold text-amber-300 mb-3">Professional Certification</h4>
              <p className="text-white font-medium">Chartered Accountant (CA)</p>
              <p className="text-slate-300 text-sm">Institute of Chartered Accountants of India</p>
              <p className="text-slate-400 text-sm mt-2">Membership No: 421209 | Since 2012</p>
              <a 
                href="https://www.icai.org/member/421209"
                target="_blank"
                className="inline-block mt-3 text-blue-300 text-sm hover:underline"
              >
                Verify on ICAI Website →
              </a>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-bold text-amber-300 mb-3">Current Position</h4>
              <p className="text-white font-medium">Director</p>
              <p className="text-slate-300 text-sm">Enbee Education Center Private Limited</p>
              <p className="text-slate-400 text-sm mt-2">AIRC Certified | 28 Years of Excellence</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

