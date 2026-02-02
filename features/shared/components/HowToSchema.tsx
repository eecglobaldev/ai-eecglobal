export interface HowToStep {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

export interface HowToSchemaProps {
    name: string;
    description: string;
    totalTime?: string; // ISO 8601 duration format, e.g., "PT30M" for 30 minutes
    steps: HowToStep[];
    image?: string;
}

export default function HowToSchema({
    name,
    description,
    totalTime,
    steps,
    image
}: HowToSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "description": description,
        ...(totalTime && { "totalTime": totalTime }),
        ...(image && { "image": image }),
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text,
            ...(step.image && { "image": step.image }),
            ...(step.url && { "url": step.url })
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
