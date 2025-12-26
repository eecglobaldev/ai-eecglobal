import React, { useState, useMemo, useEffect } from 'react';
import { BRANCHES } from '../data/branches';
import { Branch, GoogleReview } from '../types';

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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const normalizeCityName = (branch: Branch): string => {
    const cityMap: Record<string, string> = { 'EEC Vallabh Vidyanagar Anand': 'Anand' };
    if (branch.address.addressLocality && branch.address.addressLocality !== 'Nan' && branch.address.addressLocality.trim() !== '') {
        return branch.address.addressLocality;
    }
    return cityMap[branch.name] || 'Other';
};

// Review Slider Component
const ReviewSlider: React.FC<{ reviews: GoogleReview[] }> = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (reviews.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    if (!reviews || reviews.length === 0) return null;

    const currentReview = reviews[currentIndex];

    return (
        <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 relative">
            <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < currentReview.rating} />
                ))}
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    {currentReview.reviewerName}
                </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic line-clamp-2">
                "{currentReview.text}"
            </p>
            {reviews.length > 1 && (
                <div className="flex items-center justify-between mt-2">
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                        aria-label="Previous review"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <div className="flex gap-1">
                        {reviews.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                    idx === currentIndex ? 'bg-yellow-500' : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                        aria-label="Next review"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            )}
        </div>
    );
};

