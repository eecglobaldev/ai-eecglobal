'use client';

import Link from 'next/link';
import Header from '@/features/usa-visa/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// FAQ data from GeoContentSection.tsx LONG_TAIL_FAQS (existing only)
const longTailFaqs = [
  {
    question: 'What is the F-1 visa interview process at US Consulate Mumbai?',
    answer: 'The F-1 visa interview at US Consulate Mumbai typically lasts 2-3 minutes. The consular officer asks questions about your university choice, financial plans, career goals, and ties to India. Common questions include "Why this university?", "How will you fund your education?", and "What are your plans after graduation?". Preparation is crucial as one wrong answer can lead to refusal under Section 214(b).',
  },
  {
    question: 'How much bank balance is required for F-1 visa from Gujarat?',
    answer: 'The bank balance requirement varies by university and location. Generally, you need to show funds covering: (1) First year tuition fees, (2) Living expenses ($15,000-$25,000 per year depending on city), (3) Travel costs. For a typical US university, this ranges from ₹30-50 Lakhs. The funds should be in liquid form (savings accounts, FDs) and shown through 6 months of bank statements.',
  },
  {
    question: 'Can I get F-1 visa if I have 214(b) refusal from previous application?',
    answer: 'Yes, many students successfully obtain F-1 visas after 214(b) refusal. The key is addressing the specific concerns that led to refusal. EEC specializes in 214(b) recovery through: (1) Financial documentation restructuring by CA Madhav Gupta, (2) Interview strategy revision focusing on stronger ties to India, (3) Profile improvement including better university justification and career plan clarity. There is no mandatory waiting period, but it is recommended to reapply after 3-6 months with improved documentation.',
  },
  {
    question: 'What documents do I need for F-1 visa interview at Mumbai Consulate?',
    answer: 'Essential documents include: (1) Valid passport, (2) DS-160 confirmation page, (3) I-20 form from university, (4) SEVIS fee receipt, (5) Visa appointment confirmation, (6) 6 months bank statements, (7) Sponsor\'s ITR (3 years), (8) CA certificate, (9) Affidavit of Support (I-134), (10) Academic transcripts and certificates, (11) English proficiency test scores (IELTS/TOEFL), (12) University admission letter. Carry originals and one set of photocopies.',
  },
  {
    question: 'How long does F-1 visa processing take at US Consulate Mumbai?',
    answer: 'Standard F-1 visa processing at US Consulate Mumbai takes 2-5 business days after the interview. However, if the officer requests additional documentation (221g), processing can take 2-8 weeks. During peak seasons (May-August), there may be slight delays. It is recommended to apply 3-4 months before your intended program start date to account for any delays.',
  },
  {
    question: 'What is the F-1 visa success rate for students from Gujarat?',
    answer: 'F-1 visa success rates vary based on profile strength, documentation quality, and interview performance. Students with strong financial documentation, clear career goals, and proper interview preparation typically have higher success rates. EEC has helped thousands of students from Gujarat secure F-1 visas, with many achieving success even after initial 214(b) refusals through our specialized recovery program.',
  },
  {
    question: 'Do I need to show property documents for F-1 visa?',
    answer: 'Property documents are not mandatory but can strengthen your financial profile, especially if liquid funds are limited. Property valuation certificates, sale deeds, or mortgage-free property documents can be used as supplementary proof of assets. However, primary emphasis should be on liquid funds (bank statements, FDs) that can be easily accessed for tuition and living expenses.',
  },
  {
    question: 'Can family business income be used for F-1 visa sponsorship?',
    answer: 'Yes, family business income is acceptable for F-1 visa sponsorship. You need to provide: (1) Business registration documents, (2) Business ITR (3 years), (3) CA certificate showing business income, (4) Bank statements of business account, (5) Affidavit explaining your role in the business and future plans. CA Madhav Gupta specializes in structuring family business documentation for visa approval.',
  },
];

