'use client';

import { Shield, GraduationCap, Briefcase, FileText, DollarSign, Lightbulb, Home, CreditCard, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

// Data extracted from GSGuide.tsx, GSInterviewQuestionsGuide.tsx, and GSSOPGuide.tsx
const gsPillars = [
  {
    id: 'pillar-1',
    pillar: 'Pillar 1',
    title: 'Unbreakable Ties to Home',
    icon: Home,
    description: 'Demonstrate significant financial, family, and social ties that act as a strong incentive for you to return to India after your studies are complete.',
    question: 'What are your father\'s retirement plans and who will manage the family\'s assets while you are away?',
    redFlag: 'My family will support me, and I\'ll see what happens after my course. Maybe I\'ll stay, maybe I\'ll come back.',
  },
  {
    id: 'pillar-2',
    pillar: 'Pillar 2',
    title: 'Academic Justification',
    icon: GraduationCap,
    description: 'Provide clear, logical reasons for choosing Australia, your specific university, and course. The course must be a credible academic and career progression.',
    question: 'You studied Commerce. Why are you now pursuing a Master of Data Science? Explain the connection.',
    redFlag: 'I just want to study in Australia, and this course was available and seemed interesting.',
  },
  {
    id: 'pillar-3',
    pillar: 'Pillar 3',
    title: 'The Career Blueprint',
    icon: Briefcase,
    description: 'Explain how this course will concretely benefit your future career, referencing specific skills, job roles, and salary expectations back in India.',
    question: 'What specific job titles will you be eligible for in India with this degree, and what is the expected salary range?',
    redFlag: 'I\'ll get a good job in an MNC somewhere in India. The salary will be high.',
  },
  {
    id: 'pillar-4',
    pillar: 'Pillar 4',
    title: 'Credibility & History',
    icon: CreditCard,
    description: 'Your past visa applications and travel history will be examined. Any refusals must be explained honestly, clearly, and without evasion.',
    question: 'I see your US visa was refused in 2022. Can you explain the exact circumstances of that refusal?',
    redFlag: 'It was a small misunderstanding about my documents; it\'s not important now.',
  },
  {
    id: 'pillar-5',
    pillar: 'Pillar 5',
    title: 'Financial Soundness',
    icon: DollarSign,
    description: 'Prove you have genuine, accessible funds held for a sufficient period (min. 3 months). The origin of all funds must be transparent and verifiable.',
    question: 'Your father\'s ITR shows an income of 12 lakhs, but you\'re showing 40 lakhs in savings. Where did these funds originate?',
    redFlag: 'The money was deposited by my uncle last month just for the visa application.',
  },
  {
    id: 'pillar-6',
    pillar: 'Pillar 6',
    title: 'Applicant\'s Research',
    icon: Lightbulb,
    description: 'Demonstrate a deep knowledge of your course structure, university facilities, and student visa conditions (like work rights), proving you are a serious applicant.',
    question: 'Which specific modules in your course curriculum are most relevant to your career goals and why?',
    redFlag: 'I haven\'t looked at the modules yet, but I\'m sure they are good. I researched the university ranking.',
  },
];

const interviewCategories = [
  {
    id: 'background',
    title: 'Background and Motivation',
    icon: HelpCircle,
    questions: [
      'Why did you choose Australia instead of other countries like the UK, Canada, or the USA?',
      'How did you learn about this university/college and your course?',
      'Why are you not studying this course in India?',
      'What motivated you to study this particular field?',
      'What do you know about the city and state where your campus is located?',
    ],
  },
  {
    id: 'course',
    title: 'Course and Institution Knowledge',
    icon: GraduationCap,
    questions: [
      'What is the name and duration of your course?',
      'What are the main subjects or units in your course?',
      'What are the entry requirements for your course?',
      'How does this course align with your previous studies or work experience?',
      'Why did you select this university/college instead of others in Australia?',
    ],
  },
  {
    id: 'career',
    title: 'Career Plans',
    icon: Briefcase,
    questions: [
      'What are your career goals after completing this course?',
      'How will this course help you achieve your future career plans?',
      'Will you return to India after completing your studies? Why or why not?',
      'What type of job and salary do you expect after completing the course?',
      'Can you name a few companies in India that you\'d like to work for?',
    ],
  },
  {
    id: 'financial',
    title: 'Financial Capacity',
    icon: DollarSign,
    questions: [
      'Who is sponsoring your education?',
      'What is their occupation and annual income?',
      'How much is your tuition fee and living cost per year?',
      'Have you paid any tuition fees or OSHC (health insurance) yet?',
      'Can you explain how you will manage your funds during your studies?',
    ],
  },
  {
    id: 'family',
    title: 'Family and Personal Circumstances',
    icon: Home,
    questions: [
      'Who are your family members, and what do they do?',
      'Do you have any relatives or friends in Australia?',
      'Have you or your family ever applied for an Australian visa before?',
      'How will you stay in touch with your family while studying in Australia?',
    ],
  },
  {
    id: 'visa-conditions',
    title: 'Understanding of Visa Conditions',
    icon: Shield,
    questions: [
      'Are you aware of the work rights on your student visa?',
      'What are your obligations as an international student in Australia?',
      'What will you do if your visa application is refused?',
      'What will you do if you face academic difficulty during your studies?',
    ],
  },
  {
    id: 'post-graduation',
    title: 'Post-Graduation and Long-Term Intent',
    icon: Briefcase,
    questions: [
      'Do you plan to apply for post-study work (PSW) visa after graduation?',
      'How long is the PSW visa for your qualification?',
      'Would you like to apply for permanent residency in Australia?',
      'How does studying in Australia help you contribute back to India?',
    ],
  },
];

const visaRequirements = [
  {
    title: 'Confirmation of Enrolment (CoE)',
    description: 'A mandatory document from your Australian university confirming your place in a registered course.',
    icon: FileText,
  },
  {
    title: 'Genuine Student (GS) Requirement',
    description: 'You must prove your primary intention is to study in Australia temporarily and articulate clear benefits for your career in India.',
    icon: Shield,
  },
  {
    title: 'Overseas Student Health Cover (OSHC)',
    description: 'You must have and maintain adequate health insurance for the entire duration of your stay in Australia.',
    icon: Shield,
  },
  {
    title: 'English Language Proficiency',
    description: 'Evidence of your English skills through a recognized test like IELTS, PTE, or TOEFL is required.',
    icon: FileText,
  },
  {
    title: 'Financial Capacity Evidence',
    description: 'Proof of sufficient funds to cover your tuition fees, travel costs, and 12 months of living expenses.',
    icon: DollarSign,
  },
  {
    title: 'Health & Character Requirements',
    description: 'You must meet specific health criteria and be of good character, which may require a medical exam and police certificates.',
    icon: Shield,
  },
];

const sopChecklist = {
  do: [
    'Be specific (units, labs, city facts, Indian employers, rupee figures).',
    'Show a credible, India-anchored career path.',
    'Quantify fees/funds and name documents you\'re attaching.',
  ],
  dont: [
    'Center the SOP on part-time work, migration intent, or vague "PR plans."',
    'Copy generic web lines; match to your course/provider profile.',
  ],
};

export default function PreparationGuidePage() {
  // HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare for Australian GS Interview',
    description: 'Step-by-step guide to prepare for the Australian Genuine Student (GS) visa interview',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Understand the GS Requirement',
        text: 'Learn about the six critical pillars of the Genuine Student requirement.',
      },
      {
        '@type': 'HowToStep',
        name: 'Prepare for Interview Questions',
        text: 'Practice answering questions across seven key categories.',
      },
      {
        '@type': 'HowToStep',
        name: 'Write Your Statement of Purpose',
        text: 'Craft a compelling SOP that demonstrates genuine student intent.',
      },
      {
        '@type': 'HowToStep',
        name: 'Gather Required Documents',
        text: 'Ensure you have all necessary documents for your visa application.',
      },
    ],
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Complete Guide to Australian GS Interview Preparation',
    description: 'Comprehensive guide covering the GS requirement, interview questions, SOP writing, and visa requirements.',
    author: {
      '@type': 'Organization',
      name: 'EEC (Enbee Education Center Private Limited)',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EEC Global',
      logo: {
        '@type': 'ImageObject',
        url: 'https://eecglobal.com/wp-content/uploads/2022/10/EEC-Logo.svg',
      },
    },
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
        name: 'Preparation Guide',
        item: 'https://ai.eecglobal.com/australiagsprep/preparation-guide',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            Preparation Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive guide to prepare for your Australian Genuine Student (GS) visa interview and application.
          </p>
        </header>

        {/* Section 1: GS Pillars */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            The Six Critical Pillars of GS
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
            A visa officer builds a case file on you. Here are the six critical pillars they will scrutinize to determine your fate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gsPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {pillar.pillar}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                    {pillar.description}
                    {' '}
                    <a href="/australiagsprep/glossary/#gs" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Learn more about GS requirement</a>.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-2 text-sm">
                      <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-900 dark:text-white">Visa Officer Asks:</strong> "{pillar.question}"
                      </p>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-900 dark:text-white">Red Flag:</strong> "{pillar.redFlag}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Interview Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            Interview Question Categories
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Be prepared for these common questions, which are designed to test every aspect of your Genuine Student profile.
          </p>
          <div className="space-y-4">
            {interviewCategories.map((category) => {
              const Icon = category.icon;
              return (
                <details
                  key={category.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category.title}</h3>
                    </div>
                  </summary>
                  <div className="mt-4 pl-14">
                    <ol className="space-y-2 list-decimal list-inside text-slate-600 dark:text-slate-400">
                      {category.questions.map((q, i) => (
                        <li key={i} className="text-sm">{q}</li>
                      ))}
                    </ol>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* Section 3: Visa Requirements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Visa Requirements at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visaRequirements.map((req, i) => {
              const Icon = req.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{req.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {req.description}
                      {req.title.includes('CoE') && ' '}
                      {req.title.includes('CoE') && <a href="/australiagsprep/glossary/#coe" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Learn more</a>}
                      {req.title.includes('OSHC') && ' '}
                      {req.title.includes('OSHC') && <a href="/australiagsprep/glossary/#oshc" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Learn more</a>}
                      {req.title.includes('Financial') && ' '}
                      {req.title.includes('Financial') && <a href="/australiagsprep/resources/#visa-checklist" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">See checklist</a>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: SOP Checklist */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            SOP Writing Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl border-2 border-green-200 dark:border-green-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">DO</h3>
              </div>
              <ul className="space-y-3">
                {sopChecklist.do.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl border-2 border-red-200 dark:border-red-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                <h3 className="text-2xl font-bold text-red-800 dark:text-red-300">DON'T</h3>
              </div>
              <ul className="space-y-3">
                {sopChecklist.dont.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

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
              href="/australiagsprep/glossary/"
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Learn key terms and definitions related to Australian student visas.
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