// Rating Badge Component
const RatingBadge: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
    <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg px-2.5 py-1.5">
        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
            <StarIcon filled />
            <span className="font-bold text-sm">{rating}</span>
        </div>
        <span className="text-xs text-yellow-700 dark:text-yellow-400">
            ({reviewCount.toLocaleString()} reviews)
        </span>
    </div>
);

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
    const baseButtonClasses = "inline-flex items-center justify-center space-x-2 text-sm font-medium px-3 py-2 rounded-md bg-slate-100 dark:bg-gray-700/50 text-slate-700 dark:text-gray-300 transition-colors";

    // Get timings display
    const getTimingsDisplay = () => {
        const timings = branch.timings;
        if (timings.general) {
            return timings.general;
        }
        return timings.coachingCounseling || '10:00 AM to 07:00 PM';
    };

    return (
        <div className="bg-white dark:bg-slate-900/60 p-5 rounded-lg border border-slate-200 dark:border-slate-700 transform transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500/50 hover:scale-[1.01] shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_theme(colors.blue.900/50%)] dark:hover:shadow-[0_0_30px_theme(colors.blue.600/50%)]">
            {/* Header with Name and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <h4 className="font-bold text-lg text-blue-600 dark:text-blue-300">
                    {branch.name.replace('EEC ', '')} Branch
                </h4>
                {branch.reviews && (
                    <RatingBadge rating={branch.reviews.rating} reviewCount={branch.reviews.reviewCount} />
                )}
            </div>
            
            {/* Address */}
            <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                {branch.address.streetAddress}
            </p>

            {/* Timings */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <ClockIcon />
                    <span>{getTimingsDisplay()}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-slate-600 dark:text-slate-400">{branch.timings.workingDays}</span>
                <span className="text-red-500 dark:text-red-400 text-xs">({branch.timings.closedOn} Closed)</span>
            </div>

            {/* Contact Points */}
            <div className="mt-4 space-y-2">
                {branch.contactPoint.map((contact, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 min-w-fit">
                            {contact.contactType}:
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                            {contact.telephone && (
                                <a 
                                    href={`tel:${contact.telephone}`} 
                                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                >
                                    <PhoneIcon />
                                    <span>{contact.telephone}</span>
                                </a>
                            )}
                            {contact.url && !contact.url.includes('nan') && (
                                <a 
                                    href={contact.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
                                >
                                    <WhatsAppIcon />
                                    <span className="text-xs">WhatsApp</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Counselor Phones (if different from contact points) */}
            {branch.counselors && branch.counselors.filter(c => c.phone && c.phone.trim()).length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">
                        Additional Counselor Lines:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {branch.counselors
                            .filter(c => c.phone && c.phone.trim())
                            .map((counselor, idx) => (
                                <a
                                    key={idx}
                                    href={`tel:+91${counselor.phone.replace(/\s/g, '')}`}
                                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700/50 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <PhoneIcon />
                                    <span>{counselor.phone}</span>
                                </a>
                            ))}
                    </div>
                </div>
            )}

            {/* Reviews Slider */}
            {branch.reviews && branch.reviews.fiveStarReviews && branch.reviews.fiveStarReviews.length > 0 && (
                <ReviewSlider reviews={branch.reviews.fiveStarReviews} />
            )}

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
                <a 
                    href={branch.hasMap} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${baseButtonClasses} hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-teal-500/20 dark:hover:text-teal-300`} 
                    aria-label={`Get directions to ${branch.name}`}
                >
                    <MapPinIcon /> <span>Directions</span>
                </a>
                {branch.contactPoint[0]?.url && !branch.contactPoint[0].url.includes('nan') && (
                    <a 
                        href={branch.contactPoint[0].url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`${baseButtonClasses} hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-500/20 dark:hover:text-green-300`} 
                        aria-label={`WhatsApp ${branch.name}`}
                    >
                        <WhatsAppIcon /> <span>WhatsApp</span>
                    </a>
                )}
                {branch.contactPoint[0]?.telephone && (
                    <a 
                        href={`tel:${branch.contactPoint[0].telephone}`} 
                        className={`${baseButtonClasses} hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-500/20 dark:hover:text-blue-300`} 
                        aria-label={`Call ${branch.name}`}
                    >
                        <PhoneIcon /> <span>Call Now</span>
                    </a>
                )}
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
        // Sort cities by branch count (descending)
        const sortedEntries = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
        return Object.fromEntries(sortedEntries);
    }, []);

    const cities = useMemo(() => Object.keys(groupedBranches), [groupedBranches]);

    // Calculate total reviews across all branches
    const totalStats = useMemo(() => {
        let totalReviews = 0;
        let totalRating = 0;
        let ratedBranches = 0;
        BRANCHES.forEach(branch => {
            if (branch.reviews) {
                totalReviews += branch.reviews.reviewCount;
                totalRating += branch.reviews.rating;
                ratedBranches++;
            }
        });
        return {
            totalReviews,
            avgRating: ratedBranches > 0 ? (totalRating / ratedBranches).toFixed(1) : '4.7',
            branchCount: BRANCHES.length,
            cityCount: cities.length
        };
    }, [cities]);

    useEffect(() => {
        if (cities.length > 0 && !selectedCity) {
            setSelectedCity(cities[0]);
        }
    }, [cities, selectedCity]);

    return (
        <section className="mt-16 py-12 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="max-w-6xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        Connect with EEC Branches
                    </h2>
                    <p className="text-center text-lg text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
                        Our network of {totalStats.branchCount} branches across {totalStats.cityCount} cities in Gujarat is ready to guide your study abroad journey.
                    </p>
                    
                    {/* Trust Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-sm">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                            <span className="text-yellow-500"><StarIcon filled /></span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{totalStats.avgRating}</span>
                            <span className="text-slate-600 dark:text-slate-400">Avg Rating</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                            <span className="text-blue-500">📝</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{totalStats.totalReviews.toLocaleString()}+</span>
                            <span className="text-slate-600 dark:text-slate-400">Google Reviews</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                            <span className="text-green-500">✓</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">95%+</span>
                            <span className="text-slate-600 dark:text-slate-400">Visa Success</span>
                        </div>
                    </div>
                </header>
                
                <div className="grid md:grid-cols-12 gap-8 min-h-[60vh]">
                    <aside className="md:col-span-4 lg:col-span-3">
                        <div className="p-3 bg-slate-200/60 dark:bg-slate-800/50 rounded-lg border border-slate-300/60 dark:border-slate-700 sticky top-6">
                            <h3 className="font-semibold p-2 text-slate-800 dark:text-slate-200 text-base">
                                Our Locations
                            </h3>
                            <ul className="space-y-1">
                                {cities.map(city => (
                                    <li key={city}>
                                        <button 
                                            onClick={() => setSelectedCity(city)}
                                            className={`w-full text-left font-semibold px-3 py-2 rounded-md transition-colors text-sm flex justify-between items-center ${
                                                selectedCity === city 
                                                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300' 
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/50'
                                            }`}
                                            aria-current={selectedCity === city ? 'page' : undefined}
                                        >
                                            <span>{city}</span>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                selectedCity === city 
                                                    ? 'bg-blue-200 dark:bg-blue-500/50 text-blue-700 dark:text-blue-200' 
                                                    : 'bg-slate-300/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
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
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                                    EEC Branches in {selectedCity} ({groupedBranches[selectedCity].length})
                                </h3>
                                {groupedBranches[selectedCity].map(branch => (
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
