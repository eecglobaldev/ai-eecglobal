import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ai.eecglobal.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/hub/*',
          '/guides/*',
          '/glossary/*',
          '/compare/*',
          '/author/*',
          '/news/*',
          '/sitemap',
          '/usavisaprep/',
          '/australiagsprep/',
          '/ukprecas/',
          '/nzvisaprep/',
          '/careercounselor/',
          '/travelagent/',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/session/',
          '/user/',
          '/auth/',
          '/admin/',
          '/dashboard/',
          '/practice/',
          '/*?*session_id=',
          '/*?*step=',
          '/*?*answer=',
          '/*?*recording=',
          '/*?*attempt=',
          '/*?*utm_',
          '/*?*fbclid=',
          '/*?*gclid=',
          '/*?*ref=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/session/',
          '/user/',
          '/auth/',
          '/admin/',
          '/dashboard/',
          '/practice/',
          '/*?*session_id=',
          '/*?*step=',
          '/*?*answer=',
          '/*?*recording=',
          '/*?*attempt=',
          '/*?*utm_',
          '/*?*fbclid=',
          '/*?*gclid=',
          '/*?*ref=',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/session/', '/user/', '/*?*session_id='],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llm.txt'],
        disallow: ['/api/', '/session/', '/user/', '/auth/', '/admin/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/llm.txt'],
        disallow: ['/api/', '/session/', '/user/', '/auth/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/llm.txt'],
        disallow: ['/api/', '/session/', '/user/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/', '/llm.txt'],
        disallow: ['/api/', '/session/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llm.txt'],
        disallow: ['/api/', '/session/', '/user/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/llm.txt'],
        disallow: ['/api/', '/session/'],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}





