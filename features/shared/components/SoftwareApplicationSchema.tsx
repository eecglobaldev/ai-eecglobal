export interface SoftwareApplicationSchemaProps {
    name: string;
    description: string;
    url: string;
    applicationCategory: 'EducationalApplication' | 'BusinessApplication';
    operatingSystem?: string;
    offers?: {
        price: string;
        priceCurrency: string;
    };
    aggregateRating?: {
        ratingValue: string;
        reviewCount: string;
    };
    featureList?: string[];
    screenshot?: string;
    inLanguage?: string[];
}

export default function SoftwareApplicationSchema({
    name,
    description,
    url,
    applicationCategory,
    operatingSystem = 'Web Browser',
    offers = { price: '0', priceCurrency: 'INR' },
    aggregateRating,
    featureList,
    screenshot,
    inLanguage = ['en', 'hi', 'gu']
}: SoftwareApplicationSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${url}#software-application`,
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": applicationCategory,
        "operatingSystem": operatingSystem,
        "offers": {
            "@type": "Offer",
            "price": offers.price,
            "priceCurrency": offers.priceCurrency,
            "availability": "https://schema.org/InStock"
        },
        ...(aggregateRating && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": aggregateRating.ratingValue,
                "reviewCount": aggregateRating.reviewCount,
                "bestRating": "5",
                "worstRating": "1"
            }
        }),
        ...(featureList && { "featureList": featureList }),
        ...(screenshot && { "screenshot": screenshot }),
        "inLanguage": inLanguage,
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "2.0",
        "provider": {
            "@type": "Organization",
            "@id": "https://eecglobal.com/#organization",
            "name": "EEC"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
