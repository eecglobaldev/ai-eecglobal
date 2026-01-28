'use client';

import { lazy, Suspense } from 'react';
import { BRANCH_DATA } from '@/features/australia-gs/data/branches';
import { Users, Award, MapPin } from 'lucide-react';

// Lazy load heavy components for better performance
const ExpertPanel = lazy(() => import('@/features/australia-gs/components/ExpertPanel').then(module => ({ default: module.ExpertPanel })));
const SuccessStories = lazy(() => import('@/features/australia-gs/components/SuccessStories').then(module => ({ default: module.SuccessStories })));
const BranchLocator = lazy(() => import('@/features/australia-gs/components/BranchLocator').then(module => ({ default: module.BranchLocator })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Success stories data extracted from SuccessStories.tsx
const successStories = [
  {
    name: 'Aarav P.',
    university: 'University of Melbourne',
    quote: 'The AI pinpointed the exact weak spot in my GS answers regarding my study gap. The practice sessions and feedback were brutal but necessary. I went into the real interview with 100% confidence. Visa granted!',
  },
  {
    name: 'Meera K.',
    university: 'UNSW Sydney',
    quote: 'My marriage was recent, and I was worried it would be a red flag. The tool generated so many specific questions about it, and the model answers helped me frame my situation honestly and positively. It made all the difference.',
  },
  {
    name: 'Vikram S.',
    university: 'Monash University',
    quote: 'For me, it was the financial questions. The AI didn\'t just ask \'who is your sponsor\', it drilled down into my father\'s income and ITR details. That level of specific practice is something you can\'t get anywhere else. This tool is a game-changer.',
  },
];

export default function AboutEECPage() {
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
        name: 'About EEC',
        item: 'https://ai.eecglobal.com/australiagsprep/about-eec',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '9870',
      bestRating: '5',
      worstRating: '1',
    },
    review: successStories.map((story) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: story.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: story.quote,
    })),
  };

  // Generate LocalBusiness schemas for all branches
  const localBusinessSchemas = BRANCH_DATA.map((branch) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: branch.name,
    description: `${branch.name} - EEC Study Abroad Consultancy Branch providing Australian student visa guidance and services.`,
    image: 'https://eecglobal.com/wp-content/uploads/2022/10/EEC-Logo.svg',
    url: 'https://eecglobal.com',
    telephone: branch.contactPoint?.[0]?.telephone || '+918758750036',
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address.streetAddress,
      addressLocality: branch.address.addressLocality,
      addressRegion: branch.address.addressRegion,
      addressCountry: 'IN',
    },
    geo: branch.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: branch.geo.latitude,
          longitude: branch.geo.longitude,
        }
      : undefined,
    aggregateRating: branch.googleRating && branch.googleReviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: branch.googleRating.toString(),
          reviewCount: branch.googleReviewCount.toString(),
        }
      : undefined,
  }));

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
      {localBusinessSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About EEC
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Gujarat's largest and oldest study abroad company, founded in 1997. Specializing in Australian student visas with 26 branches across Gujarat.
          </p>
        </header>

        {/* Expert Panel */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Meet The Experts</h2>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <ExpertPanel />
          </Suspense>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Success Stories</h2>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <SuccessStories />
          </Suspense>
        </section>

        {/* Branch Locator */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Branches</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            Visit one of our 26 branches across Gujarat for in-person visa assistance, document preparation, and expert guidance. Learn more about our <a href="/australiagsprep/faq/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">services</a> and <a href="/australiagsprep/preparation-guide/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">preparation guides</a>.
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            <BranchLocator />
          </Suspense>
        </section>

        {/* Related Pages */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
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
              href="/australiagsprep/resources/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Document checklist, cost calculator, and other essential resources.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
