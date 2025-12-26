/**
 * ============================================================================
 * EEC LSI SEMANTIC CONTENT ENGINE - STUNNING UI EDITION
 * ============================================================================
 * 
 * This component naturally injects semantically related keywords with:
 * - Stunning glassmorphism design
 * - Rich topical content blocks
 * - Success stories with social proof
 * - LSI-enriched text for Google understanding
 * 
 * NOTE: Trust signals consolidated to EEATEnhancement.tsx to avoid duplication
 * 
 * ============================================================================
 */

import React from 'react';
import { 
  CheckCircle, 
  Star, 
  Shield, 
  Globe,
  MapPin,
  MessageCircle,
  Zap,
  Sparkles,
  Quote,
  ArrowRight,
  GraduationCap,
  Award,
  Target,
  TrendingUp,
  Briefcase
} from 'lucide-react';

// =============================================================================
// LSI KEYWORD ENRICHED CONTENT SECTIONS
// =============================================================================

const LSI_CONTENT_BLOCKS = [
  {
    id: 'why-nz',
    title: 'Why Indian Students Choose Aotearoa New Zealand',
    subtitle: 'World-Class Education in Paradise',
    icon: Globe,
    gradient: 'from-blue-600 via-cyan-500 to-teal-500',
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    content: [
      {
        heading: 'World-Class Kiwi Education System',
        points: [
          'All 8 New Zealand universities ranked in QS World University Rankings',
          'NZQA (New Zealand Qualifications Authority) ensures globally recognized qualifications',
          'Research-intensive tertiary education with strong industry connections',
          'Practical, hands-on learning approach in polytechnics and wānanga',
        ],
        lsiKeywords: ['nzqa qualifications', 'tertiary education nz', 'kiwi education', 'research university', 'polytechnic nz'],
      },
      {
        heading: 'Exceptional Post-Study Career Opportunities',
        points: [
          '3-year Post-Study Work Visa (PSWV) for degree graduates',
          'Pathway to Skilled Migrant Category and permanent residency',
          'Low unemployment rate and high demand for skilled workers',
          'Partner/spouse can work full-time on open work visa',
        ],
        lsiKeywords: ['pswv new zealand', 'skilled migrant category', 'pr pathway nz', 'work rights student'],
      },
    ],
  },
  {
    id: 'inz-interview-tips',
    title: 'Mastering the INZ Credibility Assessment',
    subtitle: 'Expert Strategies for Visa Success',
    icon: Shield,
    gradient: 'from-purple-600 via-violet-500 to-indigo-500',
    bgPattern: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    content: [
      {
        heading: 'Understanding Genuine Temporary Entry (GTE)',
        points: [
          'Immigration NZ assesses your genuine intent to study and return',
          'Demonstrate strong ties to India - family, property, career prospects',
          'Explain logical course progression from previous education',
          'Show clear post-study plans including return to home country',
        ],
        lsiKeywords: ['genuine temporary entry', 'gte assessment', 'immigration nz intent', 'ties to home country', 'return intent visa'],
      },
      {
        heading: 'Financial Credibility Requirements',
        points: [
          'Funds to Support (FTS) scheme proof for living expenses',
          'Source of funds documentation - CA certificate, ITR, bank statements',
          'Sponsor relationship and capacity verification',
          'Education loan approval letters if applicable',
        ],
        lsiKeywords: ['fts scheme nz', 'source of funds visa', 'sponsor documentation', 'ca certificate visa', 'financial capacity proof'],
      },
    ],
  },
  {
    id: 'ai-tool-features',
    title: 'AI-Powered Preparation Technology',
    subtitle: "India's First Free NZ Visa Prep Tool",
    icon: Zap,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    content: [
      {
        heading: 'Hyper-Personalized Question Generation',
        points: [
          'AI analyzes your complete profile for targeted question generation',
          'Questions based on your specific university, course, and background',
          'Dynamic questions for married applicants and family visa scenarios',
          'Special attention to previous visa refusal recovery strategies',
        ],
        lsiKeywords: ['ai visa prep', 'personalized interview questions', 'dynamic question generation', 'profile analysis'],
      },
      {
        heading: 'Expert Model Answers with Formatting',
        points: [
          'Detailed answers crafted by ENZRA certified counselors',
          'Key points highlighted for emphasis during real interview',
          'Warning indicators for sensitive topics to handle carefully',
          'Multiple language support - English, Hindi, Gujarati',
        ],
        lsiKeywords: ['model answers visa', 'enzra certified guidance', 'interview answer template', 'bilingual support'],
      },
    ],
  },
  {
    id: 'eec-advantage',
    title: 'The EEC & ESTERO Partnership Advantage',
    subtitle: 'Official NZ University Representative in Gujarat',
    icon: Award,
    logoUrl: 'https://media.licdn.com/dms/image/v2/D4D0BAQHCF_kNj5hHpw/company-logo_200_200/company-logo_200_200/0/1698639843503/estero_nz_ltd_logo?e=1767225600&v=beta&t=zCmnMPbA6NLvOtXAT-tNsiJ-nKao-20YrWTGz55jLqA',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    bgPattern: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    content: [
      {
        heading: 'Exclusive Official Representation',
        points: [
          'ESTERO NZ - Official representative of all 8 NZ universities in Gujarat',
          'Access to 35+ NZ institutions and 1,300+ course options',
          'Direct admission pathways and scholarship negotiations',
          'ENZRA (Education New Zealand Recognized Agency) certified team',
        ],
        lsiKeywords: ['estero nz partnership', 'official university representative', 'direct admission nz', 'enzra agent'],
      },
      {
        heading: 'Local Presence Across Gujarat',
        points: [
          '26 branches across 12 cities for in-person support',
          '28+ years of study abroad expertise since 1997',
          '100,000+ students successfully guided abroad',
          'Counselors available in English, Hindi, and Gujarati',
        ],
        lsiKeywords: ['study abroad gujarat', 'local education consultant', 'in person counseling', 'gujarati support'],
      },
    ],
  },
];

