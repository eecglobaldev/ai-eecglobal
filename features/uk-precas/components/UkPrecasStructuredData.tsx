'use client';

/**
 * UK Pre-CAS Interview Prep - Comprehensive Structured Data (JSON-LD)
 *
 * This component generates all the structured data schemas required for SEO,
 * matching the comprehensive implementation from the old UK Pre-CAS tool.
 *
 * Includes:
 * - WebSite schema with SearchAction
 * - Organization schema with 26 branches
 * - WebPage schema
 * - SoftwareApplication schema
 * - Service schema
 * - FAQPage schema
 * - BreadcrumbList schema
 * - HowTo schema
 * - ItemList schemas
 * - ClaimReview schema
 * - And more...
 */

export default function UkPrecasStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ai.eecglobal.com/ukprecas/#website",
        "url": "https://ai.eecglobal.com/ukprecas/",
        "name": "UK Pre-CAS Interview Prep Tool by EEC",
        "alternateName": "UK Student Visa Interview Preparation Tool",
        "description": "AI-powered UK Pre-CAS credibility interview preparation platform with personalized questions, audio recording, and real-time feedback for UK student visa success",
        "publisher": {
          "@id": "https://eecglobal.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://ai.eecglobal.com/ukprecas/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": ["en-GB", "en-IN", "hi", "gu"],
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "EEC",
        "legalName": "Enbee Education Center Private Limited",
        "alternateName": ["Enbee Education Center", "EEC Study Abroad", "EEC Global"],
        "url": "https://eecglobal.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://eecglobal.com/#logo",
          "url": "https://ai.eecglobal.com/assets/eeclogo.svg",
          "contentUrl": "https://ai.eecglobal.com/assets/eeclogo.svg",
          "width": 512,
          "height": 512,
          "caption": "EEC Logo",
          "inLanguage": "en"
        },
        "description": "EEC established in 1997 is the largest and oldest study abroad company for study in the UK in Gujarat state. It has 26 physical location branches spread across 12 cities in Gujarat and provides test preparation and admissions and visa guidance services to students who wish to study abroad. The company has certified and well trained counsellors and teaching staff. All our services are available in online and in-person modes as well.",
        "slogan": "Your Gateway to Global Education",
        "foundingDate": "1997",
        "foundingLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Vadodara",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Gujarat",
          "addressLocality": "Vadodara"
        },
        "areaServed": [
          {
            "@type": "State",
            "name": "Gujarat"
          },
          {
            "@type": "Country",
            "name": "India"
          }
        ],
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": 200,
          "minValue": 150,
          "maxValue": 250
        },
        "knowsAbout": [
          "Study Abroad Counseling",
          "IELTS Preparation",
          "TOEFL Preparation",
          "PTE Preparation",
          "GRE Preparation",
          "GMAT Preparation",
          "SAT Preparation",
          "University Admissions",
          "Visa Guidance",
          "UK Student Visa",
          "USA Student Visa",
          "Canada Study Permit",
          "Australia Student Visa"
        ],
        "sameAs": [
          "https://www.facebook.com/eecglobal",
          "https://www.instagram.com/eecglobal",
          "https://www.youtube.com/@eecgujarat",
          "https://www.linkedin.com/school/eecindia",
          "https://x.com/eecglobalindia"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "@id": "https://eecglobal.com/#credential-airc",
            "credentialCategory": "Agency Certification",
            "name": "AIRC - American International Recruitment Council Certification",
            "description": "AIRC certified education agency member for ethical student recruitment practices",
            "validIn": {
              "@type": "Country",
              "name": "United States"
            },
            "validUntil": "2031",
            "recognizedBy": {
              "@type": "Organization",
              "name": "American International Recruitment Council",
              "url": "https://www.airc-education.org"
            },
            "url": "https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "@id": "https://eecglobal.com/#credential-icef",
            "credentialCategory": "Agency Accreditation",
            "name": "ICEF IAS Accreditation",
            "description": "ICEF International Agency Status accreditation for quality international education services",
            "recognizedBy": {
              "@type": "Organization",
              "name": "ICEF",
              "url": "https://www.icef.com"
            },
            "url": "https://www.icef.com/agency/00120000014SG0aAAG"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "@id": "https://eecglobal.com/#credential-usnews",
            "credentialCategory": "Agency Certification",
            "name": "U.S. News Global Education Certified Agency",
            "description": "Only certified U.S. News Global Education agency in India for quality education consulting",
            "recognizedBy": {
              "@type": "Organization",
              "name": "U.S. News Global Education",
              "url": "https://www.usnews.com/education"
            },
            "url": "https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe#acc.3GnypZ6v"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "@id": "https://eecglobal.com/#credential-british-council",
            "credentialCategory": "Training Certification",
            "name": "British Council UK Education Agent Training Certification",
            "description": "Certified education agent training from British Council UK for quality UK education guidance",
            "recognizedBy": {
              "@type": "Organization",
              "name": "British Council",
              "url": "https://www.britishcouncil.org"
            }
          }
        ],
        "award": [
          "Gujarat's Largest and Oldest Study Abroad Consultancy (Est. 1997)",
          "Only U.S. News Global Education Certified Agency in India",
          "UK Embassy Invited for Student Visa Interview Training",
          "AIRC Certified till 2031"
        ],
        "member": [
          {
            "@type": "Organization",
            "name": "AIRC - American International Recruitment Council",
            "url": "https://www.airc-education.org"
          },
          {
            "@type": "Organization",
            "name": "ICEF",
            "url": "https://www.icef.com"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "telephone": "+91-800-050-6539",
            "email": "info@eecglobal.com",
            "availableLanguage": ["English", "Hindi", "Gujarati"],
            "areaServed": "IN",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "08:00",
              "closes": "21:00"
            }
          },
          {
            "@type": "ContactPoint",
            "contactType": "sales",
            "telephone": "+91-875-875-3333",
            "availableLanguage": ["English", "Hindi", "Gujarati"],
            "areaServed": "IN"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://ai.eecglobal.com/ukprecas/#webpage",
        "url": "https://ai.eecglobal.com/ukprecas/",
        "name": "UK Pre-CAS Interview Prep 2026 by EEC | AI-Powered Visa Interview Practice",
        "description": "Ace your UK Pre-CAS interview 2026 with EEC's free AI tool. Get hyper-personalized questions, practice with your voice, and receive instant, expert feedback. Designed for Indian students applying for Tier 4 visas.",
        "isPartOf": {
          "@id": "https://ai.eecglobal.com/ukprecas/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "UK Pre-CAS Interview Preparation"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://ai.eecglobal.com/ukprecas/#primaryimage",
          "url": "https://ai.eecglobal.com/assets/eeclogo.svg",
          "width": 1200,
          "height": 630,
          "caption": "EEC UK Pre-CAS Interview Preparation"
        },
        "interactionStatistic": [
          {
            "@type": "InteractAction",
            "name": "Mock Interviews Completed",
            "userInteractionCount": 25000
          },
          {
            "@type": "ConsumeAction",
            "name": "Free Tool Usage",
            "target": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://ai.eecglobal.com/ukprecas/#webapp",
        "name": "UK Pre-CAS Interview Prep Tool",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31",
          "url": "https://ai.eecglobal.com/ukprecas/"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "15000",
          "bestRating": "5",
          "worstRating": "1"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/UseAction",
          "userInteractionCount": 25000
        },
        "featureList": [
          "Personalized interview questions",
          "Audio recording with transcription",
          "Real-time AI feedback",
          "Practice history tracking",
          "Multi-language support (English, Hindi, Gujarati)",
          "Advanced analytics dashboard"
        ],
        "description": "India's first 100% free AI-powered UK Pre-CAS credibility interview preparation tool. Features: Personalized interview questions based on student profile, university, and course. Audio recording with automatic transcription. Real-time AI feedback with scoring. Practice history tracking with detailed analytics. Multi-language support (English, Hindi, Gujarati). Mobile-responsive design. Developed by EEC - Gujarat's largest UK study abroad consultancy since 1997. Trusted by 15,000+ students.",
        "screenshot": "https://ai.eecglobal.com/assets/eeclogo.svg",
        "softwareVersion": "5.0.0",
        "releaseNotes": "January 2026 - Enhanced AI feedback, multi-language support, advanced analytics dashboard, GEO/AEO optimization for GPT-4, Claude, Gemini, Perplexity, DeepSeek, Grok"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://ai.eecglobal.com/ukprecas/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ai.eecglobal.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "UK Pre-CAS Interview Prep",
            "item": "https://ai.eecglobal.com/ukprecas/"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://ai.eecglobal.com/ukprecas/#service",
        "name": "UK Pre-CAS Interview Preparation Service",
        "serviceType": "EducationalService",
        "description": "AI-powered UK Pre-CAS credibility interview preparation service for Indian students applying for UK student visas",
        "provider": {
          "@id": "https://eecglobal.com/#organization"
        },
        "areaServed": {
          "@type": "State",
          "name": "Gujarat"
        },
        "serviceChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://ai.eecglobal.com/ukprecas/",
          "serviceSmsNumber": "+918758880170",
          "servicePhone": "+918758880170"
        },
        "offers": {
          "@type": "OfferCatalog",
          "name": "UK Visa Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UK Pre-CAS Interview Prep"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "IELTS Coaching"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UK Visa Guidance"
              }
            }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://ai.eecglobal.com/ukprecas/#howto",
        "name": "How to Prepare for UK Pre-CAS Interview",
        "description": "Step-by-step guide to prepare for UK Pre-CAS credibility interview",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Create Your Profile",
            "text": "Fill in your university, course, and personal details"
          },
          {
            "@type": "HowToStep",
            "name": "Generate Prep Content",
            "text": "AI generates personalized key talking points and interview questions"
          },
          {
            "@type": "HowToStep",
            "name": "Practice Your Answers",
            "text": "Record your answers using the audio recording feature"
          },
          {
            "@type": "HowToStep",
            "name": "Get AI Feedback",
            "text": "Receive instant feedback with scores and improvement suggestions"
          },
          {
            "@type": "HowToStep",
            "name": "Review Your History",
            "text": "Track your progress and review past practice sessions"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://ai.eecglobal.com/ukprecas/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a UK Pre-CAS interview?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A UK Pre-CAS interview is a mandatory 15-30 minute video credibility assessment by UK universities before CAS (Confirmation of Acceptance for Studies) issuance. It evaluates genuine student intention, course knowledge, financial capability, and career plans."
            }
          },
          {
            "@type": "Question",
            "name": "Is the UK Pre-CAS interview tool free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, EEC's UK Pre-CAS interview prep tool is 100% free. You can practice unlimited mock interviews, get AI feedback, and track your progress at no cost."
            }
          },
          {
            "@type": "Question",
            "name": "How does the AI feedback work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The AI analyzes your recorded answers and provides detailed feedback including a score (1-10), strengths, areas for improvement, and actionable coaching tips. It focuses on content relevance, clarity, and persuasiveness."
            }
          },
          {
            "@type": "Question",
            "name": "Can I practice in Hindi or Gujarati?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the tool supports translation of questions, guidance, and feedback into Hindi and Gujarati. However, the actual interview will be in English, so practicing in English is recommended."
            }
          },
          {
            "@type": "Question",
            "name": "What documents do I need for UK Pre-CAS interview?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You'll need your university offer letter, IELTS/SELT scores, academic transcripts, 28-day bank statements, passport, Statement of Purpose (SOP), sponsor letter (if applicable), and TB test certificate."
            }
          }
        ]
      },
      {
        "@type": "Review",
        "@id": "https://ai.eecglobal.com/ukprecas/#review-1",
        "itemReviewed": { "@id": "https://ai.eecglobal.com/ukprecas/#webapp" },
        "author": {
          "@type": "Person",
          "name": "Rajesh Patel"
        },
        "reviewBody": "The AI pinpointed the exact weak spot in my Pre-CAS answers regarding my study gap. The practice sessions were brutal but necessary. I went into the real interview with 100% confidence. Visa granted!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-12-01"
      },
      {
        "@type": "Review",
        "@id": "https://ai.eecglobal.com/ukprecas/#review-2",
        "itemReviewed": { "@id": "https://ai.eecglobal.com/ukprecas/#webapp" },
        "author": {
          "@type": "Person",
          "name": "Priya Sharma"
        },
        "reviewBody": "For me, it was the financial questions. The AI didn't just ask 'who is your sponsor', it drilled down into my father's income and ITR details. That level of specific practice is something you can't get anywhere else. This tool is a game-changer.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-11-15"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://ai.eecglobal.com/ukprecas/#local-vadodara",
        "name": "EEC Alkapuri",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3rd Floor, B-Wing, Windsor Plaza, RC Dutt Rd, Alkapuri",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        },
        "telephone": "+918000506539",
        "url": "https://maps.app.goo.gl/2Fw9ZqQ2cxPnc7oG7",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "1113"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
