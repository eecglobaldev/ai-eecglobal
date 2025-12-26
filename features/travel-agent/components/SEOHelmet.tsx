
import React, { useEffect } from 'react';
import { SearchParams, VisaRequirements } from '../types';

interface SEOHelmetProps {
  params: SearchParams;
  result: VisaRequirements | null;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({ params, result }) => {
  useEffect(() => {
    // 1. Dynamic Meta Description & Canonical
    // ----------------------------------------------------------------
    const metaDesc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    
    // Construct dynamic description
    let descContent = "Use EEC's 100% free AI-powered travel agent for verified Student & Tourist visa requirements.";
    if (result && params.destination) {
       descContent = `Official ${params.visaType} visa requirements for ${params.destination} from ${params.originState || 'India'}. Verified fees, documents, and ${result.processingTime} processing time. Updated 2025.`;
    }

    // Update or Create Description
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = descContent;
      document.head.appendChild(newMeta);
    }

    // Update or Create Canonical
    const currentUrl = `https://ai.eecglobal.com/travelagent/#/destination/${encodeURIComponent(params.destination)}/type/${encodeURIComponent(params.visaType)}`;
    if (canonical) {
      canonical.setAttribute('href', currentUrl);
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'canonical';
      newLink.href = currentUrl;
      document.head.appendChild(newLink);
    }

    // 2. Inject Missing Schemas (Breadcrumb, FAQ, LocalBusiness)
    // ----------------------------------------------------------------
    const scriptId = 'supplemental-seo-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) document.head.removeChild(script);

    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';

    const schemas: any[] = [];

    // A. BreadcrumbList Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ai.eecglobal.com/travelagent"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": params.destination || "Destinations",
        "item": `https://ai.eecglobal.com/travelagent/#/destination/${encodeURIComponent(params.destination || '')}`
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": `${params.visaType} Visa`,
        "item": currentUrl
      }]
    });

    // B. FAQPage Schema (Mirroring GEOSection content + Dynamic)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": `How much does a ${params.visaType} visa to ${params.destination} cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": result?.cost || "Fees vary by embassy exchange rates. Check official VFS/Consulate pages."
        }
      }, {
        "@type": "Question",
        "name": `What is the processing time for ${params.destination} visa from ${params.originState}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": result?.processingTime || "Processing times depend on consulate workload and season."
        }
      }, {
        "@type": "Question",
        "name": "Is EEC Global a registered consultancy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Enbee Education Center (EEC) is established since 1997 with 26 branches across Gujarat."
        }
      }]
    });

    // C. LocalBusiness (Headquarters) Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Enbee Education Center (EEC)",
      "image": "https://cdn-icons-png.flaticon.com/512/2060/2060284.png",
      "telephone": "+91-9998887776",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alkapuri",
        "addressLocality": "Vadodara",
        "addressRegion": "Gujarat",
        "postalCode": "390007",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.3072,
        "longitude": 73.1812
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      }
    });

    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      if (script) document.head.removeChild(script);
    }
  }, [params, result]);

  return null;
};