// =============================================================================
// TESTIMONIAL/SUCCESS STORIES DATA
// =============================================================================

const SUCCESS_STORIES = [
  {
    quote: "The AI-generated questions were exactly what the INZ visa officer asked me! I practiced with this free tool and felt completely prepared for my credibility interview.",
    author: "Vidhi Shiyani",
    details: "University of Auckland, MBA Student",
    location: "Ahmedabad",
    rating: 5,
    image: "/assets/studentimg/female1.png",
    keywords: ['inz interview', 'credibility interview preparation', 'auckland mba'],
  },
  {
    quote: "As a married applicant, I had complex questions about my spouse's plans. The AI tool specifically prepared me for family-related visa questions. Got approved!",
    author: "Hritik Shah",
    details: "Massey University, Engineering",
    location: "Surat",
    rating: 5,
    image: "/assets/studentimg/male1.png",
    keywords: ['married applicant visa', 'spouse visa nz', 'massey university'],
  },
  {
    quote: "The financial questions preparation was invaluable. I could confidently explain my FTS scheme documentation and sponsor details to the officer.",
    author: "Sneha Desai",
    details: "Victoria University, Law",
    location: "Vadodara",
    rating: 5,
    image: "/assets/studentimg/female2.png",
    keywords: ['fts financial questions', 'sponsor documentation', 'victoria law'],
  },
];

// =============================================================================
// STUNNING CONTENT BLOCK COMPONENT
// =============================================================================

