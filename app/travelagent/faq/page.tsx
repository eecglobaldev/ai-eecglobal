'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

const TRAVEL_FAQS = [
  {
    category: 'Using the tool',
    faqs: [
      {
        question: 'How do I use the EEC Travel & Visa tool?',
        answer: 'Select your Indian state, destination country, and visa type (Student or Tourist). Click Search to get visa requirements, documents, process steps, and tips. You can also use the chat assistant for follow-up questions.',
      },
      {
        question: 'Do I need to sign up to use the tool?',
        answer: 'No. You can run visa searches without signing up. Sign-in is optional and helps save your search history and get personalized follow-up from EEC counselors.',
      },
    ],
  },
  {
    category: 'Student visas',
    faqs: [
      {
        question: 'What documents do I need for a US F-1 student visa?',
        answer: 'You typically need a valid passport, I-20 from your US school, SEVIS fee receipt, visa application confirmation (DS-160), proof of funds (tuition + living), academic transcripts, and English proficiency (e.g. TOEFL/IELTS). The tool gives a full list for your profile.',
      },
      {
        question: 'What is a CAS letter for UK student visa?',
        answer: 'CAS (Confirmation of Acceptance for Studies) is a 14-character reference from your UK university. You need it to apply for the UK Student Route visa. It is issued after you meet offer conditions and pay the deposit.',
      },
      {
        question: 'What is Canada SDS (Student Direct Stream)?',
        answer: 'SDS is an expedited study permit stream for legal residents of India and some other countries. It requires a specific language score (e.g. IELTS 6.0+), GIC, upfront medical, and proof of tuition payment. Processing is usually faster than non-SDS.',
      },
      {
        question: 'What is Australia GTE or Genuine Student?',
        answer: 'GTE (Genuine Temporary Entrant) was Australia’s requirement that you genuinely intend to stay temporarily for study. From March 2024, the Genuine Student (GS) criteria apply for many streams. Your statement and circumstances are assessed to ensure you are a genuine student.',
      },
    ],
  },
  {
    category: 'Tourist & short-stay visas',
    faqs: [
      {
        question: 'What is a Schengen visa?',
        answer: 'A Schengen visa allows short stays (usually up to 90 days in 180 days) in the Schengen area, which includes most EU countries (e.g. France, Germany, Italy, Spain) plus Iceland, Norway, Switzerland. One visa can cover multiple countries.',
      },
      {
        question: 'How do I get a US B1/B2 tourist visa?',
        answer: 'You complete the DS-160 form, pay the fee, book a visa interview at a US consulate in India, and attend with documents (passport, photo, proof of ties, funds, travel plan). Approval depends on strong ties to India and a genuine short visit.',
      },
      {
        question: 'What are biometrics and where do I give them?',
        answer: 'Biometrics are your photograph and fingerprints. For many countries (UK, Canada, Schengen, etc.) you give them at a Visa Application Centre (VAC) such as VFS Global or BLS. The tool can remind you of this step for your destination.',
      },
    ],
  },
  {
    category: 'EEC services',
    faqs: [
      {
        question: 'Where are EEC branches?',
        answer: 'EEC has 26 branches across 12 cities in Gujarat (Vadodara, Ahmedabad, Surat, Anand, Nadiad, and others). See the Resources page for a branch locator and contact details.',
      },
      {
        question: 'Does EEC help with visa documentation and interviews?',
        answer: 'Yes. EEC offers visa documentation support, mock visa interviews, and counseling. Counselors are trained by US and UK Embassy programs. Success rate is high; check the About EEC page for details.',
      },
    ],
  },
];

export default function TravelAgentFaqPage() {
  const allFaqs = TRAVEL_FAQS.flatMap((cat) =>
    cat.faqs.map((faq) => ({ category: cat.category, question: faq.question, answer: faq.answer }))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/travelagent/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Travel & Visa
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">FAQ</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Visa requirements, student and tourist visas, and EEC Travel & Visa services.
          </p>
        </header>

        <Accordion className="space-y-3">
          {allFaqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 px-4"
            >
              <AccordionTrigger className="text-left font-medium text-slate-800 dark:text-slate-200 hover:no-underline py-4">
                <span className="pr-2">
                  <span className="text-xs font-normal text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-2 py-0.5 rounded mr-2">
                    {faq.category}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                <p className="leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <Link
            href="/travelagent/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to Travel & Visa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
