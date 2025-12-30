export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ai.eecglobal.com/#website",
        "url": "https://ai.eecglobal.com/",
        "name": "EEC AI Tools",
        "description": "Free AI-powered study abroad tools: Visa interview prep, grade calculators, PR points calculators",
        "publisher": { "@id": "https://eecglobal.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://ai.eecglobal.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": ["Organization", "EducationalOrganization", "Corporation"],
        "@id": "https://eecglobal.com/#organization",
        "name": "EEC",
        "legalName": "Enbee Education Center Private Limited",
        "alternateName": ["EEC Global", "EEC Study Abroad", "Enbee Education Center", "EEC India", "EEC Vadodara"],
        "url": "https://eecglobal.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://eecglobal.com/#logo",
          "url": "https://ai.eecglobal.com/assets/logos/eeclogo-main.png",
          "contentUrl": "https://ai.eecglobal.com/assets/logos/eeclogo-main.png",
          "width": 400,
          "height": 400,
          "caption": "EEC - Enbee Education Center Official Logo"
        },
        "image": "https://ai.eecglobal.com/assets/logos/eeclogo-main.png",
        "foundingDate": "1997",
        "foundingLocation": {
          "@type": "Place",
          "name": "Vadodara, Gujarat, India",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Vadodara",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
          }
        },
        "description": "Enbee Education Center (EEC) is Gujarat's premier overseas education consultancy, established in 1997. With 26 branches across 12 cities and over 100,000 students guided globally, EEC combines 28 years of consular expertise with AI-powered tools for visa interview preparation, university admissions, and career counseling. AIRC certified till 2031.",
        "slogan": "28 Years of Consular Expertise, Digitized Into AI",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 200,
          "maxValue": 500
        },
        "naics": "611710",
        "isicV4": "8560",
        "areaServed": [
          {
            "@type": "State",
            "name": "Gujarat",
            "containedInPlace": {
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
            "latitude": "22.3072",
            "longitude": "73.1812"
          },
          "geoRadius": "500 km"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3rd Floor, B-Wing, Windsor Plaza, RC Dutt Road",
          "addressLocality": "Alkapuri, Vadodara",
          "addressRegion": "Gujarat",
          "postalCode": "390007",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.3115",
          "longitude": "73.1666"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-8758880310",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi", "gu"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "10:00",
              "closes": "19:00"
            }
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-8758880310",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi", "gu"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-8000506539",
            "contactType": "technical support",
            "contactOption": "TollFree",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }
        ],
        "founder": [
          {
            "@type": "Person",
            "@id": "https://eecglobal.com/team/amit-jalan#person",
            "name": "Amit Jalan",
            "jobTitle": "Managing Director",
            "description": "Founder and Managing Director of EEC with 28+ years of experience in overseas education consulting. Purdue University alumnus who transformed traditional counseling into AI-powered student success.",
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Purdue University",
              "sameAs": "https://www.purdue.edu/"
            },
            "worksFor": {
              "@id": "https://eecglobal.com/#organization"
            },
            "knowsAbout": ["Overseas Education", "International Student Recruitment", "EdTech", "AI in Education"],
            "sameAs": [
              "https://www.linkedin.com/in/amit-jalan-eec/"
            ]
          }
        ],
        "employee": [
          {
            "@type": "Person",
            "@id": "https://eecglobal.com/team/madhav-gupta#person",
            "name": "CA Madhav Gupta",
            "jobTitle": "Director, Financial Forensics",
            "description": "Pioneer of the Consular Protocol™ audit system for visa-compliant financial documentation. Chartered Accountant with expertise in the intersection of Indian family finances and international visa requirements.",
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "name": "Chartered Accountant (CA)",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Institute of Chartered Accountants of India"
              }
            },
            "worksFor": {
              "@id": "https://eecglobal.com/#organization"
            },
            "knowsAbout": ["Financial Forensics", "Visa Documentation", "Tax Compliance", "Student Finances"]
          },
          {
            "@type": "Person",
            "@id": "https://eecglobal.com/team/mohita-gupta#person",
            "name": "Mohita Gupta",
            "jobTitle": "Vice President, Visa Strategy",
            "description": "Leading authority on visa refusal prevention with 15+ years of experience in consular affairs. Expert in developing intervention frameworks for complex visa cases across 15+ countries.",
            "worksFor": {
              "@id": "https://eecglobal.com/#organization"
            },
            "knowsAbout": ["Visa Refusal Prevention", "Consular Affairs", "Appeal Strategies", "Immigration Law"],
            "sameAs": [
              "https://www.linkedin.com/in/mohita-gupta-study-abroad-expert/"
            ]
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "AIRC Certification",
            "description": "American International Recruitment Council certification for ethical student recruitment",
            "validUntil": "2031-12-31",
            "recognizedBy": {
              "@type": "Organization",
              "name": "American International Recruitment Council",
              "url": "https://www.airc-education.org/",
              "sameAs": "https://www.airc-education.org/"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "U.S. News Global Education Certified Partner",
            "recognizedBy": {
              "@type": "Organization",
              "name": "U.S. News & World Report",
              "url": "https://www.usnews.com/"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "British Council Registered Agent",
            "recognizedBy": {
              "@type": "Organization",
              "name": "British Council",
              "url": "https://www.britishcouncil.org/"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "IDP Education Certified Partner",
            "recognizedBy": {
              "@type": "Organization",
              "name": "IDP Education",
              "url": "https://www.idp.com/"
            }
          }
        ],
        "knowsAbout": [
          "Overseas Education Consulting",
          "Student Visa Applications",
          "IELTS Preparation",
          "PTE Preparation",
          "University Admissions",
          "Study Abroad Counseling",
          "Visa Interview Preparation",
          "Australia PR Applications",
          "USA F-1 Visa",
          "UK Student Visa",
          "Canada Study Permit",
          "Germany Student Visa",
          "New Zealand Student Visa",
          "Ireland Student Visa",
          "Career Counseling",
          "Scholarship Guidance"
        ],
        "sameAs": [
          "https://www.facebook.com/eecglobal",
          "https://www.instagram.com/eecglobal",
          "https://www.linkedin.com/school/eecindia",
          "https://www.youtube.com/@eecgujarat",
          "https://x.com/eecglobalindia",
          "https://www.justdial.com/Vadodara/Enbee-Education-Center-Opposite-Vadodara-Gymkhana-Club-Sayajigunj/0265PX265-X265-130820165515-Y5W9_BZDET",
          "https://www.justdial.com/Vadodara/Enbee-Education-Center-Alkapuri/0265PX265-X265-191125153644-U8H7_BZDET",
          "https://tracxn.com/d/companies/enbee-education-center/__JQKMYFpMqKmBGKnOIhPqTq7dE8xZQNsXfv-fNh_l_Jw",
          "https://www.crunchbase.com/organization/enbee-education-center",
          "https://www.glassdoor.co.in/Overview/Working-at-Enbee-Education-Center-EI_IE2839037.htm",
          "https://www.ambitionbox.com/overview/enbee-education-center-overview",
          "https://in.pinterest.com/eecglobal/",
          "https://www.threads.net/@eec_studyabroad"
        ],
        "award": [
          "Best Overseas Education Consultancy Gujarat 2023",
          "AIRC Certified Agency",
          "Top 10 Study Abroad Consultants India"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "2500",
          "bestRating": "5",
          "worstRating": "1"
        },
        "owns": {
          "@type": "WebApplication",
          "@id": "https://ai.eecglobal.com/#app"
        },
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "USA F-1 Visa Counseling",
              "description": "Complete guidance for US student visa applications"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Australia Student Visa Services",
              "description": "Genuine Student (GS) test preparation and visa application support"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UK CAS Interview Preparation",
              "description": "University interview prep and CAS letter assistance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Canada Study Permit Assistance",
              "description": "Study permit application and SDS stream guidance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Germany Student Visa Counseling",
              "description": "Public university admissions and blocked account setup"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IELTS & PTE Preparation",
              "description": "English proficiency test coaching and practice"
            }
          }
        ]
      },
      {
        "@type": "WebApplication",
        "@id": "https://ai.eecglobal.com/#app",
        "name": "EEC AI Tools",
        "url": "https://ai.eecglobal.com",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "description": "A suite of 10+ AI-powered agents designed to help Indian students study abroad. Includes mock visa interviews, PR points calculators, and ROI-based career counseling.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "author": {
          "@id": "https://eecglobal.com/#organization"
        },
        "featureList": [
          "AI Mock Visa Interviews",
          "Voice Analysis for Confidence",
          "German Grade Calculator",
          "Australia PR Points Calculator",
          "Career ROI Analysis"
        ]
      },
      {
        "@type": "ItemList",
        "name": "EEC AI Study Abroad Agents",
        "description": "Comprehensive list of AI tools available on the EEC platform.",
        "itemListElement": [
          {
            "@type": "SoftwareApplication",
            "position": 1,
            "name": "Australia Genuine Student (GS) Prep AI",
            "url": "https://ai.eecglobal.com/australia-gs-prep",
            "applicationCategory": "EducationalApplication",
            "description": "AI agent that conducts mock interviews for the Australian Genuine Student test, analyzing voice tone to prevent memorized answers."
          },
          {
            "@type": "SoftwareApplication",
            "position": 2,
            "name": "USA F-1 Visa Interview Officer AI",
            "url": "https://ai.eecglobal.com/usa-f1-visa",
            "applicationCategory": "EducationalApplication",
            "description": "A strict AI simulator of a US Visa Officer. It challenges students with difficult questions to prepare them for the 2-minute F1 visa interview."
          },
          {
            "@type": "SoftwareApplication",
            "position": 3,
            "name": "German Grade Converter (Bavarian Formula)",
            "url": "https://germany.eecglobal.com/public/",
            "applicationCategory": "UtilityApplication",
            "description": "Instantly converts Indian CGPA or percentage to the German grading scale using the Modified Bavarian Formula."
          },
          {
            "@type": "SoftwareApplication",
            "position": 4,
            "name": "Australia PR Points Calculator (Visa 189/190)",
            "url": "https://ai.eecglobal.com/prpointscalculator",
            "applicationCategory": "UtilityApplication",
            "description": "Official calculator for Australia Permanent Residency points, helping students assess eligibility for Subclass 189 and 190 visas."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I practice for the US F1 visa interview for free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can use EEC's free AI F-1 Visa Interview Prep tool. It simulates a real interview with a strict AI officer, listens to your answers, and provides instant feedback on your confidence and content."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my German Grade from Indian CGPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the EEC Germany Guide tool which features a built-in Bavarian Formula calculator. Simply enter your current CGPA and the maximum possible CGPA to get your German equivalent grade instantly."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Australia Genuine Student (GS) test difficult?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The GS test focuses on natural intent rather than memorized answers. EEC's Australia GS Prep AI helps you practice speaking naturally about your course and career goals to pass this requirement."
            }
          },
          {
            "@type": "Question",
            "name": "Which course has the best ROI for study abroad in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "EEC's Career Counsellor AI analyzes global job market trends for 2026 to recommend courses that offer high Return on Investment (ROI) and strong PR pathways, rather than just popular degrees."
            }
          }
        ]
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

