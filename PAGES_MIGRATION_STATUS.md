# Pages Migration Status - eec-ai-tools to eec-ai-srr

**Last Updated:** 2025-12-27  
**Status:** In Progress

## ✅ Completed Pages

### Utility Pages
- ✅ `/about` - About EEC page (with layout)
- ✅ `/editorial-policy` - Editorial Policy page (with layout)
- ✅ `/sitemap` - Sitemap page (with layout)

### Navigation Updates
- ✅ Updated `ResourceHub.tsx` - All links now point to Next.js routes (no .html)
- ✅ Updated `GlobalNav.tsx` - About link updated to `/about`
- ✅ Updated `GlobalFooter.tsx` - About link updated to `/about`

## 📋 Pending Migration (22 pages)

### 1. Hub Pages (Country Guides) - 6 pages
**Location:** `app/hub/[country]/page.tsx`

- [ ] `/hub/study-in-usa` - Study in USA guide
- [ ] `/hub/study-in-canada` - Study in Canada guide
- [ ] `/hub/study-in-uk` - Study in UK guide
- [ ] `/hub/study-in-australia` - Study in Australia guide
- [ ] `/hub/study-in-germany` - Study in Germany guide
- [ ] `/hub/study-in-ireland` - Study in Ireland guide

**Source:** `eec-ai-tools/pages/hub/*.html`  
**Priority:** HIGH (High traffic, SEO important)

### 2. Guide Pages - 4 pages
**Location:** `app/guides/[guide-name]/page.tsx`

- [ ] `/guides/australia-gs-guide` - Australia GS Test Guide
- [ ] `/guides/german-grade-guide` - German Grade Calculator Guide
- [ ] `/guides/germany-blocked-account-guide` - Germany Blocked Account Guide
- [ ] `/guides/214b-refusal-recovery` - 214(b) Refusal Recovery Guide

**Source:** `eec-ai-tools/guides/*.html`  
**Priority:** HIGH (SEO important, linked from main page)

### 3. Glossary Pages - 4 pages
**Location:** `app/glossary/[term]/page.tsx`

- [ ] `/glossary` - Glossary index page
- [ ] `/glossary/f1-visa` - F-1 Visa definition
- [ ] `/glossary/genuine-student-test` - Genuine Student Test definition
- [ ] `/glossary/blocked-account` - Blocked Account definition

**Source:** `eec-ai-tools/pages/glossary/*.html`  
**Priority:** MEDIUM (Internal linking, SEO)

### 4. Utility Pages - 2 pages remaining
**Location:** `app/[route]/page.tsx`

- [ ] `/author/ca-madhav-gupta` - Author bio page
- [ ] `/compare/usa-vs-canada` - USA vs Canada comparison

**Source:** `eec-ai-tools/pages/author/*.html` and `eec-ai-tools/pages/compare/*.html`  
**Priority:** MEDIUM

### 5. News Pages - 1 page
**Location:** `app/news/[article]/page.tsx`

- [ ] `/news/ireland-2026-employment-permit-update` - Ireland 2026 update

**Source:** `eec-ai-tools/pages/news/*.html`  
**Priority:** LOW

### 6. Branch Pages - 4 pages (Optional)
**Location:** `app/branches/[branch]/page.tsx`

- [ ] `/branches/alkapuri` - Alkapuri branch page
- [ ] `/branches/nikol` - Nikol branch page
- [ ] `/branches/varachha` - Varachha branch page
- [ ] `/branches` - Branches index (if needed)

**Source:** `eec-ai-tools/pages/branches/*.html` and `eec-ai-tools/pages/branch-*.html`  
**Priority:** LOW (Can link to external eecglobal.com/locations)

## 📝 Migration Pattern

Each page should follow this structure:

### 1. Create Layout (if needed)
```typescript
// app/[route]/layout.tsx
import GlobalNav from '@/features/shared/components/GlobalNav';
import GlobalFooter from '@/features/shared/components/GlobalFooter';
import ThemeToggle from '@/features/shared/components/ThemeToggle';

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020617]">
      <GlobalNav />
      <main className="flex-grow">{children}</main>
      <GlobalFooter />
      <ThemeToggle />
    </div>
  );
}
```

### 2. Create Page Component
```typescript
// app/[route]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Title | EEC',
  description: 'Page description',
  // ... other metadata
};

export default function PageName() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Page Content */}
      <div>
        {/* Converted HTML content */}
      </div>
    </>
  );
}
```

### 3. Key Conversion Steps
1. **HTML → JSX:**
   - Convert `class` to `className`
   - Convert `href="/path.html"` to `href="/path"` or use `Link` component
   - Convert inline styles to Tailwind classes
   - Convert `<img>` to Next.js `Image` or regular `img` for external URLs

2. **Metadata:**
   - Extract `<title>`, `<meta>`, and structured data from HTML `<head>`
   - Convert to Next.js `Metadata` export
   - Keep structured data as JSON-LD in component

3. **Links:**
   - Internal links: Use `Link` component from `next/link`
   - External links: Use regular `<a>` with `target="_blank" rel="noopener noreferrer"`
   - Remove `.html` extensions from all routes

4. **Dark Mode:**
   - Add `dark:` variants for all color classes
   - Ensure content is readable in both light and dark modes

## 🔄 Next Steps

1. **High Priority (Do First):**
   - Create hub pages (6 pages) - High traffic
   - Create guide pages (4 pages) - SEO important
   - Create glossary pages (4 pages) - Internal linking

2. **Medium Priority:**
   - Create author page
   - Create compare page

3. **Low Priority:**
   - Create news page
   - Create branch pages (or redirect to external site)

## 📊 Progress Summary

- **Total Pages:** 23 pages
- **Completed:** 3 pages (About, Editorial Policy, Sitemap)
- **In Progress:** 0
- **Remaining:** 20 pages

## 🎯 Quick Wins

To quickly establish all routes, you can create placeholder pages that:
1. Have proper metadata
2. Link back to main hub
3. Can be filled with content later

This ensures all links work immediately while content is being migrated.

