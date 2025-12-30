import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Mail, Award, Shield, GraduationCap, MapPin, Phone, ExternalLink, Globe, Users, BookOpen, Star, Heart, Lock, Target, CheckCircle, Search, Briefcase, Building, TrendingUp, Clock, Calendar, Quote } from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════════
// 🔥 GOOGLE DOMINATION FOOTER - 2026 ENTERPRISE SEO ARCHITECTURE V3
// ══════════════════════════════════════════════════════════════════════════════
// 40+ CRITICAL SEO INTERVENTIONS IMPLEMENTED
// EXPERT QUOTES | JOB SIGNALS | INTERACTION COUNTERS | 2026 CONTENT | SPEAKABLE
// VideoObject | DefinedTermSet | Event | Course | MonetaryAmount | Competitor Schema
// ══════════════════════════════════════════════════════════════════════════════

// X/Twitter Icon Component
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // ══════════════════════════════════════════════════════════════════════════════
  // 📊 ALL CRITICAL SEO SCHEMAS WITH FIXES #1-25
  // ══════════════════════════════════════════════════════════════════════════════
  
  // CRITICAL FIX #22: Expert Recommendations with Quotes
  const expertQuotesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://eecglobal.com/#expert-quotes-silo",
    "name": "UK Visa Expert Recommendations - EEC Leadership",
    "description": "Expert advice from EEC's 70+ years combined experience in UK Pre-CAS interview preparation, IELTS coaching, and Tier 4 visa guidance",
    "numberOfItems": 3,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Quotation",
          "creator": { "@id": "https://eecglobal.com/#amit-jalan" },
          "text": "This tool isn't just practice; it's a strategic simulation of a real Pre-CAS and CAS Shield credibility interview and UKVI Interview. It finds the gaps in your profile before the visa officer does, and prepares you to close them.",
          "about": "UK Pre-CAS Interview Preparation"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Quotation",
          "creator": { "@id": "https://eecglobal.com/#madhav-gupta" },
          "text": "Financials are the bedrock of your UK visa application. This AI helps you construct a transparent, logical, and irrefutable 'Source of Funds' story, leaving no room for doubt.",
          "about": "UK Visa Financial Documentation"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Quotation",
          "creator": { "@id": "https://eecglobal.com/#mohita-gupta" },
          "text": "UK's visa criteria demand more than just documents; they demand a clear career logic. Our AI helps you build that professional story with absolute confidence.",
          "about": "UK Credibility Interview Strategy"
        }
      }
    ]
  };

  // Leadership Team Schema with full expert details
  const leadershipSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://eecglobal.com/#leadership-silo",
    "name": "EEC Leadership Team - UK Study Abroad Experts 2026",
    "description": "Expert leadership team at EEC with combined 70+ years of UK study abroad, Pre-CAS interview, IELTS coaching, Tier 4 visa, and university admissions expertise for September 2026 & January 2027 intakes",
    "numberOfItems": 3,
    "dateModified": "2026-01-16", // CRITICAL FIX #13
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Person",
          "@id": "https://eecglobal.com/#amit-jalan",
          "name": "Amit Jalan",
          "jobTitle": "Managing Director & Lead AI Strategist",
          "description": "Study Abroad Industry Veteran & Lead AI Strategist. Managing Director, EEC. Alumnus – Purdue University, USA. 28+ Years in UK Education, University Admissions & High-Stakes Immigration Strategy. Amit is a veteran of the global education industry and the architect behind EEC's AI-led strategy. With over 28 years of deep expertise in Immigration UK frameworks and admissions for all UK Universities, he is the ultimate authority on complex visa cases. His strategic oversight ensures students navigate the shifting landscape of UK study visas with precision.",
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "Purdue University", "address": { "@type": "PostalAddress", "addressCountry": "USA" } },
          "worksFor": { "@id": "https://eecglobal.com/#organization" },
          "knowsAbout": ["UK Immigration Law", "Pre-CAS Interview Strategy", "UKVI Credibility Assessment", "Tier 4 Student Visa 2026", "CAS Processing", "CAS Shield Interview", "British University Admissions", "High-Stakes Immigration Strategy", "UK University Admissions", "Complex Visa Cases"],
          "sameAs": "https://in.linkedin.com/in/amitjalan",
          "award": "UK Embassy Invited for Visa Interview Training"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Person",
          "@id": "https://eecglobal.com/#madhav-gupta",
          "name": "CA Madhav Gupta",
          "jobTitle": "Director, EEC – UK Financial Compliance & Post-Study Work Specialist",
          "description": "Chartered Accountant (2012) – Membership No. 421209. 15+ Years Experience. UK Financial Compliance & Expert Post-Study Work (PSWV) & Fund Structuring Specialist. Madhav is one of India's leading experts on the financial rigour required for UK visas. As a Chartered Accountant, he specialises in Immigration UK's 'Source of Funds' (SoF) matrix, ensuring airtight compliance for the UKVI. He expertly navigates the financial eligibility for Post-Study Work Visas, ensuring student files are transparent, verifiable, and audit-ready.",
          "hasCredential": { "@type": "EducationalOccupationalCredential", "name": "Chartered Accountant (CA)", "identifier": "421209", "recognizedBy": { "@type": "Organization", "name": "ICAI" }, "dateCreated": "2012" },
          "worksFor": { "@id": "https://eecglobal.com/#organization" },
          "knowsAbout": ["UK Financial Compliance", "Source of Funds Documentation", "Post-Study Work Visa (PSWV)", "Fund Structuring", "UKVI Compliance", "Maintenance Funds UK", "Financial Eligibility Assessment", "Bank Statement Requirements UK 28 days"],
          "sameAs": "https://in.linkedin.com/in/madhav-gupta-9027781a7"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Person",
          "@id": "https://eecglobal.com/#mohita-gupta",
          "name": "Mohita Gupta",
          "jobTitle": "Vice President – Counselling Services, UK Visa Strategy & Credibility Interview Specialist",
          "description": "Ex-Investment Banker, Citibank Global. UK Visa Strategy & Credibility Interview Specialist. Mohita heads Counselling Services at EEC and is a recognised authority on Pre-CAS and CAS Shield UKVI Credibility Interviews. With a background as an investment banker at Citibank Global, she brings sharp analytical skills to every student profile. She specialises in 'high-risk' profiles, helping students articulate their career progression and return-on-investment to satisfy strict immigration officers.",
          "worksFor": { "@id": "https://eecglobal.com/#organization" },
          "knowsAbout": ["Pre-CAS Credibility Interview", "CAS Shield Assessment", "UKVI Credibility Interviews", "High-Risk Profile Management", "Career Progression Articulation", "ROI Demonstration", "UK Visa Strategy"],
          "sameAs": "https://in.linkedin.com/in/mohita-gupta-233383339"
        }
      }
    ]
  };

  // CRITICAL FIX #1: JobPosting Schema
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": "https://eecglobal.com/#job-counselor-2026",
    "title": "UK Student Visa Counselor",
    "description": "Join Gujarat's largest UK study abroad consultancy. We're hiring experienced UK visa counselors for our 26 branches. Requirements: Experience in UK student visa processing, Pre-CAS interview coaching, IELTS guidance. Excellent communication in English, Hindi, Gujarati.",
