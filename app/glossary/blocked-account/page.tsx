import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Germany Blocked Account 2026: €11,904 Requirement Explained | EEC',
  description: 'The Germany blocked account (Sperrkonto) amount for 2026 is €11,904. Learn about Expatrio, Fintiba, opening process, and financial proof requirements for German student visa.',
  keywords: ['blocked account Germany', 'Sperrkonto', 'German blocked account', 'Expatrio', 'Fintiba', 'Germany student visa financial proof'],
  alternates: {
    canonical: 'https://ai.eecglobal.com/glossary/blocked-account',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "@id": "https://ai.eecglobal.com/glossary/blocked-account#definition",
      "name": "Blocked Account (Sperrkonto)",
      "alternateName": ["Sperrkonto", "German Blocked Account", "Germany Blocked Account"],
      "description": "A Sperrkonto (blocked account) is a mandatory financial requirement for German student visas. For 2026, applicants must deposit €11,904 (€992 per month × 12 months) into a blocked account with approved providers like Expatrio or Fintiba. The funds are released monthly to cover living expenses in Germany.",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "EEC Study Abroad Glossary",
        "url": "https://ai.eecglobal.com/glossary"
      },
      "termCode": "BLOCKED-ACCT-DE"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Germany blocked account amount for 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Germany blocked account (Sperrkonto) amount for 2026 is €11,904. This represents monthly living expenses of €992 multiplied by 12 months. The requirement was increased from €11,208 (€934/month) in January 2024."
          }
        },
        {
          "@type": "Question",
          "name": "Which blocked account provider is best: Expatrio or Fintiba?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both Expatrio and Fintiba are approved blocked account providers. Expatrio has a €49 setup fee and 2-3 day processing, making it best for speed. Fintiba has an €89 fee but includes health insurance bundles, making it better for combined services."
          }
        }
      ]
    }
  ]
};

export default function BlockedAccountPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-yellow-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/glossary" className="hover:text-white">Glossary</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Blocked Account</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🇩🇪</span>
            <h1 className="text-3xl font-bold">Blocked Account (Sperrkonto)</h1>
          </div>
          <p className="text-yellow-100">Financial proof requirement for German student visa</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-xl p-6 mb-8 border-l-4 border-yellow-500">
          <div className="text-xs text-yellow-700 dark:text-yellow-400 font-medium uppercase tracking-wide mb-2">📖 Definition</div>
          <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed">
            A <strong>blocked account (Sperrkonto)</strong> is a mandatory financial requirement for German student visas. 
            For <strong>2026</strong>, applicants must deposit <strong>€11,904</strong> 
            (€992 per month × 12 months) into a blocked account with approved providers like 
            <strong> Expatrio</strong> or <strong>Fintiba</strong>. The funds are released monthly 
            to cover living expenses in Germany.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-yellow-400 p-6 mb-8 text-center">
          <div className="text-6xl font-bold text-yellow-600 dark:text-yellow-500 mb-2">€11,904</div>
          <div className="text-slate-600 dark:text-slate-300">Blocked Account Amount for 2026</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            = €992/month × 12 months | ≈ ₹10,71,360 INR at ₹90/EUR
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">Quick Facts: Germany Blocked Account</h2>
          <dl className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">German Name</dt>
              <dd className="font-medium text-slate-800 dark:text-white">Sperrkonto</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">2026 Amount</dt>
              <dd className="font-medium text-slate-800 dark:text-white">€11,904 (€992/month)</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Fastest Provider</dt>
              <dd className="font-medium text-slate-800 dark:text-white">Expatrio (2-3 days)</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">INR Equivalent (Jan 2026)</dt>
              <dd className="font-medium text-slate-800 dark:text-white">≈ ₹10,71,360</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Need Help with Your Germany Visa?</h2>
          <p className="text-yellow-100 mb-4">
            EEC's Germany desk has helped <strong>3,500+ Indian students</strong> navigate the 
            blocked account process.
          </p>
          <a href="https://germany.eecglobal.com/public/" 
             className="inline-block bg-white text-yellow-700 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition">
            German Grade Calculator →
          </a>
        </div>
      </main>
    </>
  );
}

