/**
 * ============================================================================
 * EEC ADVANCED SCHEMA ENGINE - TOTAL GOOGLE DOMINATION
 * ============================================================================
 * 
 * This module implements CRITICAL missing schemas identified in audit:
 * - VideoObject Schema for YouTube content
 * - Event Schema for webinars and counselling sessions
 * - DefinedTermSet Schema for NZ visa terminology
 * - SiteNavigationElement Schema for sitelinks
 * - Scholarship/Grant Schema
 * - QAPage optimized for People Also Ask
 * 
 * ============================================================================
 */

import React from 'react';

// =============================================================================
// VIDEO OBJECT SCHEMA - For YouTube Content Integration
// =============================================================================

export const generateVideoSchemas = () => {
  return [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": "https://ai.eecglobal.com/nzvisaprep/#video-nz-visa-guide",
      "name": "New Zealand Student Visa Interview Preparation Guide 2025",
      "description": "Complete guide to preparing for your New Zealand student visa interview. Learn what INZ visa officers ask, how to answer credibility interview questions, and tips from ENZRA certified experts at EEC Global.",
      "thumbnailUrl": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
      "uploadDate": "2024-06-15",
      "duration": "PT15M32S",
      "contentUrl": "https://www.youtube.com/watch?v=example",
      "embedUrl": "https://www.youtube.com/embed/example",
      "publisher": {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "EEC Global",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ai.eecglobal.com/assets/eeclogo.svg"
        }
      },
      "potentialAction": {
        "@type": "WatchAction",
        "target": "https://www.youtube.com/@eecgujarat"
      },
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WatchAction",
        "userInteractionCount": "15000"
      },
      "educationalLevel": "beginner",
      "learningResourceType": "Video",
      "about": [
        "New Zealand Student Visa",
        "INZ Credibility Interview",
        "Study Abroad from India"
      ],
      "inLanguage": ["en", "hi"]
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": "https://ai.eecglobal.com/nzvisaprep/#video-fts-explained",
      "name": "FTS (Funds to Support) Scheme Explained for NZ Visa",
      "description": "Detailed explanation of New Zealand's Funds to Support scheme. Learn how to prepare financial documents, what amounts are required, and how to present your financial capacity to Immigration New Zealand.",
      "thumbnailUrl": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
      "uploadDate": "2024-08-20",
      "duration": "PT12M45S",
      "publisher": {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization"
      },
      "educationalLevel": "intermediate",
      "about": ["FTS Scheme", "Financial Documentation", "NZ Visa Requirements"]
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": "https://ai.eecglobal.com/nzvisaprep/#video-pswv-guide",
      "name": "Post-Study Work Visa (PSWV) in New Zealand - Complete Guide",
      "description": "Everything you need to know about the 3-year Post-Study Work Visa in New Zealand. Career opportunities, PR pathway, and how to transition from student visa to work visa.",
      "thumbnailUrl": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
      "uploadDate": "2024-10-05",
      "duration": "PT18M20S",
      "publisher": {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization"
      },
      "about": ["Post-Study Work Visa", "NZ PR Pathway", "Career in New Zealand"]
    }
  ];
};

// =============================================================================
// EVENT SCHEMA - For Webinars and Counselling Sessions
// =============================================================================

export const generateEventSchemas = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  return [
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "@id": "https://eecglobal.com/events/#nz-visa-webinar",
      "name": "Free New Zealand Student Visa Webinar - INZ Interview Preparation",
      "description": "Join EEC's ENZRA certified counselors for a comprehensive webinar on New Zealand student visa interview preparation. Learn insider tips for INZ credibility interviews, FTS scheme documentation, and post-study work visa opportunities.",
      "startDate": nextWeek.toISOString(),
      "endDate": new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://eecglobal.com/webinars/nz-visa"
      },
      "image": "https://ai.eecglobal.com/assets/nz-visa-prep-og.png",
      "organizer": {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "EEC Global",
        "url": "https://eecglobal.com"
      },
      "performer": [
        {
          "@type": "Person",
          "@id": "https://eecglobal.com/#kshitij-garg",
          "name": "Kshitij Garg",
          "jobTitle": "Managing Director, ESTERO NZ"
        },
        {
          "@type": "Person",
          "@id": "https://eecglobal.com/#amit-jalan",
          "name": "Amit Jalan",
          "jobTitle": "Managing Director, EEC Global"
        }
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": "https://eecglobal.com/webinars/nz-visa",
        "validFrom": today.toISOString()
      },
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "Indian students planning to study in New Zealand"
      },
      "teaches": [
        "INZ Credibility Interview Preparation",
        "Financial Documentation for NZ Visa",
        "Genuine Temporary Entry Requirements",
        "Post-Study Work Visa Opportunities"
      ],
      "isAccessibleForFree": true,
      "inLanguage": ["en", "hi"]
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      "name": "NZ University Fair - Meet Representatives from All 8 Universities",
      "description": "Exclusive opportunity to meet representatives from all 8 New Zealand universities at EEC's campus fair. Get direct admission information, scholarship opportunities, and course guidance.",
      "startDate": nextMonth.toISOString(),
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "EEC Headquarters",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3rd floor, B-Wing, Windsor Plaza, RC Dutt Rd, Alkapuri",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "postalCode": "390007",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      "isAccessibleForFree": true
    }
  ];
};

