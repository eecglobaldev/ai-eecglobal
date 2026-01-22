'use client';

import { AuthorProfiles } from '@/features/nz-visa/seo/AuthorProfiles';
import { BranchLocator } from '@/features/nz-visa/components/BranchLocator';
import { BRANCH_DATA } from '@/features/nz-visa/data/branches';
import { Award, Quote, MapPin, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

// Success stories extracted from LSIContent.tsx
const successStories = [
  {
    quote: "The AI-generated questions were exactly what the INZ visa officer asked me! I practiced with this free tool and felt completely prepared for my credibility interview.",
    author: "Vidhi Shiyani",
    details: "University of Auckland, MBA Student",
    location: "Ahmedabad",
    rating: 5,
    image: "/assets/studentimg/female1.png",
  },
  {
    quote: "As a married applicant, I had complex questions about my spouse's plans. The AI tool specifically prepared me for family-related visa questions. Got approved!",
    author: "Hritik Shah",
    details: "Massey University, Engineering",
    location: "Surat",
    rating: 5,
    image: "/assets/studentimg/male1.png",
  },
  {
    quote: "The financial questions preparation was invaluable. I could confidently explain my FTS scheme documentation and sponsor details to the officer.",
    author: "Sneha Desai",
    details: "Victoria University, Law",
    location: "Vadodara",
    rating: 5,
    image: "/assets/studentimg/female2.png",
  },
];

export default function NZVisaAboutEecPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ai.eecglobal.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "NZ Visa Prep",
                "item": "https://ai.eecglobal.com/nzvisaprep/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "About EEC",
                "item": "https://ai.eecglobal.com/nzvisaprep/about-eec/"
            }
        ]
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://eecglobal.com/#organization",
        "name": "EEC - Enbee Education Center",
        "alternateName": ["EEC Global", "Enbee Education"],
        "url": "https://eecglobal.com",
        "logo": "https://ai.eecglobal.com/assets/eeclogo.svg",
        "description": "India's leading New Zealand student visa preparation consultancy, established in 1997. Operating 26 branches across 12 cities in Gujarat. Guided over 100,000 students to international education destinations.",
        "foundingDate": "1997",
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "200+"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gujarat",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8758750036",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Gujarati"]
        },
        "sameAs": [
            "https://www.facebook.com/eecglobal",
            "https://www.linkedin.com/company/eec-global",
            "https://www.instagram.com/eecglobal"
        ],
        "award": [
            "ENZRA Certified (Education New Zealand Recognized Agency)",
            "AIRC Certified (American International Recruitment Council)",
            "ICEF Accredited",
            "U.S. News Global Education Certified"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2847",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": successStories.map(story => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": story.author
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": story.rating,
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": story.quote,
            "itemReviewed": {
                "@type": "Service",
                "name": "EEC NZ Visa Prep Tool",
                "provider": {
                    "@id": "https://eecglobal.com/#organization"
                }
            }
        }))
    };

    // Generate LocalBusiness schemas for all 26 branches
    const localBusinessSchemas = BRANCH_DATA.map(branch => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `https://eecglobal.com/branches/${branch.identifier}`,
            "name": branch.name,
            "description": `${branch.name} - EEC Study Abroad Consultancy Branch providing IELTS/PTE coaching, university admissions, and visa guidance services for students planning to study in New Zealand, UK, USA, Canada, Australia, and Germany.`,
            "image": "https://ai.eecglobal.com/assets/eeclogo.svg",
            "url": "https://eecglobal.com",
            "telephone": branch.contactPoint?.[0]?.telephone || "+918758750036",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": branch.address.streetAddress,
                "addressLocality": branch.address.addressLocality,
                "addressRegion": branch.address.addressRegion,
                "addressCountry": "IN"
            },
            "geo": branch.geo ? {
                "@type": "GeoCoordinates",
                "latitude": branch.geo.latitude,
                "longitude": branch.geo.longitude
            } : undefined,
            "hasMap": branch.hasMap,
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "10:00",
                    "closes": "19:00"
                }
            ],
            "sameAs": [
                "https://www.instagram.com/eecglobal",
                "https://www.facebook.com/eecglobal",
                "https://www.linkedin.com/company/eec-global"
            ],
            "parentOrganization": {
                "@type": "Organization",
                "@id": "https://eecglobal.com/#organization",
                "name": "EEC - Enbee Education Center"
            }
        };

        // Add aggregate rating if available
        if (branch.googleRating) {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": branch.googleRating.rating.toString(),
                "reviewCount": branch.googleRating.totalReviews.toString(),
                "bestRating": "5",
                "worstRating": "1"
            };
        }

        return schema;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0a0d14] dark:via-[#0d1117] dark:to-[#0a0d14]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            {localBusinessSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            {/* Hero Section */}
            <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-[150px] animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 dark:bg-amber-500/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Link href="/nzvisaprep/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                            NZ Visa Prep
                        </Link>
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-slate-900 dark:text-white font-medium">About EEC</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700/60 mb-6 backdrop-blur-xl">
                            <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700 dark:text-teal-300">Why Choose EEC</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
                            <span className="text-slate-800 dark:text-white">Gujarat's #1 NZ Study</span>
                            <br />
                            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-amber-600 dark:from-teal-400 dark:via-cyan-400 dark:to-amber-400 bg-clip-text text-transparent">
                                Abroad Consultant Since 1997
                            </span>
                        </h1>
                        
                        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            28 years of expertise, 100,000+ students guided, 26 branches across Gujarat. Discover why EEC is the trusted choice for New Zealand student visa preparation and success.
                        </p>
                    </div>

                    {/* Quick Navigation Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
                        <a 
                            href="#expert-team" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Quote className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Expert Team</span>
                        </a>
                        
                        <a 
                            href="#success-stories" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Star className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Success Stories</span>
                        </a>
                        
                        <a 
                            href="#branch-locator" 
                            className="group flex flex-col items-center gap-2 p-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-[#30363d] hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">Find a Branch</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content - All Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                {/* Expert Team */}
                <section id="expert-team" className="mb-12 sm:mb-16">
                    <AuthorProfiles />
                </section>

                {/* Success Stories */}
                <section id="success-stories" className="mb-12 sm:mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">
                            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Success Stories</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Real experiences from students who used our NZ Visa Prep tool and achieved visa success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {successStories.map((story, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(story.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                                    "{story.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                                        {story.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">{story.author}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{story.details}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-500">{story.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Branch Locator */}
                <section id="branch-locator" className="mb-12 sm:mb-16">
                    <BranchLocator />
                </section>

                {/* Call to Action */}
                <section className="mt-16 sm:mt-20 text-center">
                    <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-amber-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                                Ready to Start Your NZ Journey?
                            </h2>
                            <p className="text-lg text-teal-50 mb-8 max-w-2xl mx-auto">
                                Join thousands of successful students who trusted EEC for their New Zealand student visa preparation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/nzvisaprep"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 font-bold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors"
                                >
                                    Start Free Preparation
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://wa.me/918758750036"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-teal-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-800 transition-colors"
                                >
                                    Contact Our Experts
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Pages */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="/nzvisaprep/faq/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">FAQ</h3>
                            <p className="text-slate-600 dark:text-slate-400">Get answers to common questions about NZ student visas</p>
                        </a>
                        <a
                            href="/nzvisaprep/glossary/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Glossary</h3>
                            <p className="text-slate-600 dark:text-slate-400">Learn key terms and definitions for NZ student visas</p>
                        </a>
                        <a
                            href="/nzvisaprep/preparation-guide/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Preparation Guide</h3>
                            <p className="text-slate-600 dark:text-slate-400">Step-by-step guide for visa application and interview</p>
                        </a>
                        <a
                            href="/nzvisaprep/resources/"
                            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Resources</h3>
                            <p className="text-slate-600 dark:text-slate-400">Document checklist, cost calculator, and statistics</p>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
