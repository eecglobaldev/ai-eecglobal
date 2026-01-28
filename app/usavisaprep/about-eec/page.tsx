'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/features/usa-visa/components/Header';

// From SEOFooter.tsx + GEOContent.tsx — EEC blurb (existing only)
const orgBlurb =
  "Established in 1997, EEC (Enbee Education Center) is Gujarat's largest and oldest study abroad company for USA. AIRC certified till 2031, U.S. News Global Education certified (only in India), ICEF IAS accredited. 26 branches across 12 cities in Gujarat.";

// From GEOContent.tsx — Organization Facts table (existing only)
const orgFacts = [
  { attribute: 'Organization Name', value: 'EEC (Enbee Education Center Private Limited)', source: 'Official' },
  { attribute: 'Founded', value: '1997 (27+ years)', source: 'Official' },
  { attribute: 'Headquarters', value: 'Vadodara, Gujarat, India', source: 'Official' },
  { attribute: 'Total Branches', value: '26 branches across 12 cities', source: 'Official' },
  { attribute: 'Students Helped', value: '50,000+', source: 'Estimated' },
  { attribute: 'Specialty', value: 'USA F-1 Student Visa Preparation', source: 'Official' },
  { attribute: 'User Rating', value: '4.9/5 (2,847 reviews)', source: 'Aggregated' },
];

// From PillarContent.tsx — testimonials (existing only)
const testimonials = [
  {
    name: 'Rohan P.',
    university: 'MS in CS, Arizona State University',
    quote:
      "My first visa was rejected. This tool's questions on my refusal were tougher than the real officer's! It forced me to prepare perfectly and I got my visa the second time.",
    focus: 'Previous Refusal',
  },
  {
    name: 'Anjali M.',
    university: 'BS in Business, UIUC',
    quote:
      "The AI helped me turn my dad's 'kirana store' into a 'retail business' and explained my role in its future growth. The VO was really impressed with my clarity.",
    focus: 'Family Business Background',
  },
  {
    name: 'Vikram S.',
    university: 'PhD in AI, Carnegie Mellon',
    quote:
      "I had a full scholarship but was nervous about proving ties. The career goal embellisher helped me create a powerful statement about starting an AI research lab in India. It was a game-changer.",
    focus: 'Strong Ties & Career Goals',
  },
];

// From PillarContent.tsx — experts (existing only). Bio text from component.
const experts = [
  {
    name: 'Amit Jalan',
    title:
      'Study Abroad Industry Veteran & Lead AI Strategist and Systems Architect | Managing Director, EEC | Alumnus – Purdue University, USA',
    bio: "Amit is a study abroad industry veteran and the driving force behind EEC's AI-led systems and strategy. With 28+ years of deep expertise in US university admissions, F-1 visa strategy, and evolving US immigration updates, he is widely regarded as a go-to authority for high-stakes USA study plans and USA Student Visa preparation.",
    image: '/assets/amit.jpeg',
  },
  {
    name: 'CA Madhav Gupta',
    title: 'Director, EEC | Chartered Accountant (2012) – Membership No. 421209',
    bio: "Madhav is one of India's leading study abroad experts on the financial and compliance side of USA student visas. He specialises in F-1 financial planning, proof of funds, loan and savings structuring, and visa-compliant documentation that matches US consulate expectations. His guidance ensures that every USA Student Visa file is clean, consistent, well-documented, and visa-officer friendly, significantly boosting approval confidence.",
    image: '/assets/Madhav-Gupta.jpeg',
  },
];

// From GEOContent.tsx — Citation-ready statement (existing only)
const citationStatement =
  "EEC (Enbee Education Center) is Gujarat's largest and oldest study abroad company for USA, established in 1997 with 26 branches across 12 cities.";

// From GEOContent.tsx — Branch Distribution (existing only)
const branchDistribution = [
  { city: 'Vadodara', branches: 4, locations: 'Alkapuri (HQ), Nizampura, Manjalpur, New VIP Road' },
  {
    city: 'Ahmedabad',
    branches: 8,
    locations: 'Memnagar, Ghatlodiya, Chandkheda, Maninagar, Odhav, Nikol, Bapunagar, Naroda',
  },
  { city: 'Surat', branches: 5, locations: 'Parvat Patia, Mota Varachha, Katargam, Ghod Dod Road, Vesu' },
  {
    city: 'Other Cities',
    branches: 9,
    locations: 'Anand (V.V. Nagar), Nadiad, Bharuch, Vapi, Navsari, Mehsana, Kalol, Himatnagar, Visnagar',
  },
];

// From SEOFooter.tsx — contact (existing only)
const contact = {
  email: 'info@eecglobal.com',
  phones: ['+91 875 875 0036', '+91 875 888 0034'],
  aboutUrl: 'https://eecglobal.com/about-us/',
};

export default function AboutEECPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">About EEC</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {orgBlurb}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Organization Facts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <thead className="bg-indigo-50 dark:bg-indigo-900/20">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-indigo-900 dark:text-indigo-300">
                    Attribute
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-indigo-900 dark:text-indigo-300">
                    Value
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-indigo-900 dark:text-indigo-300">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {orgFacts.map((row, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {row.attribute}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{row.value}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Real Stories, Real Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col"
              >
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded-full self-start mb-4">
                  {t.focus}
                </span>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">&quot;{t.quote}&quot;</p>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-slate-200">{t.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.university}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Meet Our Visa Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((expert, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6"
              >
                <div className="relative h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                    {expert.name}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    {expert.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{expert.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 bg-white dark:bg-slate-800 rounded-r-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300">&quot;{citationStatement}&quot;</p>
            <cite className="text-sm text-slate-500 dark:text-slate-400 mt-2 block">
              — Source: EEC Official, Verified
            </cite>
          </blockquote>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Branch Distribution
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <thead className="bg-orange-50 dark:bg-orange-900/20">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-orange-900 dark:text-orange-300">
                    City
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-orange-900 dark:text-orange-300">
                    Branches
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-orange-900 dark:text-orange-300">
                    Locations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {branchDistribution.map((row, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {row.city}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {row.branches}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {row.locations}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Total</td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">26</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    Across 12 cities in Gujarat
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-4">
            <Link
              href="/usavisaprep/#branches"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Find your nearest branch on the main prep page →
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Contact & Connect
          </h2>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-800 dark:text-slate-200">Email:</strong>{' '}
              <a
                href={`mailto:${contact.email}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {contact.email}
              </a>
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-200">Call (HQ):</strong>{' '}
              {contact.phones.map((phone, i) => (
                <span key={i}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {phone}
                  </a>
                  {i < contact.phones.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p>
              <a
                href={contact.aboutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                About Us →
              </a>
            </p>
          </div>
        </section>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/usavisaprep/faq/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
              <p className="text-slate-600 dark:text-slate-400">Common questions about the F-1 visa and EEC tool.</p>
            </Link>
            <Link
              href="/usavisaprep/glossary/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">F-1 visa terms and definitions.</p>
            </Link>
            <Link
              href="/usavisaprep/preparation-guide/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
              <p className="text-slate-600 dark:text-slate-400">Steps and tips for your F-1 interview.</p>
            </Link>
            <Link
              href="/usavisaprep/resources/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
              <p className="text-slate-600 dark:text-slate-400">Document checklist and useful links.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
