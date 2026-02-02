import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ai.eecglobal.com';
    const currentDate = new Date().toISOString();

    return [
        {
            url: `${baseUrl}/review/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];
}
