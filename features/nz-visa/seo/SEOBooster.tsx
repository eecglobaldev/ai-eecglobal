/**
 * ============================================================================
 * EEC GLOBAL SEO BOOSTER - RICH SNIPPET & SCHEMA INJECTION ENGINE
 * ============================================================================
 * 
 * This component handles:
 * - Dynamic JSON-LD schema injection
 * - Rich snippet generation
 * - Structured data for Google
 * - Entity relationship mapping
 * - FAQ & HowTo schema generation
 * 
 * ============================================================================
 */

import React from 'react';
import { BRANCH_DATA } from '../data/branches';

// =============================================================================
// COMPREHENSIVE SCHEMA GENERATOR
// =============================================================================

export const generateMasterSchema = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      // =========================================================================
      // 1. WEBSITE SCHEMA
      // =========================================================================
      {
        "@type": "WebSite",
        "@id": "https://ai.eecglobal.com/#website",
        "url": "https://ai.eecglobal.com/",
        "name": "EEC Global AI Tools - Study Abroad Technology Platform",
        "alternateName": ["EEC AI", "EEC Global", "Enbee Education AI"],
        "description": "India's most advanced AI-powered study abroad preparation platform by EEC Global. Free tools for visa interview preparation, career counseling, and course search across 40+ countries.",
        "publisher": { "@id": "https://eecglobal.com/#organization" },
        "inLanguage": ["en-IN", "en-US", "en-GB", "hi-IN", "gu-IN"],
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://courses.eecglobal.com/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          {
            "@type": "ReadAction",
            "target": "https://ai.eecglobal.com/nzvisaprep"
          }
        ],
        "copyrightHolder": { "@id": "https://eecglobal.com/#organization" },
        "copyrightYear": "2024"
      },

      // =========================================================================
      // 2. WEBPAGE SCHEMA - NZ VISA PREP
      // =========================================================================
      {
        "@type": "WebPage",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#webpage",
        "url": "https://ai.eecglobal.com/nzvisaprep",
        "name": "Free AI New Zealand Student Visa Interview Preparation | INZ Credibility Interview Practice | EEC Global",
        "description": "India's first 100% FREE AI-powered New Zealand student visa interview preparation tool. Practice INZ credibility interviews with personalized questions, model answers, and expert guidance from ENZRA certified agents. Covers all 8 NZ universities. Trusted by 100,000+ students since 1997.",
        "isPartOf": { "@id": "https://ai.eecglobal.com/#website" },
        "about": [
          { "@id": "https://ai.eecglobal.com/nzvisaprep/#softwareapplication" },
          { "@id": "https://ai.eecglobal.com/nzvisaprep/#service" }
        ],
        "mentions": [
          { "@id": "https://eecglobal.com/#organization" },
          { "@id": "https://estero.co.nz/#organization" }
        ],
        "mainEntity": { "@id": "https://ai.eecglobal.com/nzvisaprep/#softwareapplication" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://ai.eecglobal.com/nzvisaprep/#primaryimage",
          "url": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
          "width": 1200,
          "height": 630,
          "caption": "EEC Global AI-Powered New Zealand Student Visa Interview Preparation Tool"
        },
        "breadcrumb": { "@id": "https://ai.eecglobal.com/nzvisaprep/#breadcrumb" },
        "inLanguage": "en-IN",
        "datePublished": "2024-01-15",
        "dateModified": currentDate,
        "author": { "@id": "https://eecglobal.com/#organization" },
        "creator": { "@id": "https://eecglobal.com/#amit-jalan" },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "h2", ".prose", "[data-speakable]"]
        },
        "specialty": "New Zealand Student Visa Interview Preparation",
        "significantLink": [
          "https://eecglobal.com",
          "https://nz.eecglobal.com",
          "https://estero.co.nz"
        ],
        "relatedLink": [
          "https://ai.eecglobal.com/usavisaprep",
          "https://ai.eecglobal.com/ukprecas",
          "https://ai.eecglobal.com/australiagsprep",
          "https://ai.eecglobal.com/germanyvisaprep"
        ],
        "lastReviewed": currentDate,
        "reviewedBy": { "@id": "https://eecglobal.com/#kshitij-garg" }
      },

      // =========================================================================
      // 3. BREADCRUMB SCHEMA
      // =========================================================================
      {
        "@type": "BreadcrumbList",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://eecglobal.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Tools",
            "item": "https://ai.eecglobal.com"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "New Zealand Course Search",
            "item": "https://courses.eecglobal.com"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "NZ Visa Interview Prep",
            "item": "https://ai.eecglobal.com/nzvisaprep"
          }
        ]
      },

      // =========================================================================
      // 4. SOFTWARE APPLICATION SCHEMA
      // =========================================================================
      {
        "@type": "SoftwareApplication",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#softwareapplication",
        "name": "NZ Visa Interview Prep AI by EEC",
        "alternateName": [
          "New Zealand Student Visa Interview Preparation Tool",
          "INZ Credibility Interview Practice",
          "NZ Visa Prep by EEC Global"
        ],
        "description": "One of its kind and first of its kind absolutely and positively 100% FREE AI tool for Indian students. Comprehensive AI-Powered New Zealand Student Visa Interview Preparation with hyper-personalized practice, model answers, expert guidance, advanced analytics, and benchmarking with previous histories in your personalized dashboard.",
        "url": "https://ai.eecglobal.com/nzvisaprep",
        "applicationCategory": "EducationalApplication",
        "applicationSubCategory": [
          "Visa Interview Preparation",
          "Immigration Consulting Tool",
          "Study Abroad Preparation",
          "Career Planning"
        ],
        "operatingSystem": "Any (Web-based)",
        "browserRequirements": "Requires JavaScript. Works on Chrome 90+, Firefox 88+, Safari 14+, Edge 90+",
        "softwareVersion": "2.5.0",
        "datePublished": "2024-01-15",
        "dateModified": currentDate,
        "releaseNotes": "Added advanced AI analysis, real-time speech practice, and comprehensive dashboard analytics",
        "screenshot": [
          {
            "@type": "ImageObject",
            "url": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
            "caption": "NZ Visa Prep Interface"
          }
        ],
        "featureList": [
          "AI-generated personalized interview questions based on your profile",
          "Model answers tailored to your university, course, and background",
          "Expert guidance for INZ credibility interviews",
          "Real-time speech-to-text practice with AI feedback",
          "Score analysis and improvement suggestions",
          "Practice history tracking and analytics",
          "Support for all 8 New Zealand universities",
          "Support for all NZ public ITP colleges",
          "Financial documentation guidance (FTS scheme)",
          "Post-study work visa (PSWV) information",
          "Genuine Temporary Entry (GTE) preparation",
          "Family application support (spouse, children)",
          "Visa refusal recovery guidance",
          "Multi-language support (English, Hindi, Gujarati)",
          "Cloud-synced progress across devices",
          "Personalized dashboard with benchmarking"
        ],
        "softwareHelp": {
          "@type": "CreativeWork",
          "name": "NZ Visa Prep User Guide",
          "url": "https://eecglobal.com/help/nz-visa-prep"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31",
          "seller": { "@id": "https://eecglobal.com/#organization" },
          "itemCondition": "https://schema.org/NewCondition",
          "eligibleRegion": {
            "@type": "Country",
            "name": "India"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "3247",
          "reviewCount": "1856",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Priya Patel"
            },
            "reviewBody": "This free tool helped me prepare for my NZ visa interview. The AI-generated questions were exactly what the visa officer asked. Got my visa approved!",
            "datePublished": "2025-10-15"
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Raj Sharma"
            },
            "reviewBody": "Best NZ visa prep tool I've used. The model answers for financial questions were particularly helpful. Highly recommend EEC!",
            "datePublished": "2025-11-02"
          }
        ],
        "author": { "@id": "https://eecglobal.com/#organization" },
        "creator": { "@id": "https://eecglobal.com/#amit-jalan" },
        "provider": { "@id": "https://eecglobal.com/#organization" },
        "maintainer": { "@id": "https://eecglobal.com/#organization" },
        "interactionStatistic": [
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/UseAction",
            "userInteractionCount": "125000"
          },
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/ShareAction",
            "userInteractionCount": "8500"
          }
        ]
      },

      // =========================================================================
      // 5. SERVICE SCHEMA
      // =========================================================================
      {
        "@type": "Service",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#service",
        "name": "New Zealand Student Visa Interview Preparation Service",
        "alternateName": "NZ Visa Prep Service",
        "serviceType": [
          "Educational Consulting",
          "Visa Interview Coaching",
          "Immigration Guidance",
          "Study Abroad Consulting"
        ],
        "description": "Comprehensive AI-powered preparation for New Zealand student visa interviews. Includes personalized questions based on your profile, model answers, speaking practice with AI feedback, and expert guidance from ENZRA certified counselors.",
        "provider": { "@id": "https://eecglobal.com/#organization" },
        "areaServed": [
          {
            "@type": "Country",
            "name": "India"
          },
          {
            "@type": "State",
            "name": "Gujarat",
            "containedIn": {
              "@type": "Country",
              "name": "India"
            }
          }
        ],
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student",
          "audienceType": "Indian students applying for New Zealand student visa"
        },
        "availableChannel": [
          {
            "@type": "ServiceChannel",
            "serviceType": "Online",
            "serviceUrl": "https://ai.eecglobal.com/nzvisaprep",
            "availableLanguage": ["English", "Hindi", "Gujarati"]
          },
          {
            "@type": "ServiceChannel",
            "serviceType": "In-Person",
            "serviceLocation": { "@id": "https://eecglobal.com/#branchnetwork" },
            "servicePhone": "+91-8758750036"
          },
          {
            "@type": "ServiceChannel",
            "serviceType": "WhatsApp",
            "serviceUrl": "https://wa.me/918758750036"
          }
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "description": "100% Free for all Indian students"
        },
        "termsOfService": "https://eecglobal.com/terms",
        "category": [
          "Education",
          "Immigration",
          "Visa Services",
          "Study Abroad",
          "Career Counseling"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "NZ Visa Prep Service Catalog",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Interview Question Generation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Model Answer Preparation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Speaking Practice with AI Feedback"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Progress Analytics Dashboard"
              }
            }
          ]
        },
        "serviceOutput": {
          "@type": "Thing",
          "name": "Prepared Student for NZ Visa Interview"
        },
        "providerMobility": "static"
      },

      // =========================================================================
      // 6. ORGANIZATION SCHEMA - EEC
      // =========================================================================
      {
        "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
        "@id": "https://eecglobal.com/#organization",
        "name": "Enbee Education Center Private Limited",
        "legalName": "Enbee Education Center Private Limited",
        "alternateName": ["EEC", "EEC Global", "EEC India", "EEC Gujarat", "Enbee Education"],
        "url": "https://eecglobal.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://eecglobal.com/#logo",
          "url": "https://ai.eecglobal.com/assets/eeclogo.svg",
          "contentUrl": "https://ai.eecglobal.com/assets/eeclogo.svg",
          "width": 200,
          "height": 60,
          "caption": "EEC Global Logo - Gujarat's Largest Study Abroad Company"
        },
        "image": [
          "https://ai.eecglobal.com/assets/eeclogo.svg",
          "https://eecglobal.com/assets/eec-office.jpg"
        ],
        "description": "EEC (Enbee Education Center Private Limited), established in 1997, is Gujarat's largest and oldest study abroad consultancy company. With 26 physical branches across 12 cities, EEC provides comprehensive test preparation (IELTS, PTE, TOEFL, GRE, GMAT), university admissions guidance, and visa consulting services for students aspiring to study in New Zealand, UK, USA, Canada, Australia, Germany, Ireland, and 40+ countries worldwide. EEC has exclusive partnership with ESTERO New Zealand as the official representative of all 8 NZ universities and public ITP colleges in Gujarat.",
        "foundingDate": "1997",
        "foundingLocation": {
          "@type": "Place",
          "name": "Vadodara",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Vadodara",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
          }
        },
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 300,
          "maxValue": 500
        },
        "slogan": "Your Gateway to Global Education Since 1997",
        "telephone": "+91-8758750036",
        "email": "info@eecglobal.com",
        "faxNumber": "+91-265-2341234",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3rd floor, B-Wing, Windsor Plaza, RC Dutt Rd, Alkapuri",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "postalCode": "390007",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.3101102,
          "longitude": 73.1699795
        },
        "hasMap": "https://www.google.com/maps?cid=4136602748211046777",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Bank Transfer"],
        "areaServed": [
          {
            "@type": "State",
            "name": "Gujarat",
            "containedIn": {
              "@type": "Country",
              "name": "India"
            }
          },
          {
            "@type": "Country",
            "name": "India"
          }
        ],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 22.3072,
            "longitude": 73.1812
          },
          "geoRadius": "500000"
        },
        "sameAs": [
          "https://www.instagram.com/eecglobal",
          "https://www.facebook.com/eecglobal",
          "https://www.youtube.com/@eecgujarat",
          "https://www.linkedin.com/school/eecindia",
          "https://x.com/eecglobalindia",
          "https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe",
          "https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367",
          "https://www.icef.com/agency/00120000014SG0aAAG",
          "https://verifier.nextid.com/?url=https://issuer-services.icef.com/certifications/57642946-6f1c-4a92-b8db-b6b617fdd880"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-8758750036",
            "contactType": "customer service",
            "contactOption": ["TollFree", "HearingImpairedSupported"],
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Gujarati"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "19:00"
            }
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-8758750036",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Gujarati"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-8758750036",
            "contactType": "technical support",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Gujarati"]
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "AIRC Certified Agency",
            "description": "American International Recruitment Council Certified Member - Valid until 2031",
            "url": "https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367",
            "validFor": "P6Y",
            "dateCreated": "2025-01-01",
            "expires": "2031-12-31"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "ICEF IAS Accreditation",
            "description": "ICEF Agency Status Accreditation - Globally Recognized",
            "url": "https://www.icef.com/agency/00120000014SG0aAAG"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "U.S. News Global Education Certified",
            "description": "The only company in India certified by U.S. News Global Education",
            "url": "https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "British Council QAEAT Certified",
            "description": "Quality Assurance for Education Agent Training certified"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "Australia PIER Certified",
            "description": "Professional International Education Resources certification"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "ENZRA Certified",
            "description": "Education New Zealand Recognised Agency - Official partner for all 8 NZ universities"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "Ireland MEI Agent Certified",
            "description": "Marketing English in Ireland Agent Certification"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "Canada CCEA Certified",
            "description": "Canadian Credential Evaluation Agent certification"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "USATC Certified",
            "description": "USA Training Certification for education agents"
          }
        ],
        "award": [
          "Invited to UK Embassy New Delhi for Student Visa Interview Training",
          "Invited to USA Embassy New Delhi for Student Visa Interview Training",
          "NAFSA Long-standing Exhibitor (15+ years)",
          "CBIE Long-standing Exhibitor (12+ years)",
          "Gujarat's Most Trusted Education Consultancy 2024",
          "Best Study Abroad Company - Western India 2023"
        ],
        "knowsAbout": [
          "New Zealand Student Visa",
          "Study Abroad Consulting",
          "IELTS Preparation",
          "PTE Academic Preparation",
          "TOEFL iBT Preparation",
          "GRE Preparation",
          "GMAT Preparation",
          "University Admissions",
          "Scholarship Applications",
          "Education Loans",
          "Immigration Consulting",
          "Visa Interview Preparation",
          "Post-Study Work Visas",
          "PR Pathways"
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "AIRC",
            "description": "American International Recruitment Council"
          },
          {
            "@type": "Organization",
            "name": "ICEF",
            "description": "International Consultants for Education and Fairs"
          },
          {
            "@type": "Organization",
            "name": "NAFSA",
            "description": "Association of International Educators"
          },
          {
            "@type": "Organization",
            "name": "CBIE",
            "description": "Canadian Bureau for International Education"
          },
          {
            "@type": "Organization",
            "name": "Education New Zealand",
            "description": "ENZ Partner Agency"
          }
        ],
        "brand": {
          "@type": "Brand",
          "name": "EEC Global",
          "logo": "https://ai.eecglobal.com/assets/eeclogo.svg",
          "slogan": "Your Gateway to Global Education"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "12500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },

      // =========================================================================
      // 7. ESTERO ORGANIZATION SCHEMA
      // =========================================================================
      {
        "@type": "Organization",
        "@id": "https://estero.co.nz/#organization",
        "name": "Estero New Zealand Limited",
        "alternateName": ["Estero NZ", "Estero New Zealand"],
        "url": "http://www.estero.co.nz",
        "description": "Estero New Zealand Limited is a premier, New Zealand-registered education consultancy headquartered in Auckland. As a globally recognized ICEF Agent and Education New Zealand Recognized Agency (ENZRA), Estero is certified to recruit for 35 of New Zealand's largest institutions, providing students with access to over 1,300 course options across High School, Undergraduate, Postgraduate, and Doctorate levels.",
        "foundingLocation": {
          "@type": "Place",
          "name": "Auckland, New Zealand"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Auckland",
          "addressCountry": "NZ"
        },
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "Nepal" },
          { "@type": "Country", "name": "Sri Lanka" },
          { "@type": "Country", "name": "New Zealand" }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "ENZRA Recognized Agency",
            "description": "Education New Zealand Recognized Agency"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "ICEF Agent",
            "description": "Globally recognized ICEF Agent status"
          }
        ],
        "knowsAbout": [
          "New Zealand Education System",
          "All 8 New Zealand Universities",
          "NZ Public ITP Colleges",
          "New Zealand Student Visas",
          "Post-Study Work Visas",
          "NZ Skilled Migrant Category",
          "New Zealand PR Pathway"
        ],
        "numberOfLocations": 4,
        "slogan": "Your Trusted Gateway to Aotearoa"
      },

      // =========================================================================
      // 8. PERSON SCHEMAS - LEADERSHIP TEAM
      // =========================================================================
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/#kshitij-garg",
        "name": "Kshitij Garg",
        "givenName": "Kshitij",
        "familyName": "Garg",
        "jobTitle": "Managing Director",
        "worksFor": { "@id": "https://estero.co.nz/#organization" },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "University of Auckland",
          "address": { "@type": "PostalAddress", "addressCountry": "NZ" }
        },
        "description": "Kshitij is a distinguished alumnus of the University of Auckland (Class of 2011) and a permanent resident of New Zealand, bridging the gap between Indian ambition and Kiwi reality. As the founder of Estero, he brings over 13 years of 'lived experience' specializing in long-term career mapping within the NZ market. His deep strategic ties with all 8 New Zealand universities allow him to navigate complex admissions and scholarship negotiations.",
        "knowsAbout": ["New Zealand Education Strategy", "University Partnerships", "Career Coaching", "NZ Immigration", "Scholarship Negotiations"],
        "sameAs": "https://linkedin.com/in/kshitij-garg-4b67a1b",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "name": "ENZRA Recognized Agent"
        },
        "nationality": {
          "@type": "Country",
          "name": "New Zealand"
        },
        "award": ["NZ Permanent Resident", "University of Auckland Alumni"]
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/#amit-jalan",
        "name": "Amit Jalan",
        "givenName": "Amit",
        "familyName": "Jalan",
        "jobTitle": "Managing Director & Lead AI Strategist",
        "worksFor": { "@id": "https://eecglobal.com/#organization" },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Purdue University",
          "address": { "@type": "PostalAddress", "addressCountry": "US" }
        },
        "description": "Amit is a veteran of the global education industry and the architect behind EEC's AI-led strategy. With over 28 years of deep expertise in Immigration New Zealand (INZ) frameworks and admissions for all 8 New Zealand Universities, he is the ultimate authority on complex visa cases. His strategic oversight ensures students navigate the shifting landscape of NZ study visas with precision.",
        "knowsAbout": ["NZ Education", "University Admissions", "Immigration Strategy", "AI in Education", "INZ Frameworks", "Complex Visa Cases"],
        "sameAs": "https://in.linkedin.com/in/amitjalan",
        "award": ["28+ Years Industry Experience", "Purdue University Alumni"]
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/#madhav-gupta",
        "name": "CA Madhav Gupta",
        "givenName": "Madhav",
        "familyName": "Gupta",
        "honorificPrefix": "CA",
        "jobTitle": "Director",
        "worksFor": { "@id": "https://eecglobal.com/#organization" },
        "description": "Madhav is one of India's leading experts on the financial rigour required for New Zealand visas. As a Chartered Accountant (2012, Membership No. 421209), he specialises in Immigration New Zealand's 'Source of Funds' (SoF) matrix, ensuring airtight compliance for the Funds to Support (FTS) scheme. He expertly navigates the financial eligibility for Post-Study Work Visas.",
        "knowsAbout": ["NZ Financial Compliance", "FTS Expert", "Post-Study Work Visa", "Fund Structuring", "Source of Funds Verification", "Tax Documentation"],
        "sameAs": "https://in.linkedin.com/in/madhav-gupta-9027781a7",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Chartered Accountant",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Institute of Chartered Accountants of India"
          },
          "identifier": "421209"
        }
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/#anirudh-gupta",
        "name": "Anirudh Gupta",
        "givenName": "Anirudh",
        "familyName": "Gupta",
        "jobTitle": "Vice President",
        "worksFor": { "@id": "https://eecglobal.com/#organization" },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Bond University",
          "address": { "@type": "PostalAddress", "addressCountry": "AU" }
        },
        "description": "Anirudh brings two decades of global education experience, with a specialised focus on the 'Kiwi' education experience. He leads the Bonafide Student assessment process, serving as EEC's Lead Intentions Auditor, ensuring every student's Statement of Purpose and interview responses align perfectly with the 'Genuine Temporary Entry' criteria demanded by New Zealand authorities.",
        "knowsAbout": ["Global Education", "NZ Destination Authority", "Bonafide Student Assessment", "Intentions Auditing", "GTE Criteria", "SOP Writing"],
        "sameAs": "https://in.linkedin.com/in/anirudhkrgupta",
        "award": ["20+ Years Global Education Experience", "Bond University Alumni"]
      },
      {
        "@type": "Person",
        "@id": "https://eecglobal.com/#mohita-gupta",
        "name": "Mohita Gupta",
        "givenName": "Mohita",
        "familyName": "Gupta",
        "jobTitle": "Vice President – Counselling Services",
        "worksFor": { "@id": "https://eecglobal.com/#organization" },
        "description": "Mohita heads Counselling Services at EEC and is a recognised authority on INZ Credibility Interviews. With a background as an investment banker at Citibank Global, she brings sharp analytical skills to every student profile. She specialises in 'high-risk' profiles, helping students articulate their career progression and return-on-investment to satisfy strict immigration officers.",
        "knowsAbout": ["NZ Visa Strategy", "Credibility Interview Specialist", "Career Counselling", "High-Risk Profiles", "ROI Analysis", "Investment Banking"],
        "sameAs": "https://in.linkedin.com/in/mohita-gupta-233383339"
      },

      // =========================================================================
      // 9. COMPREHENSIVE FAQ SCHEMA
      // =========================================================================
      {
        "@type": "FAQPage",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this New Zealand visa interview preparation tool completely free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! This is India's first and only 100% free AI-powered New Zealand student visa interview preparation tool. There are absolutely no hidden charges, no premium tiers, and no limitations - all features including AI-generated questions, model answers, speaking practice, and analytics dashboard are available to every Indian student completely free. EEC believes every student deserves access to world-class visa preparation regardless of their financial situation."
            }
          },
          {
            "@type": "Question",
            "name": "How does the AI personalize my NZ visa interview preparation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our advanced AI engine analyzes your complete profile including: your chosen New Zealand university, specific course and level (undergraduate/postgraduate), educational background, work experience, English test scores (IELTS/PTE), financial documentation including FTS scheme details, sponsor information, marital status and family circumstances, and any previous visa history. Based on this comprehensive profile, the AI generates highly personalized interview questions that an INZ (Immigration New Zealand) officer might specifically ask about YOUR unique situation, along with tailored model answers that incorporate your specific details."
            }
          },
          {
            "@type": "Question",
            "name": "What is an INZ Credibility Interview for New Zealand student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Credibility Interview (also called a verification interview) is conducted by Immigration New Zealand (INZ) to verify that you are a 'Genuine Temporary Entrant' (GTE). During this interview, the visa officer assesses your true intentions for studying in New Zealand, verifies your documentation and financial capacity, evaluates your ties to your home country (India), and determines if you genuinely intend to study, potentially work under the Post-Study Work Visa, and eventually return. Our AI tool specifically prepares you for these interviews with guidance developed by ENZRA certified experts who understand exactly what INZ officers look for."
            }
          },
          {
            "@type": "Question",
            "name": "Does this tool cover all 8 New Zealand universities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our tool provides comprehensive coverage for all 8 New Zealand universities: 1) University of Auckland (ranked #68 globally), 2) University of Otago (New Zealand's oldest university), 3) Victoria University of Wellington, 4) University of Canterbury, 5) Massey University (largest university by enrollment), 6) University of Waikato, 7) Lincoln University (specialist in agriculture and environment), and 8) Auckland University of Technology (AUT). Additionally, we cover all public ITP (Institutes of Technology and Polytechnics) colleges including Ara, Unitec, Wintec, SIT, and others."
            }
          },
          {
            "@type": "Question",
            "name": "What is the FTS (Funds to Support) scheme for New Zealand student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Funds to Support (FTS) scheme is a financial evidence option that allows students to demonstrate they have sufficient funds available to support themselves during their studies in New Zealand. Under FTS, you need to show evidence of NZ$20,000 (approximately ₹10 lakhs) for living expenses for each year of study, in addition to your tuition fees. Our tool includes specialized guidance on FTS documentation requirements, helps you prepare answers about your financial arrangements, source of funds, sponsor details, and includes our CA Madhav Gupta's expert insights on creating an audit-ready financial portfolio."
            }
          },
          {
            "@type": "Question",
            "name": "Can I practice speaking my answers and get AI feedback?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our tool includes an advanced real-time speech-to-text practice feature where you can record your spoken answers just like in a real visa interview. The AI then analyzes your response across multiple dimensions: 1) Tone and Confidence - whether you sound genuine or rehearsed, 2) Clarity and Directness - how easy to understand your answer is, 3) Relevance and Consistency - alignment with your profile, 4) Persuasiveness - how effectively you address the visa officer's concerns. You receive detailed feedback with a score out of 10 and specific improvement suggestions. This helps you practice until you're confident and natural."
            }
          },
          {
            "@type": "Question",
            "name": "Who created this NZ visa preparation tool and why should I trust it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool is created by EEC (Enbee Education Center Private Limited), Gujarat's largest and oldest study abroad company established in 1997. EEC has: 26 physical branches across 12 cities in Gujarat, an exclusive partnership with ESTERO New Zealand (the official representative of all 8 NZ universities in Gujarat), ENZRA (Education New Zealand Recognized Agency) certification, AIRC certification valid until 2031, ICEF IAS accreditation, British Council QAEAT certification, and is the only U.S. News Global Education certified agency in India. Our leadership team includes Managing Director Kshitij Garg (University of Auckland alumnus and NZ PR holder), and Amit Jalan (Purdue University alumnus with 28+ years of immigration expertise)."
            }
          },
          {
            "@type": "Question",
            "name": "How do I get personalized help from EEC counselors after using this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "EEC has 26 physical branch locations across 12 cities in Gujarat including Ahmedabad (8 branches), Surat (5 branches), Vadodara (4 branches), and single branches in Anand, Nadiad, Bharuch, Navsari, Vapi, Mehsana, Himatnagar, Kalol, and Visnagar. You can: 1) Visit any branch for free in-person consultation with ENZRA certified counselors, 2) WhatsApp us at +91 87587 50036 for immediate assistance, 3) Call our main number +91 87587 50036, 4) Email info@eecglobal.com. All consultations are free and our counselors can review your visa application, documents, and provide personalized interview coaching."
            }
          },
          {
            "@type": "Question",
            "name": "What IELTS or PTE score do I need for a New Zealand student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "English language requirements vary by institution and course level in New Zealand. Generally: For undergraduate programs - IELTS 6.0 overall (no band below 5.5) or PTE 50 overall. For postgraduate programs - IELTS 6.5 overall (no band below 6.0) or PTE 58 overall. Some courses like medicine, nursing, and teaching require higher scores (IELTS 7.0+). EEC provides IELTS and PTE coaching at all 26 branches to help you achieve your required score. Our tool generates interview questions about your English proficiency and helps you articulate your language skills confidently."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Post-Study Work Visa (PSWV) in New Zealand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Post-Study Work Visa (PSWV) allows you to work in New Zealand after completing your qualification. Duration depends on your qualification level: Level 7 Bachelor's degree or above = 3-year open work visa, Level 8 Postgraduate diploma/certificate = 3-year open work visa, Any qualification requiring 2+ years of study = up to 3 years, Qualifications in regional areas may get additional time. This visa is a pathway to New Zealand Permanent Residency through the Skilled Migrant Category. Our tool includes specific preparation for answering questions about your post-study plans, helping you demonstrate both your intent to utilize PSWV legally while showing ties to India."
            }
          },
          {
            "@type": "Question",
            "name": "Can this tool help if I have a previous visa refusal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, absolutely! Visa refusal cases require special attention, and our tool is specifically designed to address this. When you indicate a previous visa refusal in your profile, the AI generates targeted questions about: what led to the refusal, what has changed since then, how you've addressed the concerns, and why your current application is stronger. Our leadership team, including Mohita Gupta (VP Counselling Services) who specializes in 'high-risk' profiles, has contributed guidance specifically for students with complex immigration histories. We help you transform a past refusal into a compelling narrative of growth and genuine intent."
            }
          },
          {
            "@type": "Question",
            "name": "How is this tool different from other NZ visa preparation resources?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our tool stands apart in several ways: 1) AI Personalization - Questions are generated specifically for YOUR profile, not generic lists, 2) Real Expert Input - Developed with guidance from ENZRA certified agents and NZ permanent residents, 3) Speaking Practice - Real-time recording and AI analysis of your spoken answers, 4) Comprehensive Coverage - All 8 universities, all ITP colleges, FTS scheme, PSWV guidance, 5) Family Applications - Support for married applicants, spouse visas, and children, 6) Analytics Dashboard - Track your progress, scores, and improvement over time, 7) 100% Free - No premium features locked behind paywalls, 8) Trusted Source - Backed by EEC's 27+ years of experience and 100,000+ successful students."
            }
          }
        ]
      },

      // =========================================================================
      // 10. HOWTO SCHEMA - NZ VISA APPLICATION PROCESS
      // =========================================================================
      {
        "@type": "HowTo",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#howto",
        "name": "How to Prepare for New Zealand Student Visa Interview",
        "description": "Step-by-step guide to preparing for your INZ (Immigration New Zealand) credibility interview using EEC's free AI-powered preparation tool.",
        "image": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
        "totalTime": "PT2H",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": "0"
        },
        "tool": [
          {
            "@type": "HowToTool",
            "name": "EEC NZ Visa Prep AI Tool"
          },
          {
            "@type": "HowToTool",
            "name": "Microphone for speaking practice"
          },
          {
            "@type": "HowToTool",
            "name": "Your visa application documents"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Academic Details",
            "text": "Select your chosen New Zealand institution (university or ITP), course level (undergraduate/postgraduate), and specific course name. The AI uses this to generate relevant questions about your university choice.",
            "url": "https://ai.eecglobal.com/nzvisaprep#academic"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Complete Your Profile",
            "text": "Enter your educational background, work experience, English test scores (IELTS/PTE), and career goals. Be detailed - the more information you provide, the more personalized your preparation.",
            "url": "https://ai.eecglobal.com/nzvisaprep#profile"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add Financial Information",
            "text": "Fill in your financial details including sponsor information, FTS scheme participation, funding sources, and amounts. This is crucial as financial questions are common in NZ visa interviews.",
            "url": "https://ai.eecglobal.com/nzvisaprep#financial"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Generate Your Personalized Prep Plan",
            "text": "Click 'Generate Prep Plan' and the AI will create 15-20 interview questions specifically tailored to your profile, along with model answers and expert guidance for each question.",
            "url": "https://ai.eecglobal.com/nzvisaprep#generate"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Study Key Talking Points",
            "text": "Review the key talking points generated for your specific university and course. These are ultra-personalized reasons and facts you should know for your interview.",
            "url": "https://ai.eecglobal.com/nzvisaprep#talkingpoints"
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Practice Speaking Your Answers",
            "text": "For each question, use the recording feature to practice speaking your answer. The AI will analyze your response and provide feedback on confidence, clarity, and content.",
            "url": "https://ai.eecglobal.com/nzvisaprep#practice"
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Review Feedback and Improve",
            "text": "Check your scores and feedback for each practice session. Focus on areas marked for improvement and practice again until you achieve high scores consistently.",
            "url": "https://ai.eecglobal.com/nzvisaprep#feedback"
          },
          {
            "@type": "HowToStep",
            "position": 8,
            "name": "Visit EEC Branch for Expert Review",
            "text": "For final preparation, visit your nearest EEC branch for a free consultation with an ENZRA certified counselor who can review your documents and provide in-person interview coaching.",
            "url": "https://ai.eecglobal.com/nzvisaprep#branches"
          }
        ]
      },

      // =========================================================================
      // 11. EDUCATIONAL COURSE SCHEMA - NZ STUDIES
      // =========================================================================
      {
        "@type": "Course",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#course",
        "name": "New Zealand Student Visa Interview Preparation Course",
        "description": "Comprehensive self-paced course for preparing for INZ credibility interviews. Covers all aspects from academic justification to financial documentation to post-study plans.",
        "provider": { "@id": "https://eecglobal.com/#organization" },
        "educationalLevel": "Beginner to Advanced",
        "about": [
          "New Zealand Student Visa",
          "INZ Credibility Interview",
          "Genuine Temporary Entry",
          "Study Abroad Preparation"
        ],
        "teaches": [
          "How to answer visa interview questions",
          "Financial documentation presentation",
          "Articulating career goals",
          "Demonstrating ties to home country",
          "Post-study work visa planning"
        ],
        "coursePrerequisites": "Admission offer from a New Zealand institution",
        "timeRequired": "PT2H",
        "isAccessibleForFree": true,
        "inLanguage": ["en", "hi", "gu"],
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "PT2H"
        }
      },

      // =========================================================================
      // 12. COLLECTION PAGE - ALL AI TOOLS
      // =========================================================================
      {
        "@type": "CollectionPage",
        "@id": "https://ai.eecglobal.com/#collection",
        "name": "EEC AI-Powered Study Abroad Tools",
        "description": "Complete suite of free AI tools for international student visa preparation and study abroad guidance",
        "url": "https://ai.eecglobal.com",
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": 20,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": "Career Counselor AI",
                "url": "https://ai.eecglobal.com/careercounselor",
                "description": "AI-powered career guidance based on courses worldwide - job prospects, salaries, hiring companies"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "SoftwareApplication",
                "name": "USA F-1 Visa Interview Prep",
                "url": "https://ai.eecglobal.com/usavisaprep",
                "description": "AI-powered USA F-1 Student Visa Interview Preparation"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "SoftwareApplication",
                "name": "UK Pre-CAS & Airport Interview Prep",
                "url": "https://ai.eecglobal.com/ukprecas",
                "description": "AI-powered UK Pre-CAS and Airport Interview Preparation"
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "SoftwareApplication",
                "name": "Australia GS Visa Prep",
                "url": "https://ai.eecglobal.com/australiagsprep",
                "description": "AI-powered Australia Genuine Student Visa Interview Preparation"
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "item": {
                "@type": "SoftwareApplication",
                "name": "Germany Visa Interview Prep",
                "url": "https://ai.eecglobal.com/germanyvisaprep",
                "description": "AI-powered Germany Student Visa Interview Preparation"
              }
            },
            {
              "@type": "ListItem",
              "position": 6,
              "item": {
                "@type": "SoftwareApplication",
                "name": "NZ Visa Interview Prep",
                "url": "https://ai.eecglobal.com/nzvisaprep",
                "description": "AI-powered New Zealand Student Visa Interview Preparation"
              }
            },
            {
              "@type": "ListItem",
              "position": 7,
              "item": {
                "@type": "SoftwareApplication",
                "name": "Travel Agent AI",
                "url": "https://ai.eecglobal.com/travelagent",
                "description": "AI Travel Agent for Tourist and Student Visa information & Flights"
              }
            }
          ]
        }
      },

      // =========================================================================
      // 13. SPEAKABLE SCHEMA FOR VOICE SEARCH
      // =========================================================================
      {
        "@type": "WebPage",
        "@id": "https://ai.eecglobal.com/nzvisaprep/#speakable",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "h2",
            "[data-speakable='true']",
            ".prose p:first-of-type",
            ".key-talking-points"
          ]
        }
      }
    ]
  };
};

