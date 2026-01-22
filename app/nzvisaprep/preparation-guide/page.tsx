'use client';

import { BookOpen, FileText, CheckCircle2, Target, Clock, Shield, GraduationCap, DollarSign, Globe, Users } from 'lucide-react';

// Data extracted from FeaturedSnippets.tsx - HOW_TO_GUIDES
const visaApplicationSteps = [
  { text: 'Get admission from a NZQA-approved institution', detail: 'Ensure the course is Level 5 or higher.' },
  { text: 'Receive your Offer of Place and pay semester fees', detail: 'Keep the receipt for visa filing.' },
  { text: 'Gather required documents', detail: 'Passport, transcripts, IELTS/PTE scores.' },
  { text: 'Prepare financial documents', detail: 'FTS account or education loan sanction.' },
  { text: 'Apply online through INZ portal', detail: 'Create a RealMe account.' },
  { text: 'Pay visa fee (NZD $375)', detail: 'Use an international credit card.' },
  { text: 'Complete biometrics', detail: 'Visit your nearest VFS Global center.' },
  { text: 'Receive visa decision', detail: 'Typically within 25-30 working days.' }
];

const interviewPrepSteps = [
  { text: 'Review submitted documents', detail: 'Know your SOP and financials inside out.' },
  { text: 'Research your course', detail: 'Why this course? Why this university?' },
  { text: 'Understand post-study plans', detail: 'Link the course to career goals in India.' },
  { text: 'Practice common questions', detail: 'Focus on "Why NZ?" vs other countries.' },
  { text: 'Use AI preparation tools', detail: 'Mock interviews build confidence.' },
  { text: 'Be honest and concise', detail: 'Avoid memorized or scripted answers.' }
];

export default function NZVisaPreparationGuidePage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Apply for New Zealand Student Visa from India",
    "description": "Complete step-by-step guide for applying for a New Zealand student visa from India",
    "step": visaApplicationSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.text,
      "text": step.detail
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ai.eecglobal.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "NZ Visa Prep",
        "item": "https://ai.eecglobal.com/nzvisaprep/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Preparation Guide",
        "item": "https://ai.eecglobal.com/nzvisaprep/preparation-guide/"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "NZ Student Visa Preparation Guide",
    "description": "Complete step-by-step guide for applying for a New Zealand student visa and preparing for your INZ credibility interview",
    "author": {
      "@type": "Organization",
      "@id": "https://eecglobal.com/#organization",
      "name": "EEC - Enbee Education Center"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://eecglobal.com/#organization",
      "name": "EEC - Enbee Education Center",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ai.eecglobal.com/assets/eeclogo.svg"
      }
    },
    "datePublished": "2024-06-15T00:00:00+05:30",
    "dateModified": "2026-01-16T00:00:00+05:30",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://ai.eecglobal.com/nzvisaprep/preparation-guide/"
    },
    "articleSection": "Education",
    "keywords": ["NZ visa preparation", "New Zealand student visa", "INZ interview", "visa application guide"],
    "inLanguage": "en-IN"
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://eecglobal.com/#organization",
    "name": "EEC - Enbee Education Center",
    "alternateName": ["EEC Global", "Enbee Education"],
    "url": "https://eecglobal.com",
    "logo": "https://ai.eecglobal.com/assets/eeclogo.svg",
    "description": "India's leading New Zealand student visa preparation consultancy, established in 1997. Operating 26 branches across 12 cities in Gujarat. Guided over 100,000 students to international education destinations.",
    "foundingDate": "1997",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "200+"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gujarat",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8758750036",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    },
    "sameAs": [
      "https://www.facebook.com/eecglobal",
      "https://www.linkedin.com/company/eec-global",
      "https://www.instagram.com/eecglobal"
    ],
    "award": [
      "ENZRA Certified (Education New Zealand Recognized Agency)",
      "AIRC Certified (American International Recruitment Council)",
      "ICEF Accredited",
      "U.S. News Global Education Certified"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Complete Preparation Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            NZ Student Visa <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Preparation Guide</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Step-by-step guide to applying for your New Zealand student visa and preparing for your INZ credibility interview.
          </p>
        </div>

        {/* Visa Application Process */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              How to Apply for New Zealand Student Visa from India
            </h2>
          </div>

          <div className="space-y-6">
            {visaApplicationSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.text}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Preparation */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              How to Prepare for INZ Credibility Interview
            </h2>
          </div>

          <div className="space-y-6">
            {interviewPrepSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.text}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Pages */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/nzvisaprep/faq/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
              <p className="text-slate-600 dark:text-slate-400">Get answers to common questions about NZ student visas</p>
            </a>
            <a
              href="/nzvisaprep/glossary/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">Learn key terms and definitions for NZ student visas</p>
            </a>
            <a
              href="/nzvisaprep/resources/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
              <p className="text-slate-600 dark:text-slate-400">Document checklist, cost calculator, and statistics</p>
            </a>
            <a
              href="/nzvisaprep/about-eec/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
              <p className="text-slate-600 dark:text-slate-400">Meet our expert team and learn about our services</p>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-black mb-4">Ready to Start Your Journey?</h2>
            <p className="text-indigo-100 mb-6">
              Use our free AI-powered tool to practice for your INZ credibility interview.
            </p>
            <a
              href="/nzvisaprep"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Start Free Preparation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