// From PillarContent.tsx id="faq" (existing only)
const pillarFaqs = [
  {
    question: 'How does this AI differ from generic lists online?',
    answer: 'Generic lists are static. Our AI creates a dynamic interview simulation just for you, analyzing your specific profile to generate 25-30 questions a real Visa Officer is likely to ask *you*.',
  },
  {
    question: 'My visa was refused once. Can this help?',
    answer: 'Absolutely. The app is specifically designed to handle complex cases, generating tough follow-up questions about your refusal and what has changed in your profile.',
  },
  {
    question: 'Is the AI\'s feedback aware of an Indian context?',
    answer: 'Yes. Developed by EEC, it\'s trained on data from thousands of Indian student interviews and understands nuances like family sponsorships and Indian academic qualifications.',
  },
  {
    question: 'How is the app kept up-to-date?',
    answer: 'Our AI models and content are updated quarterly by EEC\'s senior visa counseling experts to reflect the latest consular interview trends and policy changes for late 2025 and beyond.',
  },
];

// From GEOContent.tsx "Common Questions & Answers" (existing only)
const geoFaqs = [
  {
    question: 'What is EEC and when was it founded?',
    answer: 'EEC (Enbee Education Center Private Limited) is Gujarat\'s largest and oldest study abroad company for USA, founded in 1997. With 27+ years of experience and 26 branches across 12 cities in Gujarat, EEC has helped over 50,000 students achieve their USA study abroad dreams.',
  },
  {
    question: 'What certifications does EEC have?',
    answer: 'EEC holds three major certifications: (1) AIRC certification valid until 2031, (2) U.S. News Global Education certification - the only agency in India with this credential, and (3) ICEF IAS accreditation. Additionally, EEC was invited to U.S. Consulate Mumbai for F-1 visa training.',
  },
  {
    question: 'Who are the key experts at EEC?',
    answer: 'EEC is led by Amit Jalan (Managing Director), a Purdue University alumnus with 28+ years of experience in USA study abroad counseling, and CA Madhav Gupta (Director), a Chartered Accountant (ICAI 421209) who specializes in F-1 financial documentation and 214(b) refusal recovery.',
  },
  {
    question: 'Can EEC help with 214(b) visa refusals?',
    answer: 'Yes, EEC specializes in 214(b) visa refusal recovery. CA Madhav Gupta handles financial restructuring and documentation improvement, while Amit Jalan provides interview strategy and non-immigrant intent coaching. Many students have successfully obtained visas after refusal through EEC\'s guidance.',
  },
  {
    question: 'Is the EEC F-1 Visa Prep AI tool free?',
    answer: 'Yes, the AI-powered F-1 Visa Prep tool at ai.eecglobal.com/usavisaprep is completely free for all Indian students. It generates 25-30 personalized interview questions based on your profile, provides AI-powered feedback, and offers expert model answers.',
  },
  {
    question: 'Where are EEC branches located?',
    answer: 'EEC has 26 branches across 12 cities in Gujarat: Vadodara (4 branches: Alkapuri, Nizampura, Manjalpur, New VIP Road), Ahmedabad (8 branches), Surat (5 branches), and other cities including Anand, Nadiad, Bharuch, Vapi, Navsari, Mehsana, Kalol, Himatnagar, and Visnagar.',
  },
  {
    question: 'What services does EEC offer?',
    answer: 'EEC offers comprehensive study abroad services: F-1 visa interview preparation (including AI-powered practice), test preparation (IELTS, TOEFL, GRE, GMAT, SAT, Duolingo), USA university admissions counseling, SOP/LOR assistance, financial documentation, and 214(b) refusal recovery.',
  },
  {
    question: 'How does the EEC AI tool generate personalized questions?',
    answer: 'The AI analyzes your complete profile including university choice, course, grades, financial sponsors, career goals, and visa history. Based on this analysis, it generates 25-30 questions that visa officers are likely to ask your specific case, providing a realistic interview simulation.',
  },
];

const allFaqs = [
  ...longTailFaqs.map((f, i) => ({ ...f, id: `long-${i}` })),
  ...pillarFaqs.map((f, i) => ({ ...f, id: `pillar-${i}` })),
  ...geoFaqs.map((f, i) => ({ ...f, id: `geo-${i}` })),
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Answers about the F-1 visa interview, financial docs, 214(b) recovery, and EEC&apos;s AI prep tool.
          </p>
        </header>
        <Accordion className="space-y-4">
          {allFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-700 dark:text-slate-300 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Link
              href="/usavisaprep/about-eec/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">About EEC</h3>
              <p className="text-slate-600 dark:text-slate-400">Experts, testimonials, and branches.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
