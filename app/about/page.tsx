import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About EEC AI Tools | 28 Years of Consular Expertise Digitized | AIRC Certified',
  description: 'EEC AI Tools is backed by Enbee Education Center, Gujarat\'s most trusted overseas education consultancy since 1997. 26 branches, 100,000+ students guided, AIRC certified till 2031. Meet the experts: Amit Jalan (Purdue), CA Madhav Gupta, Mrs. Mohita Gupta.',
  keywords: [
    'EEC',
    'Enbee Education Center',
    'About EEC',
    'AIRC Certified Agency India',
    'Overseas Education Consultants Vadodara',
    'Study Abroad Agents Gujarat',
    'Student Visa Compliance',
    'Amit Jalan EEC',
    'Consular Protocol',
    'Visa Refusal Expert Gujarat',
    'Best Study Abroad Consultants Gujarat'
  ],
  openGraph: {
    title: 'About EEC AI Tools | 28 Years of Expertise, Digitized',
    description: 'Not just another chatbot. EEC AI Tools are built on 100,000+ student consultations, AIRC certified, backed by 26 physical branches across Gujarat. Meet the team behind the technology.',
    type: 'website',
    url: 'https://ai.eecglobal.com/about',
    siteName: 'EEC AI Tools',
    locale: 'en_IN',
    images: [
      {
        url: '/og-about-image.png',
        width: 1200,
        height: 630,
        alt: 'About EEC AI Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EEC AI Tools | 28 Years of Expertise, Digitized',
    description: 'AIRC certified, 26 branches, 100,000+ students. Discover why Gujarat trusts EEC for overseas education.',
    images: ['/twitter-about-image.png'],
  },
  alternates: {
    canonical: 'https://ai.eecglobal.com/about',
  },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "Enbee Education Center",
        "alternateName": ["EEC", "EEC Study Abroad", "EEC Global"],
        "url": "https://eecglobal.com",
        "logo": {
          "@type": "ImageObject",
          "url": "/assets/logos/eeclogo-main.png",
          "width": 200,
          "height": 200
        },
        "image": "/assets/logos/eeclogo-main.png",
        "description": "Enbee Education Center (EEC) is Gujarat's leading overseas education consultancy, established in 1997. With 26 branches across 12 cities and over 100,000 students guided, EEC combines 28 years of consular expertise with cutting-edge AI technology.",
        "foundingDate": "1997",
        "founder": {
          "@type": "Person",
          "name": "Amit Jalan",
          "jobTitle": "Managing Director",
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Purdue University"
          }
        },
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 200
        },
        "areaServed": {
          "@type": "State",
          "name": "Gujarat",
          "containedInPlace": {
            "@type": "Country",
            "name": "India"
          }
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "AIRC Certification",
            "validUntil": "2031",
            "recognizedBy": {
              "@type": "Organization",
              "name": "American International Recruitment Council"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "U.S. News Global Education Certified"
          }
        ],
        "knowsAbout": [
          "Overseas Education Consulting",
          "Student Visa Applications",
          "IELTS Preparation",
          "University Admissions",
          "Study Abroad Counseling",
          "Visa Interview Preparation",
          "Australia PR Applications",
          "USA F-1 Visa",
          "UK Student Visa",
          "Canada Study Permit"
        ],
        "sameAs": [
          "https://www.facebook.com/eecglobal",
          "https://www.instagram.com/eecglobal",
          "https://www.linkedin.com/school/eecindia",
          "https://www.youtube.com/@eecgujarat",
          "https://x.com/eecglobalindia",
          "https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe#acc.3GnypZ6v",
          "https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367",
          "https://www.icef.com/agency/00120000014SG0aAAG"
        ]
      },
      {
        "@type": "AboutPage",
        "@id": "https://ai.eecglobal.com/about#webpage",
        "url": "https://ai.eecglobal.com/about",
        "name": "About EEC AI Tools - 28 Years of Consular Expertise Digitized",
        "description": "Learn about Enbee Education Center's journey from 1997 to becoming Gujarat's most trusted overseas education consultancy with AI-powered tools.",
        "inLanguage": "en-IN",
        "isPartOf": {
          "@id": "https://ai.eecglobal.com/#website"
        },
        "about": {
          "@id": "https://eecglobal.com/#organization"
        },
        "mainEntity": {
          "@id": "https://eecglobal.com/#organization"
        }
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/team/amit-jalan",
        "name": "Amit Jalan",
        "jobTitle": "Managing Director",
        "worksFor": {
          "@id": "https://eecglobal.com/#organization"
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Purdue University",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "West Lafayette",
            "addressRegion": "Indiana",
            "addressCountry": "USA"
          }
        },
        "knowsAbout": ["Overseas Education", "International Student Recruitment", "EdTech"],
        "description": "Managing Director of EEC with 28+ years of experience in overseas education consulting. Purdue University alumnus leading Gujarat's most trusted study abroad consultancy."
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/team/madhav-gupta",
        "name": "CA Madhav Gupta",
        "jobTitle": "Director, Financial Forensics",
        "worksFor": {
          "@id": "https://eecglobal.com/#organization"
        },
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Chartered Accountant"
        },
        "knowsAbout": ["Financial Forensics", "Visa Documentation", "Tax Compliance for Students"],
        "description": "Pioneer of the Consular Protocol™ audit system for visa-compliant financial documentation. Expert in the intersection of Indian family finances and international visa requirements."
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/team/mohita-gupta",
        "name": "Mohita Gupta",
        "jobTitle": "Vice President, Visa Strategy",
        "worksFor": {
          "@id": "https://eecglobal.com/#organization"
        },
        "knowsAbout": ["Visa Refusal Prevention", "Consular Affairs", "Appeal Strategies"],
        "description": "Leading authority on visa refusal prevention with 15+ years of experience in consular affairs. Expert in developing intervention frameworks for complex visa cases."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative min-h-screen overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background Layers */}
        <div className="hidden dark:block absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/3 w-[800px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          {/* H1 Headline */}
          <div className="text-center mb-20">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <span>Established 1997 · AIRC Certified till 2031</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight mb-8 leading-[1.15] text-white">
              28 Years of Consular Expertise,<br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Digitized Into AI
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              EEC AI Tools is not another chatbot experiment. It is the culmination of <strong className="text-white">100,000+ student consultations</strong>, refined into intelligent systems that deliver the precision of our veteran counselors—available to you, <strong className="text-white">24/7, at zero cost</strong>.
            </p>
          </div>

          {/* Trust Bar */}
          <div className="mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-4 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-blue-400 transition-colors">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">AIRC Certified</h3>
                  <p className="text-xs text-slate-400">Gold-standard certification for ethical recruitment practices in the USA market.</p>
                </div>
              </div>
              <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-4 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-blue-400 transition-colors">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">U.S. News Certified</h3>
                  <p className="text-xs text-slate-400">Verified partner for accurate US university placement guidance.</p>
                </div>
              </div>
              <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-4 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-blue-400 transition-colors">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">British Council Partner</h3>
                  <p className="text-xs text-slate-400">Official partner for UK education counseling and IELTS preparation.</p>
                </div>
              </div>
              <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-4 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-blue-400 transition-colors">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">IDP Official Partner</h3>
                  <p className="text-xs text-slate-400">Authorized partner for Australia, Canada, and New Zealand admissions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Heritage Story */}
          <article className="prose prose-lg prose-invert max-w-none mb-24">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3 not-prose">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
              From a Single Desk in Vadodara to 26 Branches Across Gujarat
            </h2>

            <p className="text-slate-400 leading-relaxed text-lg">
              In 1997, when the internet was dial-up and overseas education was a privilege reserved for the elite, <strong className="text-white">Enbee Education Center (EEC)</strong> opened its doors in Vadodara with a radical promise: to democratize access to world-class education for every ambitious Indian student.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              Founded by <strong className="text-white">Mr. Amit Jalan</strong>, a Purdue University alumnus who experienced firsthand the life-changing impact of international education, EEC began as a mission-driven consultancy. While competitors focused on high-volume processing, EEC pioneered a different approach—one rooted in <em>genuine student success</em> rather than mere application submissions.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              Today, EEC stands as Gujarat's most trusted name in overseas education consulting. With <strong className="text-white">26 physical branches spanning 12 cities</strong>—from the commercial heart of Surat to the academic corridors of Vallabh Vidyanagar—we have guided over <strong className="text-white">100,000 students</strong> toward their global aspirations. This isn't a digital-only operation; every AI recommendation you receive is backed by real counselors at real locations across Gujarat.
            </p>

            {/* Branch Highlight Grid */}
            <div className="not-prose my-12 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Visit Us at Our Flagship Offices
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="https://eecglobal.com/locations" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm font-medium truncate">EEC Alkapuri</span>
                </Link>
                <Link href="https://eecglobal.com/locations" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm font-medium truncate">EEC Ghod Dod Road</span>
                </Link>
                <Link href="https://eecglobal.com/locations" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm font-medium truncate">EEC Memnagar</span>
                </Link>
                <Link href="https://eecglobal.com/locations" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm font-medium truncate">EEC Nizampura</span>
                </Link>
                <Link href="https://eecglobal.com/locations" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm font-medium truncate">EEC Vesu</span>
                </Link>
                <Link href="https://eecglobal.com/locations" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm font-medium truncate">EEC Chandkheda</span>
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                <Link href="https://eecglobal.com/locations" className="inline-flex items-center gap-1 text-blue-400 hover:underline font-medium">
                  View all 26 branches across Gujarat
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 mt-20 flex items-center gap-3 not-prose">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                <path d="m3 5 8-3 8 3v6.5a9.5 9.5 0 0 1-3.03 6.95l-4.49 4.04a1 1 0 0 1-1.33 0l-4.49-4.04A9.5 9.5 0 0 1 3 11.5z" />
                <path d="m12 10 2 2-2 2-2-2z" />
                <path d="M6.53 9 12 14.47 17.47 9" />
              </svg>
              The Consular Protocol™: Where Financial Forensics Meets Visa Strategy
            </h2>

            <p className="text-slate-400 leading-relaxed text-lg">
              Here is what separates EEC from every other study abroad consultancy: we do not guess. Every piece of guidance our AI delivers has been audited against real consular requirements by our proprietary <strong className="text-white">Consular Protocol™</strong> system.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              This system was architected by <strong className="text-white">CA Madhav Gupta</strong>, our Director of Financial Forensics, whose expertise lies not in generic accounting but in the precise intersection of <em>Indian family finances and international visa requirements</em>. When an embassy officer questions the source of funds, the CA balance sheet, or the income tax returns, our students arrive with documentation that has already been stress-tested against the exact scrutiny patterns used by consulates in Delhi, Mumbai, and Chennai.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              Complementing this financial rigor is <strong className="text-white">Mrs. Mohita Gupta</strong>, our Vice President of Visa Strategy. As a leading authority on visa refusal prevention, she has developed intervention frameworks for the most challenging cases—students with gaps in education, unconventional career trajectories, or previous visa refusals. Her expertise is encoded into our AI's logic, ensuring that the mock interview questions you face mirror the exact pressure points that real consular officers exploit.
            </p>

            {/* Leadership Cards */}
            <div className="not-prose my-12 grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm">
                <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
                  <img src="/assets/Amit-Jalan.jpeg" alt="Mr. Amit Jalan" className="w-12 h-12 rounded-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-white">Mr. Amit Jalan</h4>
                <p className="text-sm text-blue-400 font-medium mb-2">Managing Director</p>
                <p className="text-xs text-slate-400 mb-3">Purdue University Alumnus · 28+ Years in Overseas Education</p>
                <p className="text-sm text-slate-300 leading-relaxed">Visionary leadership in transforming traditional counseling into AI-powered student success</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm">
                <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
                  <img src="/assets/Madhav-Gupta.jpeg" alt="CA Madhav Gupta" className="w-12 h-12 rounded-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-white">CA Madhav Gupta</h4>
                <p className="text-sm text-blue-400 font-medium mb-2">Director, Financial Forensics</p>
                <p className="text-xs text-slate-400 mb-3">Chartered Accountant · Expert in Visa Financial Documentation</p>
                <p className="text-sm text-slate-300 leading-relaxed">Pioneer of the Consular Protocol™ audit system for visa-compliant financial documentation</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm">
                <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
                  <img src="/assets/mohita-gupta.jpeg" alt="Mrs. Mohita Gupta" className="w-12 h-12 rounded-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-white">Mrs. Mohita Gupta</h4>
                <p className="text-sm text-blue-400 font-medium mb-2">Vice President, Visa Strategy</p>
                <p className="text-xs text-slate-400 mb-3">Visa Refusal Specialist · 15+ Years in Consular Affairs</p>
                <p className="text-sm text-slate-300 leading-relaxed">Leading authority on visa refusal prevention and appeal strategies across 15+ countries</p>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 mt-20 flex items-center gap-3 not-prose">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
              Why Free? The Strategic Truth Behind EEC AI Tools
            </h2>

            <p className="text-slate-400 leading-relaxed text-lg">
              Let us address the elephant in the room. Skeptical users visiting this page are asking: <em>"If these tools are so powerful, why are they free? What's the catch?"</em>
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              The answer is strategic transparency. Unlike pure-play digital platforms that have no physical presence and monetize through hidden commissions, EEC operates 26 fully-staffed offices across Gujarat. Our AI tools serve as the <strong className="text-white">first point of contact</strong>—a way for students to experience the depth of EEC's expertise before ever stepping into a branch.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              When you practice a mock visa interview with our AI and realize you need personalized coaching, we are there at <Link href="https://eecglobal.com/locations" className="text-blue-400 hover:underline">EEC Alkapuri</Link>, <Link href="https://eecglobal.com/locations" className="text-blue-400 hover:underline">EEC Ghod Dod Road Surat</Link>, or <Link href="https://eecglobal.com/locations" className="text-blue-400 hover:underline">EEC Memnagar Ahmedabad</Link>. When you calculate your Australia PR points and discover you need skills assessment guidance, our certified immigration consultants await you at any of our branches.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              This is not a bait-and-switch. This is an <strong className="text-white">AIRC-certified, U.S. News Global Education verified organization</strong> extending its 28 years of consular expertise to students who might otherwise fall prey to unverified online "counselors" or expensive coaching centers that lack genuine consulate relationships.
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 mt-20 flex items-center gap-3 not-prose">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="m9 15 2 2 4-4" />
              </svg>
              Built on Official Data, Not Guesswork
            </h2>

            <p className="text-slate-400 leading-relaxed text-lg">
              Every calculator, every mock interview scenario, and every eligibility check on EEC AI Tools is built on <strong className="text-white">official government data sources</strong>:
            </p>

            <ul className="text-slate-400 space-y-3 my-6 list-none pl-0">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 flex-shrink-0 mt-0.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span><strong className="text-white">Australia PR Points Calculator:</strong> Derived from the official Department of Home Affairs SkillSelect criteria for Subclass 189 and 190 visas.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 flex-shrink-0 mt-0.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span><strong className="text-white">German Grade Converter:</strong> Uses the Modified Bavarian Formula as prescribed by anabin and the German Academic Exchange Service (DAAD).</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 flex-shrink-0 mt-0.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span><strong className="text-white">USA F-1 Visa Prep:</strong> Mock scenarios are modeled on declassified consular training materials and verified refusal patterns from the U.S. Department of State.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 flex-shrink-0 mt-0.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span><strong className="text-white">Australia Genuine Student Test:</strong> Questions are aligned with the 2024 Ministerial Direction 107 guidelines for student visa compliance.</span>
              </li>
            </ul>

            <p className="text-slate-400 leading-relaxed text-lg">
              Before any feature goes live, it passes through a rigorous audit led by CA Madhav Gupta and Mrs. Mohita Gupta. This is why study abroad agents in Gujarat, from Navsari to Mehsana, recognize EEC as the benchmark for <strong className="text-white">student visa compliance</strong> and <strong className="text-white">ethical overseas education consulting</strong>.
            </p>

            <h3 className="text-2xl font-bold text-white mb-6 mt-16 not-prose">
              The EEC Difference: Human Expertise Behind Every Algorithm
            </h3>

            <p className="text-slate-400 leading-relaxed text-lg">
              Artificial intelligence is only as good as the intelligence fed into it. While competitors scrape generic internet content to power their chatbots, EEC AI Tools are trained on proprietary datasets accumulated over nearly three decades of actual consular interactions, successful visa applications, and—critically—an understanding of why applications fail.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              This is the difference between <em>information</em> and <em>expertise</em>. Information tells you that a US visa officer might ask about your future plans. Expertise, refined through 100,000+ consultations, tells you exactly which answers trigger doubt, which follow-up questions to anticipate, and how to structure your response to demonstrate genuine intent—not memorization.
            </p>

            <p className="text-slate-400 leading-relaxed text-lg">
              Whether you are a first-generation college student from Kalol seeking guidance on <strong className="text-white">study abroad options</strong>, an engineering graduate from Surat calculating your <strong className="text-white">Australia PR eligibility</strong>, or a working professional in Ahmedabad preparing for your <strong className="text-white">US F-1 visa interview</strong>—you now have access to the same caliber of preparation that was once available only to students who could afford premium one-on-one coaching.
            </p>
          </article>

          {/* Call to Action */}
          <div className="text-center mt-16 pb-8">
            <div className="inline-block p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/25">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                Access our complete suite of AI tools—free, forever. Or visit any of our 26 branches for personalized, face-to-face guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1 4 2.5 6 2.5s6-1.5 6-2.5v-5" />
                  </svg>
                  Explore AI Tools
                </Link>
                <Link href="https://eecglobal.com/locations" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/50 hover:bg-white/10 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Find a Branch Near You
                </Link>
              </div>
            </div>
          </div>

          {/* Semantic Footer Data */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <span>Overseas Education Consultants Vadodara</span>
              <span className="hidden md:inline">•</span>
              <span>Study Abroad Agents Gujarat</span>
              <span className="hidden md:inline">•</span>
              <span>AIRC Certified Agency India</span>
              <span className="hidden md:inline">•</span>
              <span>Student Visa Compliance Experts</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

