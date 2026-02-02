import { MetadataRoute } from 'next';

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: string[];
};

export default function sitemap(): SitemapEntry[] {
  const baseUrl = 'https://ai.eecglobal.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // All routes in the application
  const routes = [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // About & Utility Pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap-page`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    // Hub Pages (Study Destinations) - High Priority
    {
      url: `${baseUrl}/hub/study-in-usa`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hub/study-in-canada`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hub/study-in-uk`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hub/study-in-australia`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hub/study-in-germany`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hub/study-in-ireland`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Guide Pages - High Priority
    {
      url: `${baseUrl}/guides/australia-gs-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/german-grade-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/germany-blocked-account-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides/214b-refusal-recovery`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    // Glossary Pages
    {
      url: `${baseUrl}/glossary`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary/f1-visa`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/genuine-student-test`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/blocked-account`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/cas`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/coe`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/loa`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/sop`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/i-20`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/ds-160`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary/ihs`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // USA Visa Prep – main tool + subpages
    {
      url: `${baseUrl}/usavisaprep/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      images: [
        `${baseUrl}/assets/screenshots/usa-visa-dashboard.png`,
        `${baseUrl}/og-image.png`
      ]
    },
    {
      url: `${baseUrl}/usavisaprep/dashboard/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usavisaprep/faq/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/usavisaprep/glossary/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/usavisaprep/preparation-guide/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/usavisaprep/resources/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usavisaprep/about-eec/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Australia GS Prep Tool
    {
      url: `${baseUrl}/australiagsprep/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      images: [
        `${baseUrl}/assets/screenshots/australia-gs-dashboard.png`,
        `${baseUrl}/assets/logos/australialogo.png`,
        `${baseUrl}/assets/tools/australia-gs-hero.png`
      ]
    },
    {
      url: `${baseUrl}/australiagsprep/dashboard/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/australiagsprep/faq/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/australiagsprep/glossary/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/australiagsprep/preparation-guide/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/australiagsprep/resources/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/australiagsprep/about-eec/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ukprecas/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ukprecas/dashboard/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ukprecas/resources/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ukprecas/faq/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ukprecas/glossary/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ukprecas/preparation-guide/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ukprecas/about-eec/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nzvisaprep/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nzvisaprep/dashboard/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nzvisaprep/faq/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nzvisaprep/glossary/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nzvisaprep/preparation-guide/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nzvisaprep/resources/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nzvisaprep/about-eec/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Career Counselor – main tool + subpages (no dashboard)
    {
      url: `${baseUrl}/careercounselor/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careercounselor/faq/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/careercounselor/glossary/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/careercounselor/preparation-guide/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/careercounselor/resources/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/careercounselor/about-eec/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/travelagent/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/travelagent/faq/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/travelagent/glossary/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/travelagent/preparation-guide/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/travelagent/resources/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/travelagent/about-eec/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/review/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Compare Pages
    {
      url: `${baseUrl}/compare/usa-vs-canada`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Author Pages
    {
      url: `${baseUrl}/author/ca-madhav-gupta`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // News Pages
    {
      url: `${baseUrl}/news/ireland-2026-employment-permit-update`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
  ];

  return routes;
}

