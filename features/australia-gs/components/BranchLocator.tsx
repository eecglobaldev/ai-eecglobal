import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BRANCH_DATA } from '../data/branches';
import type { Branch, GoogleReview } from '../types';

// Icons
const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const MessageCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);
const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const StarIcon: React.FC<{ className?: string; filled?: boolean }> = ({ className, filled = true }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
);

// Star Rating Component
const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' }> = ({ rating, size = 'sm' }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
    
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <StarIcon key={`full-${i}`} className={`${sizeClass} text-amber-400`} filled={true} />
            ))}
            {hasHalfStar && <StarIcon className={`${sizeClass} text-amber-400 opacity-50`} filled={true} />}
            {[...Array(emptyStars)].map((_, i) => (
                <StarIcon key={`empty-${i}`} className={`${sizeClass} text-slate-300 dark:text-slate-600`} filled={false} />
            ))}
        </div>
    );
};

// Review Slider Component
const ReviewSlider: React.FC<{ reviews: GoogleReview[] }> = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextReview = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, [reviews.length]);

    const prevReview = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }, [reviews.length]);

    useEffect(() => {
        if (isPaused || reviews.length <= 1) return;
        const interval = setInterval(nextReview, 5000);
        return () => clearInterval(interval);
    }, [isPaused, nextReview, reviews.length]);

    if (!reviews || reviews.length === 0) return null;

    const currentReview = reviews[currentIndex];

    return (
        <div 
            className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-lg p-4 mt-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <QuoteIcon className="absolute top-3 left-3 text-blue-200 dark:text-blue-800 opacity-50" />
            <div className="pl-6">
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-2">
                    "{currentReview.text}"
                </p>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                            {currentReview.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {currentReview.author}
                        </span>
                        <StarRating rating={currentReview.rating} size="sm" />
                    </div>
                    {reviews.length > 1 && (
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={prevReview}
                                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                aria-label="Previous review"
                            >
                                <ChevronLeftIcon className="w-4 h-4 text-slate-500" />
                            </button>
                            <span className="text-xs text-slate-500">{currentIndex + 1}/{reviews.length}</span>
                            <button 
                                onClick={nextReview}
                                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                aria-label="Next review"
                            >
                                <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
    const baseButtonClasses = "group inline-flex items-center justify-center space-x-2 text-sm font-semibold px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 transition-colors";

    const getContactLabel = (type: string, medium: 'WhatsApp' | 'Call') => {
        if (type.toLowerCase().includes('coaching')) return `${medium} (Coaching)`;
        if (type.toLowerCase().includes('admission')) return `${medium} (Admissions)`;
        return medium;
    };

    return (
        <article className="bg-white dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 transform transition-all duration-300 hover:border-brand/50 dark:hover:border-brand-light/50 hover:-translate-y-1 shadow-sm hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-brand-light/10">
            {/* Header with Name and Rating */}
            <header className="flex justify-between items-start gap-3 flex-wrap">
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg text-brand dark:text-brand-light">
                            {branch.name.replace('EEC ', '')} Branch
                        </h3>
                        {branch.isHeadOffice && (
                            <span className="flex items-center gap-1 text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
                                <StarIcon className="w-3 h-3" />
                                Head Office
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{branch.address.addressLocality}, Gujarat</p>
                </div>
                
                {/* Google Rating Badge */}
                {branch.googleRating && (
                    <a 
                        href={branch.hasMap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors shadow-sm"
                        aria-label={`View ${branch.googleReviewCount} Google reviews`}
                    >
                        <div className="flex items-center gap-1">
                            <span className="text-xl font-bold text-slate-800 dark:text-white">{branch.googleRating}</span>
                            <StarIcon className="w-5 h-5 text-amber-400" filled={true} />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {branch.googleReviewCount?.toLocaleString()} reviews
                        </span>
                    </a>
                )}
            </header>

            {/* Address */}
            <address className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed not-italic">
                {branch.address.streetAddress}
            </address>

            {/* Timings */}
            {branch.timings && (
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>Timings</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div>
                            <span className="font-medium">Coaching:</span> {branch.timings.coachingCounseling}
                        </div>
                        <div>
                            <span className="font-medium">Demo Class:</span> {branch.timings.demoClass}
                        </div>
                        <div>
                            <span className="font-medium">Visa Counseling:</span> {branch.timings.visaCounseling}
                        </div>
                        <div>
                            <span className="font-medium text-green-600 dark:text-green-400">{branch.timings.workingDays}</span>
                            <span className="text-red-500 dark:text-red-400"> (Closed: {branch.timings.closedOn})</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Actions */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                <div className="flex flex-wrap gap-2">
                    {/* Map Link */}
                    <a 
                        href={branch.hasMap} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`${baseButtonClasses} hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-teal-500/20 dark:hover:text-teal-300`} 
                        aria-label={`Get directions to ${branch.name}`}
                    >
                        <MapPinIcon className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:animate-bounce" /> 
                        <span>Directions</span>
                    </a>
                    
                    {/* All Contact Points - WhatsApp and Phone */}
                    {branch.contactPoint.map((contact, index) => (
                        <React.Fragment key={index}>
                            {contact.url && !contact.url.endsWith('nan') && (
                                <a 
                                    href={contact.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`${baseButtonClasses} hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-500/20 dark:hover:text-green-300`} 
                                    aria-label={`WhatsApp ${contact.contactType} at ${branch.name}`}
                                >
                                    <MessageCircleIcon className="transition-transform duration-300 group-hover:scale-125" /> 
                                    <span className="hidden sm:inline">{getContactLabel(contact.contactType, 'WhatsApp')}</span>
                                    <span className="sm:hidden">WA</span>
                                </a>
                            )}
                            {contact.telephone && (
                                <a 
                                    href={`tel:${contact.telephone.replace(/\s/g, '')}`} 
                                    className={`${baseButtonClasses} hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-500/20 dark:hover:text-blue-300`} 
                                    aria-label={`Call ${contact.contactType} at ${branch.name}`}
                                >
                                    <PhoneIcon className="transition-transform duration-500 group-hover:rotate-[20deg]" /> 
                                    <span className="hidden sm:inline">{getContactLabel(contact.contactType, 'Call')}</span>
                                    <span className="sm:hidden">{contact.telephone.slice(-10)}</span>
                                </a>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Additional Counselor Contacts */}
                {branch.counselors && branch.counselors.length > 0 && branch.counselors.some(c => c.phone) && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/30">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Additional Contacts:</p>
                        <div className="flex flex-wrap gap-2">
                            {branch.counselors.filter(c => c.phone).map((counselor, idx) => (
                                <a
                                    key={idx}
                                    href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    <PhoneIcon className="w-3 h-3" />
                                    {counselor.phone}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Google Reviews Slider */}
            {branch.googleReviews && branch.googleReviews.length > 0 && (
                <ReviewSlider reviews={branch.googleReviews} />
            )}
        </article>
    );
};


export const BranchLocator: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const { regions, branchesByCity } = useMemo(() => {
        const regions: Record<string, string[]> = {};
        const branchesByCity: Record<string, Branch[]> = {};

        BRANCH_DATA.forEach(branch => {
            const city = branch.address.addressLocality;
            const region = branch.region || 'Other';
            
            if (!regions[region]) {
                regions[region] = [];
            }
            if (!regions[region].includes(city)) {
                regions[region].push(city);
            }
            if (!branchesByCity[city]) {
                branchesByCity[city] = [];
            }
            branchesByCity[city].push(branch);
        });

        // Sort cities within regions
        for (const region in regions) {
            regions[region].sort();
        }
        
        return { regions, branchesByCity };
    }, []);

    const regionOrder = ['Central Gujarat', 'North Gujarat', 'South Gujarat', 'Saurashtra & Kutch', 'Other'];
    const sortedRegions = useMemo(() => Object.keys(regions).sort((a, b) => regionOrder.indexOf(a) - regionOrder.indexOf(b)), [regions]);

    // Calculate total reviews and average rating
    const { totalReviews, averageRating } = useMemo(() => {
        let totalReviews = 0;
        let totalRatingSum = 0;
        let branchesWithRating = 0;
        
        BRANCH_DATA.forEach(branch => {
            if (branch.googleReviewCount) {
                totalReviews += branch.googleReviewCount;
            }
            if (branch.googleRating) {
                totalRatingSum += branch.googleRating;
                branchesWithRating++;
            }
        });
        
        return {
            totalReviews,
            averageRating: branchesWithRating > 0 ? (totalRatingSum / branchesWithRating).toFixed(1) : '0'
        };
    }, []);

    useEffect(() => {
        if (sortedRegions.length > 0 && regions[sortedRegions[0]].length > 0 && !selectedCity) {
            setSelectedCity(regions[sortedRegions[0]][0]);
        }
    }, [sortedRegions, regions, selectedCity]);


    return (
        <section id="branch-locator" className="py-12">
            <div className="max-w-6xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-400 dark:to-emerald-400">
                        Connect with 26 EEC Branches
                    </h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                        Gujarat's largest study abroad network with over <strong>{totalReviews.toLocaleString()}+ Google reviews</strong> and <strong>{averageRating}★ average rating</strong>
                    </p>
                </header>
                
                <div className="grid md:grid-cols-12 gap-8 min-h-[60vh]">
                    <aside className="md:col-span-4 lg:col-span-3">
                        <div className="p-3 bg-white/60 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-700/60 sticky top-24">
                            <h3 className="font-semibold p-2 text-slate-600 dark:text-slate-400 text-base" id="city-locations-label">Our Locations</h3>
                            <div role="tablist" aria-labelledby="city-locations-label" className="space-y-1">
                                {sortedRegions.map(region => (
                                    <div key={region} className="pt-2">
                                        <h4 className="px-3 py-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-500">{region}</h4>
                                        {regions[region].map(city => (
                                            <button 
                                                key={city}
                                                id={`tab-${city}`}
                                                role="tab"
                                                aria-selected={selectedCity === city}
                                                aria-controls={`panel-${city}`}
                                                onClick={() => setSelectedCity(city)}
                                                className={`w-full text-left font-semibold px-3 py-2 rounded-md transition-colors text-base flex justify-between items-center ${selectedCity === city ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/50'}`}
                                            >
                                                <span>{city}</span>
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${selectedCity === city ? 'bg-blue-200 dark:bg-blue-500/50 text-blue-700 dark:text-blue-200' : 'bg-slate-300/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                                    {branchesByCity[city]?.length || 0}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                    <main className="md:col-span-8 lg:col-span-9">
                        {selectedCity && (
                            <div
                                id={`panel-${selectedCity}`}
                                role="tabpanel"
                                tabIndex={0}
                                aria-labelledby={`tab-${selectedCity}`}
                                className="space-y-6 focus:outline-none"
                            >
                                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-6">
                                    Branches in {selectedCity}
                                    <span className="text-sm font-normal text-slate-500 ml-2">
                                        ({branchesByCity[selectedCity]?.length} {branchesByCity[selectedCity]?.length === 1 ? 'branch' : 'branches'})
                                    </span>
                                </h2>
                                {branchesByCity[selectedCity]?.map(branch => (
                                    <BranchCard key={branch.identifier} branch={branch} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};