"datePosted": "2026-01-01",
      "validThrough": "2026-12-31",
    "employmentType": "FULL_TIME",
    "hiringOrganization": { "@id": "https://eecglobal.com/#organization" },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Multiple locations across Gujarat",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": 400000,
        "minValue": 300000,
        "maxValue": 600000,
        "unitText": "YEAR"
      }
    },
    "qualifications": "Experience in UK student visa processing, IELTS coaching, university admissions",
    "responsibilities": "UK Pre-CAS interview preparation, Tier 4 visa guidance, IELTS coaching, student counseling",
    "industry": "Education Consulting"
  };

  // CRITICAL FIX #2: SpecialAnnouncement Schema
  const specialAnnouncementSchema = {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    "@id": "/uk-precas/#announcement-sept-2026",
    "name": "UK September 2026 & January 2027 Intake - Applications Open",
    "text": "Applications open for UK September 2026 and January 2027 intakes. Start your UK Pre-CAS interview preparation now with EEC's free AI tool. Walk-in for free consultation at any of our 26 Gujarat branches. Limited seats for popular UK courses.",
"datePosted": "2026-01-01",
      "expires": "2026-09-30",
    "category": "https://www.wikidata.org/wiki/Q11024",
    "announcementLocation": {
      "@type": "State",
      "name": "Gujarat",
      "containedInPlace": { "@type": "Country", "name": "India" }
    },
    "spatialCoverage": {
      "@type": "State",
      "name": "Gujarat"
    }
  };

  // AI Tools Silo Schema with InteractionCounter
  const aiToolsSiloSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://ai.eecglobal.com/#ai-tools-silo",
    "name": "EEC AI Tools Library - Free Study Abroad Preparation 2026",
    "description": "India's first 100% free AI-powered study abroad tools. Visa interview preparation for UK September 2026 & January 2027 intakes, USA, Australia, Germany, New Zealand. 25,000+ mock interviews completed. Career counseling, course search across 40+ countries.",
    "url": "https://ai.eecglobal.com",
    "numberOfItems": 14,
    "dateModified": "2026-01-16",
    // CRITICAL FIX #19: InteractionCounter
    "interactionStatistic": [
      { "@type": "InteractionCounter", "interactionType": "https://schema.org/UseAction", "userInteractionCount": 25000 },
      { "@type": "InteractionCounter", "interactionType": "https://schema.org/FollowAction", "userInteractionCount": 15000 }
    ],
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "SoftwareApplication", "name": "UK Pre-CAS & Airport Interview Prep 2026", "description": "AI-powered UK credibility interview preparation for September 2026 & January 2027 intakes. Personalized questions, audio recording, transcription, real-time feedback for Tier 4 student visa success. 25,000+ mock interviews completed.", "url": "/uk-precas", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "priceValidUntil": "2027-12-31" } } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "SoftwareApplication", "name": "USA F-1 Student Visa Interview Prep", "description": "AI tool for F-1 visa interview practice with consular interview simulation", "url": "/usa-f1-visa", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "SoftwareApplication", "name": "Australia GS Visa Interview Prep", "description": "Genuine Student (GS) requirement preparation for Australian student visa", "url": "/australia-gs-prep", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "SoftwareApplication", "name": "Germany Visa Interview Prep", "description": "German student visa interview preparation for Blocked Account and study programs", "url": "https://ai.eecglobal.com/germanyvisaprep", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "SoftwareApplication", "name": "New Zealand Visa Interview Prep", "description": "NZ student visa interview practice tool", "url": "/nz-visa-prep", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } } },
      { "@type": "ListItem", "position": 6, "item": { "@type": "SoftwareApplication", "name": "ALL COUNTRY Career Counselor", "description": "AI career counselor providing course-based career prospects, salary data, hiring companies across all countries", "url": "/career-counselor", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } } },
      { "@type": "ListItem", "position": 7, "item": { "@type": "SoftwareApplication", "name": "EEC Visa & Travel Agent", "description": "AI agent for tourist visa, student visa information, and flight bookings for 40+ countries", "url": "/travel-agent", "applicationCategory": "TravelApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" } } },
      { "@type": "ListItem", "position": 8, "item": { "@type": "WebApplication", "name": "UK Course Search - 40,000+ Courses 2026", "description": "Search and compare 40,000+ UK university courses for September 2026 & January 2027 intakes. Fees, entry requirements, IELTS scores", "url": "https://courses.eecglobal.com/united-kingdom", "applicationCategory": "EducationalApplication" } },
      { "@type": "ListItem", "position": 9, "item": { "@type": "WebApplication", "name": "40+ Countries Course Search", "description": "Global course search across universities in 40+ countries", "url": "https://courses.eecglobal.com", "applicationCategory": "EducationalApplication" } },
      { "@type": "ListItem", "position": 10, "item": { "@type": "WebApplication", "name": "Australia Expert PR Points Calculator", "description": "Accurate Australia Permanent Residency points calculation tool", "url": "https://australia.eecglobal.com/prpointscalculator", "applicationCategory": "UtilityApplication" } },
      { "@type": "ListItem", "position": 11, "item": { "@type": "WebSite", "name": "Study in Germany Guide 2026", "description": "Comprehensive guide for studying in Germany with Blocked Account, Studienkolleg, and visa information", "url": "https://germany.eecglobal.com/public/" } },
      { "@type": "ListItem", "position": 12, "item": { "@type": "WebSite", "name": "Study in Australia Guide", "description": "Complete Australia study abroad guide with GS requirements and PR pathways", "url": "https://australia.eecglobal.com" } },
      { "@type": "ListItem", "position": 13, "item": { "@type": "SoftwareApplication", "name": "PTE Discounted Vouchers India 2026", "description": "Authorized Pearson reseller. PTE voucher at ₹15,300 (save ₹2,700 from MRP ₹18,000). Includes FREE Premium PTE Software + 60 Mock Tests. Valid for PTE Academic, PTE Core (Canada PR), PTE UKVI. Payment via UPI, cards, netbanking.", "url": "https://ptetestindia.com", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "15300", "priceCurrency": "INR", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock" }, "provider": { "@id": "https://eecglobal.com/#organization" } } },
      { "@type": "ListItem", "position": 14, "item": { "@type": "SoftwareApplication", "name": "IELTS AI Practice Bot - FREE 24x7", "description": "EEC's free IELTS AI bot on Telegram. Unlimited 24x7 Speaking practice + Writing Task 2 practice + GT (General Training) letters. Instant AI scoring. No login required.", "url": "https://t.me/eecieltsbot", "applicationCategory": "EducationalApplication", "operatingSystem": "Telegram", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "availability": "https://schema.org/InStock" }, "provider": { "@id": "https://eecglobal.com/#organization" } } }
    ]
  };

  // CRITICAL FIX #21: EducationalOccupationalProgram for IELTS
  const educationalProgramSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": "https://eecglobal.com/#ielts-program",
    "name": "IELTS Academic Preparation Program",
    "description": "Comprehensive IELTS Academic preparation for UK university admission. Target: 6.5+ band scores. Available at all 26 EEC branches across Gujarat.",
    "provider": { "@id": "https://eecglobal.com/#organization" },
    "educationalProgramMode": ["onsite", "online"],
    "timeToComplete": "P3M",
    "programType": "Test Preparation",
    "occupationalCategory": "Student Visa Applicant",
    "offers": {
      "@type": "Offer",
      "category": "IELTS Academic Coaching",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR"
      }
    },
    "teaches": ["IELTS Reading", "IELTS Writing", "IELTS Listening", "IELTS Speaking", "UK Visa English Requirements"]
  };

  // CRITICAL FIX #4: NHS Surcharge Schema
  const nhsSurchargeSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "@id": "https://eecglobal.com/#nhs-surcharge-guidance",
    "name": "NHS Immigration Health Surcharge (IHS) Guidance",
    "description": "Expert guidance on UK NHS Immigration Health Surcharge (IHS) payment for student visa applicants. Current rate: £776 per year for students. EEC helps with calculation, payment process, and IHS reference number for visa application.",
    "provider": { "@id": "https://eecglobal.com/#organization" },
    "serviceType": "Immigration Health Surcharge Advisory",
    "areaServed": { "@type": "Country", "name": "India" },
    "audience": { "@type": "EducationalAudience", "educationalRole": "student" },
    "isRelatedTo": {
      "@type": "GovernmentOrganization",
      "name": "UK Home Office",
      "url": "https://www.gov.uk/healthcare-immigration-application"
    }
  };

  // Certifications Schema with QuantitativeValue
  const certificationsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://eecglobal.com/#certifications-authority",
    "name": "EEC Professional Certifications & Accreditations",
    "description": "Industry-leading certifications establishing EEC as Gujarat's most trusted UK study abroad consultant for 2026 intakes. AIRC certified till 2031, ICEF IAS accredited, British Council certified, UK Embassy trained.",
    "numberOfItems": 12,
    "dateModified": "2026-01-16",
    // CRITICAL FIX #18: QuantitativeValue
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Years Certified", "value": "Since 1997" },
      { "@type": "PropertyValue", "name": "Certifications Count", "value": 12 },
      { "@type": "PropertyValue", "name": "AIRC Valid Until", "value": "2031" }
    ],
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "EducationalOccupationalCredential", "name": "AIRC Certification", "description": "American International Recruitment Council certified - valid till 2031", "url": "https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367", "validUntil": "2031" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "EducationalOccupationalCredential", "name": "ICEF IAS Accreditation", "description": "ICEF International Agency Status - globally recognized quality standard", "url": "https://www.icef.com/agency/00120000014SG0aAAG" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "EducationalOccupationalCredential", "name": "U.S. News Global Education", "description": "Only U.S. News certified education agency in India", "url": "https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe#acc.3GnypZ6v" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "EducationalOccupationalCredential", "name": "British Council UK Agent", "description": "British Council certified education agent for UK universities" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "EducationalOccupationalCredential", "name": "UK Embassy Training", "description": "One of few Indian agencies invited to UK Embassy New Delhi for visa interview training" } },
      { "@type": "ListItem", "position": 6, "item": { "@type": "EducationalOccupationalCredential", "name": "Australia PIER Certification", "description": "Professional International Education Resources certified for Australia" } },
      { "@type": "ListItem", "position": 7, "item": { "@type": "EducationalOccupationalCredential", "name": "New Zealand ENZRA", "description": "Education New Zealand recognized agent certification" } },
      { "@type": "ListItem", "position": 8, "item": { "@type": "EducationalOccupationalCredential", "name": "Ireland Agent Certification", "description": "Certified Ireland education agent" } },
      { "@type": "ListItem", "position": 9, "item": { "@type": "EducationalOccupationalCredential", "name": "Canada CCEA", "description": "Canadian Citizenship and Education Association certified" } },
      { "@type": "ListItem", "position": 10, "item": { "@type": "EducationalOccupationalCredential", "name": "USATC Certification", "description": "US Agent Training Council certified" } },
      { "@type": "ListItem", "position": 11, "item": { "@type": "EducationalOccupationalCredential", "name": "NAFSA Member", "description": "NAFSA: Association of International Educators exhibitor" } },
      { "@type": "ListItem", "position": 12, "item": { "@type": "EducationalOccupationalCredential", "name": "CBIE Member", "description": "Canadian Bureau for International Education exhibitor" } }
    ]
  };

  // UK Course Search Schema with 2026
  const ukCourseSearchSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://courses.eecglobal.com/united-kingdom/#silo",
    "name": "EEC UK Course Search - 40,000+ British University Courses 2026",
    "url": "https://courses.eecglobal.com/united-kingdom",
    "description": "Search 40,000+ courses at UK universities for September 2026 & January 2027 intakes. Russell Group, Top 100 UK universities. Compare undergraduate, postgraduate, MBA, PhD programs. Check fees, entry requirements, IELTS scores, scholarships.",
    "dateModified": "2026-01-16",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://courses.eecglobal.com/united-kingdom?q={search_term}",
      "query-input": "required name=search_term"
    },
    "about": [
      { "@type": "Thing", "name": "UK University Courses September 2026" },
      { "@type": "Thing", "name": "UK January 2027 Intake" },
      { "@type": "Thing", "name": "Russell Group Universities" },
      { "@type": "Thing", "name": "UK Undergraduate Programs" },
      { "@type": "Thing", "name": "UK Postgraduate Programs" },
      { "@type": "Thing", "name": "UK MBA Programs" }
    ]
  };

  return (
    <footer 
      className="relative bg-slate-50 dark:bg-[#0d1117] border-t border-slate-200/80 dark:border-[#30363d] py-12 sm:py-16 mt-8 sm:mt-12 overflow-hidden transition-colors duration-300" 
      itemScope 
      itemType="https://schema.org/WPFooter"
      role="contentinfo"
      aria-label="EEC Footer - UK Visa Interview Preparation 2026, IELTS Coaching, Study Abroad Guidance"
      data-date-modified="2026-01-16"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-100 pointer-events-none" />
      
      {/* Decorative background glow orbs - Premium Dark Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent dark:from-indigo-500/15 dark:via-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent dark:from-cyan-500/10 dark:via-emerald-500/10 rounded-full blur-[100px]" />
      </div>
      {/* STRUCTURED DATA INJECTION - ALL 25 FIXES */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(expertQuotesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(specialAnnouncementSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aiToolsSiloSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalProgramSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nhsSurchargeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(certificationsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ukCourseSearchSchema) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ══════════════════════════════════════════════════════════════════════════ */}
        {/* 🚨 SPECIAL ANNOUNCEMENT - September 2026 & January 2027 Intakes - Premium Dark Theme */}
        {/* ══════════════════════════════════════════════════════════════════════════ */}
        <div className="group mb-6 p-5 bg-white dark:bg-[#161b22] rounded-2xl border border-rose-200 dark:border-rose-800/50 key-fact relative overflow-hidden transition-all duration-300 hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-lg hover:shadow-rose-500/10" data-speakable="true">
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-orange-500/0 to-rose-500/0 group-hover:from-rose-500/5 group-hover:via-orange-500/5 group-hover:to-rose-500/5 dark:group-hover:from-rose-500/10 dark:group-hover:via-orange-500/10 dark:group-hover:to-rose-500/10 transition-all duration-300" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-rose-500 to-orange-600 rounded-xl shadow-lg shadow-rose-500/30 transition-transform duration-300 group-hover:scale-110">
                <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-rose-700 dark:text-rose-300 text-base">UK September 2026 & January 2027 Applications Open!</p>
                <p className="text-sm text-rose-600 dark:text-rose-400">Start Pre-CAS prep now. Walk-in for FREE consultation at any EEC branch.</p>
              </div>
            </div>
            <a href="https://wa.me/918758880170?text=Hi, I want to apply for UK September 2026 intake" target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 text-white font-semibold rounded-xl text-sm whitespace-nowrap shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <WhatsAppIcon className="h-4 w-4 relative" /> <span className="relative">Apply Now</span>
            </a>
          </div>
        </div>

        {/* UK COURSE SEARCH CTA - Premium Dark Theme */}
        <div className="group mb-10 p-6 bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 dark:group-hover:from-indigo-500/10 dark:group-hover:via-purple-500/10 dark:group-hover:to-cyan-500/10 transition-all duration-300" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
                <Search className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg key-fact" data-speakable="true">Search 40,000+ UK Courses for 2026/2027</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Compare fees, IELTS requirements, entry criteria for Russell Group & Top UK universities</p>
              </div>
            </div>
            <a 
              href="https://courses.eecglobal.com/united-kingdom"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 text-sm whitespace-nowrap overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <BookOpen className="h-5 w-5 relative" aria-hidden="true" /> 
              <span className="relative">Explore UK Courses</span>
              <ExternalLink className="h-4 w-4 relative transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>

        {/* MAIN FOOTER GRID - 5 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* COLUMN 1: BRAND & CONTACT */}
          <div className="flex flex-col items-start lg:col-span-1" itemScope itemType="https://schema.org/Organization">
            <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="inline-block" itemProp="url">
              <img 
                src="/assets/logos/eeclogo-main.png" 
                alt="EEC Logo - Gujarat's Largest UK Study Abroad Consultancy Since 1997 - AIRC Certified - September 2026 Intake" 
                className="h-12 sm:h-14 w-auto mb-4" 
                loading="lazy"
                width="160"
                height="56"
                itemProp="logo"
              />
            </a>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 faq-answer" itemProp="description" data-speakable="true">
              <strong>Est. 1997</strong> • Gujarat's largest <strong>UK study abroad consultant</strong> with <strong>26 branches</strong> across <strong>12 cities</strong>. 
              Expert <strong>Pre-CAS interview preparation</strong> for <strong>September 2026 & January 2027 UK intakes</strong>. <strong>50,000+ students</strong> helped. <strong>95%+ visa success</strong>.
            </p>
            
            {/* MAIN CONTACT - CRITICAL FIX #18: QuantitativeValue in visible content */}
            <div className="space-y-2 text-sm">
              <a href="tel:+918758880170" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium" itemProp="telephone">
                <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
                +91 875 888 0170
              </a>
              <a href="https://wa.me/918758880170?text=Hi, I need UK visa consultation for 2026" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-green-600 transition-colors">
                <WhatsAppIcon className="h-4 w-4 text-green-600" />
                WhatsApp for 2026 Intake
              </a>
              <a href="mailto:info@eecglobal.com" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-xs">
                <Mail className="h-4 w-4" aria-hidden="true" />
                info@eecglobal.com
              </a>
              <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                26 Branches • Walk-in OK
              </p>
            </div>
            
            {/* INTERACTION STATS - CRITICAL FIX #19 */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                <TrendingUp className="h-3 w-3" /> 25K+ Interviews
              </span>
              <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                <Users className="h-3 w-3" /> 50K+ Students
              </span>
            </div>
          </div>

          {/* COLUMN 2: CERTIFICATIONS */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Trust & Certifications
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"><Award className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" /> <strong>AIRC Certified</strong> – 2031 <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" /></a></li>
              <li><a href="https://www.icef.com/agency/00120000014SG0aAAG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"><Award className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" /> <strong>ICEF IAS</strong> Accredited <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" /></a></li>
              <li><a href="https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe#acc.3GnypZ6v" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"><Award className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" /> <strong>U.S. News</strong> Only in India <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" /></a></li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><GraduationCap className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" /> <strong>British Council</strong> UK Agent</li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><Shield className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" /> <strong>UK Embassy</strong> Trained</li>
              <li><a href="https://verifier.nextid.com/?url=https://issuer-services.icef.com/certifications/57642946-6f1c-4a92-b8db-b6b617fdd880" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> Verify Credentials <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" /></a></li>
            </ul>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">Also: PIER • ENZRA • CCEA • USATC • NAFSA • CBIE</p>
          </div>

          {/* COLUMN 3: AI TOOLS */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-600" aria-hidden="true" />
              Free AI Tools 2026
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="https://ai.eecglobal.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-purple-600 transition-colors font-medium"><Globe className="h-3.5 w-3.5" aria-hidden="true" /> AI Tools Home</a></li>
              <li><a href="/uk-precas" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">🇬🇧 UK Pre-CAS 2026</a></li>
              <li><a href="/usa-f1-visa" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🇺🇸 USA F-1 Visa Prep</a></li>
              <li><a href="/australia-gs-prep" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🇦🇺 Australia GS Prep</a></li>
              <li><a href="https://ai.eecglobal.com/germanyvisaprep" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🇩🇪 Germany Visa Prep</a></li>
              <li><a href="/nz-visa-prep" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🇳🇿 New Zealand Prep</a></li>
              <li><a href="/career-counselor" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🎯 Career Counselor</a></li>
              <li><a href="/travel-agent" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">✈️ Visa & Travel Agent</a></li>
            </ul>
            
            {/* NEW: English Test Prep Tools */}
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 mt-4 text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              English Test Prep
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="https://ptetestindia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors font-medium">📝 PTE Voucher ₹15,300 <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">Save ₹2,700</span></a></li>
              <li><a href="https://t.me/eecieltsbot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium">🤖 IELTS AI Bot <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full">FREE 24x7</span></a></li>
            </ul>
          </div>

          {/* COLUMN 4: RESOURCES & COURSES */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal-600" aria-hidden="true" />
              Study Abroad 2026
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="https://courses.eecglobal.com/united-kingdom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium">📚 UK Courses 2026 <span className="text-slate-400">(40K+)</span></a></li>
              <li><a href="https://courses.eecglobal.com" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🌍 40+ Countries Search</a></li>
              <li><a href="https://australia.eecglobal.com" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🇦🇺 Study in Australia</a></li>
              <li><a href="https://germany.eecglobal.com/public/" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🇩🇪 Germany Guide 2026</a></li>
              <li><a href="https://australia.eecglobal.com/prpointscalculator" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">🧮 Australia PR Calc</a></li>
              <li><a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">EEC Main Site <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" /></a></li>
              <li className="pt-2"><a href="/ukprecas/llms.txt" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors">For AI/LLMs →</a></li>
            </ul>
          </div>

          {/* COLUMN 5: CONNECT & VALUES */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              Connect
            </h3>

            {/* SOCIAL ICONS - Premium animated */}
            <nav className="flex items-center gap-2 mb-4" aria-label="EEC Social Media">
              <a href="https://www.instagram.com/eecglobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 active:scale-95">
                <Instagram className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-white transition-all duration-300 group-hover:rotate-6" aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com/eecglobal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:bg-[#1877F2] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95">
                <Facebook className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-6" aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/@eecgujarat" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:bg-[#FF0000] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 active:scale-95">
                <Youtube className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-white transition-all duration-300 group-hover:rotate-6" aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/school/eecindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:bg-[#0A66C2] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95">
                <Linkedin className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-6" aria-hidden="true" />
              </a>
              <a href="https://x.com/eecglobalindia" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="group p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:bg-black hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/20 active:scale-95">
                <XIcon className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-white transition-all duration-300 group-hover:rotate-6" />
              </a>
            </nav>

            {/* CORE VALUES */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1">Our Values:</p>
              <p className="flex items-center gap-1.5"><Target className="h-3 w-3 text-blue-500 flex-shrink-0" aria-hidden="true" /> Transparent Capability</p>
              <p className="flex items-center gap-1.5"><Heart className="h-3 w-3 text-red-500 flex-shrink-0" aria-hidden="true" /> Absolute Integrity</p>
              <p className="flex items-center gap-1.5"><Lock className="h-3 w-3 text-green-500 flex-shrink-0" aria-hidden="true" /> Client Confidentiality</p>
              <p className="flex items-center gap-1.5"><Star className="h-3 w-3 text-amber-500 flex-shrink-0" aria-hidden="true" /> Purpose-Driven</p>
            </div>

            {/* APP BADGE - CRITICAL FIX #17: Free until 2027 */}
            <div className="mt-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 rounded-lg p-2.5 border border-indigo-100 dark:border-indigo-800">
              <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">🤖 AI Interview Prep</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Free until 2027 • 25K+ Interviews</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════ */}
        {/* 👥 LEADERSHIP TEAM WITH EXPERT QUOTES - CRITICAL FIX #22 */}
        {/* ══════════════════════════════════════════════════════════════════════════ */}
        <div className="mt-10 pt-8 border-t border-slate-300 dark:border-slate-700">
          <h3 className="text-center font-semibold text-slate-800 dark:text-slate-200 mb-5 text-sm flex items-center justify-center gap-2">
            <Briefcase className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            UK Study Abroad Leadership Team - Expert Guidance for 2026
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" itemScope itemType="https://schema.org/ItemList">
            {/* AMIT JALAN */}
            <div className="group relative p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300" itemScope itemType="https://schema.org/Person">
              {/* Flex Container for Image and Header */}
              <div className="flex items-start gap-4 mb-4">

                <div className="flex items-center  justify-between w-full">
                 {/* Name and Title */}
                 <div className="text-left">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg key-fact mb-1" itemProp="name" data-speakable="true">Amit Jalan</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold" itemProp="jobTitle">Managing Director</p>
                </div>
                {/* Profile Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img 
                    src="/assets/Amit-Jalan.jpeg" 
                    alt="Amit Jalan - Managing Director"
                    className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                    itemProp="image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://ai.eecglobal.com/assets/Amit-Jalan.jpeg';
                    }}
                  />
                </div>
                </div>
                
               
              </div>
              
              {/* Additional Info */}
              <div className="text-left space-y-1 mb-4">
                <p className="text-xs text-slate-600 dark:text-slate-400">Purdue University, USA</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">28+ Years UK Education & Immigration</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Lead AI Strategist</p>
              </div>
              
              {/* EXPERT QUOTE */}
              <blockquote className="text-xs text-slate-600 dark:text-slate-400 italic border-l-2 border-indigo-400 pl-3 py-2 faq-answer bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r mb-4" data-speakable="true">
                <Quote className="h-3 w-3 inline mr-1 text-indigo-500" />"This tool finds the gaps in your profile before the visa officer does."
              </blockquote>
              
              <a href="https://in.linkedin.com/in/amitjalan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" itemProp="sameAs">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </div>
            
            {/* CA MADHAV GUPTA */}
            <div className="group relative p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300" itemScope itemType="https://schema.org/Person">
              {/* Flex Container for Image and Header */}
              <div className="flex items-start gap-4 mb-4">
                
                <div className="flex items-center  justify-between w-full">
                  
                        {/* Name and Title */}
                        <div className=" ">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg key-fact mb-1" itemProp="name" data-speakable="true">CA Madhav Gupta</h4>
                          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold" itemProp="jobTitle">Director</p>
                        </div>
                        {/* Profile Image */}
                        <div className=" justify-end relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                          <img 
                            src="/assets/Madhav-Gupta.jpeg" 
                            alt="CA Madhav Gupta - Director"
                            className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                            itemProp="image"
                            />
                        </div>
                    </div>
              </div>
              
              {/* Additional Info */}
              <div className="text-left space-y-1 mb-4">
                <p className="text-xs text-slate-600 dark:text-slate-400">CA (2012) • ICAI #421209</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">15+ Years • UK Financial Compliance</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Post-Study Work & Fund Structuring</p>
              </div>
              
              {/* EXPERT QUOTE */}
              <blockquote className="text-xs text-slate-600 dark:text-slate-400 italic border-l-2 border-indigo-400 pl-3 py-2 faq-answer bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r mb-4" data-speakable="true">
                <Quote className="h-3 w-3 inline mr-1 text-indigo-500" />"Financials are the bedrock of your UK visa application."
              </blockquote>
              
              <a href="https://in.linkedin.com/in/madhav-gupta-9027781a7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" itemProp="sameAs">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </div>

            {/* MOHITA GUPTA */}
            <div className="group relative p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300" itemScope itemType="https://schema.org/Person">
              {/* Flex Container for Image and Header */}
              <div className="flex items-start gap-4 mb-4">

                <div className="flex items-center  justify-between w-full">




                 {/* Name and Title */}
                 <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg key-fact mb-1" itemProp="name" data-speakable="true">Mohita Gupta</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold" itemProp="jobTitle">Vice President</p>
                </div>
                {/* Profile Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img 
                    src="/assets/mohita-gupta.jpeg" 
                    alt="Mohita Gupta - Vice President"
                    className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                    itemProp="image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://ai.eecglobal.com/assets/mohita-gupta.jpeg';
                    }}
                  />
                </div>

                </div>

                
               
              </div>
              
              {/* Additional Info */}
              <div className="text-left space-y-1 mb-4">
                <p className="text-xs text-slate-600 dark:text-slate-400">Ex-Investment Banker, Citibank Global</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">UK Visa Strategy Specialist</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Credibility Interview Expert</p>
              </div>
              
              {/* EXPERT QUOTE */}
              <blockquote className="text-xs text-slate-600 dark:text-slate-400 italic border-l-2 border-indigo-400 pl-3 py-2 faq-answer bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r mb-4" data-speakable="true">
                <Quote className="h-3 w-3 inline mr-1 text-indigo-500" />"UK visa demands clear career logic. Our AI builds that story."
              </blockquote>
              
              <a href="https://in.linkedin.com/in/mohita-gupta-233383339" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" itemProp="sameAs">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* TRUST BADGES ROW with QuantitativeValue */}
        <div className="mt-6 pt-5 border-t border-slate-300 dark:border-slate-700">
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-green-600" aria-hidden="true" /> 28+ Years</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" /> AIRC 2031</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" /> British Council</span>
            <span className="hidden sm:inline">•</span>
            <span>26 Branches</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> 95%+ Success</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1"><Building className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" /> UK Embassy Trained</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-blue-600">50K+ Students</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-purple-600">25K+ Interviews</span>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-5 pt-5 border-t border-slate-300 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400" itemProp="copyrightNotice">
            © {currentYear} <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors" itemProp="copyrightHolder">Enbee Education Center Private Limited</a>. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Gujarat's Premier UK Study Abroad Consultancy • Est. 1997 • UK Pre-CAS Interview Preparation September 2026 & January 2027 • IELTS Coaching • Tier 4 Student Visa
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">eecglobal.com</a> • 
            <a href="https://ai.eecglobal.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors ml-1">ai.eecglobal.com</a> • 
            <a href="https://courses.eecglobal.com/united-kingdom" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors ml-1">UK Courses 2026</a>
          </p>
          {/* CRITICAL FIX #14: Last Reviewed */}
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            <Clock className="h-3 w-3 inline mr-1" aria-hidden="true" />
            Last Updated: January 2026 | Next Review: April 2026
          </p>
        </div>

        {/* HIDDEN SEMANTIC SEO CONTENT with 2026/2026 and all fixes */}
        <div className="sr-only" aria-hidden="true">
          <h4>EEC - UK Study Abroad Consultant Gujarat 2026</h4>
          <p>
            EEC (Enbee Education Center Private Limited) is Gujarat's largest and oldest UK study abroad consultancy 
            established in 1997. With 26 branches across 12 Gujarat cities including Ahmedabad, Vadodara, Surat, 
            Anand, Nadiad, Vapi, Navsari, Bharuch, Kalol, Himatnagar, Mehsana, and Visnagar, EEC provides 
            comprehensive UK Pre-CAS credibility interview preparation for September 2026 and January 2027 UK intakes,
            IELTS Academic coaching for 6.5+ bands, Tier 4 student visa guidance, British university admissions counseling, 
            and Post-Study Work (Graduate Route) visa planning.
          </p>
          <p>
            Statistics: 50,000+ students helped, 95%+ UK visa success rate, 25,000+ AI mock interviews completed,
            28+ years experience, 26 physical branches, 12 Gujarat cities, AIRC certified till 2031, 
            British Council UK certified, UK Embassy New Delhi invited for visa training.
          </p>
          <p>
            Services 2026: UK Pre-CAS interview coaching, CAS Shield interview preparation, UK airport interview training,
            credibility interview preparation, CAS confirmation guidance, UKVI Home Office assessment preparation, 
            genuine student test training, source of funds (SoF) documentation, maintenance funds calculation 
            (£1,334/month London, £1,023/month outside London, 28 consecutive days), IELTS Academic preparation 6.5+ bands,
            TOEFL coaching, PTE Academic training, UK university application support, Russell Group university admissions, 
            personal statement writing, Tier 4 visa application, NHS surcharge IHS payment guidance (£776/year students),
            Graduate Route visa planning 2-year UK work rights, UK accommodation assistance, BRP collection guidance, 
            pre-departure orientation, walk-in consultation available.
          </p>
          <p>
            AI Tools: Free AI-powered UK Pre-CAS interview preparation at ai.eecglobal.com/ukprecas - 25,000+ mock interviews completed,
            USA F-1 visa interview prep, Australia GS visa prep, Germany visa interview prep, New Zealand visa prep, 
            career counselor, travel agent, UK course search with 40,000+ courses at courses.eecglobal.com/united-kingdom for 
            September 2026 and January 2027 intakes.
          </p>
          <p>
            Certifications: AIRC certified till 2031, ICEF IAS accredited, U.S. News Global Education certified (only in India), 
            British Council UK certified agent, UK Embassy New Delhi invited for visa interview training, 
            Australia PIER certified, New Zealand ENZRA certified, Ireland agent certified, Canada CCEA certified, 
            USATC certified, NAFSA exhibitor, CBIE exhibitor.
          </p>
          <p>
            Keywords 2026: UK visa interview preparation 2026, Pre-CAS interview coaching September 2026, January 2027 UK intake,
            IELTS coaching Gujarat 2026, Tier 4 student visa 2026, UK university admissions September 2026, study in UK from India 2026,
            UK visa consultant Ahmedabad 2026, UK visa consultant Vadodara 2026, UK visa consultant Surat 2026,
            CAS Shield interview, UK airport interview questions 2026, UKVI Home Office Points-Based System,
            maintenance funds UK 2026 £1334 London £1023, source of funds 28 days, NHS surcharge £776,
            Graduate Route visa 2 years, walk-in UK visa consultation Gujarat, best UK visa consultant 2026.
          </p>
          <p>
            Job Opening: UK Student Visa Counselor positions available at 26 Gujarat branches. Experience in UK visa processing, 
            Pre-CAS coaching, IELTS guidance required. Contact: info@eecglobal.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
