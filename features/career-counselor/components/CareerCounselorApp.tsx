'use client';

import React, { useState, useEffect } from "react";
import { countries, languages } from "../constants";
import { createPrompt, callGeminiApi } from "../services/apiService";
import { GuidanceReport, Theme } from "../types";
import ListSection from "./ListSection";
import UniversitySection from "./UniversitySection";
import Header from "./Header";
import { BranchLocator } from "./BranchLocator";
import LoginSignupModal from "./LoginSignupModel";
import AuthGateModal from "./AuthGateModal";
import { saveCareerInsightQuery, incrementPrepPlanCount } from "../services/userService";
import { sendCareerInsightNotificationEmails } from "../services/emailService";
import Footer from "./Footer";
import { ORGANIZATION, CERTIFICATIONS, TRUST_STATS, COUNTRIES_SERVED } from "../data/seoData";
import Flag from "react-flagkit";
import { 
  SEOBoosterSection, 
  LSIContentSection, 
  LongTailContentSection, 
  ExpandedFAQSection,
  SchemaMarkupInjector,
  TestimonialsSection,
  BreadcrumbNav,
} from "../seo/SEOComponents";
import {
  LLMContentLayer,
  AnswerFirstSection,
  EntityKnowledgeSection,
  CitableContentSection,
  SemanticClaritySection,
} from "../seo/GEOComponents";