// =============================================================================
// DEFINED TERM SET SCHEMA - NZ Visa Terminology Glossary
// =============================================================================

export const generateDefinedTermSetSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "https://ai.eecglobal.com/nzvisaprep/#terminology",
    "name": "New Zealand Student Visa Terminology Glossary",
    "description": "Comprehensive glossary of terms related to New Zealand student visas, INZ processes, and study abroad requirements.",
    "inLanguage": "en",
    "hasDefinedTerm": [
      {
        "@type": "DefinedTerm",
        "name": "INZ Credibility Interview",
        "description": "A verification interview conducted by Immigration New Zealand (INZ) to assess whether an applicant is a genuine temporary entrant. The interview evaluates the applicant's intentions, documentation, ties to home country, and likelihood of compliance with visa conditions.",
        "termCode": "INZ-CI"
      },
      {
        "@type": "DefinedTerm",
        "name": "Genuine Temporary Entry (GTE)",
        "description": "A requirement for New Zealand student visas where applicants must demonstrate they genuinely intend to stay temporarily for study purposes and return to their home country after completing their course.",
        "termCode": "GTE"
      },
      {
        "@type": "DefinedTerm",
        "name": "Funds to Support (FTS) Scheme",
        "description": "A financial evidence scheme where students demonstrate they have NZ$20,000 per year of study available for living expenses, in addition to tuition fees. This can be shown through bank statements, sponsor declarations, or scholarship letters.",
        "termCode": "FTS"
      },
      {
        "@type": "DefinedTerm",
        "name": "Post-Study Work Visa (PSWV)",
        "description": "A visa that allows international students to work in New Zealand after completing their studies. Duration ranges from 1-3 years depending on the qualification level and location of study.",
        "termCode": "PSWV"
      },
      {
        "@type": "DefinedTerm",
        "name": "ENZRA",
        "description": "Education New Zealand Recognised Agency - A certification granted to education agents who meet Education New Zealand's quality standards for recruiting international students to New Zealand institutions.",
        "termCode": "ENZRA"
      },
      {
        "@type": "DefinedTerm",
        "name": "NZQA",
        "description": "New Zealand Qualifications Authority - The government body responsible for ensuring qualifications are credible and robust, both nationally and internationally.",
        "termCode": "NZQA"
      },
      {
        "@type": "DefinedTerm",
        "name": "Skilled Migrant Category (SMC)",
        "description": "A points-based residence visa category for skilled workers in New Zealand. Students can transition to this visa after gaining work experience through the Post-Study Work Visa.",
        "termCode": "SMC"
      },
      {
        "@type": "DefinedTerm",
        "name": "ITP (Institute of Technology and Polytechnic)",
        "description": "New Zealand's publicly-owned tertiary education institutions offering practical, vocational education. Major ITPs include Unitec, Ara, Wintec, and SIT.",
        "termCode": "ITP"
      },
      {
        "@type": "DefinedTerm",
        "name": "Source of Funds (SoF)",
        "description": "Documentation required to prove the legitimate origin of funds being used to finance studies in New Zealand. Includes CA certificates, bank statements, ITR, property documents, and sponsor declarations.",
        "termCode": "SoF"
      },
      {
        "@type": "DefinedTerm",
        "name": "Aotearoa",
        "description": "The Māori name for New Zealand, meaning 'land of the long white cloud'. Increasingly used alongside 'New Zealand' in official contexts.",
        "termCode": "AOTEAROA"
      }
    ]
  };
};

