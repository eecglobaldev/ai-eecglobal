/**
 * ReviewSlider Component
 * Google Rating Display - NO FAKE REVIEWS
 * Shows real rating and links to Google Maps for reviews
 * 
 * Updated: December 2024
 */

import React from 'react';
import { Star, ExternalLink, MessageSquare } from 'lucide-react';

// =============================================================================
// RATING DISPLAY COMPONENT - Shows real Google rating
// =============================================================================

interface RatingDisplayProps {
  rating: number;
  totalReviews: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ 
  rating, 
  totalReviews, 
  size = 'md',
  showCount = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: { stars: 'h-3 w-3', text: 'text-xs', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { stars: 'h-4 w-4', text: 'text-sm', badge: 'text-[10px] px-2 py-1' },
    lg: { stars: 'h-5 w-5', text: 'text-base', badge: 'text-xs px-2.5 py-1' }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Rating Badge */}
      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg px-2 py-1">
        <Star className={`${sizes.stars} text-amber-400 fill-amber-400`} />
        <span className={`${sizes.text} font-black text-amber-700 dark:text-amber-400`}>
          {rating.toFixed(1)}
        </span>
      </div>
      
      {/* Review Count */}
      {showCount && (
        <span className={`${sizes.badge} font-bold text-slate-500 dark:text-slate-400`}>
          ({totalReviews.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
};

// =============================================================================
// COMPACT REVIEW BADGE - For branch card headers
// =============================================================================

interface ReviewBadgeProps {
  rating: number;
  totalReviews: number;
  className?: string;
}

export const ReviewBadge: React.FC<ReviewBadgeProps> = ({ 
  rating, 
  totalReviews,
  className = ''
}) => (
  <div className={`inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1 shadow-sm ${className}`}>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-2.5 w-2.5 ${
            i < Math.round(rating) 
              ? 'text-amber-400 fill-amber-400' 
              : 'text-slate-200 dark:text-slate-600'
          }`}
        />
      ))}
    </div>
    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
      {rating.toFixed(1)}
    </span>
    <span className="text-[9px] text-slate-400">
      ({totalReviews.toLocaleString()})
    </span>
  </div>
);

// =============================================================================
// VIEW ON GOOGLE BUTTON - Links to actual Google reviews
// =============================================================================

interface ViewOnGoogleProps {
  mapUrl: string;
  rating: number;
  totalReviews: number;
  branchName: string;
  className?: string;
}

export const ViewOnGoogleButton: React.FC<ViewOnGoogleProps> = ({
  mapUrl,
  rating,
  totalReviews,
  branchName,
  className = ''
}) => (
  <div className={`bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30 ${className}`}>
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < Math.round(rating) 
                  ? 'text-amber-400 fill-amber-400' 
                  : 'text-slate-200 dark:text-slate-600'
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-black text-amber-700 dark:text-amber-400">
          {rating.toFixed(1)}
        </span>
      </div>
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
        {totalReviews.toLocaleString()} Google Reviews
      </span>
    </div>

    {/* Message */}
    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
      Read authentic reviews from students who visited {branchName}.
    </p>

    {/* Button to Google Maps */}
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg text-amber-700 dark:text-amber-400 text-sm font-bold transition-all hover:shadow-md"
      aria-label={`View ${totalReviews} reviews for ${branchName} on Google Maps`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.445 14.832l-3.29-2.035a.877.877 0 01-.405-.742V7.25a.75.75 0 011.5 0v6.403l2.902 1.794a.75.75 0 01-.707 1.385z"/>
      </svg>
      View Reviews on Google Maps
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  </div>
);

// =============================================================================
// ALL PHONES DISPLAY - Shows ALL branch phone numbers
// =============================================================================

interface AllPhonesDisplayProps {
  phones: Array<{
    type: string;
    phone: string;
    whatsapp?: string;
  }>;
  branchName: string;
  className?: string;
}

export const AllPhonesDisplay: React.FC<AllPhonesDisplayProps> = ({
  phones,
  branchName,
  className = ''
}) => {
  // Filter out empty/invalid phones
  const validPhones = phones.filter(p => p.phone && p.phone.trim() !== '' && !p.phone.includes('nan'));
  
  if (validPhones.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {validPhones.map((phoneItem, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50"
        >
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              {phoneItem.type}
            </p>
            <a 
              href={`tel:${phoneItem.phone}`}
              className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {phoneItem.phone}
            </a>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <a
              href={`tel:${phoneItem.phone}`}
              className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
              aria-label={`Call ${phoneItem.type}`}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            {phoneItem.whatsapp && (
              <a
                href={phoneItem.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25D366]/10 text-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label={`WhatsApp ${phoneItem.type}`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Keep old export for backwards compatibility but remove fake review functionality
export const ReviewSlider: React.FC<{ reviews?: any[]; mapUrl?: string; rating?: number; totalReviews?: number; branchName?: string }> = ({ 
  mapUrl,
  rating,
  totalReviews,
  branchName
}) => {
  // If we have the required props, show the Google button
  if (mapUrl && rating && totalReviews && branchName) {
    return (
      <ViewOnGoogleButton
        mapUrl={mapUrl}
        rating={rating}
        totalReviews={totalReviews}
        branchName={branchName}
      />
    );
  }
  
  // Return nothing if no valid data - NO FAKE REVIEWS
  return null;
};

export default ReviewSlider;
