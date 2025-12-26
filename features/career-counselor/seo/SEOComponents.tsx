/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * EEC GLOBAL - SEO COMPONENTS LIBRARY
 * Enterprise-Grade SEO React Components for Google Domination
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { 
  PRIMARY_KEYWORDS, 
  LONG_TAIL_KEYWORDS, 
  LSI_KEYWORDS, 
  LOCAL_SEO_DATA, 
  SEO_BOOSTER_SIGNALS,
  COMPREHENSIVE_FAQS,
  TOPICAL_CLUSTERS,
  generateSemanticContent,
} from './SEOArchitecture';
import { BRANCHES } from '../data/branches';
import Flag from 'react-flagkit';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 1: SEO BOOSTER - E-E-A-T SIGNALS
// ═══════════════════════════════════════════════════════════════════════════════

export const SEOBoosterSection: React.FC = () => {
  const { eeat, socialProof } = SEO_BOOSTER_SIGNALS;

  return (
    <section 
      className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-purple-950/20 py-12 sm:py-16"
      aria-label="Why trust EEC for study abroad guidance"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with LSI Keywords */}
        <header className="text-center mb-10">
          <span className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
            Gujarat's Most Trusted Study Abroad Expert Since 1997
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Why <span className="text-indigo-600 dark:text-indigo-400" itemProp="name">EEC</span> is India's Premier{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Overseas Education Consultant
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg" itemProp="description">
            With {eeat.experience.yearsInBusiness}+ years of excellence, {eeat.experience.studentsGuided} students guided, 
            and {eeat.experience.visaSuccessRate} visa success rate, EEC delivers unmatched expertise in 
            international education consulting, student visa guidance, and career counseling.
          </p>
        </header>

        {/* Trust Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              {eeat.experience.yearsInBusiness}+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Years of Excellence</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Since 1997</div>
          </article>
          
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              {eeat.experience.studentsGuided}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Students Guided</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Successfully Placed</div>
          </article>
          
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {eeat.experience.visaSuccessRate}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Visa Success Rate</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Embassy Trained</div>
          </article>
          
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-1">
              26
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Branches</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Across Gujarat</div>
          </article>
          
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 text-center shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow sm:col-span-3 lg:col-span-1">
            <div className="text-3xl sm:text-4xl font-bold text-rose-600 dark:text-rose-400 mb-1">
              9+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Certifications</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">International</div>
          </article>
        </div>

        {/* Certifications Carousel */}
        <div className="mb-12">
          <h3 className="text-center text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
            🏆 Internationally Certified & Accredited
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {eeat.expertise.certifications.slice(0, 6).map((cert, idx) => (
              <div 
                key={idx}
                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {cert.split(' - ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Authority Statements - LSI Rich Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <article className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🏛️
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Embassy-Level Training
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  One of the <strong>few education consultancies in India</strong> ever invited to 
                  <strong> US Embassy and UK Embassy in New Delhi</strong> for official student visa 
                  interview training. Our counselors are equipped with insider knowledge of what 
                  visa officers look for.
                </p>
              </div>
            </div>
          </article>
          
          <article className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🎓
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  AIRC Certified Till 2031
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  EEC is a proud member of <strong>AIRC (American International Recruitment Council)</strong>, 
                  the gold standard for ethical student recruitment to US universities. Our certification 
                  ensures you receive transparent, student-first guidance.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800/30">
            <span className="text-green-600 dark:text-green-400 text-lg">⭐</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              {socialProof.googleRating} rating from {socialProof.googleReviews} Google reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 2: LOCAL SEO SECTION - HYPER-LOCAL RELEVANCE
// ═══════════════════════════════════════════════════════════════════════════════

export const LocalSEOSection: React.FC = () => {
  const cities = LOCAL_SEO_DATA;

  return (
    <section 
      className="py-12 sm:py-16 bg-white dark:bg-slate-800"
      aria-label="EEC study abroad branches in Gujarat"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            📍 Study Abroad Consultants Near You in{' '}
            <span className="text-indigo-600 dark:text-indigo-400">Gujarat</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Visit any of our 26 branches across 12 cities for personalized overseas education guidance, 
            IELTS coaching, visa interview preparation, and admission support.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cities.slice(0, 8).map((city, idx) => (
            <article 
              key={idx}
              className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <header className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200" itemProp="name">
                  EEC {city.city}
                </h3>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">
                  {city.branches.length} branch{city.branches.length > 1 ? 'es' : ''}
                </span>
              </header>
              
              <div className="space-y-2 text-sm" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p className="text-slate-600 dark:text-slate-400">
                  <span itemProp="addressLocality">{city.city}</span>, <span itemProp="addressRegion">{city.state}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Serving: {city.nearbyAreas.slice(0, 4).join(', ')}...
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-1">
                  {city.localKeywords.slice(0, 2).map((kw, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <meta itemProp="priceRange" content="$$" />
              <link itemProp="sameAs" href="https://eecglobal.com" />
            </article>
          ))}
        </div>

        {/* Local SEO Rich Text */}
        <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            🔍 Looking for the Best Study Abroad Consultant in Gujarat?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            EEC (Enbee Education Center) is <strong>Gujarat's largest and oldest overseas education consultancy</strong> with 
            offices in <strong>Vadodara, Ahmedabad, Surat, Anand, Nadiad, Bharuch, Navsari, Vapi, Mehsana, Himatnagar, Kalol, 
            and Visnagar</strong>. Whether you're searching for an <em>IELTS coaching center near me</em>, 
            <em>study abroad consultant in Ahmedabad</em>, or <em>Canada visa consultant in Surat</em>, 
            EEC's 26 branches bring expert guidance to your doorstep. Our services include 
            <strong> IELTS, TOEFL, GRE, GMAT preparation</strong>, university admission guidance for 
            <strong> USA, UK, Canada, Australia, Germany</strong>, student visa application support, 
            visa interview training by Embassy-trained counselors, and education loan assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 3: LSI CONTENT INJECTOR
// ═══════════════════════════════════════════════════════════════════════════════

export const LSIContentSection: React.FC = () => {
  const { studyAbroad, careerCounseling, visaImmigration, testPreparation, aiTechnology } = LSI_KEYWORDS;

  return (
    <section 
      className="py-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
      aria-label="Comprehensive study abroad services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Comprehensive <span className="text-indigo-600 dark:text-indigo-400">International Education</span> Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            From {testPreparation.entities.join(', ')} preparation to {visaImmigration.related.slice(0, 3).join(', ')}, 
            EEC provides end-to-end {studyAbroad.semantic[0]} support for students aspiring for {studyAbroad.related.slice(0, 3).join(', ')}.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Study Abroad Pillar */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
              🌍
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {studyAbroad.primary.charAt(0).toUpperCase() + studyAbroad.primary.slice(1)} Guidance
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Expert guidance for {studyAbroad.semantic.slice(0, 3).join(', ')} covering {studyAbroad.entities.slice(0, 4).join(', ')} selection.
            </p>
            <div className="flex flex-wrap gap-1">
              {studyAbroad.related.slice(0, 4).map((term, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded">
                  {term}
                </span>
              ))}
            </div>
          </article>

          {/* Career Counseling Pillar */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
              💼
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {careerCounseling.primary.charAt(0).toUpperCase() + careerCounseling.primary.slice(1)}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Personalized {careerCounseling.semantic.slice(0, 2).join(' and ')} for {careerCounseling.related.slice(0, 3).join(', ')}.
            </p>
            <div className="flex flex-wrap gap-1">
              {careerCounseling.related.slice(0, 4).map((term, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded">
                  {term}
                </span>
              ))}
            </div>
          </article>

          {/* Visa & Immigration Pillar */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
              ✈️
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {visaImmigration.primary.charAt(0).toUpperCase() + visaImmigration.primary.slice(1)} Support
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Complete {visaImmigration.semantic.slice(0, 2).join(' and ')} assistance including {visaImmigration.entities.slice(0, 3).join(', ')}.
            </p>
            <div className="flex flex-wrap gap-1">
              {visaImmigration.related.slice(0, 4).map((term, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded">
                  {term}
                </span>
              ))}
            </div>
          </article>

          {/* Test Preparation Pillar */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">
              📚
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {testPreparation.primary.charAt(0).toUpperCase() + testPreparation.primary.slice(1)}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Expert {testPreparation.semantic.slice(0, 2).join(' and ')} for {testPreparation.entities.slice(0, 4).join(', ')}.
            </p>
            <div className="flex flex-wrap gap-1">
              {testPreparation.entities.slice(0, 5).map((term, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded">
                  {term}
                </span>
              ))}
            </div>
          </article>
        </div>

        {/* AI Technology Highlight */}
        <div className="mt-10 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              🤖
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Powered by Advanced AI Technology
              </h3>
              <p className="text-indigo-100">
                Our {aiTechnology.primary} leverages {aiTechnology.semantic.slice(0, 3).join(', ')} to deliver 
                {aiTechnology.related.slice(0, 3).join(', ')}. Experience the future of {careerCounseling.primary} 
                with EEC's cutting-edge {aiTechnology.semantic[3]}.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {aiTechnology.related.slice(0, 3).map((feature, i) => (
                <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 4: TOPICAL CLUSTER NAVIGATION (SILO ARCHITECTURE)
// ═══════════════════════════════════════════════════════════════════════════════

export const TopicalClusterSection: React.FC = () => {
  return (
    <section 
      className="py-12 bg-slate-50 dark:bg-slate-900"
      aria-label="Study abroad topics and guides"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            📚 Complete Study Abroad Knowledge Hub
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore comprehensive guides organized by topic to master every aspect of your international education journey.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICAL_CLUSTERS.map((cluster, idx) => (
            <article 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  {idx === 0 && '🎓'}
                  {idx === 1 && '🤖'}
                  {idx === 2 && '📝'}
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  {cluster.pillarTopic}
                </h3>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {cluster.pillarDescription}
              </p>

              <div className="space-y-2 mb-4">
                {cluster.clusterTopics.slice(0, 4).map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${
                      topic.searchIntent === 'transactional' ? 'bg-green-500' :
                      topic.searchIntent === 'informational' ? 'bg-blue-500' :
                      topic.searchIntent === 'commercial' ? 'bg-amber-500' :
                      'bg-purple-500'
                    }`} />
                    <span className="text-slate-700 dark:text-slate-300">{topic.topic}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">Authority Signals:</p>
                <div className="flex flex-wrap gap-1">
                  {cluster.authoritySignals.slice(0, 2).map((signal, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded">
                      ✓ {signal}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 5: EXPANDED FAQ SECTION FOR LONG-TAIL CAPTURE
// ═══════════════════════════════════════════════════════════════════════════════

export const ExpandedFAQSection: React.FC = () => {
  const [openCategory, setOpenCategory] = React.useState<string>('General');
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(0);

  const currentFAQs = COMPREHENSIVE_FAQS.find(cat => cat.category === openCategory)?.faqs || [];

  return (
    <section 
      className="py-12 sm:py-16 bg-white dark:bg-slate-800"
      aria-label="Frequently asked questions about study abroad"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about studying abroad, visa applications, 
            test preparation, and EEC's services.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {COMPREHENSIVE_FAQS.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setOpenCategory(cat.category);
                setOpenFAQ(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                openCategory === cat.category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {currentFAQs.map((faq, idx) => (
            <article 
              key={idx}
              className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
              >
                <h3 
                  className="font-medium text-slate-800 dark:text-slate-200 pr-4"
                >
                  {faq.question}
                </h3>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              
              {openFAQ === idx && (
                <div 
                  className="px-6 pb-4"
                >
                  <p 
                    className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                  
                  {/* Keywords for SEO visibility */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {faq.keywords.map((kw, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-500"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Have more questions? Our certified counselors are ready to help.
          </p>
          <a
            href="https://wa.me/919375974748"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
          >
            <span>💬</span>
            Chat with an Expert on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 6: LONG-TAIL KEYWORD RICH CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

export const LongTailContentSection: React.FC = () => {
  return (
    <section 
      className="py-12 bg-slate-50 dark:bg-slate-900"
      aria-label="Study abroad guides by country"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            🌎 Study Abroad Destination Guides
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive guides for the most popular study destinations for Indian students.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* USA Card */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
            <div className="h-32 flex items-center justify-center">
            <img 
          src="https://ai.eecglobal.com/assets/usa-flag.jpg"
        alt="USA Flag"
        className="w-full h-full object-cover"
      
        loading="eager"
      />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                Study in USA from India
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Complete guide covering F-1 visa, top universities, STEM courses, 
                OPT/CPT work options, and pathway to US jobs.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-3">
                <li>• Best courses for Indian students in USA</li>
                <li>• USA student visa requirements 2025</li>
                <li>• Scholarships for Indian students</li>
                <li>• F-1 visa interview preparation</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  AIRC Certified Guidance
                </span>
              </div>
            </div>
          </article>

          {/* UK Card */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
          <div className="h-32 flex items-center justify-center">
            <img 
          src="https://ai.eecglobal.com/assets/uk-flag.jpg"
        alt="USA Flag"
        className="w-full h-full object-cover"
      
        loading="eager"
      />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                Study in UK from India
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Expert guidance on UK Student Visa, Russell Group universities, 
                Graduate Route (2-year work visa), and UCAS applications.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-3">
                <li>• Top UK universities for Indians</li>
                <li>• UK student visa requirements</li>
                <li>• Graduate Route visa explained</li>
                <li>• Study in UK without IELTS</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  British Council Certified
                </span>
              </div>
            </div>
          </article>

          {/* Canada Card */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
          <div className="h-32 flex items-center justify-center">
            <img 
          src="https://ai.eecglobal.com/assets/canada-flag.jpg"
        alt="USA Flag"
        className="w-full h-full object-cover"
      
        loading="eager"
      />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                Study in Canada from India
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Comprehensive Canada study guide covering study permit, PGWP, 
                Express Entry PR pathway, and province selection.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-3">
                <li>• Canada study permit process</li>
                <li>• PGWP and PR pathways</li>
                <li>• Best provinces for Indians</li>
                <li>• SDS stream for faster visa</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  CCEA Certified
                </span>
              </div>
            </div>
          </article>

          {/* Australia Card */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
          <div className="h-32 flex items-center justify-center">
            <img 
          src="https://ai.eecglobal.com/assets/australia-flag.jpg"
        alt="USA Flag"
        className="w-full h-full object-cover"
      
        loading="eager"
      />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                Study in Australia from India
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Australia study guide covering Subclass 500 visa, 485 Graduate visa, 
                PR pathways, and regional study benefits.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-3">
                <li>• Australia student visa 500</li>
                <li>• 485 visa and PR pathway</li>
                <li>• GTE statement tips</li>
                <li>• Regional university benefits</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  PIER Certified
                </span>
              </div>
            </div>
          </article>

          {/* Germany Card */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
          <div className="h-32 flex items-center justify-center">
            <img 
          src="https://ai.eecglobal.com/assets/germany-flag.jpg"
        alt="USA Flag"
        className="w-full h-full object-cover"
      
        loading="eager"
      />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                Study in Germany for Free
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Germany free education guide covering public universities, 
                blocked account, English-taught programs, and job seeker visa.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-3">
                <li>• Free tuition at public universities</li>
                <li>• Blocked account requirements</li>
                <li>• English-taught Masters programs</li>
                <li>• Germany job seeker visa</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Expert Guidance
                </span>
              </div>
            </div>
          </article>

          {/* Ireland Card */}
          <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
          <div className="h-32 flex items-center justify-center">
            <img 
          src="https://ai.eecglobal.com/assets/ireland-flag.jpg"
        alt="USA Flag"
        className="w-full h-full object-cover"
      
        loading="eager"
      />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                Study in Ireland from India
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Ireland study guide covering Stamp 1G visa, tech industry opportunities, 
                and pathway to work in Europe.
              </p>
              <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-3">
                <li>• Ireland student visa process</li>
                <li>• Stamp 1G stay back visa</li>
                <li>• Tech hub opportunities</li>
                <li>• EU work access</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Ireland Certified Agent
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 7: SCHEMA MARKUP INJECTOR (Hidden SEO Content)
// ═══════════════════════════════════════════════════════════════════════════════

export const SchemaMarkupInjector: React.FC = () => {
  // This component injects additional schema markup without visible content
  return (
    <>
      {/* Hidden SEO-rich content for crawlers */}
      <div className="sr-only" aria-hidden="true">
        <h1>EEC AI Course Counselor - Free AI-Powered Career Guidance for Study Abroad</h1>
        <p>
          EEC (Enbee Education Center Private Limited) is Gujarat's largest and oldest study abroad 
          consultancy established in 1997. With 26 branches across 12 cities including Vadodara, 
          Ahmedabad, and Surat, EEC has guided 100,000+ students for overseas education in USA, UK, 
          Canada, Australia, Germany, and 50+ countries. Our AI Course Counselor provides free instant 
          career insights for any course worldwide.
        </p>
        <p>
          Our certifications include AIRC (American International Recruitment Council) certified till 2031, 
          U.S. News Global Education certified (only agency in India), ICEF IAS accredited, British Council 
          UK certified, Australia PIER certified, New Zealand ENZ certified, Ireland Education Agent 
          certified, Canada CCEA certified, and USATC certified. We are one of few Indian agencies invited 
          to US Embassy and UK Embassy for official student visa interview training.
        </p>
        <p>
          Services: IELTS coaching, TOEFL preparation, GRE classes, GMAT coaching, PTE preparation, 
          Duolingo English Test prep, university admission guidance, student visa application, visa 
          interview preparation, education loan assistance, scholarship guidance, SOP review, LOR 
          assistance, and career counseling.
        </p>
        <p>
          Leadership: Amit Jalan - Managing Director, Purdue University alumnus with 28+ years experience. 
          CA Madhav Gupta - Director, Chartered Accountant, British Council certified.
        </p>
        <address>
          EEC Alkapuri (Head Office): 3rd Floor, B-Wing, Windsor Plaza, RC Dutt Road, Alkapuri, 
          Vadodara, Gujarat 390007, India. Phone: +91-8000506539. Email: info@eecglobal.com
        </address>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 8: VISIBLE TESTIMONIALS SECTION (E-E-A-T CRITICAL)
// ═══════════════════════════════════════════════════════════════════════════════

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Dhruv Trivedi",
      course: "MS Computer Science",
      university: "University of Toronto",
      country: "Canada",
      flag: "🇨🇦",
      rating: 5,
      text: "EEC helped me get admission to University of Toronto with scholarship. The counselors were extremely helpful with my SOP and visa interview preparation. Highly recommend!",
      image: "DT",
      countryCode: "CA",
    },
    {
      name: "Abhishek Sharma",
      course: "MS in CS",
      university: "Purdue University",
      country: "USA",
      flag: "🇺🇸",
      rating: 5,
      text: "Got my F-1 visa approved in first attempt thanks to EEC's mock interview sessions. EEC's guidance on interview questions was spot on. Now studying at Purdue!",
      image: "AS",
      countryCode: "US",
    },
    {
      name: "Vidhi Shiyani",
      course: "MBA",
      university: "University of Manchester",
      country: "UK",
      flag: "🇬🇧",
      rating: 5,
      text: "EEC helped structure my finances perfectly for UK visa. His expertise in proof of funds documentation made the visa process smooth. Got Graduate Route visa too!",
      image: "AD",
      countryCode: "GB",
    },
    {
      name: "Mohit Patel",
      course: "MS Data Science",
      university: "University of Melbourne",
      country: "Australia",
      flag: "🇦🇺",
      rating: 5,
      text: "Scored 7.5 in IELTS after EEC Ahmedabad coaching. The trainers are excellent and study material is comprehensive. Now pursuing MS in Australia.",
      image: "MP",
      countryCode: "AU",
    },
  ];

  return (
    <section 
      className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
      aria-label="Student testimonials and success stories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium mb-4">
            ⭐ 4.8/5 Rating from 15,000+ Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Success Stories from Our{' '}
            <span className="text-indigo-600 dark:text-indigo-400">100,000+ Students</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real students, real results. See what our students have to say about their study abroad journey with EEC.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <article 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200/50 dark:border-slate-700/50 flex flex-col"
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
                <span className="text-xs text-slate-500 dark:text-slate-500 ml-1">5/5</span>
              </div>

              {/* Review Text */}
              <p 
                className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-4"
              >
                "{testimonial.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  {testimonial.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                    <Flag country={testimonial.countryCode} size={16} className="rounded-sm shadow-sm" />
                    <span className="truncate">{testimonial.university}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://maps.app.goo.gl/bKfRXT5SDMmqtkf97"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            <span>See All Reviews on Google</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT 9: VISIBLE BREADCRUMB NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

export const BreadcrumbNav: React.FC = () => {
  return (
    <nav 
      className="bg-slate-100 dark:bg-slate-800/50 py-2 px-4"
      aria-label="Breadcrumb navigation"
    >
      <div className="max-w-7xl mx-auto">
        <ol 
          className="flex items-center gap-2 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li 
            className="flex items-center"
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            <a 
              href="https://eecglobal.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              itemProp="item"
            >
              <span itemProp="name">EEC Main Website</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li className="text-slate-400 dark:text-slate-600">/</li>
          <li 
            className="flex items-center"
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            <a 
              href="https://ai.eecglobal.com" 
              className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              itemProp="item"
            >
              <span itemProp="name">AI Tools</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li className="text-slate-400 dark:text-slate-600">/</li>
          <li 
            className="flex items-center"
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            <span 
              className="text-indigo-600 dark:text-indigo-400 font-medium"
              itemProp="name"
            >
              Career Counselor
            </span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </div>
    </nav>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT ALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
  SEOBoosterSection as SEOBooster,
  LocalSEOSection as LocalSEO,
  LSIContentSection as LSIContent,
  TopicalClusterSection as TopicalClusters,
  ExpandedFAQSection as ExpandedFAQ,
  LongTailContentSection as LongTailContent,
  SchemaMarkupInjector as SchemaMarkup,
  TestimonialsSection as Testimonials,
  BreadcrumbNav as Breadcrumb,
};

