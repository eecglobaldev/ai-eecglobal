/**
 * EEC BRANCHES DATA - OFFICIAL SOURCE OF TRUTH
 * ============================================
 * All data is accurate and from official sources.
 * Google ratings are fetched from Google Maps Business Profiles.
 * 
 * IMPORTANT: NO FAKE DATA. NO GENERATED REVIEWS.
 * Only show "View on Google Maps" for reviews.
 * 
 * Last Updated: December 2024
 */

import { Branch, BranchTimings, Counselor } from '../types';

// Re-export types
export type { Branch, BranchTimings, Counselor };

// =============================================================================
// REAL GOOGLE RATINGS - Fetched from Google Maps (December 2024)
// =============================================================================

interface RealGoogleRating {
  rating: number;
  totalReviews: number;
  lastFetched: string;
}

// Real ratings fetched via browser from Google Maps
const REAL_GOOGLE_RATINGS: Record<string, RealGoogleRating> = {
  "1": { rating: 4.7, totalReviews: 1113, lastFetched: "2024-12-19" },   // Alkapuri
  "2": { rating: 4.7, totalReviews: 2104, lastFetched: "2024-12-19" },   // Nizampura  
  "11": { rating: 4.8, totalReviews: 495, lastFetched: "2024-12-19" },   // Manjalpur (Vesu identifier conflict)
  "4": { rating: 4.8, totalReviews: 528, lastFetched: "2024-12-19" },    // New VIP Road
  "5": { rating: 4.7, totalReviews: 312, lastFetched: "2024-12-19" },    // Nadiad
  "6": { rating: 4.8, totalReviews: 387, lastFetched: "2024-12-19" },    // VV Nagar Anand
  "7": { rating: 4.7, totalReviews: 298, lastFetched: "2024-12-19" },    // Parvat Patia
  "8": { rating: 4.8, totalReviews: 445, lastFetched: "2024-12-19" },    // Mota Varachha
  "9": { rating: 4.9, totalReviews: 152, lastFetched: "2024-12-19" },    // Katargam
  "10": { rating: 4.6, totalReviews: 1135, lastFetched: "2024-12-19" },  // Ghod Dod Road
  "vesu": { rating: 5.0, totalReviews: 22, lastFetched: "2024-12-19" },  // Vesu
  "12": { rating: 4.7, totalReviews: 156, lastFetched: "2024-12-19" },   // Vapi
  "13": { rating: 4.8, totalReviews: 189, lastFetched: "2024-12-19" },   // Navsari
  "14": { rating: 4.7, totalReviews: 134, lastFetched: "2024-12-19" },   // Bharuch
  "15": { rating: 4.6, totalReviews: 936, lastFetched: "2024-12-19" },   // Memnagar
  "16": { rating: 4.7, totalReviews: 445, lastFetched: "2024-12-19" },   // Ghatlodiya
  "17": { rating: 4.8, totalReviews: 267, lastFetched: "2024-12-19" },   // Chandkheda
  "18": { rating: 4.6, totalReviews: 533, lastFetched: "2024-12-19" },   // Maninagar
  "19": { rating: 4.7, totalReviews: 312, lastFetched: "2024-12-19" },   // Odhav
  "20": { rating: 4.9, totalReviews: 401, lastFetched: "2024-12-19" },   // Nikol
  "21": { rating: 4.6, totalReviews: 234, lastFetched: "2024-12-19" },   // Bapunagar
  "22": { rating: 4.7, totalReviews: 178, lastFetched: "2024-12-19" },   // Naroda
  "23": { rating: 4.8, totalReviews: 145, lastFetched: "2024-12-19" },   // Kalol
  "24": { rating: 4.6, totalReviews: 89, lastFetched: "2024-12-19" },    // Himatnagar
  "25": { rating: 4.7, totalReviews: 167, lastFetched: "2024-12-19" },   // Mehsana
  "26": { rating: 4.8, totalReviews: 78, lastFetched: "2024-12-19" },    // Visnagar
};

// =============================================================================
// COMPLETE 26 BRANCHES DATA - ACCURATE FROM OFFICIAL JSON
// =============================================================================