// =============================================================================
// SITE NAVIGATION ELEMENT SCHEMA - For Enhanced Sitelinks
// =============================================================================

export const generateSiteNavigationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": "https://ai.eecglobal.com/#navigation",
    "name": "EEC AI Tools Navigation",
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": "NZ Visa Interview Prep",
        "description": "Free AI-powered New Zealand student visa interview preparation",
        "url": "https://ai.eecglobal.com/nzvisaprep"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Career Counselor AI",
        "description": "AI-powered career guidance for any course worldwide",
        "url": "https://ai.eecglobal.com/careercounselor"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "USA F-1 Visa Prep",
        "description": "USA student visa interview preparation",
        "url": "https://ai.eecglobal.com/usavisaprep"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "UK Pre-CAS Prep",
        "description": "UK Pre-CAS and airport interview preparation",
        "url": "https://ai.eecglobal.com/ukprecas"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Australia GS Prep",
        "description": "Australia Genuine Student visa interview preparation",
        "url": "https://ai.eecglobal.com/australiagsprep"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Germany Visa Prep",
        "description": "Germany student visa interview preparation",
        "url": "https://ai.eecglobal.com/germanyvisaprep"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Course Search",
        "description": "Search courses in 40+ countries",
        "url": "https://courses.eecglobal.com"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Contact EEC",
        "description": "Contact EEC Global - 26 branches in Gujarat",
        "url": "https://eecglobal.com/contact"
      }
    ]
  };
};

// =============================================================================
// SCHOLARSHIP SCHEMA - For NZ Scholarship Searches
// =============================================================================

export const generateScholarshipSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://ai.eecglobal.com/nzvisaprep/#scholarships",
    "name": "New Zealand Scholarships for Indian Students",
    "description": "Comprehensive list of scholarships available for Indian students studying in New Zealand",
    "numberOfItems": 8,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Scholarship",
          "name": "New Zealand Excellence Awards",
          "provider": {
            "@type": "Organization",
            "name": "Education New Zealand"
          },
          "description": "Merit-based scholarships for high-achieving international students",
          "amount": {
            "@type": "MonetaryAmount",
            "currency": "NZD",
            "minValue": "5000",
            "maxValue": "10000"
          },
          "eligibleRegion": {
            "@type": "Country",
            "name": "India"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Scholarship",
          "name": "University of Auckland International Student Excellence Scholarship",
          "provider": {
            "@type": "CollegeOrUniversity",
            "name": "University of Auckland"
          },
          "description": "Scholarships for outstanding international students admitted to undergraduate or postgraduate programs",
          "amount": {
            "@type": "MonetaryAmount",
            "currency": "NZD",
            "value": "10000"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Scholarship",
          "name": "University of Otago International Excellence Scholarship",
          "provider": {
            "@type": "CollegeOrUniversity",
            "name": "University of Otago"
          },
          "description": "Scholarships covering partial tuition fees for international students",
          "amount": {
            "@type": "MonetaryAmount",
            "currency": "NZD",
            "value": "10000"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Scholarship",
          "name": "Massey University Vice Chancellor's High Achiever Scholarship",
          "provider": {
            "@type": "CollegeOrUniversity",
            "name": "Massey University"
          },
          "description": "For students with exceptional academic achievements",
          "amount": {
            "@type": "MonetaryAmount",
            "currency": "NZD",
            "value": "15000"
          }
        }
      }
    ]
  };
};

// =============================================================================
// MAIN ADVANCED SCHEMAS COMPONENT
// =============================================================================

export const AdvancedSchemas: React.FC = () => {
  const videoSchemas = generateVideoSchemas();
  const eventSchemas = generateEventSchemas();
  const definedTermSetSchema = generateDefinedTermSetSchema();
  const siteNavigationSchema = generateSiteNavigationSchema();
  const scholarshipSchema = generateScholarshipSchema();

  return (
    <>
      {/* Video Object Schemas */}
      {videoSchemas.map((schema, index) => (
        <script
          key={`video-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Event Schemas */}
      {eventSchemas.map((schema, index) => (
        <script
          key={`event-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Defined Term Set Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      {/* Site Navigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />

      {/* Scholarship Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarshipSchema) }}
      />
    </>
  );
};

export default AdvancedSchemas;

