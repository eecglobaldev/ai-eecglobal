import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ai.eecglobal.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
        allow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/australiagsprep/sitemap.xml`,
      `${baseUrl}/usavisaprep/sitemap.xml`,
      `${baseUrl}/ukprecas/sitemap.xml`,
      `${baseUrl}/nzvisaprep/sitemap.xml`,
      `${baseUrl}/careercounselor/sitemap.xml`,
      `${baseUrl}/travelagent/sitemap.xml`,
      `${baseUrl}/review/sitemap.xml`,
    ],
    host: baseUrl,
  };
}





