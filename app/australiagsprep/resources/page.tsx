'use client';

import { lazy, Suspense } from 'react';
import { FileText, Landmark, Calculator } from 'lucide-react';

// Lazy load heavy components for better performance
const FinancialDocumentsGuide = lazy(() => import('@/features/australia-gs/components/FinancialDocumentsGuide').then(module => ({ default: module.FinancialDocumentsGuide })));
const ApprovedBanksGuide = lazy(() => import('@/features/australia-gs/components/ApprovedBanksGuide').then(module => ({ default: module.ApprovedBanksGuide })));
const PSWCalculator = lazy(() => import('@/features/australia-gs/components/PSWCalculator').then(module => ({ default: module.PSWCalculator })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function ResourcesPage() {
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
        name: 'Resources',
        item: 'https://ai.eecglobal.com/australiagsprep/resources',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Resources
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Essential tools and checklists to help you prepare for your Australian student visa application.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        {/* Document Checklist */}
        <section id="visa-checklist" className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Financial Documents Checklist</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            Your ultimate checklist for a visa-winning financial file. Ensure you have all required documents before submitting your application. Learn more about <a href="/australiagsprep/glossary/#itr" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">ITR</a>, <a href="/australiagsprep/glossary/#form-956a" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Form 956A</a>, and <a href="/australiagsprep/glossary/#financial-matrix" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Financial Matrix</a> in our glossary.
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            <FinancialDocumentsGuide />
          </Suspense>
        </section>

        {/* Approved Banks */}
        <section id="approved-banks" className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Approved Banks Directory</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            A complete list of financial institutions accepted by Australia for student visa applications. Education loans from these banks are recognized by the Department of Home Affairs. For more information, see our <a href="/australiagsprep/preparation-guide/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Preparation Guide</a>.
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            <ApprovedBanksGuide />
          </Suspense>
        </section>

        {/* PSW Calculator */}
        <section id="psw-calculator" className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">PSW Rights Calculator</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            Estimate your Temporary Graduate visa (subclass 485) duration based on your degree and where you study in Australia. Calculations are based on the special provisions for Indian nationals under the <a href="/australiagsprep/glossary/#ecta" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Australia-India ECTA agreement</a>. Learn about <a href="/australiagsprep/glossary/#psw" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">PSW</a> and <a href="/australiagsprep/glossary/#bonus-years" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">bonus years</a>.
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            <PSWCalculator />
          </Suspense>
        </section>

        {/* Related Pages */}
        <section className="mt-16">
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
              href="/australiagsprep/glossary/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Learn key terms and definitions related to Australian student visas.
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
              href="/australiagsprep/about-eec/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Meet our expert team and learn about EEC's expertise in Australian student visas.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
