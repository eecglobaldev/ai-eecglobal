'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Shield, DollarSign, FileText, Users } from 'lucide-react';

// FAQ data extracted from existing components - Faq.tsx and SeoContent.tsx
const faqData = [
  // From Faq.tsx component
  {
    id: 'gs-requirement',
    question: 'What is the Genuine Student (GS) requirement for an Australian student visa?',
    answer: 'The Genuine Student (GS) requirement is a key integrity measure for the Australian student visa program. It assesses whether an applicant is a genuine student intending to obtain a quality education in Australia. Applicants must demonstrate their understanding of the course, their future plans in their home country, and provide evidence of their circumstances.',
    category: 'GS Requirement',
    icon: Shield,
  },
  {
    id: 'gte-vs-gs',
    question: 'What is the main difference between the old GTE and the new GS requirement?',
    answer: 'The Genuine Temporary Entrant (GTE) requirement focused primarily on ensuring students had a temporary intention to stay in Australia. The new Genuine Student (GS) requirement is more targeted, focusing on whether the applicant is a genuine student whose primary purpose is to study. It places more emphasis on the student\'s academic and career progression, their understanding of the course, and why they chose Australia, while still considering their ties to their home country.',
    category: 'GS Requirement',
    icon: Shield,
  },
  {
    id: 'ai-tool-help',
    question: 'How does this AI tool help me prepare for the GS interview?',
    answer: 'This tool provides hyper-personalized preparation. By analyzing your specific academic, financial, and personal profile, it generates unique interview questions that a real visa officer might ask you. It provides model answers, allows you to practice answering with your voice, and gives you instant AI-powered feedback on your performance.',
    category: 'Tool',
    icon: HelpCircle,
  },
  {
    id: 'subclass-500',
    question: 'Can I use this tool for the subclass 500 visa interview?',
    answer: 'Yes, absolutely. This tool is specifically designed to prepare students for the interview component related to the Australian Student Visa (subclass 500), with a strong focus on satisfying the new Genuine Student (GS) criteria.',
    category: 'Visa Process',
    icon: Shield,
  },
  {
    id: 'eec-free',
    question: 'Who is EEC and why are they providing this tool for free?',
    answer: 'EEC (Enbee Education Center) is Gujarat\'s largest and oldest study abroad company, founded in 1997. This tool is provided 100% free as part of our mission to make high-quality visa preparation accessible to every deserving student, leveraging AI to improve their chances of success.',
    category: 'About EEC',
    icon: Users,
  },
  {
    id: 'ai-accents',
    question: 'How does the AI handle different Indian accents during transcription?',
    answer: 'The tool uses Google\'s latest speech-to-text models, which are trained on a vast and diverse dataset of global audio, including a wide range of Indian accents. While accuracy can vary based on microphone quality and background noise, the model is highly effective at understanding different speech patterns. You can always edit the transcript for accuracy before submitting it for feedback.',
    category: 'Tool',
    icon: HelpCircle,
  },
  // From SeoContent.tsx schema
  {
    id: 'gs-requirement-schema',
    question: 'What is the GS requirement for Australian Student Visa?',
    answer: 'The Genuine Student (GS) requirement assesses whether an applicant genuinely intends to remain in Australia as a student. It replaces the GTE requirement and focuses on the student\'s circumstances, course value, and immigration history.',
    category: 'GS Requirement',
    icon: Shield,
  },
  {
    id: 'fund-required',
    question: 'How much fund is required for Australia Student Visa 2025-2026?',
    answer: 'As of May 2024, the financial requirement for the primary applicant is AUD 29,710 per year for living costs, plus the first year\'s tuition fee and travel expenses (approx AUD 2,000).',
    category: 'Financial',
    icon: DollarSign,
  },
  {
    id: 'ai-sop',
    question: 'Can I use AI to write my GS Statement?',
    answer: 'While you can use AI tools like EEC\'s AI Prep specifically designed for this to generate ideas and structure, your GS statement must be personal and authentic. Copy-pasting generic AI content can lead to refusal. Our tool helps you structure YOUR personal story.',
    category: 'SOP',
    icon: FileText,
  },
  {
    id: 'eec-help',
    question: 'Does EEC Global help with Australia Visa filing?',
    answer: 'Yes, EEC Global has 26 branches across Gujarat and specializes in Australian student visas. We assist with University applications, GTE/GS drafting, and Visa filing ensuring high success rates.',
    category: 'About EEC',
    icon: Users,
  },
];

export default function FAQPage() {
  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
        name: 'FAQ',
        item: 'https://ai.eecglobal.com/australiagsprep/faq',
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

  // Group FAQs by category
  const faqsByCategory = faqData.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqData>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Answers to common questions about the GS interview and our tool.
          </p>
        </header>

        {/* FAQ Sections by Category */}
        <div className="space-y-8">
          {Object.entries(faqsByCategory).map(([category, faqs]) => {
            const Icon = faqs[0]?.icon;
            return (
            <div key={category}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                {Icon && <Icon className="w-6 h-6" />}
                {category}
              </h2>
              <Accordion className="space-y-4">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-700 dark:text-slate-300 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\b(GS|Genuine Student|CoE|OSHC|PSW|Subclass 500|ECTA|ITR|Form 956A|TFN|Go8|DfAT)\b/gi, (match) => {
                        const termMap: Record<string, string> = {
                          'GS': '/australiagsprep/glossary/#gs',
                          'Genuine Student': '/australiagsprep/glossary/#gs',
                          'CoE': '/australiagsprep/glossary/#coe',
                          'OSHC': '/australiagsprep/glossary/#oshc',
                          'PSW': '/australiagsprep/glossary/#psw',
                          'Subclass 500': '/australiagsprep/glossary/#subclass-500',
                          'ECTA': '/australiagsprep/glossary/#ecta',
                          'ITR': '/australiagsprep/glossary/#itr',
                          'Form 956A': '/australiagsprep/glossary/#form-956a',
                          'TFN': '/australiagsprep/glossary/#tfn',
                          'Go8': '/australiagsprep/glossary/#go8',
                          'DfAT': '/australiagsprep/glossary/#dfat',
                        };
                        const link = termMap[match];
                        return link ? `<a href="${link}" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">${match}</a>` : match;
                      }) }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
          })}
        </div>

        {/* Related Pages */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/australiagsprep/glossary/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Learn key terms and definitions related to Australian student visas and the GS requirement.
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
