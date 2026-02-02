import { Metadata } from 'next';
import GoogleTagManager from '@/components/GoogleTagManager';
import ReviewPageWrapper from './ReviewPageWrapper';
import BreadcrumbSchema from '@/features/shared/components/BreadcrumbSchema';
import SoftwareApplicationSchema from '@/features/shared/components/SoftwareApplicationSchema';

export const metadata: Metadata = {
    title: 'AI Testimonial Coach | How to Film EEC Testimonials That Get Noticed',
    description: 'A simple, repeatable process to create professional-looking testimonial videos every single time, using just a smartphone. Get AI-powered trilingual scripts in English, Hindi, and Gujarati.',
    keywords: ['EEC testimonials', 'testimonial video guide', 'how to film testimonials', 'AI testimonial coach', 'professional testimonial videos', 'smartphone video guide', 'testimonial script generator', 'trilingual testimonial scripts', 'EEC review videos', 'student testimonial guide'],
    authors: [{ name: 'EEC (Enbee Education Center Private Limited)' }],
    publisher: 'EEC (Enbee Education Center Private Limited)',
    openGraph: {
        type: 'website',
        url: 'https://ai.eecglobal.com/review',
        title: 'AI Testimonial Coach | How to Film EEC Testimonials That Get Noticed',
        description: 'A simple, repeatable process to create professional-looking testimonial videos every single time, using just a smartphone.',
        siteName: 'EEC AI Testimonial Coach',
        locale: 'en_IN',
        images: [
            {
                url: '/assets/logos/eeclogo-main.png',
                width: 1200,
                height: 630,
                alt: 'EEC AI Testimonial Coach',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Testimonial Coach | How to Film EEC Testimonials That Get Noticed',
        description: 'A simple, repeatable process to create professional-looking testimonial videos every single time, using just a smartphone.',
        images: ['/assets/logos/eeclogo-main.png'],
    },
    alternates: {
        canonical: 'https://ai.eecglobal.com/review/',
    },
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
    },
};

export default function ReviewPage() {
    return (
        <>
            <GoogleTagManager />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: 'https://ai.eecglobal.com/' },
                    { name: 'AI Testimonial Coach' }
                ]}
            />
            <SoftwareApplicationSchema
                name="AI Testimonial Coach"
                description="AI-powered testimonial video coaching tool. Get trilingual scripts in English, Hindi, and Gujarati, and learn how to film professional-looking testimonial videos with just a smartphone."
                url="https://ai.eecglobal.com/review/"
                applicationCategory="BusinessApplication"
                aggregateRating={{
                    ratingValue: "4.7",
                    reviewCount: "189"
                }}
                featureList={[
                    "Trilingual Script Generator",
                    "Video Filming Guide",
                    "Smartphone Optimization",
                    "Professional Tips",
                    "English/Hindi/Gujarati Support",
                    "Step-by-step Process"
                ]}
                screenshot="https://ai.eecglobal.com/assets/screenshots/testimonial-coach.png"
            />
            <ReviewPageWrapper />
        </>
    );
}
