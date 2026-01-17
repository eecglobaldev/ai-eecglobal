export interface ScriptResult {
    english: string;
    hindi: string;
    gujarati: string;
}

export interface TestimonialData {
    type: string;
    name: string;
    score: string;
    topic: string;
}

export interface Branch {
    "@type": string;
    identifier: string;
    name: string;
    address: {
        "@type": string;
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
    contactPoint: Array<{
        "@type": string;
        contactType: string;
        telephone: string;
        url: string;
    }>;
    counselors?: Array<{
        name: string;
        phone?: string;
        email: string;
    }>;
    hasMap?: string;
}
