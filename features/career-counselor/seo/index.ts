/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * EEC GLOBAL - SEO MODULE INDEX
 * Central Export Point for All SEO & GEO/AEO Architecture Components
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * SEO = Search Engine Optimization (Google, Bing)
 * GEO = Generative Engine Optimization (ChatGPT, Claude, Gemini, Grok)
 * AEO = Answer Engine Optimization (Perplexity, SearchGPT)
 * RAG = Retrieval Augmented Generation Optimization
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Export SEO Architecture (Traditional SEO - Data & Configuration)
export * from './SEOArchitecture';

// Export SEO Components (Traditional SEO - React Components)
export * from './SEOComponents';

// Export GEO/AEO Architecture (LLM Optimization - Data & Configuration)
export * from './GEOArchitecture';

// Export GEO/AEO Components (LLM Optimization - React Components)
export * from './GEOComponents';

// Default export with all configurations
export { default as SEO_CONFIG } from './SEOArchitecture';
export { default as GEO_CONFIG } from './GEOArchitecture';