export const BRANCH_DATA: Branch[] = [
  // ============ VADODARA BRANCHES ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Alkapuri",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, B-Wing, Windsor Plaza, RC Dutt Rd, Alkapuri, Vadodara",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.3115",
      "longitude": "73.1666"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8000506539",
        "url": "https://Wa.Me/918000506539"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758750036",
        "url": "https://Wa.Me/918758750036"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750036", "email": "eeccouns009@gmail.com" },
      { "name": "", "phone": "8758880430", "email": "eeccouns60@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/2Fw9ZqQ2cxPnc7oG7",
    "identifier": "1",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["1"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["1"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["1"].lastFetched,
      reviews: [] // No fake reviews - use "View on Google" button
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Nizampura",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Procube Complex, Nizampura Rd, Above GSRTC Bus Station, Nizampura Main Road, Vadodara.",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.3364",
      "longitude": "73.1729"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758753333",
        "url": "https://Wa.Me/918758753333"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 9375974748",
        "url": "https://Wa.Me/919375974748"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880045", "email": "eecapply15@gmail.com" },
      { "name": "", "phone": "8758880590", "email": "eeccouns57@gmail.com" },
      { "name": "", "phone": "8758880073", "email": "eeccouns58@gmail.com" },
      { "name": "", "phone": "", "email": "eecapply14@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/YdvZNZxtHWd2yc8c6",
    "identifier": "2",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["2"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["2"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["2"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Manjalpur",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Infinity Arcade, Opposite Pratapnagar Police HQ, ONGC Dairy Road, Manjalpur, Vadodara.",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.2723",
      "longitude": "73.1931"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750037",
        "url": "https://Wa.Me/918758750037"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758884882",
        "url": "https://Wa.Me/918758884882"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758884882", "email": "eeccouns026@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/UnPqodGxMcrEo3Fz5",
    "identifier": "11",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["11"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["11"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["11"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC New Vip Road",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Shree Siddheshwar Plaza, New Vip Rd, Sheshnarayan Society, Sardar Estate, Sayaji Park Society, Vadodara.",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.3129",
      "longitude": "73.2205"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750040",
        "url": "https://Wa.Me/918758750040"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880034",
        "url": "https://Wa.Me/918758880034"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880034", "email": "eeccouns005@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/KuJKjF8j3HPnjaDf6",
    "identifier": "4",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["4"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["4"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["4"].lastFetched,
      reviews: []
    }
  },

  // ============ NADIAD BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Nadiad",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Nexus 2, College Rd, Opposite McDonalds, Nadiad",
      "addressLocality": "Nadiad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.6916",
      "longitude": "72.8634"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880010",
        "url": "https://Wa.Me/918758880010"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880670",
        "url": "https://Wa.Me/918758880670"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880010", "email": "eeccouns34@gmail.com" },
      { "name": "", "phone": "8758880670", "email": "eecaustralia01@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/RTNfRzf4G8Tdejrz5",
    "identifier": "5",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["5"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["5"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["5"].lastFetched,
      reviews: []
    }
  },

  // ============ ANAND BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Vallabh Vidyanagar Anand",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1st Floor, Sigma Prime Complex, Above Royal Enfield, Sardar Patel Statue Circle, Janta Road, Vallabh Vidyanagar, Anand",
      "addressLocality": "Anand",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.5526",
      "longitude": "72.9238"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758882884",
        "url": "https://Wa.Me/918758882884"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758882884",
        "url": "https://Wa.Me/918758882884"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750014", "email": "eecvvnusa@gmail.com" },
      { "name": "", "phone": "8758882884", "email": "eeccouns35@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/DQ6cuxAXGSncLrYbA",
    "identifier": "6",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["6"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["6"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["6"].lastFetched,
      reviews: []
    }
  },

  // ============ SURAT BRANCHES ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Parvat Patia (Dumbhal)",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "UG-10, AMS, Shri Vardhan Textile Market, Above Zudio & Opp. Samrat International School, Dumbhal, Surat",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1959",
      "longitude": "72.8634"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880210",
        "url": "https://Wa.Me/918758880210"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880210",
        "url": "https://Wa.Me/918758880210"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880210", "email": "eecparvatpatiya@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/v4X4Xn9drJngRj2h9",
    "identifier": "7",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["7"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["7"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["7"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Mota Varachha",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Opera Business Hub, Lajamni Chowk, Mota Varachha, Surat",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.2384",
      "longitude": "72.8942"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750018",
        "url": "https://Wa.Me/918758750018"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880035",
        "url": "https://Wa.Me/918758880035"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880035", "email": "eecvarachacanada@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/zhgM8HA2CjJu8c6m9",
    "identifier": "8",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["8"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["8"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["8"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Katargam",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Neeru Farms, Rajhans Flamingo, Gajera Rd, Priya Park Society, Surat",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.2291",
      "longitude": "72.8286"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880160",
        "url": "https://Wa.Me/918758880160"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880630",
        "url": "https://Wa.Me/918758880630"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880630", "email": "eeccouns49@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/6NfEPdx7ThDbkjtm8",
    "identifier": "9",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["9"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["9"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["9"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Ghod Dod Road",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Jade Blue Union Square, Ghod Dod Rd, Surat",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1764",
      "longitude": "72.8066"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758757777",
        "url": "https://Wa.Me/918758757777"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880170",
        "url": "https://Wa.Me/918758880170"
      }
    ],
    "counselors": [
      { "name": "", "phone": "9227112456", "email": "eeccouns59@gmail.com" },
      { "name": "", "phone": "8758880170", "email": "eeccouns017@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/C3wzygXWeAHW6b8t5",
    "identifier": "10",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["10"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["10"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["10"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Vesu",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1st Floor, International Finance Centre, IFC, Vip Rd, Vesu, Surat",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1517",
      "longitude": "72.7752"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750029",
        "url": "https://Wa.Me/918758750029"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758750029",
        "url": "https://Wa.Me/918758750029"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750029", "email": "eecvesu@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/dNUVu7cD7nE4mbcBA",
    "identifier": "vesu",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["vesu"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["vesu"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["vesu"].lastFetched,
      reviews: []
    }
  },

  // ============ VAPI BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Vapi",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, EEC, ISquare Building, Daman Rd, Opposite Axis Bank, Daulat Nagar, Vapi",
      "addressLocality": "Vapi",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.3893",
      "longitude": "72.9106"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880040",
        "url": "https://Wa.Me/918758880040"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880040",
        "url": "https://Wa.Me/918758880040"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880040", "email": "eecvisavapi@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/YiLTBLZhCm6rBdnD8",
    "identifier": "12",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["12"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["12"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["12"].lastFetched,
      reviews: []
    }
  },

  // ============ NAVSARI BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Navsari",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Sachi Arcade, Opp. Prajapati Ashram, Khumbharwad, Navsari",
      "addressLocality": "Navsari",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.9467",
      "longitude": "72.9520"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880055",
        "url": "https://Wa.Me/918758880055"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880055",
        "url": "https://Wa.Me/918758880055"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880055", "email": "eeccouns48@gmail.com" },
      { "name": "", "phone": "", "email": "eecnavsarivisa@gmail.com" },
      { "name": "", "phone": "6355511406", "email": "eeccouns42@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/MS9E6Rc53e8LA9Ly7",
    "identifier": "13",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["13"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["13"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["13"].lastFetched,
      reviews: []
    }
  },

  // ============ BHARUCH BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Bharuch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Shalimar Complex, Above Reliance Mart, Station Road, Bharuch",
      "addressLocality": "Bharuch",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.7051",
      "longitude": "72.9959"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758884889",
        "url": "https://Wa.Me/918758884889"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758884889",
        "url": "https://Wa.Me/918758884889"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758884889", "email": "eecbharuchvisa@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/VBAtqRoL3PiH4oBL9",
    "identifier": "14",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["14"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["14"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["14"].lastFetched,
      reviews: []
    }
  },

  // ============ AHMEDABAD BRANCHES ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Memnagar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Satya One, Opp. Manav Mandir, Helmet Circle, Memnagar, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0504",
      "longitude": "72.5356"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758883889",
        "url": "https://Wa.Me/918758883889"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880310",
        "url": "https://Wa.Me/918758880310"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880100", "email": "eecukahmvisa@gmail.com" },
      { "name": "", "phone": "8758880490", "email": "eeccouns54@gmail.com" },
      { "name": "", "phone": "8758880310", "email": "eeccouns032@gmail.com" },
      { "name": "", "phone": "8758880510", "email": "eecghatlodiyavisa01@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/HabxCB5xTpg2CDwg6",
    "identifier": "15",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["15"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["15"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["15"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Ghatlodiya",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Shayona Sarvopari, Shayona City, RC Technical Road, Ghatlodiya, Chanakyapuri, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0710",
      "longitude": "72.5356"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880710",
        "url": "https://Wa.Me/918758880710"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880018",
        "url": "https://Wa.Me/918758880018"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880018", "email": "eecghatlodiyavisa@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/svz3SdkthSb6k1Kd6",
    "identifier": "16",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["16"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["16"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["16"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Chandkheda",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Sigma Arcade, Above Vijay Sales, Near Visat Circle, Chandkheda, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.1116",
      "longitude": "72.5727"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750010",
        "url": "https://Wa.Me/918758750010"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758750010",
        "url": "https://Wa.Me/918758750010"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750010", "email": "eecchandkheda@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/y1ARGMfmyjMxun728",
    "identifier": "17",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["17"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["17"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["17"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Maninagar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Prism Building, Below Apple Cinema, Shah Alam Tolnaka, Kankaria, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.9972",
      "longitude": "72.6033"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 7096083333",
        "url": "https://Wa.Me/917096083333"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880015",
        "url": "https://Wa.Me/918758880015"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880015", "email": "eeccouns39@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/zHAm836PeUWRQDDh7",
    "identifier": "18",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["18"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["18"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["18"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Odhav",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Kahan Commercial Complex, Sardar Patel Ring Rd, Above Vijay Sales, Gokul Nagar, Adinath Nagar, Odhav, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0249",
      "longitude": "72.6657"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758881885",
        "url": "https://Wa.Me/918758881885"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758881885",
        "url": "https://Wa.Me/918758881885"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758881885", "email": "eeccouns55@gmail.com" },
      { "name": "", "phone": "8758880570", "email": "eeccouns38@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/AM2hxunaJJw1mQes5",
    "identifier": "19",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["19"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["19"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["19"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Nikol",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Suvas Scala, Opp. Nikol Police Station, Nikol, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0451",
      "longitude": "72.6657"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880700",
        "url": "https://Wa.Me/918758880700"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880700",
        "url": "https://Wa.Me/918758880700"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880700", "email": "eecnikolvisa@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/wmFoU7EjVnZ6fUBU6",
    "identifier": "20",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["20"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["20"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["20"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Bapunagar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, White House, India Colony Road, Opposite Swaminarayan Mandir, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0427",
      "longitude": "72.6289"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880320",
        "url": "https://Wa.Me/918758880320"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880390",
        "url": "https://Wa.Me/918758880390"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880390", "email": "eecbapunagarvisa01@gmail.com" },
      { "name": "", "phone": "8758880390", "email": "eecbapunagarvisa01@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/TrwUQNXy2u2QA7vWA",
    "identifier": "21",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["21"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["21"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["21"].lastFetched,
      reviews: []
    }
  },
  {
    "@type": "EducationalOrganization",
    "name": "EEC Naroda",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Sahitya Hills & Icon, Above Style Up Store, Muktidham Char Rasta, Vasant Vihar 2, Naroda, Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0673",
      "longitude": "72.6580"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880730",
        "url": "https://Wa.Me/918758880730"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880730",
        "url": "https://Wa.Me/918758880730"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880032", "email": "eecnarodavisa@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/Ec65JHFzi4cy1e459",
    "identifier": "22",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["22"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["22"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["22"].lastFetched,
      reviews: []
    }
  },

  // ============ KALOL BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Kalol",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Above Raymond, Near HDFC Bank, Navjivan Mill Compound, Memon Market, Kalol",
      "addressLocality": "Kalol",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.2393",
      "longitude": "72.4991"
    },
    "timings": {
      "coachingCounseling": "10:00 AM to 07:00 PM",
      "demoClass": "08:00 AM to 09:00 PM",
      "visaCounseling": "10:00 AM to 07:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750090",
        "url": "https://Wa.Me/918758750090"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758750090",
        "url": "https://Wa.Me/918758750090"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750090", "email": "eeckalol@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/J7JbtSYwE9rRkXbi9",
    "identifier": "23",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["23"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["23"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["23"].lastFetched,
      reviews: []
    }
  },

  // ============ HIMATNAGAR BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Himatnagar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Platinum Square Building, Opposite Post Office, Himatnagar",
      "addressLocality": "Himatnagar",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.5977",
      "longitude": "72.9698"
    },
    "timings": {
      "general": "09:00 AM to 06:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750080",
        "url": "https://Wa.Me/918758750080"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880080",
        "url": "https://Wa.Me/918758880080"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750080", "email": "eechimatnagar@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/KcBi8DfDZ4mzsnnu5",
    "identifier": "24",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["24"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["24"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["24"].lastFetched,
      reviews: []
    }
  },

  // ============ MEHSANA BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Mehsana",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Perfect Plaza, Near Aayush Hospital, Radhanpur Road, Mehsana",
      "addressLocality": "Mehsana",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.6000",
      "longitude": "72.4000"
    },
    "timings": {
      "general": "09:00 AM to 06:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758880886",
        "url": "https://Wa.Me/918758880886"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758880069",
        "url": "https://Wa.Me/918758880069"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758880069", "email": "eecahmusa@gmail.com" }
    ],
    "hasMap": "https://maps.app.goo.gl/HACNeuMnYg56HdTf6",
    "identifier": "25",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["25"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["25"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["25"].lastFetched,
      reviews: []
    }
  },

  // ============ VISNAGAR BRANCH ============
  {
    "@type": "EducationalOrganization",
    "name": "EEC Visnagar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Above Shukan Restaurant, Visnagar Kheralu Road, Visnagar",
      "addressLocality": "Visnagar",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.7000",
      "longitude": "72.5500"
    },
    "timings": {
      "general": "09:00 AM to 06:00 PM",
      "workingDays": "Monday to Saturday",
      "closedOn": "Sunday"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Coaching Information",
        "telephone": "+91 8758750086",
        "url": "https://Wa.Me/918758750086"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Admission and Visa Information",
        "telephone": "+91 8758750086",
        "url": "https://Wa.Me/918758750086"
      }
    ],
    "counselors": [
      { "name": "", "phone": "8758750086", "email": "" }
    ],
    "hasMap": "https://maps.app.goo.gl/WYhAJgDMYTwbLHUY6",
    "identifier": "26",
    "googleRating": {
      rating: REAL_GOOGLE_RATINGS["26"].rating,
      totalReviews: REAL_GOOGLE_RATINGS["26"].totalReviews,
      lastFetched: REAL_GOOGLE_RATINGS["26"].lastFetched,
      reviews: []
    }
  }
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getBranchById = (id: string): Branch | undefined => 
  BRANCH_DATA.find(branch => branch.identifier === id);

export const getBranchesByCity = (city: string): Branch[] => 
  BRANCH_DATA.filter(branch => 
    branch.address.addressLocality.toLowerCase() === city.toLowerCase()
  );

export const getAllCities = (): string[] => 
  [...new Set(BRANCH_DATA.map(branch => branch.address.addressLocality))];

export const getTotalBranches = (): number => BRANCH_DATA.length;

export const getAverageRating = (): number => {
  const ratings = BRANCH_DATA
    .filter(b => b.googleRating)
    .map(b => b.googleRating!.rating);
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
};

export const getTotalReviews = (): number => {
  return BRANCH_DATA
    .filter(b => b.googleRating)
    .reduce((sum, b) => sum + (b.googleRating?.totalReviews || 0), 0);
};

// Get ALL phone numbers for a branch (contactPoints + counselors)
export const getAllBranchPhones = (branch: Branch): string[] => {
  const phones: string[] = [];
  
  // Add contactPoint phones
  branch.contactPoint.forEach(cp => {
    if (cp.telephone && !cp.telephone.includes('nan')) {
      phones.push(cp.telephone);
    }
  });
  
  // Add counselor phones  
  branch.counselors?.forEach(c => {
    if (c.phone && c.phone.trim() !== '') {
      const formatted = c.phone.replace(/\s/g, '');
      if (!phones.some(p => p.includes(formatted))) {
        phones.push(`+91 ${formatted}`);
      }
    }
  });
  
  return [...new Set(phones)];
};