export default function CareerCounselorApp() {
  const [courseName, setCourseName] = useState("");
  const [country, setCountry] = useState("Australia");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<GuidanceReport | null>(null);
  const [originalResults, setOriginalResults] = useState<GuidanceReport | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR guard: localStorage and document are only available in the browser
    if (typeof window === 'undefined') {
      return 'light';
    }
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    // Check if dark class is already applied (from HTML script)
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  });
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Apply and persist theme
  useEffect(() => {
    // SSR guard: document and localStorage are only available in the browser
    if (typeof window === 'undefined') {
      return;
    }

    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Separate function for the actual API call
  const fetchInsights = async () => {
    setResults(null);
    setError("");
    setLoaderText("Generating your personalized career report...");
    setLoading(true);

    try {
      // Save course name and target country to database
      // SSR guard for localStorage
      const userEmail = typeof window !== 'undefined' ? localStorage.getItem('AiCourseCounselor') : null;
      if (userEmail && courseName.trim() && country) {
        try {
          await saveCareerInsightQuery(userEmail, courseName.trim(), country);
          
          // Send email notification to admins, branch counselors, and country admins
          try {
            await sendCareerInsightNotificationEmails(userEmail, country);
          } catch (emailError) {
            console.error("Failed to send notification emails:", emailError);
            // Continue even if email fails
          }
        } catch (saveError) {
          console.error("Failed to save query to database:", saveError);
          // Continue even if save fails
        }
      }

      const prompt = createPrompt(courseName, country);
      const data = await callGeminiApi(prompt);
      setOriginalResults(data);
      setResults(data);
      setLanguage("English");
    } catch (err: any) {
      console.error("API Call failed:", err);
      setError(
        err.message || "Failed to generate insights. The AI model may be busy or the response was invalid. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetInsights = async () => {
    
    // Check if user is signed in/registered
    // SSR guard for localStorage
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('AiCourseCounselor') : null;
    if (!userEmail) {
      // User is not signed in, open registration modal
      setShowSignupModal(true);
      return;
    }
    
    if (!courseName.trim()) {
      setError("Please enter a course name.");
      return;
    }
    // Increment count immediately when button is clicked
    try {
      await incrementPrepPlanCount(userEmail);
    } catch (error) {
      console.error("Failed to increment count:", error);
      // Continue even if count increment fails
    }

    // User is signed in, proceed with API call
    await fetchInsights();
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);

    if (newLanguage === "English" || !originalResults) {
      setResults(originalResults);
      return;
    }

    setResults(null);
    setError("");
    setLoaderText(`Translating to ${newLanguage}...`);
    setLoading(true);

    try {
      const translationPrompt = `You are an expert translator. Translate all string values in the following JSON object to ${newLanguage}. Do not translate the JSON keys. Keep the exact same JSON structure. Maintain formatting for salaries and requirements. Return only the raw JSON object. Original JSON: ${JSON.stringify(
        originalResults
      )}`;
      const translatedData = await callGeminiApi(translationPrompt);
      setResults(translatedData);
    } catch (err: any) {
      console.error("Translation failed:", err);
      setError(
        err.message || `Failed to translate the text to ${newLanguage}. Please try again.`
      );
      setResults(originalResults);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: "course_explanation" as const, title: "Course Explanation" },
    { key: "prospects" as const, title: "Current & Future Prospects" },
    { key: "job_profiles" as const, title: "Potential Job Profiles" },
    { key: "industries" as const, title: "Key Industries" },
    { key: "salaries" as const, title: "Average Starting Salaries" },
    { key: "top_companies" as const, title: "Top Hiring Companies" },
    { key: "job_search_websites" as const, title: "Local Job Search Websites" },
    { key: "immigration_relevance" as const, title: "Immigration Relevance" },
    {
      key: "university_information" as const,
      title: "University & Admissions Information",
      isObject: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      

      <Header theme={theme} setTheme={setTheme} />
      
      {/* Visible Breadcrumb Navigation */}
      <BreadcrumbNav />
      
      {/* Main Content Area */}
      <main id="main-content" className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl" role="main">


        {/* Hero Section with SEO-optimized content */}
        <header className="text-center mb-8 relative" role="banner">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {CERTIFICATIONS.slice(0, 3).map((cert, idx) => (
              <a
                key={idx}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:shadow-sm transition-all"
                title={cert.fullName}
              >
                {cert.code ? (
                  <Flag country={cert.code} size={12} className="rounded-sm" />
                ) : (
                  <span>{cert.logo}</span>
                )}
                <span>{cert.name}</span>
                {cert.validTill && <span className="text-emerald-500">✓</span>}
              </a>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            <span className="block sm:inline">Study Abroad</span>{" "}
            <span className="hidden lg:inline">Course</span> Counselor
          </h1>
          
          <p className="mt-3 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get instant career insights for any course worldwide.{" "}
            <span className="hidden sm:inline">
              Explore job prospects, salaries, top companies & universities.
            </span>
          </p>

          {/* Trust Stats Mini */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-sm">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="text-lg">🏆</span>
              <span><strong className="text-slate-800 dark:text-slate-200">{ORGANIZATION.experience}+</strong> Years</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="text-lg">👨‍🎓</span>
              <span><strong className="text-slate-800 dark:text-slate-200">{ORGANIZATION.studentCount}</strong> Students</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="text-lg">🏢</span>
              <span><strong className="text-slate-800 dark:text-slate-200">{ORGANIZATION.branchCount}</strong> Branches</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="text-lg">✨</span>
              <span><strong className="text-slate-800 dark:text-slate-200">Free</strong> to Use</span>
            </div>
          </div>

          {/* Countries Served */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            <span className="text-xs text-slate-500 dark:text-slate-500 mr-1">Study in:</span>
            {COUNTRIES_SERVED.filter(c => c.popular).map((country, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400"
              >
                <Flag country={country.code} size={16} className="rounded-sm shadow-sm" />
                <span>{country.name}</span>
                {idx < COUNTRIES_SERVED.filter(c => c.popular).length - 1 && <span className="text-slate-300 dark:text-slate-600 ml-1">•</span>}
              </span>
            ))}
            <span className="text-xs text-slate-400 dark:text-slate-500">& more</span>
          </div>
        </header>

        {/* Main Search Form - SEO optimized with semantic markup */}
        <section 
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden"
          aria-label="Course search form"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 pointer-events-none" />
          
          <div className="relative">
            {/* Form Header */}
            <div className="text-center mb-5">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2">
                <span className="text-xl">🎯</span>
                Get Your Personalized Career Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Powered by advanced AI • Results in seconds • 100% Free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="course-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    📚 Course Name <span className="text-red-500">*</span>
                    <span className="text-xs text-slate-400 font-normal">(City optional)</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="course-name"
                  name="course"
                  placeholder="e.g., Masters in AI, MBA, Computer Science"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  autoComplete="off"
                  aria-required="true"
                  aria-describedby="course-hint"
                />
                <p id="course-hint" className="sr-only">Enter the course name you want to study abroad. You can optionally add a city name.</p>
              </div>
              <div>
                <label htmlFor="country-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    🌍 Target Country
                    <span className="text-xs text-slate-400 font-normal">(Deutschland = Germany Public)</span>
                  </span>
                </label>
                <select
                  id="country-select"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                  aria-describedby="country-hint"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <p id="country-hint" className="sr-only">Select the country where you want to study. Choose Deutschland for German public universities.</p>
              </div>
            </div>
            
            <button
              onClick={handleGetInsights}
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              aria-label={loading ? 'Generating career insights' : 'Get career insights for selected course and country'}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Generating Insights...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Get Career Insights</span>
                </>
              )}
            </button>

            {/* Quick Tips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> No signup required
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Instant results
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Multi-language support
              </span>
            </div>
          </div>
        </section>

        {results && (
          <div className="text-center my-6">
            <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Translate Results:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="mx-auto max-w-xs w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        )}

        {loading && (
          <div className="text-center my-8">
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin h-8 w-8 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">{loaderText}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center my-8 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-8 space-y-6">
            {categories.map((category) => {
              const data = results[category.key];
              if (!data || data.length === 0) return null;

              return category.isObject ? (
                <UniversitySection
                  key={category.key}
                  title={category.title}
                  items={data as any}
                  iconKey={category.key}
                />
              ) : (
                <ListSection
                  key={category.key}
                  title={category.title}
                  items={data as string[]}
                  iconKey={category.key}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Branch Locator Section */}
      <section 
        className="container mx-auto px-4 sm:px-6 lg:px-8 md:py-12"
        aria-label="Find EEC branches near you"
      >
        <BranchLocator />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          SEO BOOSTER SECTIONS - Topical Authority, LSI, Long-Tail Capture
          ═══════════════════════════════════════════════════════════════════════════════ */}
      
      {/* SEO Booster: E-E-A-T Signals & Trust Indicators */}
      <SEOBoosterSection />
      
      {/* GEO/AEO: Entity Knowledge Section for LLM Understanding */}
      <EntityKnowledgeSection />
      
      {/* LSI Content Section: Semantic Keyword Injection */}
      <LSIContentSection />
      
      {/* GEO/AEO: Answer-First Content for Direct LLM Extraction */}
      <AnswerFirstSection />
      
      {/* Long-Tail Content: Country-Specific Guides */}
      <LongTailContentSection />
      
      {/* GEO/AEO: Citable Content for LLM Citation */}
      <CitableContentSection />
      
      {/* Visible Testimonials Section: E-E-A-T Critical */}
      <TestimonialsSection />
      
      {/* Expanded FAQ Section: Long-Tail Keyword Capture */}
      <ExpandedFAQSection />
      
      {/* GEO/AEO: Semantic Clarity for LLM Disambiguation */}
      <SemanticClaritySection />
      
      {/* Hidden Schema Markup for Crawlers */}
      <SchemaMarkupInjector />
      
      {/* GEO/AEO: Hidden LLM Content Layer for RAG Systems */}
      <LLMContentLayer />

      <Footer />

      {/* Signup Modal */}
      {showSignupModal && (
        <LoginSignupModal
          onAuthSuccess={() => {
            setShowSignupModal(false);
            // After successful registration, check if course name is provided
            if (!courseName.trim()) {
              setError("Please enter a course name.");
              return;
            }
            // Proceed with getting insights
            fetchInsights();
          }}
          onSwitchToLogin={() => {
            // Switch to login modal
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          onClose={() => setShowSignupModal(false)}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <AuthGateModal
          onAuthSuccess={() => {
            setShowLoginModal(false);
            // After successful login, check if course name is provided
            if (!courseName.trim()) {
              setError("Please enter a course name.");
              return;
            }
            // Proceed with getting insights
            fetchInsights();
          }}
          onSwitchToSignup={() => {
            // Switch back to signup modal
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