const ContentBlock: React.FC<{ block: typeof LSI_CONTENT_BLOCKS[0]; index: number }> = ({ block, index }) => {
  const Icon = block.icon;
  const isEven = index % 2 === 0;
  
  return (
    <article 
      className={`relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10 hover:-translate-y-1 group`}
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${block.gradient} opacity-10 rounded-bl-[150px] transition-transform duration-700 group-hover:scale-110`} />
      
      <div className="flex flex-col lg:flex-row h-full relative z-10">
        {/* Header Section */}
        <div className={`relative p-5 sm:p-7 lg:p-10 lg:w-1/3 flex flex-col justify-between overflow-hidden`}>
          {/* <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-[0.03]`} /> */}
          {/* <div className={`absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.8),transparent)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.05),transparent)]`} /> */}
          
          <div>

              {block.logoUrl ? (
                <img src={block.logoUrl} alt={block.title} className="h-16 object-contain rounded-xl mb-8" />
              ) : (
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${block.gradient} flex items-center justify-center shadow-lg mb-8`}>

                <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
             </div>
              )}
            
            <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight" itemProp="headline" data-speakable="true">
              {block.title}
            </h3>
            <p className={`text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r ${block.gradient}`}>
              {block.subtitle}
            </p>
          </div>
          
          <div className="mt-12 hidden lg:block">
            <div className="w-12 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex-1 p-5 sm:p-7 lg:p-10 lg:pl-0 space-y-10">
          {block.content.map((section, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-4 mb-6">
                <span className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sm font-black text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700`}>
                  0{idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-xl tracking-tight">
                  {section.heading}
                </h4>
              </div>
              
              <ul className="grid sm:grid-cols-2 gap-4 ml-[3.25rem]">
                {section.points.map((point, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed group/item"
                  >
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${block.gradient} flex-shrink-0 group-hover/item:scale-150 transition-transform`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {/* Hidden LSI keywords for search engines */}
              <meta itemProp="keywords" content={section.lsiKeywords.join(', ')} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

// =============================================================================
// STUNNING TESTIMONIAL CARD
// =============================================================================

const TestimonialCard: React.FC<{ story: typeof SUCCESS_STORIES[0] }> = ({ story }) => (
  <blockquote 
    className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    itemScope
    itemType="https://schema.org/Review"
  >
    {/* Quote Icon */}
    <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
      <Quote className="h-5 w-5 text-white" />
    </div>
    
    {/* Stars */}
    <div className="flex gap-1 mb-4 pt-2">
      {[...Array(story.rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
      ))}
    </div>
    
    

    {/* Quote */}
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6" itemProp="reviewBody">
      "{story.quote}"
    </p>
    
    {/* Author */}
    <footer className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-2xl">
          <img src={story.image} alt={story.author} className="w-full h-full object-cover rounded-full" />
      </div>
      <div>
        <cite className="not-italic">
          <span className="font-bold text-slate-900 dark:text-white block" itemProp="author">
            {story.author}
          </span>
          <span className="text-sm text-indigo-600 dark:text-indigo-400">{story.details}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {story.location}, Gujarat
          </span>
        </cite>
      </div>
    </footer>
    
    
    <meta itemProp="itemReviewed" content="NZ Visa Prep AI Tool" />
    <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="hidden">
      <meta itemProp="ratingValue" content={String(story.rating)} />
      <meta itemProp="bestRating" content="5" />
    </div>
  </blockquote>
);

// =============================================================================
// MAIN LSI CONTENT COMPONENT
// =============================================================================

export const LSIContent: React.FC = () => {
  return (
    <section 
      className="mt-20 py-20 lg:py-32 relative overflow-hidden"
      aria-labelledby="lsi-content-heading"
    >
      {/* Stunning Background */}
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-[#0B1021] -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white mb-8 shadow-lg shadow-indigo-500/10">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold tracking-widest uppercase">Semantic Knowledge Graph</span>
          </div>
          
          <h2 
            id="lsi-content-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white"
            data-speakable="true"
          >
            Everything About{' '} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              NZ Student Visa
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Comprehensive guidance on <strong className="text-indigo-600 dark:text-indigo-400">New Zealand student visa</strong> preparation, 
            <strong className="text-purple-600 dark:text-purple-400"> INZ credibility interviews</strong>, and 
            <strong className="text-pink-600 dark:text-pink-400"> post-study opportunities</strong>.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-12 mb-24">
          {LSI_CONTENT_BLOCKS.map((block, index) => (
            <ContentBlock key={block.id} block={block} index={index} />
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="relative">
          {/* Section Divider */}
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="px-6 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Star className="h-3.5 w-3.5 text-amber-500" />
              <span>Student Success Stories</span>
              <Star className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SUCCESS_STORIES.map((story, idx) => (
              <TestimonialCard key={idx} story={story} />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 relative overflow-hidden rounded-[2.5rem] bg-indigo-600">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
          
          <div className="relative p-12 lg:p-20 text-center">
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Start Your Free NZ Visa Preparation Today
            </h3>
            <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of Indian students who used this <strong>free AI tool</strong> to prepare for their 
              <strong> INZ credibility interview</strong> and successfully got their New Zealand student visa.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#setup-form"
                className="group inline-flex items-center gap-3 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Zap className="h-5 w-5 fill-indigo-600" />
                Start Free Preparation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://wa.me/918758750036"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LSIContent;
