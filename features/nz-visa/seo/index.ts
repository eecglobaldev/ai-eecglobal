/**
 * ============================================================================
 * EEC SEO DOMINATION ENGINE - MASTER EXPORT
 * ============================================================================
 * 
 * Central export point for all SEO components and configurations
 * Version: 2026.2.0 - Total Google Domination Update
 * 
 * Implements 25+ critical SEO improvements identified in audit:
 * - VideoObject Schema for YouTube content
 * - Event Schema for webinars and counselling sessions
 * - DefinedTermSet Schema for NZ visa terminology
 * - SiteNavigationElement Schema for sitelinks
 * - Scholarship/Grant Schema
 * - Featured Snippet optimized content
 * - University Comparison Tables
 * - E-E-A-T enhancement (Experience, Expertise, Authority, Trust)
 * - QAPage optimized for People Also Ask
 * - Core Web Vitals optimization
 * - Complete hreflang implementation
 * 
 * ============================================================================
 */

// Configuration
export { 
  SEO_CONFIG,
  PRIMARY_KEYWORDS,
  LSI_KEYWORDS,
  TOPICAL_CLUSTERS,
  LOCAL_SEO_CONFIG,
  SCHEMA_RELATIONSHIPS,
  CONTENT_OPTIMIZATION,
  RICH_SNIPPETS,
} from './SEOConfig';

// Core SEO Components
export { SEOBooster, generateMasterSchema } from './SEOBooster';
export { TopicalClusters } from './TopicalClusters';
export { LSIContent } from './LSIContent';
export { LocalSEO } from './LocalSEO';

// Advanced Schema Components (NEW)
export { 
  AdvancedSchemas,
  generateVideoSchemas,
  generateEventSchemas,
  generateDefinedTermSetSchema,
  generateSiteNavigationSchema,
  generateScholarshipSchema
} from './AdvancedSchemas';

// Featured Snippet & PAA Components (NEW)
export { FeaturedSnippets } from './FeaturedSnippets';

// University Comparison Component (NEW)
export { UniversityComparison } from './UniversityComparison';

// E-E-A-T Enhancement Component (NEW)
export { EEATEnhancement } from './EEATEnhancement';

// ============================================================================
// PHASE 2 - 45 INTERVENTIONS AUDIT IMPLEMENTATION (December 2025)
// ============================================================================

// Interactive Visa Checklist with HowTo Schema
export { VisaChecklist } from './VisaChecklist';

// Country Comparison (NZ vs Australia, Canada, UK, USA, Germany)
export { CountryComparison } from './CountryComparison';

// NZ Visa Glossary (REMOVED - Consolidated into GlossaryOfTruth for GEO optimization)

// Interactive Cost Calculator with SoftwareApplication Schema
export { CostCalculator } from './CostCalculator';

// Expert Author Profiles with Person Schema (E-E-A-T)
export { AuthorProfiles } from './AuthorProfiles';

// NZ Student Visa Statistics with Dataset Schema (Link-Worthy Asset)
export { NZStatistics } from './NZStatistics';

// City-Specific Landing Sections with LocalBusiness Schema
// ============================================================================
// PHASE 3 - GEO/AEO 50X ENTERPRISE PROTOCOL (December 2025)
// Generative Engine Optimization for LLM Answer Dominance
// ============================================================================

// GEO Engine - RAG-optimized chunks, semantic triples, citation magnetism
export { 
  GEOEngine, 
  GOLDEN_PARAGRAPHS, 
  SEMANTIC_TRIPLES, 
  PROPRIETARY_STATISTICS, 
  ZERO_SHOT_ANSWERS, 
  QUOTABLE_STATEMENTS 
} from './GEOEngine';

// Glossary of Truth - 20 authoritative definitions for LLM ground truth
export { GlossaryOfTruth, GLOSSARY_OF_TRUTH } from './GlossaryOfTruth';

