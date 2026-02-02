'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { COMPREHENSIVE_FAQS } from '@/features/career-counselor/seo/SEOArchitecture';
import { ArrowRight } from 'lucide-react';

export default function CareerCounselorFAQPage() {
  const allFaqs = COMPREHENSIVE_FAQS.flatMap((cat) =>
    cat.faqs.map((faq) => ({ category: cat.category, question: faq.question, answer: faq.answer }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/careercounselor/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            AI Course Counselor
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">FAQ</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Answers about study abroad, visa applications, test preparation, and EEC&apos;s AI Course Counselor.
          </p>
        </header>

        <Accordion className="space-y-3">
          {allFaqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 px-4"
            >
              <AccordionTrigger className="text-left font-medium text-slate-800 dark:text-slate-200 hover:no-underline py-4">
                <span className="pr-2">
                  <span className="text-xs font-normal text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded mr-2">
                    {faq.category}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <Link
            href="/careercounselor/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to AI Course Counselor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