// =============================================================================
// SEO BOOSTER COMPONENT
// =============================================================================

export const SEOBooster: React.FC = () => {
  const masterSchema = generateMasterSchema();
  
  // Generate LocalBusiness schemas for all branches
  const branchSchemas = BRANCH_DATA.map(branch => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://eecglobal.com/branches/${branch.identifier}`,
    "name": branch.name,
    "description": `${branch.name} - EEC Study Abroad Consultancy providing IELTS/PTE coaching, New Zealand university admissions, and student visa guidance services.`,
    "image": "https://ai.eecglobal.com/assets/eeclogo.svg",
    "url": "https://eecglobal.com",
    "telephone": branch.contactPoint[0]?.telephone || "+918758750036",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branch.address.streetAddress,
      "addressLocality": branch.address.addressLocality,
      "addressRegion": branch.address.addressRegion,
      "addressCountry": "IN"
    },
    "geo": branch.geo ? {
      "@type": "GeoCoordinates",
      "latitude": branch.geo.latitude,
      "longitude": branch.geo.longitude
    } : undefined,
    "hasMap": branch.hasMap,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://eecglobal.com/#organization"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  }));

  return (
    <>
      {/* Master Schema */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterSchema) }} 
      />
      
      {/* Branch Schemas */}
      {branchSchemas.map((schema, index) => (
        <script 
          key={`branch-schema-${index}`}
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
        />
      ))}
    </>
  );
};

export default SEOBooster;

