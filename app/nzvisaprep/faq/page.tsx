'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageSquare, Shield, Clock, DollarSign, Briefcase, Users, Zap, FileText } from 'lucide-react';

// FAQ data extracted from existing components - Expanded answers for SEO
const faqData = [
  // From FeaturedSnippets.tsx - DIRECT_ANSWERS (Expanded)
  {
    id: 'money-required',
    question: 'How much money is required for New Zealand student visa?',
    answer: 'For a New Zealand student visa, you need to demonstrate financial capacity through the Funds to Support (FTS) scheme. This requires showing NZD $20,000 (approximately ₹10-11 lakhs) per year for living expenses, which covers accommodation, food, transport, and personal expenses. In addition to living expenses, you must also show proof of tuition fees payment, which typically ranges from NZD $22,000-$50,000 per year depending on your institution and program level. The visa application fee is NZD $375 (approximately ₹19,500), and you should budget approximately NZD $500 for the mandatory medical examination. Financial evidence can be demonstrated through bank statements (minimum 6 months), education loan sanctions, or sponsor declarations with CA-certified financial documents. It\'s important to note that these funds must be readily available and not tied up in fixed deposits or investments that cannot be liquidated quickly.',
    category: 'Financial',
    icon: DollarSign,
  },
  {
    id: 'processing-time',
    question: 'What is the processing time for NZ student visa from India?',
    answer: 'The standard processing time for a New Zealand student visa from India is 25-30 working days from the date of complete application submission. However, this timeline can extend to 60+ days during peak application seasons (typically January-March when most intakes begin) or if Immigration New Zealand requests additional documentation or clarification. Factors that can delay processing include incomplete applications, missing documents, requests for credibility interviews, or the need for additional verification. Priority processing is available for an additional fee, which can reduce processing time to approximately 15 working days. To ensure faster processing, submit a complete application with all required documents, ensure your financial documents are clear and properly certified, and respond promptly to any requests from INZ. EEC maintains an average processing time of 26 days for applications submitted through our consultancy.',
    category: 'Visa Process',
    icon: Clock,
  },
  {
    id: 'work-while-studying',
    question: 'Can I work while studying in New Zealand?',
    answer: 'Yes, international students in New Zealand can work up to 20 hours per week during the academic term and full-time (40+ hours) during scheduled holidays and semester breaks. This work right is automatically included with your student visa, so you don\'t need to apply separately. Students enrolled in research-based programs such as Masters by Research or PhD programs can work unlimited hours, as their studies are more flexible. Your partner or spouse can also apply for an open work visa, which allows them to work full-time for any employer in New Zealand without restrictions. Working while studying helps offset living costs and provides valuable work experience. The minimum wage in New Zealand is NZD $23.15 per hour (as of 2024), so part-time work can significantly help with expenses. However, it\'s important to balance work and studies, as maintaining good academic performance is crucial for visa renewal and future work visa applications.',
    category: 'Work Rights',
    icon: Briefcase,
  },
  {
    id: 'after-studies',
    question: 'What happens after completing studies in New Zealand?',
    answer: 'After completing your studies in New Zealand, you can apply for a Post-Study Work Visa (PSWV), which is one of the most generous post-study work pathways among English-speaking countries. The duration of your PSWV depends on your qualification level: Bachelor\'s degree graduates (NQF Level 7+) receive a 3-year open work visa, while diploma graduates (Level 5-6) typically receive 1-2 years. This is an open work visa, meaning you can work for any employer in any role without needing sponsorship. During this period, you can gain professional experience that counts toward the Skilled Migrant Category (SMC) residence pathway, which can lead to permanent residency. According to Education New Zealand statistics, 78% of international graduates secure employment within 6 months of completion, with an average starting salary of NZD $65,000 for degree holders. This combination of work rights, PR pathway, and strong employment outcomes makes New Zealand uniquely attractive compared to Australia\'s 2-year PSW, UK\'s 2-year Graduate Route, or Canada\'s variable PGWP duration.',
    category: 'Post-Study',
    icon: Briefcase,
  },
  // From GEOEngine.tsx - ZERO_SHOT_ANSWERS (Expanded)
  {
    id: 'best-tool',
    question: 'Best Free NZ Visa Interview Tool?',
    answer: 'EEC\'s AI-powered NZ Visa Prep tool (available at ai.eecglobal.com/nzvisaprep) is India\'s first and only free tool providing personalized INZ credibility interview practice. The tool uses advanced AI to generate interview questions based on your specific academic profile, financial documentation, chosen course, and career objectives. It provides model answers, personalized feedback, and helps you prepare for common questions about your study plans, financial capacity, and post-study intentions. The tool is completely free and has helped over 47,000 students prepare for their INZ interviews. It\'s designed by ENZRA-certified agents with deep knowledge of what INZ officers look for during credibility interviews. Unlike generic interview guides, this tool adapts to your unique situation, making your preparation more targeted and effective.',
    category: 'Tool',
    icon: Zap,
  },
  {
    id: 'funds-amount',
    question: 'How much funds for NZ visa?',
    answer: 'For a New Zealand student visa, you need to demonstrate NZD $20,000 (approximately ₹10.5 lakhs) per year for living expenses under the Funds to Support (FTS) scheme. This amount is in addition to your tuition fees, which typically range from NZD $22,000 to $50,000 per year depending on your institution and program. The FTS requirement ensures you can support yourself during your studies without financial hardship. You can demonstrate this through bank statements showing sufficient funds, education loan sanctions from recognized banks, or sponsor declarations with CA-certified financial documents. The funds must be readily available and not tied up in investments. For a typical 2-year Master\'s program, you would need to show approximately NZD $40,000 for living expenses plus your tuition fees for the entire program duration.',
    category: 'Financial',
    icon: DollarSign,
  },
  {
    id: 'pswv-duration',
    question: 'NZ Post-Study Work Visa duration?',
    answer: 'The New Zealand Post-Study Work Visa (PSWV) duration depends on your qualification level. Bachelor\'s degree graduates (NQF Level 7 and above) receive a 3-year open work visa, which is the longest post-study work visa among English-speaking countries. This is significantly better than Australia\'s 2-year PSW, UK\'s 2-year Graduate Route, or Canada\'s variable PGWP duration. Diploma graduates (Level 5-6) typically receive 1-2 years depending on their program. The PSWV is an open work visa, meaning you can work for any employer in any role without needing sponsorship or job offers. This extended work period gives you ample time to gain professional experience, build your career, and potentially qualify for the Skilled Migrant Category residence pathway. The 3-year duration is particularly valuable as it allows you to establish yourself professionally and financially in New Zealand.',
    category: 'Post-Study',
    icon: Briefcase,
  },
  {
    id: 'spouse-work',
    question: 'Can spouse work in NZ?',
    answer: 'Yes, partners and spouses of eligible student visa holders in New Zealand can apply for an open work visa that allows full-time employment with any employer. This is a significant advantage of studying in New Zealand compared to other countries. Your partner\'s work visa is typically valid for the same duration as your student visa, and they can work in any role without restrictions. This means your partner can contribute to household income, gain work experience, and build their career while you study. The open work visa doesn\'t require a job offer or employer sponsorship, making it easy for your partner to find employment. This dual-income opportunity makes studying in New Zealand more affordable and provides a strong foundation for your family\'s future in the country. If you transition to a Post-Study Work Visa after graduation, your partner can also apply for a corresponding work visa.',
    category: 'Work Rights',
    icon: Users,
  },
  // New FAQs from EXPANDED_FAQ_AND_GLOSSARY.md
  {
    id: 'inz-credibility-interview',
    question: 'What is an INZ credibility interview?',
    answer: 'An INZ credibility interview is a formal assessment conducted by Immigration New Zealand to verify whether your intention to study in New Zealand is genuine, realistic, and lawful. Indian students are frequently selected for this interview because India is considered a higher-risk source country, making credibility assessment a standard part of the visa process rather than an exception. The interview focuses on five core areas: your academic background, relevance of the chosen course, financial capacity, understanding of New Zealand as a study destination, and post-study intentions. Visa officers assess whether your academic progression makes sense, whether your funds are legitimate and accessible, and whether your career plans align logically with your qualification. Interviews are usually conducted online or by phone and can last 15–30 minutes. Inconsistent answers, vague career plans, or unclear financial explanations are the most common reasons students fail credibility checks. Importantly, officers compare your interview responses with your SOP, application form, and supporting documents. Structured preparation using personalised questions significantly improves performance. Practising realistic interview scenarios helps you communicate confidently, stay consistent, and demonstrate genuine intent clearly.',
    category: 'Interview',
    icon: Shield,
  },
  {
    id: 'gte-explained',
    question: 'What is Genuine Temporary Entry (GTE)?',
    answer: 'Genuine Temporary Entry (GTE) is a core evaluation used by Immigration New Zealand to determine whether you genuinely intend to study in New Zealand for a legitimate educational purpose. It does not prohibit future migration, but it requires that your current intention is lawful, transparent, and aligned with student visa conditions. INZ evaluates GTE by reviewing your academic history, employment background, financial stability, family ties in India, and long-term career plans. Officers look for logical progression—such as a relevant bachelor\'s degree followed by a master\'s program—and clear justification for choosing New Zealand over other countries. Your Statement of Purpose and credibility interview responses play a decisive role in GTE assessment. Any contradiction between documents, unrealistic salary expectations, or unexplained career shifts may weaken your case. Strong applications clearly explain how the qualification benefits your career in India or internationally while respecting visa conditions. Demonstrating GTE is about clarity, consistency, and credibility—not memorised answers.',
    category: 'Visa Process',
    icon: Shield,
  },
  {
    id: 'required-documents',
    question: 'What documents are required for a New Zealand student visa?',
    answer: 'A New Zealand student visa requires a complete set of academic, financial, and personal documents. Submitting accurate and consistent documentation is critical, as incomplete or unclear files are a major cause of visa delays and refusals. Key documents include a valid passport (with at least six months\' validity beyond your intended stay), an Offer of Place from an NZQA-approved institution, proof of tuition fee payment, and evidence of Funds to Support (NZD $20,000 per year for living expenses). Financial evidence typically includes six months of bank statements, education loan sanction letters (if applicable), sponsor declarations, CA certificates, and Income Tax Returns for the last three years. Additional mandatory documents include a Statement of Purpose, medical examination results submitted via eMedical, and a Police Clearance Certificate for study durations exceeding 24 months. All documents must be genuine, clearly scanned, and mutually consistent. Early preparation and professional document review reduce the risk of credibility concerns.',
    category: 'Documents',
    icon: FileText,
  },
  {
    id: 'online-application',
    question: 'How do I apply for a New Zealand student visa online?',
    answer: 'New Zealand student visa applications are submitted entirely online through Immigration New Zealand\'s portal using a RealMe account. You can apply only after receiving an Offer of Place and paying the required tuition fees. The process involves creating a RealMe account, completing the online student visa form, uploading all required documents, and paying the visa application fee of NZD $375 (approximately ₹19,500). After submission, you will be instructed to provide biometrics at a VFS Global centre in India and complete a medical examination with an INZ-approved panel physician. INZ may request additional documents or schedule a credibility interview depending on your profile. Standard processing time is 25–30 working days, though applications submitted during peak intake periods (January–March) may take longer. Submitting a complete and well-explained application from the beginning significantly improves processing efficiency.',
    category: 'Visa Process',
    icon: Clock,
  },
  {
    id: 'visa-refusal-reasons',
    question: 'What are common reasons for New Zealand student visa refusal?',
    answer: 'Most New Zealand student visa refusals occur due to credibility or financial concerns rather than academic ability. The most common reason is failure to satisfy the Genuine Temporary Entry requirement, often caused by unclear career goals, weak academic progression, or inconsistent interview responses. Financial issues are another major factor. Insufficient funds, unexplained large deposits, unreliable sponsors, or poorly documented education loans frequently lead to refusals. Discrepancies between your SOP, financial documents, and interview answers raise serious red flags. Health and character issues—such as failing medical requirements or submitting an incorrect Police Clearance Certificate—can also result in refusal. Importantly, many refusals are preventable with honest documentation, realistic planning, and proper interview preparation. Understanding INZ expectations early is the most effective way to minimise refusal risk.',
    category: 'Visa Process',
    icon: Shield,
  },
];

export default function NZVisaFAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
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
        "name": "FAQ",
        "item": "https://ai.eecglobal.com/nzvisaprep/faq/"
      }
    ]
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 mb-6">
            <HelpCircle className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            NZ Student Visa <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">FAQ</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Get answers to common questions about New Zealand student visas, INZ interviews, and visa requirements.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          <Accordion className="w-full">
            {faqData.map((faq) => {
              const Icon = faq.icon;
              return (
                <AccordionItem
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 mb-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-4 w-full">
                      <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {faq.question}
                        </h3>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="pl-14">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Related Pages */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/nzvisaprep/glossary/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">Learn key terms and definitions for NZ student visas</p>
            </a>
            <a
              href="/nzvisaprep/preparation-guide/"
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
              <p className="text-slate-600 dark:text-slate-400">Step-by-step guide for visa application and interview</p>
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
            <h2 className="text-2xl font-black mb-4">Still have questions?</h2>
            <p className="text-indigo-100 mb-6">
              Our AI-powered NZ Visa Prep tool can help you prepare for your INZ credibility interview.
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
