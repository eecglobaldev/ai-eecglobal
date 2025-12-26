
import { useState, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { VisaRequirements, SUPPORTED_LANGUAGES, SupportedLanguage, ChecklistCategory } from '../types';
import { translateVisaDetails, generateDeepDiveChecklist } from '../services/gemini';
import VisaTimeline from './VisaTimeline';
import { 
  CheckIcon, 
  AlertCircleIcon, 
  ClockIcon, 
  BanknoteIcon, 
  SparklesIcon, 
  PlaneIcon, 
  TranslateIcon, 
  MapPinIcon, 
  GlobeIcon, 
  ArrowRightIcon,
  WalletIcon,
  CameraIcon,
  ShieldIcon,
  HotelIcon,
  RefreshIcon,
  GovIcon,
  CalendarIcon,
  ExternalLinkIcon,
  FileTextIcon,
  ShareIcon,
  WhatsAppIcon,
  MailIcon,
  ShieldIcon as VerifiedIcon,
  CopyIcon,
  ScaleIcon,
  GavelIcon,
  SirenIcon
} from './Icons';

interface VisaResultProps {
  data: VisaRequirements;
  origin: string;
  destination: string;
  visaType: 'Tourist' | 'Student';
}

const VisaResult: React.FC<VisaResultProps> = ({ data: originalData, origin, destination, visaType }) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [displayData, setDisplayData] = useState<VisaRequirements>(originalData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedCache, setTranslatedCache] = useState<Record<string, VisaRequirements>>({});
  const [isCopied, setIsCopied] = useState(false);
  
  // Detailed Checklist State
  const [isGeneratingChecklist, setIsGeneratingChecklist] = useState(false);
  const [detailedChecklist, setDetailedChecklist] = useState<ChecklistCategory[] | null>(null);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Animation State for Confidence Score
  const [animatedScore, setAnimatedScore] = useState(0);

  // 1. STATE SYNC: Update displayData when props change (fixes blank screen on new search)
  useEffect(() => {
    setDisplayData(originalData);
    setDetailedChecklist(null); // Reset detailed checklist
    setCurrentLang('English'); // Reset language
  }, [originalData]);

  // Animate score on mount or change
  useEffect(() => {
    setAnimatedScore(0);
    const timer = setTimeout(() => {
        setAnimatedScore(displayData.confidenceScore || 0);
    }, 100);
    return () => clearTimeout(timer);
  }, [displayData.confidenceScore]);

  // FORCE SCROLL TO TOP ON MODAL OPEN
  useLayoutEffect(() => {
    if (showChecklistModal && modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [showChecklistModal]);

  // Logic to identify Booking Portal (VFS/BLS/TLS)
  const bookingLink = useMemo(() => {
    try {
        if (!destination) return null;
        
        // Defensive coding: explicit checks for undefined properties
        const notes = String(originalData.notes || "");
        const contact = String(originalData.embassyContact || "");
        const text = (notes + ' ' + contact).toLowerCase();
        
        // Defensive: sources might be undefined if deep sanitization failed (unlikely but safe)
        const sources = (originalData && Array.isArray(originalData.officialSources)) ? originalData.officialSources : [];
        const destLower = String(destination).toLowerCase().trim();

        // 1. USA Special Case (CGI Federal / USTravelDocs)
        if (destLower === 'united states' || destLower === 'usa' || text.includes('ustraveldocs')) {
            return { url: 'https://www.ustraveldocs.com/in/en/', label: 'US Visa Appointment (CGI)' };
        }

        // 2. Spain (BLS International)
        if (destLower === 'spain' || (text.includes('bls') && text.includes('spain'))) {
            return { url: 'https://india.blsspainvisa.com/', label: 'BLS Spain Appointment' };
        }

        // 3. VFS Global Country Mapping (Strict Mapping for India Origin)
        const vfsCodes: Record<string, string> = {
            'united kingdom': 'gbr', 'uk': 'gbr',
            'canada': 'can',
            'australia': 'aus',
            'france': 'fra',
            'germany': 'deu',
            'italy': 'ita',
            'netherlands': 'nld',
            'switzerland': 'che',
            'austria': 'aut',
            'japan': 'jpn',
            'poland': 'pol',
            'sweden': 'swe',
            'norway': 'nor',
            'denmark': 'dnk',
            'portugal': 'prt',
            'belgium': 'bel',
            'south africa': 'zaf',
            'czech republic': 'cze',
            'hungary': 'hun',
            'finland': 'fin',
            'croatia': 'hrv',
            'ireland': 'irl',
            'luxembourg': 'lux',
            'malta': 'mlt',
            'slovakia': 'svk',
            'slovenia': 'svn',
            'estonia': 'est',
            'latvia': 'lva',
            'lithuania': 'ltu',
            'iceland': 'isl',
            'cyprus': 'cyp',
            'ukraine': 'ukr',
            'georgia': 'geo',
            'thailand': 'tha',
            'singapore': 'sgp',
            'malaysia': 'mys'
        };

        const vfsCode = vfsCodes[destLower];

        const specificSource = sources.find(s => {
            const u = String(s.url || "").toLowerCase();
            if (vfsCode && u.includes(`vfsglobal.com/ind/en/${vfsCode}`)) return true;
            return false;
        });
        
        if (specificSource) {
            return { url: specificSource.url, label: `VFS Global Appointment (${destination})` };
        }

        if (vfsCode) {
            return { url: `https://visa.vfsglobal.com/ind/en/${vfsCode}/book-appointment`, label: `Book VFS Appointment (${destination})` };
        }

        if (text.includes('bls')) {
             const blsSource = sources.find(s => String(s.url || "").includes('blsinternational'));
             if (blsSource) return { url: blsSource.url, label: 'BLS International Appointment' };
             return { url: 'https://www.blsinternational.com/india/', label: 'BLS International Appointment' };
        }

        if (text.includes('vfs') || sources.some(s => String(s.url || "").includes('vfsglobal'))) {
            return { url: 'https://visa.vfsglobal.com/ind/en/', label: 'VFS Global Appointment' };
        }
        
        if (text.includes('tlscontact')) {
            return { url: 'https://www.tlscontact.com/', label: 'TLScontact Appointment' };
        }
    } catch (e) {
        console.warn("Error calculating booking link", e);
        return null;
    }
    return null;
  }, [originalData, destination]);

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as SupportedLanguage;
    setCurrentLang(selectedLang);

    if (selectedLang === 'English') {
      setDisplayData(originalData);
      return;
    }

    if (translatedCache[selectedLang]) {
      setDisplayData(translatedCache[selectedLang]);
      return;
    }

    setIsTranslating(true);
    try {
      const translated = await translateVisaDetails(originalData, selectedLang);
      setTranslatedCache(prev => ({ ...prev, [selectedLang]: translated }));
      setDisplayData(translated);
    } catch (err) {
      console.error("Translation failed", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleGenerateDeepDive = async () => {
    if (detailedChecklist) {
        setShowChecklistModal(true);
        return;
    }

    setIsGeneratingChecklist(true);
    try {
        const stateName = origin.includes('(') ? origin.split('(')[1].replace(')', '') : 'India';
        const checklist = await generateDeepDiveChecklist('India', stateName, destination, visaType);
        setDetailedChecklist(checklist);
        setShowChecklistModal(true);
    } catch (err) {
        alert("Failed to generate detailed checklist. Please try again.");
    } finally {
        setIsGeneratingChecklist(false);
    }
  };

  const handleCitationCopy = () => {
    const markdown = `
> **Source**: [EEC Global AI Travel Agent](https://ai.eecglobal.com/#/destination/${encodeURIComponent(destination)}/type/${encodeURIComponent(visaType)})
> **Verified**: ${displayData.lastUpdate || new Date().toISOString().split('T')[0]}

**Visa Requirements for ${destination} (${visaType})**
*Origin: ${origin}*

| Metric | Value |
| :--- | :--- |
| **Status** | ${displayData.status} |
| **Cost** | ${displayData.cost} |
| **Processing** | ${displayData.processingTime} |
| **Validity** | ${displayData.validity} |

**Key Documents**:
${displayData.documents?.slice(0, 5).map(d => `- ${d}`).join('\n')}

*Generated by Enbee Education Center (Est. 1997)*
    `.trim();

    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateShareableText = (isDetailed: boolean) => {
    const date = new Date().toLocaleDateString('en-IN');
    let text = `✈️ *Visa Checklist: ${destination} (${visaType})*\n`;
    text += `📅 Generated: ${date}\n`;
    text += `📍 Origin: ${origin}\n\n`;
    
    text += `✅ *Status*: ${displayData.status}\n`;
    text += `💰 *Est. Cost*: ${displayData.cost}\n`;
    text += `⏱️ *Processing*: ${displayData.processingTime}\n\n`;

    if (isDetailed && detailedChecklist) {
        text += `📋 *FORENSIC DOCUMENT CHECKLIST*\n`;
        detailedChecklist.forEach(cat => {
            text += `\n*${cat.categoryName}*\n`;
            (cat.items || []).forEach(item => {
               text += `• ${item.item}${item.isCritical ? ' (⚠️ Critical)' : ''}\n`;
            });
        });
    } else {
        text += `📋 *Key Documents Required:*\n`;
        (displayData.documents || []).slice(0, 8).forEach(doc => {
            text += `• ${doc}\n`;
        });
        if((displayData.documents || []).length > 8) text += `+ ${(displayData.documents || []).length - 8} more...\n`;
    }

    text += `\n🔗 *Official Booking:* ${bookingLink?.url || 'Check Consulate Website'}\n`;
    text += `\n*Note:* Generated by EEC AI. Verify with official sources.`;
    
    return encodeURIComponent(text);
  };

  const handleShare = (platform: 'whatsapp' | 'email', isDetailed: boolean = false) => {
    const text = generateShareableText(isDetailed);
    const subject = encodeURIComponent(`${destination} Visa Checklist - EEC Services`);
    
    if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${text}`, '_blank');
    } else {
        const body = decodeURIComponent(text);
        window.open(`mailto:?subject=${subject}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  const getStatusColor = (status: string) => {
    const s = String(status || "").toLowerCase();
    if (s.includes('free') || s.includes('not required')) return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
    if (s.includes('arrival') || s.includes('evisa')) return 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800';
    return 'bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 border-violet-200 dark:border-violet-800';
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Easy') return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800';
    if (diff === 'Medium') return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800';
  };

  const handleBookFlights = () => {
    const cleanOrigin = origin.includes('(') ? 'India' : origin;
    const query = `Flights from ${cleanOrigin} to ${destination}`;
    const url = `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return { 
        bg: 'bg-emerald-500', 
        text: 'text-emerald-600 dark:text-emerald-400', 
        border: 'border-emerald-200 dark:border-emerald-800', 
        label: 'High Confidence' 
    };
    if (score >= 50) return { 
        bg: 'bg-amber-500', 
        text: 'text-amber-600 dark:text-amber-400', 
        border: 'border-amber-200 dark:border-amber-800', 
        label: 'Medium Confidence' 
    };
    return { 
        bg: 'bg-rose-500', 
        text: 'text-rose-600 dark:text-rose-400', 
        border: 'border-rose-200 dark:border-rose-800', 
        label: 'Low Confidence' 
    };
  };

  const confidence = getConfidenceColor(displayData.confidenceScore || 0);

  return (
    <article itemScope itemType="http://schema.org/GovernmentPermit" className="w-full max-w-6xl mx-auto animate-fade-in-up relative overflow-hidden group/article">
      
      {/* Loading Overlay */}
      {isTranslating && (
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-20 rounded-3xl flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600 mb-4"></div>
          <p className="text-violet-900 dark:text-violet-200 font-bold animate-pulse">Translating to {currentLang}...</p>
        </div>
      )}

      {/* Deep Dive Checklist Modal */}
      {showChecklistModal && detailedChecklist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative border border-slate-200 dark:border-slate-800">
             
             {/* Modal Header */}
             <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between flex-shrink-0 border-b border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                   <div className="p-2 bg-emerald-500 rounded-lg text-slate-900 flex-shrink-0">
                      <VerifiedIcon className="w-6 h-6" />
                   </div>
                   <div className="min-w-0">
                      <h3 className="font-extrabold text-xl tracking-tight truncate">Forensic Document Protocol</h3>
                      <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider truncate">Official AI Deep-Dive • {destination} • {visaType}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setShowChecklistModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
             </div>

             {/* Modal Content */}
             <div 
                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-900" 
                ref={modalContentRef}
             >
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 p-4 rounded-xl flex gap-3 items-start">
                   <AlertCircleIcon className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                   <p className="text-sm text-amber-800 dark:text-amber-200 font-medium break-words [overflow-wrap:anywhere]">
                     This checklist is generated based on strict consular standards. Missing small details (like bank stamps or specific photo backgrounds) often leads to rejection. Check off items as you verify them.
                   </p>
                </div>

                {(detailedChecklist || []).map((category, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                       <span className="w-2 h-6 bg-violet-600 rounded-full"></span>
                       {category.categoryName}
                     </h4>
                     <div className="space-y-4">
                        {(category.items || []).map((item, itemIdx) => (
                           <div key={itemIdx} className="flex gap-4 group">
                              <div className="pt-1 flex-shrink-0">
                                 <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-violet-600 focus:ring-violet-500 cursor-pointer" />
                              </div>
                              <div className="min-w-0 flex-1">
                                 <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-900 dark:text-slate-200 text-base break-words [overflow-wrap:anywhere]">{item.item}</span>
                                    {item.isCritical && (
                                       <span className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">Critical</span>
                                    )}
                                 </div>
                                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium break-words [overflow-wrap:anywhere] min-w-0">
                                    {item.description}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>

             {/* Modal Footer */}
             <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between gap-2 flex-shrink-0">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare('whatsapp', true)} 
                    className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                    title="Send Full Checklist to WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => handleShare('email', true)} 
                    className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <MailIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowChecklistModal(false)}
                        className="px-5 py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-white dark:border-slate-800 overflow-hidden transition-colors w-full relative">
        
        {/* Digital Watermark for 'Confidential Dossier' Feel */}
        <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none">
            <div className="border-4 border-slate-900 dark:border-white transform -rotate-12 p-4 rounded-xl">
                <span className="text-8xl font-black uppercase tracking-widest text-slate-900 dark:text-white">Dossier</span>
            </div>
        </div>

        {/* Header */}
        <div className="p-5 md:p-10 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 relative transition-colors z-10">
          
          <div className="flex flex-col-reverse md:flex-row justify-between md:items-start gap-4 mb-4 md:mb-6">
             {/* Tags */}
             <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="bg-slate-900 dark:bg-slate-700 text-white px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                   {visaType} Visa
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 break-words max-w-full min-w-0 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                   <MapPinIcon className="w-3 h-3 flex-shrink-0 text-violet-500" /> 
                   <span className="break-words truncate">{origin} → {destination}</span>
                </span>
                {displayData.lastUpdate && (
                  <>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 px-2 py-1 rounded-lg">
                       <RefreshIcon className="w-3 h-3 flex-shrink-0" /> 
                       <span>Updated: {displayData.lastUpdate}</span>
                    </span>
                  </>
                )}
             </div>

             {/* Translate & Copy Group */}
             <div className="relative group self-end md:self-auto flex items-center gap-2 flex-shrink-0">
                <button
                   onClick={handleCitationCopy}
                   className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                   title="Copy as Citation for LLM/Chat"
                >
                   {isCopied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                   <span>{isCopied ? 'Copied' : 'Copy Dossier'}</span>
                </button>

                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer relative">
                  <TranslateIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Translate</span>
                  <select 
                    value={currentLang}
                    onChange={handleLanguageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="English">English</option>
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
             </div>
          </div>

          {/* Title Area with Floated Status Badge - 10x GEO Optimized Layout */}
          <div className="relative block">
             {/* Status Badge - Floated Right on Desktop to allow text wrap */}
             <div className={`mb-4 md:mb-2 md:float-right md:ml-6 px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold border-2 text-center shadow-sm md:transform md:rotate-1 w-fit clear-right ${getStatusColor(displayData.status)}`}>
               {displayData.status}
             </div>

             <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 leading-snug break-words [overflow-wrap:anywhere]">
                {displayData.visaName}
             </h2>
             <p className="text-slate-600 dark:text-slate-400 max-w-full leading-relaxed text-base md:text-lg font-medium break-words [overflow-wrap:anywhere]">
                {displayData.summary}
             </p>

             {/* Clear float for the score section */}
             <div className="clear-both"></div>

              {/* REBUILT FORENSIC CONFIDENCE SCORE UI */}
              {displayData.confidenceScore !== undefined && (
                 <div className={`mt-8 p-6 rounded-2xl border ${confidence.border} bg-white/60 dark:bg-slate-800/60 flex flex-col sm:flex-row items-center gap-6 max-w-2xl backdrop-blur-md shadow-sm transition-all`}>
                    
                    {/* Animated Score Circle */}
                    <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-full blur-xl opacity-20 ${confidence.bg}`}></div>
                        
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
                            {/* Background Track */}
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="42" 
                                stroke="currentColor" 
                                strokeWidth="8" 
                                fill="transparent" 
                                className="text-slate-100 dark:text-slate-700/50" 
                            />
                            {/* Progress Arc */}
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="42" 
                                stroke="currentColor" 
                                strokeWidth="8" 
                                fill="transparent" 
                                strokeDasharray={264} 
                                strokeDashoffset={264 - (264 * animatedScore) / 100} 
                                strokeLinecap="round" 
                                className={`${confidence.text} transition-all duration-[1500ms] ease-out`}
                            />
                        </svg>
                        
                        {/* Centered Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-black tracking-tighter ${confidence.text}`}>
                                {animatedScore}%
                            </span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center sm:text-left flex-1">
                         <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                             <VerifiedIcon className={`w-5 h-5 ${confidence.text}`} />
                             <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                 Forensic Reliability Score
                             </span>
                             <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${confidence.border} ${confidence.bg} ${confidence.text} bg-opacity-20`}>
                                 {confidence.label}
                             </span>
                         </div>
                         
                         <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed font-medium">
                            "{displayData.aiAnalysis || "Calculated based on source reliability and cross-referencing."}"
                         </p>
                    </div>
                 </div>
              )}
          </div>

          {/* Semantic Table Data for LLM Parsers (Visually Grid) */}
          <div className="mt-8 md:mt-10 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700">
             <table className="w-full text-left border-collapse bg-white dark:bg-slate-800">
                <caption className="sr-only">Visa Requirements Summary Table for {destination}</caption>
                <thead className="sr-only">
                   <tr>
                      <th>Metric</th>
                      <th>Value</th>
                   </tr>
                </thead>
                <tbody className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700">
                   <tr className="flex flex-col p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="text-xs font-bold uppercase tracking-wide text-blue-500 mb-2 flex items-center gap-2">
                         <ClockIcon className="w-4 h-4" /> Processing
                      </td>
                      <td className="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-tight break-words">{displayData.processingTime}</td>
                   </tr>
                   <tr className="flex flex-col p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="text-xs font-bold uppercase tracking-wide text-green-500 mb-2 flex items-center gap-2">
                         <BanknoteIcon className="w-4 h-4" /> Est. Cost
                      </td>
                      <td className="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-tight break-words">{displayData.cost}</td>
                   </tr>
                   <tr className="flex flex-col p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="text-xs font-bold uppercase tracking-wide text-purple-500 mb-2 flex items-center gap-2">
                         <SparklesIcon className="w-4 h-4" /> Validity
                      </td>
                      <td className="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-tight break-words">{displayData.validity}</td>
                   </tr>
                   <tr className={`flex flex-col p-5 transition-colors group ${getDifficultyColor(displayData.difficulty).replace('border', 'border-l-0')}`}>
                      <td className="text-xs font-bold uppercase tracking-wide opacity-75 mb-2">
                         Difficulty
                      </td>
                      <td className="font-black text-lg leading-tight">{displayData.difficulty}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* New Timeline Component Integration */}
          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
             <VisaTimeline processingTime={displayData.processingTime} />
          </div>

        </div>

        <div className="p-5 md:p-10 grid lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* Main Content Left */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12 min-w-0">
            
            {/* Detailed Requirements Grid */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                 Specific Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: WalletIcon, title: "Financials", text: displayData.financialReqs, color: "text-emerald-700 dark:text-emerald-400" },
                  { icon: CameraIcon, title: "Photo Specs", text: displayData.photoReqs, color: "text-blue-700 dark:text-blue-400" },
                  { icon: ShieldIcon, title: "Insurance", text: displayData.insuranceReqs, color: "text-indigo-700 dark:text-indigo-400" },
                  { icon: HotelIcon, title: "Accommodation", text: displayData.accommodationReqs, color: "text-fuchsia-700 dark:text-fuchsia-400" }
                ].map((req, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-800">
                     <div className={`flex items-center gap-2 ${req.color} font-bold mb-3 text-sm uppercase tracking-wide`}>
                        <req.icon className="w-4 h-4 flex-shrink-0" /> {req.title}
                     </div>
                     <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium break-words whitespace-pre-line [overflow-wrap:anywhere]">{req.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Citations (E-E-A-T Booster) */}
            {displayData.legalCitations && displayData.legalCitations.length > 0 && (
                <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-5 md:p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ScaleIcon className="w-24 h-24" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-violet-300">
                        <GavelIcon className="w-4 h-4" /> Legal Framework & Acts
                    </h3>
                    <ul className="space-y-2 relative z-10">
                        {displayData.legalCitations.map((cite, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm font-mono text-slate-300">
                                <span className="text-violet-400">•</span> {cite}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Steps */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-600 text-white text-sm font-bold shadow-lg shadow-violet-200 dark:shadow-violet-900/30 flex-shrink-0">1</span>
                {currentLang === 'English' ? 'Detailed Process' : 'Detailed Process (Translated)'}
              </h3>
              <div className="space-y-6 relative pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-4">
                {(displayData.processSteps || []).map((step, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute -left-[21px] top-0.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-violet-500 shadow-sm group-hover:scale-125 transition-transform"></div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base font-medium break-words [overflow-wrap:anywhere]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-fuchsia-600 text-white text-sm font-bold shadow-lg shadow-fuchsia-200 dark:shadow-fuchsia-900/30 flex-shrink-0">2</span>
                    {currentLang === 'English' ? 'Checklist' : 'Checklist (Translated)'}
                 </h3>
                 
                 {/* Generate Deep Dive Button */}
                 <button 
                   onClick={handleGenerateDeepDive}
                   disabled={isGeneratingChecklist}
                   className="bg-slate-900 dark:bg-slate-100 hover:bg-violet-700 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-slate-200 dark:shadow-black/30 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex-shrink-0"
                 >
                    {isGeneratingChecklist ? (
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       <FileTextIcon className="w-4 h-4" />
                    )}
                    <span>Generate Forensic Checklist</span>
                 </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <ul className="grid gap-4">
                  {(displayData.documents || []).map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <div className="mt-0.5 min-w-[20px] p-1 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400 flex-shrink-0 flex items-center justify-center h-5 w-5">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium break-words [overflow-wrap:anywhere] text-sm md:text-base flex-1 min-w-0">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6 min-w-0">
             
             {/* Rejection Risk Analysis Widget */}
             {displayData.rejectionRisk && (
                 <div className={`bg-white dark:bg-slate-800 border-2 rounded-3xl p-6 shadow-sm ${
                     displayData.rejectionRisk.probability === 'High' ? 'border-rose-200 dark:border-rose-900' :
                     displayData.rejectionRisk.probability === 'Moderate' ? 'border-amber-200 dark:border-amber-900' :
                     'border-emerald-200 dark:border-emerald-900'
                 }`}>
                     <div className="flex items-center justify-between mb-4">
                         <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                             <SirenIcon className={`w-5 h-5 ${
                                 displayData.rejectionRisk.probability === 'High' ? 'text-rose-500' : 'text-amber-500'
                             }`} />
                             Risk Profile
                         </h3>
                         <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                              displayData.rejectionRisk.probability === 'High' ? 'bg-rose-100 text-rose-700' :
                              displayData.rejectionRisk.probability === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                              'bg-emerald-100 text-emerald-700'
                         }`}>
                             {displayData.rejectionRisk.probability} Risk
                         </span>
                     </div>
                     <div className="space-y-3">
                         <div>
                             <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Primary Concern</p>
                             <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                                 {displayData.rejectionRisk.primaryReason}
                             </p>
                         </div>
                         <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                             <p className="text-[10px] uppercase font-bold text-violet-500 mb-1">Mitigation Strategy</p>
                             <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                                 "{displayData.rejectionRisk.mitigationTip}"
                             </p>
                         </div>
                     </div>
                 </div>
             )}

             {/* CTA */}
             <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                   <PlaneIcon className="w-6 h-6 transform -rotate-45" />
                 </div>
                 <h3 className="font-bold text-xl">Ready to fly?</h3>
              </div>
              <p className="text-indigo-100 text-sm mb-6 font-medium relative z-10 break-words [overflow-wrap:anywhere]">
                Search for flights from India to {destination} once your visa is approved.
              </p>
              <button 
                onClick={handleBookFlights}
                className="w-full bg-white text-indigo-700 font-bold py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg relative z-10"
              >
                Search Flights
              </button>
            </div>

            {/* Share / Save Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                        <ShareIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Save & Share</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                    Send this visa dossier to your phone or email to keep it handy.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => handleShare('whatsapp')}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group"
                    >
                        <WhatsAppIcon className="w-6 h-6 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-700 dark:group-hover:text-green-300">WhatsApp</span>
                    </button>
                    <button 
                        onClick={() => handleShare('email')}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                    >
                        <MailIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">Email</span>
                    </button>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 font-bold mb-4">
                <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
                <span>Critical Jurisdiction</span>
              </div>
              <div className="prose prose-sm prose-amber dark:prose-invert text-amber-900/80 dark:text-amber-200/80 leading-relaxed font-medium break-words [overflow-wrap:anywhere] min-w-0">
                {displayData.notes}
              </div>
              
              <div className="mt-8 pt-6 border-t border-amber-200/50 dark:border-amber-900/50">
                 <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-2 text-xs uppercase tracking-wide">Where to Apply</h4>
                 <p className="text-sm text-amber-800 dark:text-amber-200 font-medium bg-amber-100/50 dark:bg-amber-900/40 p-3 rounded-xl break-words [overflow-wrap:anywhere] min-w-0">
                   {displayData.embassyContact || "Contact your nearest embassy or consulate."}
                 </p>

                 {/* Book Appointment Button (Dynamically Injected) */}
                 {bookingLink && (
                    <a 
                      href={bookingLink.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="mt-4 w-full bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all group"
                    >
                       <CalendarIcon className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                       <span>{bookingLink.label}</span>
                       <ExternalLinkIcon className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </a>
                 )}
              </div>
            </div>

            {/* Grounding/Sources Section - SOURCE TRUST METER */}
            {displayData.officialSources && displayData.officialSources.length > 0 && (
              <div className="animate-fade-in-up pt-4">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                   <GlobeIcon className="w-4 h-4" />
                   Verified Official Sources
                 </h3>
                 <div className="grid gap-3">
                   {(displayData.officialSources || []).map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-md transition-all group w-full max-w-full overflow-hidden"
                      >
                        <div className="flex flex-col min-w-0 flex-1 pr-3">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate max-w-full">
                              {source.title}
                            </span>
                            
                            {/* Authority Meter */}
                            {source.authorityLevel === 'Gold' && (
                                <span className="flex-shrink-0 flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-yellow-200 dark:border-yellow-800">
                                    <ShieldIcon className="w-3 h-3" /> Gold Authority
                                </span>
                            )}
                            {source.authorityLevel === 'Silver' && (
                                <span className="flex-shrink-0 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                                    <GovIcon className="w-3 h-3" /> Govt
                                </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 dark:text-slate-500 break-all line-clamp-2">{source.url}</span>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 transition-all flex-shrink-0 ml-2 text-slate-400 group-hover:text-violet-500" />
                      </a>
                   ))}
                 </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </article>
  );
};

export default VisaResult;
