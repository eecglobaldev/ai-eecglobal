import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BRANCHES } from '../data/branches';
import { Branch } from '../types';

type GroupedBranches = Record<string, Branch[]>;

// Icons as functional components
const MapPinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>
);

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const QuoteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-20"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg>
);

// Review Slider Component
const ReviewSlider: React.FC<{ reviews: { author: string; rating: number; text: string; date: string }[] }> = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 4000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [reviews.length]);

    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="mt-3 relative overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-3 border border-amber-200/50 dark:border-amber-700/30">
            <div className="absolute top-2 right-2">
                <QuoteIcon />
            </div>
            <div className="flex items-start gap-2">
                <div className="flex text-amber-500 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled />
                    ))}
                </div>
            </div>
            <div className="relative h-16 overflow-hidden mt-2">
                {reviews.map((review, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${idx === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                            }`}
                    >
                        <p className="text-sm text-slate-700 dark:text-slate-300 italic line-clamp-2">"{review.text}"</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">— {review.author}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-1.5 mt-2">
                {reviews.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-500 w-3' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                        aria-label={`Go to review ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Contact Item Component
const ContactItem: React.FC<{ type: string; phone: string; whatsappUrl: string }> = ({ type, phone, whatsappUrl }) => {
    if (!phone) return null;

    return (
        <div className="flex flex-col gap-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{type}</span>
            <div className="flex flex-wrap gap-2">
                <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                    <PhoneIcon /> {phone}
                </a>
                {whatsappUrl && (
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                    >
                        <WhatsAppIcon /> WhatsApp
                    </a>
                )}
            </div>
        </div>
    );
};

const normalizeCityName = (branch: Branch): string => {
    const cityMap: Record<string, string> = { 'EEC Vallabh Vidyanagar Anand': 'Anand' };
    if (branch.address.addressLocality && branch.address.addressLocality !== 'Nan' && branch.address.addressLocality.trim() !== '') {
        return branch.address.addressLocality;
    }
    return cityMap[branch.name] || 'Other';
};

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
    const timings = branch.timings;
    const reviews = branch.reviews;

    return (
        <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 transform transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500/50 hover:scale-[1.01] shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_theme(colors.blue.900/50%)] dark:hover:shadow-[0_0_30px_theme(colors.blue.600/50%)] overflow-hidden">
            {/* Header with Rating */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-xl text-blue-700 dark:text-blue-300">{branch.name.replace('EEC ', '')} Branch</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                            <MapPinIcon />
                            {branch.address.addressLocality}, {branch.address.addressRegion}
                        </p>
                    </div>
                    {reviews && (
                        <div className="flex flex-col items-end bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm">
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{reviews.rating}</span>
                                <span className="text-amber-500"><StarIcon /></span>
                            </div>
                            <a
                                href={branch.hasMap}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {reviews.totalReviews.toLocaleString()} reviews
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Address */}
                <div className="mb-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {branch.address.streetAddress}
                    </p>
                </div>

                {/* Timings */}
                <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200/50 dark:border-emerald-700/30">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm mb-2">
                        <ClockIcon /> Branch Timings
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {timings.coachingCounseling && (
                            <div className="flex justify-between">
                                <span>Coaching & Counseling:</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{timings.coachingCounseling}</span>
                            </div>
                        )}
                        {timings.demoClass && (
                            <div className="flex justify-between">
                                <span>Demo Classes:</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{timings.demoClass}</span>
                            </div>
                        )}
                        {timings.visaCounseling && (
                            <div className="flex justify-between">
                                <span>Visa Counseling:</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{timings.visaCounseling}</span>
                            </div>
                        )}
                        {timings.general && (
                            <div className="flex justify-between">
                                <span>General Hours:</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{timings.general}</span>
                            </div>
                        )}
                        <div className="flex justify-between mt-1 pt-1 border-t border-emerald-200 dark:border-emerald-700/30">
                            <span>{timings.workingDays}</span>
                            <span className="font-medium text-red-600 dark:text-red-400">Closed: {timings.closedOn}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Numbers */}
                <div className="mb-4">
                    <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Contact Numbers</h5>
                    <div className="grid grid-cols-1 gap-2">
                        {branch.contactPoint.map((contact, idx) => (
                            <ContactItem
                                key={idx}
                                type={contact.contactType}
                                phone={contact.telephone.replace('+91 ', '')}
                                whatsappUrl={contact.url}
                            />
                        ))}
                        {/* Additional counselor contacts */}
                        {branch.counselors && branch.counselors.filter(c => c.phone && !branch.contactPoint.some(cp => cp.telephone.includes(c.phone))).length > 0 && (
                            <div className="mt-2">
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Additional Contacts</span>
                                <div className="flex flex-wrap gap-2 mt-1.5">
                                    {branch.counselors
                                        .filter(c => c.phone && !branch.contactPoint.some(cp => cp.telephone.includes(c.phone)))
                                        .map((counselor, idx) => (
                                            <a
                                                key={idx}
                                                href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded"
                                            >
                                                <PhoneIcon /> {counselor.phone}
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Google Reviews Slider */}
                {reviews && reviews.fiveStarReviews && (
                    <div>
                        <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <span className="text-amber-500"><StarIcon /></span> Google Reviews
                        </h5>
                        <ReviewSlider reviews={reviews.fiveStarReviews} />
                    </div>
                )}

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
                    <a
                        href={branch.hasMap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        aria-label={`Get directions to ${branch.name}`}
                    >
                        <MapPinIcon /> View on Google Maps
                    </a>
                    {branch.contactPoint[0]?.url && (
                        <a
                            href={branch.contactPoint[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                            aria-label={`WhatsApp ${branch.name}`}
                        >
                            <WhatsAppIcon /> WhatsApp Now
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


export const BranchLocator: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const groupedBranches = useMemo((): GroupedBranches => {
        const groups: GroupedBranches = {};
        BRANCHES.forEach(branch => {
            const city = normalizeCityName(branch);
            if (!groups[city]) {
                groups[city] = [];
            }
            groups[city].push(branch);
        });
        // Sort cities by number of branches (descending)
        const sortedCities = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
        return sortedCities.reduce((acc, key) => {
            acc[key] = groups[key];
            return acc;
        }, {} as GroupedBranches);
    }, []);

    const cities = useMemo(() => Object.keys(groupedBranches), [groupedBranches]);

    // Calculate total reviews and average rating
    const stats = useMemo(() => {
        let totalReviews = 0;
        let totalRating = 0;
        let branchCount = 0;
        BRANCHES.forEach(b => {
            if (b.reviews) {
                totalReviews += b.reviews.totalReviews;
                totalRating += b.reviews.rating;
                branchCount++;
            }
        });
        return {
            totalReviews,
            avgRating: branchCount > 0 ? (totalRating / branchCount).toFixed(1) : '0',
            branchCount: BRANCHES.length
        };
    }, []);

    useEffect(() => {
        if (cities.length > 0 && !selectedCity) {
            setSelectedCity(cities[0]);
        }
    }, [cities, selectedCity]);


    return (
        <section id="branches" className="mt-16 py-12 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Connect with EEC Branches</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
                        Our network of 26 branches across Gujarat is ready to guide you on your USA education journey.
                    </p>
                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.branchCount}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Branches</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow">
                            <span className="text-2xl font-bold text-amber-500">{stats.avgRating}</span>
                            <StarIcon />
                            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Rating</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow">
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.totalReviews.toLocaleString()}+</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400">Google Reviews</span>
                        </div>
                    </div>
                </header>

                <div className="grid md:grid-cols-12 gap-8 min-h-[60vh]">
                    <aside className="md:col-span-4 lg:col-span-3">
                        <div className="p-3 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 sticky top-6 shadow-lg">
                            <h3 className="font-bold p-2 text-slate-800 dark:text-slate-200 text-base border-b border-slate-200 dark:border-slate-700 mb-2">Our Locations ({cities.length} Cities)</h3>
                            <ul className="space-y-1  overflow-y-auto">
                                {cities.map(city => (
                                    <li key={city}>
                                        <button
                                            onClick={() => setSelectedCity(city)}
                                            className={`w-full text-left font-semibold px-3 py-2.5 rounded-lg transition-all text-base flex justify-between items-center ${selectedCity === city
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                                }`}
                                            aria-current={selectedCity === city ? 'page' : undefined}
                                        >
                                            <span>{city}</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedCity === city
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                                }`}>
                                                {groupedBranches[city].length}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <main className="md:col-span-8 lg:col-span-9">
                        {selectedCity && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                                        {selectedCity} Branches ({groupedBranches[selectedCity].length})
                                    </h3>
                                </div>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    {groupedBranches[selectedCity].map(branch => (
                                        <BranchCard key={branch.identifier} branch={branch} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Schema.org Structured Data for LocalBusiness */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "EEC Branch Locations in Gujarat",
                    "description": "All 26 EEC branch locations providing F-1 visa preparation and study abroad services in Gujarat, India",
                    "numberOfItems": BRANCHES.length,
                    "itemListElement": BRANCHES.map((branch, idx) => ({
                        "@type": "ListItem",
                        "position": idx + 1,
                        "item": {
                            "@type": "EducationalOrganization",
                            "name": branch.name,
                            "address": branch.address,
                            "geo": branch.geo,
                            "telephone": branch.contactPoint[0]?.telephone,
                            "url": branch.hasMap,
                            "aggregateRating": branch.reviews ? {
                                "@type": "AggregateRating",
                                "ratingValue": branch.reviews.rating,
                                "reviewCount": branch.reviews.totalReviews
                            } : undefined
                        }
                    }))
                })
            }} />
        </section>
    );
};
