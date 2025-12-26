'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LoadingState, SearchParams, VisaRequirements, INDIAN_STATES, DESTINATION_COUNTRIES } from '../types';
import { fetchVisaRequirements, identifyStateFromCoordinates } from '../services/gemini';
import { sendVisaSearchNotificationEmails } from '../services/emailService';
import { saveVisaSearchQuery, getUserByEmail, updateUserLastSearch, incrementPrepPlanCount } from '../services/userService';
import VisaResult from './VisaResult';
import ChatAssistant from './ChatAssistant';
import ForexTicker from './ForexTicker';
import { GEOSection } from './GEOSection';
import { VisaBulletin } from './VisaBulletin';
import { SEOContent } from './SEOContent';
import { SEOHelmet } from './SEOHelmet';
import { EEATSection } from './EEATSection';
import { AuthGateModal } from './AuthGateModal';
import { LoginSignupModal } from './LoginSignupModel';
import { PlaneIcon, MapPinIcon, GraduationCapIcon, SearchIcon, SparklesIcon, GlobeIcon, ArrowRightIcon, LocateIcon, SunIcon, MoonIcon } from './Icons';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

export default function TravelAgentApp() {
  // formParams: Controls the inputs (Dropdowns) - Updates immediately on user interaction
  const [formParams, setFormParams] = useState<SearchParams>({
    origin: 'India',
    originState: '',
    destination: '',
    visaType: 'Tourist'
  });

  // displayParams: Controls the rendered Results - Updates only on successful Search/Hash change
  const [displayParams, setDisplayParams] = useState<SearchParams | null>(null);

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<VisaRequirements | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // SSR guard: window and matchMedia are only available in the browser
    if (typeof window === 'undefined') {
      return 'light';
    }
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const resultsRef = useRef<HTMLDivElement>(null);

  // Check if user is authenticated
  const isUserAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('travelagentemail');
  };

  useEffect(() => {
    // SSR guard: document is only available in the browser
    if (typeof window === 'undefined') return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // --- PERMALINK ENGINE (10x GEO) ---
  useEffect(() => {
    // SSR guard: window is only available in the browser
    if (typeof window === 'undefined') return;

    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const parts = hash.split('/');
        const destIdx = parts.indexOf('destination');
        const typeIdx = parts.indexOf('type');
        const stateIdx = parts.indexOf('state');

        if (destIdx !== -1 && parts[destIdx + 1]) {
          const dest = decodeURIComponent(parts[destIdx + 1]);
          const type = typeIdx !== -1 ? decodeURIComponent(parts[typeIdx + 1]) : 'Student';
          const state = stateIdx !== -1 ? decodeURIComponent(parts[stateIdx + 1]) : 'Gujarat';

          // If the URL matches what we are ALREADY displaying, do nothing.
          // This prevents infinite loops but allows re-fetching if the user searches for the same thing again via button.
          // We check against result to ensure we actually have data.
          if (displayParams &&
            dest === displayParams.destination &&
            type === displayParams.visaType &&
            state === displayParams.originState &&
            result) {
            return;
          }

          const newParams = {
            origin: 'India',
            originState: state,
            destination: dest,
            visaType: type as 'Tourist' | 'Student'
          };

          // Sync Form UI to URL
          setFormParams(newParams);

          // Start Loading
          setLoadingState(LoadingState.LOADING);
          setResult(null); // Clear previous result to prevent ghost rendering
          setError(null);

          try {
            const data = await fetchVisaRequirements('India', state, dest, type);
            setResult(data);
            setDisplayParams(newParams); // Lock in the new display params
            setLoadingState(LoadingState.SUCCESS);
          } catch (err) {
            console.error(err);
            setError("Unable to retrieve verified dossier. Please try manual search.");
            setLoadingState(LoadingState.ERROR);
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [displayParams, result]); // Dependencies added to avoid stale closures

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formParams.destination || !formParams.originState) return;

    // Check if user is authenticated
    if (!isUserAuthenticated()) {
      // Show signup modal if user is not registered/logged in
      setShowAuthModal('signup');
      return;
    }

    // Send email notification and save search to Firebase
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('travelagentemail');
      if (userEmail) {
        // Increment search count
        incrementPrepPlanCount(userEmail).catch(err => {
          console.error('Failed to increment search count:', err);
        });

        // Fetch user data to get city information
        getUserByEmail(userEmail).then(userData => {
          if (userData) {
            // Update user document with latest search parameters
            updateUserLastSearch(userEmail, {
              origin: 'India',
              originState: formParams.originState,
              destination: formParams.destination,
              visaType: formParams.visaType
            }).catch(err => {
              console.error('Failed to update user last search:', err);
            });

            // Save search query to Firebase (separate collection for history)
            saveVisaSearchQuery(userEmail, {
              origin: 'India',
              originState: formParams.originState,
              destination: formParams.destination,
              visaType: formParams.visaType,
              userCity: (userData as any).city || '',
              userState: (userData as any).state || ''
            }).catch(err => {
              console.error('Failed to save search query to Firebase:', err);
            });

            // Send email asynchronously (don't wait for it to complete)
            sendVisaSearchNotificationEmails(userEmail, {
              destination: formParams.destination,
              originState: formParams.originState,
              visaType: formParams.visaType
            }).catch(err => {
              console.error('Failed to send search notification email:', err);
            });
          }
        }).catch(err => {
          console.error('Failed to fetch user data:', err);
        });
      }
    }

    // Explicitly clear result to trigger Loading UI immediately
    setResult(null);
    setLoadingState(LoadingState.LOADING);

    // Trigger Hash Change -> which triggers the Effect -> which fetches data
    if (typeof window !== 'undefined') {
      window.location.hash = `#/destination/${encodeURIComponent(formParams.destination)}/type/${encodeURIComponent(formParams.visaType)}/state/${encodeURIComponent(formParams.originState)}`;
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(null);
    // After successful authentication, proceed with the search
    if (formParams.destination && formParams.originState) {
      // Send email notification and save search to Firebase
      if (typeof window !== 'undefined') {
        const userEmail = localStorage.getItem('travelagentemail');
        if (userEmail) {
          // Increment search count
          incrementPrepPlanCount(userEmail).catch(err => {
            console.error('Failed to increment search count:', err);
          });

          // Fetch user data to get city information
          getUserByEmail(userEmail).then(userData => {
            if (userData) {
              // Update user document with latest search parameters
              updateUserLastSearch(userEmail, {
                origin: 'India',
                originState: formParams.originState,
                destination: formParams.destination,
                visaType: formParams.visaType
              }).catch(err => {
                console.error('Failed to update user last search:', err);
              });

              // Save search query to Firebase (separate collection for history)
              saveVisaSearchQuery(userEmail, {
                origin: 'India',
                originState: formParams.originState,
                destination: formParams.destination,
                visaType: formParams.visaType,
                userCity: (userData as any).city || '',
                userState: (userData as any).state || ''
              }).catch(err => {
                console.error('Failed to save search query to Firebase:', err);
              });

              // Send email asynchronously (don't wait for it to complete)
              sendVisaSearchNotificationEmails(userEmail, {
                destination: formParams.destination,
                originState: formParams.originState,
                visaType: formParams.visaType
              }).catch(err => {
                console.error('Failed to send search notification email:', err);
              });
            }
          }).catch(err => {
            console.error('Failed to fetch user data:', err);
          });
        }
      }

      setResult(null);
      setLoadingState(LoadingState.LOADING);
      if (typeof window !== 'undefined') {
        window.location.hash = `#/destination/${encodeURIComponent(formParams.destination)}/type/${encodeURIComponent(formParams.visaType)}/state/${encodeURIComponent(formParams.originState)}`;
      }
    }
  };

  const handleSwitchToLogin = () => {
    setShowAuthModal('login');
  };

  const handleSwitchToSignup = () => {
    setShowAuthModal('signup');
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(null);
  };

  const handleFlightSearch = () => {
    const dest = displayParams?.destination || formParams.destination;
    if (!dest) {
      alert("Please enter a destination to search for flights.");
      return;
    }
    const query = `Flights from India to ${dest}`;
    const url = `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const handleGeoLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const detectedState = await identifyStateFromCoordinates(latitude, longitude);

          if (detectedState && INDIAN_STATES.includes(detectedState as any)) {
            setFormParams(prev => ({ ...prev, originState: detectedState }));
          } else {
            alert("Could not identify your state or you are outside India.");
          }
        } catch (err) {
          console.error("Geocoding error", err);
          alert("Failed to identify location. Please select manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geo error", error);
        setIsLocating(false);
        alert("Failed to detect location.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Unique Key for Remounting Components - CRITICAL FIX for blank screen
  // This forces React to destroy and recreate the results components when parameters change,
  // ensuring clean state initialization and preventing stale data contamination.
  const componentKey = displayParams ? `${displayParams.destination}-${displayParams.visaType}-${displayParams.originState}` : 'init';

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-violet-200 selection:text-violet-900 overflow-x-hidden transition-colors duration-500">

      {/* We use displayParams here for SEO to match what's shown, falling back to form if nothing loaded yet */}
      <SEOHelmet params={displayParams || formParams} result={result} />

      {/* Entity Authority Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/40 dark:border-white/5 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="https://ai.eecglobal.com/assets/logos/eeclogo-main.png"
              alt="Logo"
              className="h-8 sm:h-10"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Travel & Visa Services
              </span>  </div>
          </a>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">System Online</span>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                26 Branches
              </span>
              <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-white hover:bg-violet-50 dark:hover:bg-white/10 transition-all flex items-center gap-1">
                Main Site <ArrowRightIcon className="w-3 h-3 -rotate-45" />
              </a>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <ForexTicker />

      

      <main className="flex-grow container mx-auto px-4 py-8 md:py-6">

      <Breadcrumbs />

        <div className={`text-center transition-all duration-700 ${loadingState === LoadingState.SUCCESS ? 'mb-8' : 'mb-16 mt-4 md:mt-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 border border-violet-100 dark:border-violet-900 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm animate-fade-in-up">
            <SparklesIcon className="w-3 h-3" />
            <span>Powered by Enbee Education Center (Est. 1997)</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
            AI-Powered EEC <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 animate-gradient-x">
              Visa & Travel Services
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-600/90 dark:text-slate-400/90 max-w-3xl mx-auto mb-10 font-medium leading-relaxed px-4">
            First of its kind, 100% free tool for Indian students. Get verified Tourist & Student visa requirements, forensic risk analysis, and flight searches for USA, Canada, UK, Australia, Europe & more.
          </p>

          <div className="max-w-5xl mx-auto relative z-20 px-2 md:px-0">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300 rounded-full blur-2xl opacity-40 dark:opacity-20 animate-pulse hidden md:block"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-400 rounded-full blur-2xl opacity-40 dark:opacity-20 animate-pulse delay-700 hidden md:block"></div>

            <form onSubmit={handleSearch} className="glass-panel p-3 rounded-3xl shadow-2xl shadow-violet-900/10 dark:shadow-black/40 border border-white/50 dark:border-white/5 flex flex-col md:flex-row gap-2 relative overflow-hidden transition-colors">

              <div className="w-full md:w-32 relative group bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 py-3 md:py-0 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold select-none">
                  <MapPinIcon className="w-4 h-4" />
                  <span>India</span>
                </div>
              </div>

              <div className="flex-1 relative group bg-white/50 dark:bg-slate-900/50 rounded-2xl transition-all focus-within:bg-white dark:focus-within:bg-slate-900 hover:bg-white dark:hover:bg-slate-900">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPinIcon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400 transition-colors" />
                </div>
                <select
                  value={formParams.originState}
                  onChange={(e) => setFormParams({ ...formParams, originState: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl outline-none border-2 border-transparent focus:border-violet-100 dark:focus:border-violet-900 focus:ring-0 transition-all font-semibold text-slate-800 dark:text-slate-200 appearance-none cursor-pointer placeholder:text-slate-400 text-sm md:text-base"
                  required
                >
                  <option value="" disabled className="dark:bg-slate-900">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state} className="dark:bg-slate-900">{state}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button
                    type="button"
                    onClick={handleGeoLocation}
                    disabled={isLocating}
                    className={`p-2 rounded-xl transition-all ${isLocating ? 'bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300' : 'bg-transparent text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30'}`}
                    title="Detect my location"
                  >
                    {isLocating ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <LocateIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1 relative group bg-white/50 dark:bg-slate-900/50 rounded-2xl transition-all focus-within:bg-white dark:focus-within:bg-slate-900 hover:bg-white dark:hover:bg-slate-900">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <GlobeIcon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400 transition-colors" />
                </div>
                <select
                  value={formParams.destination}
                  onChange={(e) => setFormParams({ ...formParams, destination: e.target.value })}
                  className="w-full pl-12 pr-10 py-4 bg-transparent rounded-2xl outline-none border-2 border-transparent focus:border-violet-100 dark:focus:border-violet-900 focus:ring-0 transition-all font-semibold text-slate-800 dark:text-slate-200 appearance-none cursor-pointer placeholder:text-slate-400 text-sm md:text-base"
                  required
                >
                  <option value="" disabled className="dark:bg-slate-900">Select Destination</option>
                  {DESTINATION_COUNTRIES.map((country) => (
                    <option key={country} value={country} className="dark:bg-slate-900">{country}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <ArrowRightIcon className="w-4 h-4 rotate-90" />
                </div>
              </div>

              <div className="relative group min-w-[150px] bg-white/50 dark:bg-slate-900/50 rounded-2xl transition-all focus-within:bg-white dark:focus-within:bg-slate-900 hover:bg-white dark:hover:bg-slate-900">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  {formParams.visaType === 'Student' ? (
                    <GraduationCapIcon className="w-5 h-5 text-fuchsia-500" />
                  ) : (
                    <PlaneIcon className="w-5 h-5 text-fuchsia-500" />
                  )}
                </div>
                <select
                  value={formParams.visaType}
                  onChange={(e) => setFormParams({ ...formParams, visaType: e.target.value as 'Tourist' | 'Student' })}
                  className="w-full pl-12 pr-10 py-4 bg-transparent rounded-2xl outline-none border-2 border-transparent focus:border-violet-100 dark:focus:border-violet-900 focus:ring-0 transition-all font-semibold text-slate-800 dark:text-slate-200 appearance-none cursor-pointer text-sm md:text-base"
                >
                  <option value="Tourist" className="dark:bg-slate-900">Tourist</option>
                  <option value="Student" className="dark:bg-slate-900">Student</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <ArrowRightIcon className="w-4 h-4 rotate-90" />
                </div>
              </div>

              <div className="flex gap-2 min-w-[140px]">
                <button
                  type="submit"
                  disabled={loadingState === LoadingState.LOADING}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-violet-200 dark:shadow-violet-900/30 hover:shadow-xl hover:shadow-violet-300 dark:hover:shadow-violet-900/50 hover:-translate-y-0.5 active:translate-y-0 flex-1 flex items-center justify-center gap-2 group"
                >
                  {loadingState === LoadingState.LOADING ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <SearchIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleFlightSearch}
                  className="bg-white dark:bg-slate-800 hover:bg-violet-50 dark:hover:bg-slate-700 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-slate-700 px-4 py-3 rounded-2xl font-semibold transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md flex items-center justify-center"
                  title="Search Flights on Google"
                >
                  <PlaneIcon className="w-5 h-5 transform -rotate-45" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {loadingState === LoadingState.ERROR && (
          <div className="max-w-md mx-auto p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 rounded-2xl text-center mb-8 font-medium animate-pulse">
            {error}
          </div>
        )}

        {/* 
          CRITICAL FIX: 
          Only render if loadingState is SUCCESS, result exists, AND displayParams are set.
          We use unique keys based on search params to force full component remounting,
          preventing blank screens caused by stale state recycling.
        */}
        {loadingState === LoadingState.SUCCESS && result && displayParams && (
          <div ref={resultsRef} className="space-y-12 animate-fade-in-up">
            <VisaResult
              key={componentKey} // FORCE REMOUNT
              data={result}
              origin={`India (${displayParams.originState || ''})`}
              destination={displayParams.destination}
              visaType={displayParams.visaType}
            />

            <div className="max-w-5xl mx-auto">
              <div className="relative py-8 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative bg-slate-50 dark:bg-slate-950 px-6">
                  <span className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Ask the EEC Expert</span>
                </div>
              </div>

              <ChatAssistant
                key={`${componentKey}-chat`} // FORCE REMOUNT
                visaData={result}
                originState={displayParams.originState}
                destination={displayParams.destination}
              />

              <VisaBulletin
                key={`${componentKey}-bulletin`} // FORCE REMOUNT
                destination={displayParams.destination}
                visaType={displayParams.visaType}
              />
            </div>
          </div>
        )}

        <GEOSection />

        {loadingState === LoadingState.IDLE && (
          <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <SparklesIcon className="w-6 h-6" />,
                color: "bg-blue-500",
                bg: "bg-blue-50 dark:bg-blue-900/20",
                title: "Jurisdiction Accurate",
                desc: "We check whether you need to apply via BLS, VFS, or directly at the Embassy based on your specific Indian state."
              },
              {
                icon: <GraduationCapIcon className="w-6 h-6" />,
                color: "bg-fuchsia-500",
                bg: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
                title: "Student & Tourist",
                desc: "Specialized logic for F-1, Tier 4, and other complex student visa categories for Indian students."
              },
              {
                icon: <PlaneIcon className="w-6 h-6" />,
                color: "bg-violet-500",
                bg: "bg-violet-50 dark:bg-violet-900/20",
                title: "Flight Integration",
                desc: "Plan your entire journey. Check visa requirements and search for the best flight deals."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-white dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-violet-100 dark:hover:shadow-violet-900/20 transition-all duration-300 group hover:-translate-y-1">
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 text-white shadow-md rotate-3 group-hover:rotate-6 transition-transform`}>
                  <div className={`${feature.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

        <EEATSection />
        <SEOContent />

      </main>

        <Footer />

       

      {/* Authentication Modals */}
      {showAuthModal === 'login' && (
        <AuthGateModal
          onAuthSuccess={handleAuthSuccess}
          onSwitchToSignup={handleSwitchToSignup}
          onClose={handleCloseAuthModal}
        />
      )}

      {showAuthModal === 'signup' && (
        <LoginSignupModal
          onAuthSuccess={handleAuthSuccess}
          onSwitchToLogin={handleSwitchToLogin}
          onClose={handleCloseAuthModal}
        />
      )}
    </div>
  );
}

