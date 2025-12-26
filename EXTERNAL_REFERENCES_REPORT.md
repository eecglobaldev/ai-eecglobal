# External References Audit Report

## Summary
Comprehensive audit of all external URL references in `eec-ai-srr`.

## ✅ Should Stay (External/SEO URLs)

### 1. Canonical & Metadata URLs
- ✅ `https://ai.eecglobal.com/...` - Canonical URLs (for SEO)
- ✅ `metadataBase: new URL("https://ai.eecglobal.com")` - Required for metadata
- ✅ Open Graph URLs - Required for social sharing
- ✅ Structured data `@id` and `url` fields - Required for SEO

### 2. External Domain Links
- ✅ `https://eecglobal.com` - Main website (external)
- ✅ `https://nz.eecglobal.com` - NZ subdomain (external)
- ✅ `https://germany.eecglobal.com` - Germany subdomain (external)
- ✅ `https://uk.eecglobal.com` - UK subdomain (external)
- ✅ Social media links (Facebook, Instagram, LinkedIn, YouTube, Twitter)
- ✅ AIRC, ICEF, Credential.net links

### 3. API Endpoints
- ✅ Firebase Cloud Functions URLs
- ✅ External service URLs

### 4. Schema.org URLs
- ✅ `https://schema.org` - Standard schema URLs

## ⚠️ Should Be Updated (Internal Tool Links)

### Internal Tool Links to Fix:
1. `https://ai.eecglobal.com/usavisaprep` → `/usa-f1-visa`
2. `https://ai.eecglobal.com/australiagsprep` → `/australia-gs-prep`
3. `https://ai.eecglobal.com/ukprecas` → `/uk-precas`
4. `https://ai.eecglobal.com/careercounselor` → `/career-counselor`
5. `https://ai.eecglobal.com/nzvisaprep` → `/nz-visa-prep`
6. `https://ai.eecglobal.com/prpointscalculator` → Check if this tool exists in ai-srr

### Files with Internal Tool Links:
- `app/hub/study-in-usa/page.tsx`
- `app/hub/study-in-canada/page.tsx`
- `app/hub/study-in-uk/page.tsx`
- `app/hub/study-in-australia/page.tsx`
- `app/glossary/genuine-student-test/page.tsx`
- `app/guides/214b-refusal-recovery/page.tsx`
- `app/guides/australia-gs-guide/page.tsx`
- `app/sitemap-page/page.tsx`
- `features/shared/components/GlobalNav.tsx`
- `features/shared/components/GlobalFooter.tsx`
- `features/nz-visa/seo/TopicalClusters.tsx`
- `features/nz-visa/seo/SEOConfig.ts`

## 📋 Dashboard URLs

### May Need Update:
- `https://ai.eecglobal.com/nzvisaprep/dashboard/` in `features/nz-visa/constants.ts`
  - Check if dashboard route exists in ai-srr

## 🔍 Next Steps

1. Replace all internal tool links with relative paths
2. Verify dashboard URLs
3. Keep all external domain links as-is
4. Keep all SEO/metadata URLs as `https://ai.eecglobal.com`

