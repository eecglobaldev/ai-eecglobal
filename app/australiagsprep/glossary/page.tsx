'use client';

import { Search, Shield, DollarSign, GraduationCap, FileText, Briefcase, Building2, Globe, Users, Calendar, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';

// Glossary terms extracted from existing components
const glossaryTerms = [
  {
    id: 'gs',
    term: 'Genuine Student',
    abbreviation: 'GS',
    shortDefinition: 'Requirement assessing genuine intent to study in Australia.',
    definition: 'The Genuine Student (GS) requirement is a key integrity measure for the Australian student visa program. It assesses whether an applicant is a genuine student intending to obtain a quality education in Australia. It replaces the GTE requirement and focuses on whether the applicant is a genuine student whose primary purpose is to study. It places more emphasis on the student\'s academic and career progression, their understanding of the course, and why they chose Australia, while still considering their ties to their home country.',
    category: 'immigration',
    icon: Shield,
  },
  {
    id: 'gte',
    term: 'Genuine Temporary Entrant',
    abbreviation: 'GTE',
    shortDefinition: 'Previous requirement replaced by GS in March 2024.',
    definition: 'The Genuine Temporary Entrant (GTE) requirement focused primarily on ensuring students had a temporary intention to stay in Australia. It has been replaced by the Genuine Student (GS) requirement as of March 2024. Unlike GTE, the GS requirement focuses more on the student\'s ties to their home country and the value of the course to their future career rather than proving they won\'t stay in Australia permanently.',
    category: 'immigration',
    icon: Shield,
  },
  {
    id: 'coe',
    term: 'Confirmation of Enrolment',
    abbreviation: 'CoE',
    shortDefinition: 'Mandatory document confirming your place in a registered course.',
    definition: 'A mandatory document from your Australian university confirming your place in a registered course. The CoE is required for your student visa application and contains details about your course, duration, and tuition fees.',
    category: 'academic',
    icon: FileText,
  },
  {
    id: 'oshc',
    term: 'Overseas Student Health Cover',
    abbreviation: 'OSHC',
    shortDefinition: 'Mandatory health insurance for international students.',
    definition: 'You must have and maintain adequate health insurance for the entire duration of your stay in Australia. OSHC covers medical and hospital care, prescription medicines, and ambulance services.',
    category: 'immigration',
    icon: Shield,
  },
  {
    id: 'subclass-500',
    term: 'Subclass 500',
    abbreviation: 'Subclass 500',
    shortDefinition: 'Australian Student Visa category.',
    definition: 'The Australian Student Visa (Subclass 500) allows you to study full-time in Australia at a registered education institution. This tool is specifically designed to prepare students for the interview component related to the Subclass 500 visa, with a strong focus on satisfying the new Genuine Student (GS) criteria.',
    category: 'immigration',
    icon: Shield,
  },
  {
    id: 'psw',
    term: 'Post-Study Work',
    abbreviation: 'PSW',
    shortDefinition: 'Work rights after completing studies in Australia.',
    definition: 'Post-Study Work (PSW) rights allow international graduates to work in Australia after completing their studies. The duration depends on your qualification level and where you study. Under the Australia-India ECTA agreement, Indian nationals may receive bonus years based on their study location.',
    category: 'immigration',
    icon: Briefcase,
  },
  {
    id: 'subclass-485',
    term: 'Temporary Graduate Visa',
    abbreviation: 'Subclass 485',
    shortDefinition: 'Work visa after graduation, duration based on qualification and location.',
    definition: 'The Temporary Graduate visa (subclass 485) allows you to work in Australia after completing your studies. The duration is based on your degree level and where you study in Australia. Indian nationals may receive bonus years under the Australia-India ECTA agreement.',
    category: 'immigration',
    icon: Briefcase,
  },
  {
    id: 'ecta',
    term: 'Australia-India Economic Cooperation and Trade Agreement',
    abbreviation: 'ECTA',
    shortDefinition: 'Trade agreement providing bonus PSW years for Indian students.',
    definition: 'The Australia-India Economic Cooperation and Trade Agreement (ECTA) includes special provisions for Indian nationals studying in Australia. Under ECTA, Indian students may receive bonus years for their Post-Study Work visa based on their study location (Category 2 or 3 cities).',
    category: 'immigration',
    icon: Globe,
  },
  {
    id: 'category-cities',
    term: 'Category 1/2/3 Cities',
    abbreviation: 'Category Cities',
    shortDefinition: 'Regional classification affecting PSW duration.',
    definition: 'Australian cities are classified into categories for Post-Study Work visa purposes. Category 1 cities (like Sydney, Melbourne) provide base years only. Category 2 cities provide +1 bonus year, and Category 3 cities provide +2 bonus years for Indian nationals under the ECTA agreement.',
    category: 'immigration',
    icon: MapPin,
  },
  {
    id: 'bonus-years',
    term: 'Bonus Years',
    abbreviation: 'Bonus Years',
    shortDefinition: 'Additional PSW years for Indian students in regional areas.',
    definition: 'Bonus years are additional Post-Study Work visa years granted to Indian nationals under the ECTA agreement. Students in Category 2 cities receive +1 bonus year, and those in Category 3 cities receive +2 bonus years, in addition to their base PSW duration.',
    category: 'immigration',
    icon: Calendar,
  },
  {
    id: 'work-rights',
    term: 'Work Rights',
    abbreviation: 'Work Rights',
    shortDefinition: '48 hours per fortnight during study periods.',
    definition: 'Student visa holders can work up to 48 hours per fortnight (two weeks) during teaching periods and full-time during scheduled breaks. This is a key visa condition that must be understood and respected.',
    category: 'immigration',
    icon: Briefcase,
  },
  {
    id: 'itr',
    term: 'Income Tax Return',
    abbreviation: 'ITR',
    shortDefinition: 'Tax documents required for financial evidence.',
    definition: 'Income Tax Returns (ITR) or Form-16 must be provided for the last 3 years as part of your financial documentation. All pages must be notarized. This demonstrates the sponsor\'s legitimate income source.',
    category: 'financial',
    icon: DollarSign,
  },
  {
    id: 'form-956a',
    term: 'Form 956A',
    abbreviation: 'Form 956A',
    shortDefinition: 'Appointment of registered migration agent form.',
    definition: 'Form 956A is the appointment of a registered migration agent, student agent or exempt person. This form is often prepared by EEC when assisting with visa applications.',
    category: 'immigration',
    icon: FileText,
  },
  {
    id: 'financial-matrix',
    term: 'Financial Matrix',
    abbreviation: 'Financial Matrix',
    shortDefinition: 'Summary of all funds shown for the visa.',
    definition: 'A Financial Matrix is a summary of all funds being shown for the visa application. It organizes and presents all financial evidence clearly, making it easier for visa officers to assess your financial capacity. This is often prepared by EEC.',
    category: 'financial',
    icon: DollarSign,
  },
  {
    id: 'networth-report',
    term: 'Networth Report',
    abbreviation: 'Networth Report',
    shortDefinition: 'CA report summarizing assets and liabilities.',
    definition: 'A Networth Report or Valuation Report is a Chartered Accountant\'s report summarizing assets and liabilities. This provides a comprehensive view of the sponsor\'s financial position.',
    category: 'financial',
    icon: DollarSign,
  },
  {
    id: 'affidavit-sponsorship',
    term: 'Affidavit of Sponsorship',
    abbreviation: 'Affidavit',
    shortDefinition: 'Legal document declaring sponsor support.',
    definition: 'An Affidavit of Sponsorship is a legal document where the sponsor declares their support for your education in Australia. This is a mandatory document for all visa applications.',
    category: 'financial',
    icon: FileText,
  },
  {
    id: 'tfn',
    term: 'Tax File Number',
    abbreviation: 'TFN',
    shortDefinition: 'Australian tax identification number.',
    definition: 'A Tax File Number (TFN) is required for working in Australia. You should apply for a TFN online after arriving in Australia. It\'s needed for employment and tax purposes.',
    category: 'immigration',
    icon: FileText,
  },
  {
    id: 'go8',
    term: 'Group of Eight',
    abbreviation: 'Go8',
    shortDefinition: 'Australia\'s leading research universities.',
    definition: 'The Group of Eight (Go8) consists of Australia\'s leading research-intensive universities: University of Melbourne, Australian National University, University of Sydney, University of Queensland, UNSW Sydney, Monash University, University of Western Australia, and University of Adelaide. These universities are highly regarded for academic excellence.',
    category: 'academic',
    icon: GraduationCap,
  },
  {
    id: 'dfat',
    term: 'Department of Foreign Affairs and Trade',
    abbreviation: 'DfAT',
    shortDefinition: 'Australian government department managing international relations.',
    definition: 'The Department of Foreign Affairs and Trade (DfAT) is the Australian government department responsible for managing Australia\'s international relations, trade, and development assistance. DfAT plays a role in international education policy.',
    category: 'organization',
    icon: Building2,
  },
  {
    id: 'ai-ecta',
    term: 'AI-ECTA',
    abbreviation: 'AI-ECTA',
    shortDefinition: 'Provisions under ECTA for Indian students.',
    definition: 'AI-ECTA refers to the provisions under the Australia-India Economic Cooperation and Trade Agreement that specifically benefit Indian students, including bonus Post-Study Work visa years based on study location.',
    category: 'immigration',
    icon: Globe,
  },
  {
    id: 'financial-capacity',
    term: 'Financial Capacity Evidence',
    abbreviation: 'Financial Evidence',
    shortDefinition: 'Proof of sufficient funds for visa application.',
    definition: 'Financial Capacity Evidence is proof of sufficient funds to cover your tuition fees, travel costs, and 12 months of living expenses. As of May 2024, this is AUD 29,710 per year for living costs for a single applicant, plus course fees and travel costs.',
    category: 'financial',
    icon: DollarSign,
  },
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(glossaryTerms.map((term) => term.category)))];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch =
        searchTerm === '' ||
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.shortDefinition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // DefinedTermSet Schema
  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Australia GS Prep Glossary',
    description: 'Glossary of terms related to Australian student visas and the Genuine Student requirement',
    hasDefinedTerm: glossaryTerms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      alternateName: term.abbreviation,
      description: term.definition,
      inDefinedTermSet: 'https://ai.eecglobal.com/australiagsprep/glossary',
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ai.eecglobal.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Australia GS Prep',
        item: 'https://ai.eecglobal.com/australiagsprep',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Glossary',
        item: 'https://ai.eecglobal.com/australiagsprep/glossary',
      },
    ],
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EEC (Enbee Education Center Private Limited)',
    alternateName: 'EEC Global',
    url: 'https://eecglobal.com',
    logo: 'https://eecglobal.com/wp-content/uploads/2022/10/EEC-Logo.svg',
    foundingDate: '1997',
    description: 'Established in 1997, EEC is Gujarat\'s largest and oldest study abroad company, providing expert test preparation, admissions, and visa guidance to students aiming to study overseas.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Glossary
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Key terms and definitions related to Australian student visas and the Genuine Student requirement.
          </p>
        </header>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-blue-500'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((term) => {
            const Icon = term.icon;
            return (
              <div
                key={term.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {term.term}
                      </h3>
                      {term.abbreviation !== term.term && (
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
                          {term.abbreviation}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3 font-medium">
                      {term.shortDefinition}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {term.definition}
                      {term.id === 'gs' && ' '}
                      {term.id === 'gs' && <a href="/australiagsprep/preparation-guide/#gs-pillars" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">See GS Pillars</a>}
                      {term.id === 'psw' && ' '}
                      {term.id === 'psw' && <a href="/australiagsprep/resources/#psw-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Calculate your PSW duration</a>}
                      {term.id === 'financial-capacity' && ' '}
                      {term.id === 'financial-capacity' && <a href="/australiagsprep/resources/#visa-checklist" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">See financial checklist</a>}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No terms found matching your search.
            </p>
          </div>
        )}

        {/* Related Pages */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/australiagsprep/faq/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get answers to common questions about the GS requirement and visa process.
              </p>
            </a>
            <a
              href="/australiagsprep/preparation-guide/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Step-by-step guide to prepare for your GS interview and visa application.
              </p>
            </a>
            <a
              href="/australiagsprep/resources/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Document checklist, cost calculator, and other essential resources.
              </p>
            </a>
            <a
              href="/australiagsprep/about-eec/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Meet our expert team and learn about EEC's expertise in Australian student visas.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
