

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ChatMessage, SUPPORTED_LANGUAGES, SupportedLanguage, VisaRequirements } from '../types';
import { sendChatMessage, translateText } from '../services/gemini';
import { 
  SparklesIcon, 
  BotIcon, 
  TranslateIcon, 
  CopyIcon, 
  CheckIcon,
  FileTextIcon,
  BanknoteIcon,
  ClockIcon,
  ShieldIcon,
  MapPinIcon,
  ArrowRightIcon,
  RefreshIcon,
  UserIcon,
  GavelIcon,
  AlertCircleIcon,
  GraduationCapIcon,
  ScaleIcon
} from './Icons';

interface ChatAssistantProps {
  visaData: VisaRequirements;
  originState: string;
  destination: string;
}

// --- Dynamic Prompt Engine ---
// A pool of forensic-grade questions to stimulate high-value conversations
const PROMPT_POOL = [
    { icon: BanknoteIcon, label: "Agri-Income Proof", query: "My sponsor is a farmer with agricultural land. How do I show proof of funds?" },
    { icon: AlertCircleIcon, label: "Gap Justification", query: "I have a 2-year academic/career gap. How do I justify this in my SOP?" },
    { icon: GavelIcon, label: "Refusal Analysis", query: "Analyze my profile for potential Section 214(b) (Immigrant Intent) rejection risks." },
    { icon: UserIcon, label: "Mock Interview", query: "Simulate a strict 5-minute visa interview with me. Grill me on my finances." },
    { icon: BanknoteIcon, label: "Third-Party Sponsor", query: "Can my uncle or a family friend sponsor my education? What documents are needed?" },
    { icon: FileTextIcon, label: "CA Report Needed?", query: "Is a Chartered Accountant (CA) Valuation Report mandatory for my property assets?" },
    { icon: ClockIcon, label: "Processing Speed", query: "Is there a 'Priority Service' available to speed up my decision?" },
    { icon: GraduationCapIcon, label: "Backlogs Issue", query: "I have 5 backlogs in my Bachelor's degree. Will this affect my student visa?" },
    { icon: ShieldIcon, label: "Insurance Rules", query: "What are the exact minimum coverage requirements for travel insurance?" },
    { icon: ScaleIcon, label: "Appeal Process", query: "If rejected, can I appeal the decision or should I re-apply immediately?" },
    { icon: FileTextIcon, label: "Cover Letter", query: "Draft a strong Cover Letter explaining my travel itinerary and intent to return." },
    { icon: BanknoteIcon, label: "Liquid Funds", query: "How much money specifically needs to be in 'Liquid Savings' vs 'Fixed Assets'?" },
    { icon: MapPinIcon, label: "Jurisdiction Check", query: "Based on my state, which specific Consulate/Embassy must I visit?" },
    { icon: UserIcon, label: "Ties to Home", query: "How do I prove 'Strong Economic Ties' to India to satisfy the Visa Officer?" },
    { icon: AlertCircleIcon, label: "English Waiver", query: "Can I get a waiver for IELTS/TOEFL based on my previous education?" },
    { icon: FileTextIcon, label: "SOP Review", query: "What are the 3 most important points to include in my Statement of Purpose?" },
    { icon: GraduationCapIcon, label: "Course Relevance", query: "How do I explain why I chose this specific course over Indian options?" },
    { icon: BanknoteIcon, label: "Education Loan", query: "Does the embassy accept a 'Sanction Letter' from a Non-Banking Financial Company (NBFC)?" },
    { icon: ShieldIcon, label: "Biometrics", query: "What happens at the VAC (Visa Application Center)? Walk me through the steps." },
    { icon: ClockIcon, label: "Ideal Timing", query: "How many days before my travel date should I ideally submit my file?" }
];

// --- Robust Markdown Parser ---
const MessageContent: React.FC<{ text: string; isUser: boolean }> = ({ text, isUser }) => {
  const [copied, setCopied] = useState(false);

  // Safety check for undefined/null text to prevent "Uncaught" errors
  if (!text) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return <div className="whitespace-pre-wrap font-medium text-[15px] leading-relaxed">{text}</div>;
  }

  // Robust splitting for code blocks
  // If regex fails (rare), it falls back to raw text
  let sections: string[] = [];
  try {
      sections = text.split(/(```[\s\S]*?```)/g);
  } catch (e) {
      sections = [text];
  }

  return (
    <div className="space-y-3 w-full relative group min-w-0">
      {/* Copy Button (Hover) */}
      <button 
        onClick={handleCopy}
        className="absolute -top-2 -right-2 p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900 rounded-lg text-slate-400 hover:text-violet-600 opacity-0 group-hover:opacity-100 transition-all z-10 scale-90"
        title="Copy Response"
      >
        {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
      </button>

      {sections.map((section, secIndex) => {
        if (!section) return null;

        // Code Block
        if (section.startsWith('```')) {
          const content = section.replace(/```/g, '');
          return (
            <div key={secIndex} className="bg-slate-900 text-slate-200 p-3 rounded-xl text-xs font-mono overflow-x-auto border border-slate-700 shadow-inner my-2">
              <pre>{content}</pre>
            </div>
          );
        }

        // Table Detection (Simple Heuristic)
        if (section.includes('|') && section.includes('---')) {
           const lines = section.trim().split('\n');
           const tableRows = lines.filter(line => line.trim().startsWith('|') && line.trim().endsWith('|'));
           
           if (tableRows.length > 0) {
             return (
               <div key={secIndex} className="overflow-hidden my-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800/50">
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left border-collapse">
                     <tbody>
                       {tableRows.map((row, rIdx) => {
                         if (row.includes('---')) return null;
                         const cols = row.split('|').filter(c => c.trim() !== '');
                         const isHeader = rIdx === 0;
                         return (
                           <tr key={rIdx} className={isHeader ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200' : 'border-t border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'}>
                             {cols.map((col, cIdx) => (
                               <td key={cIdx} className="p-3 whitespace-pre-wrap min-w-[100px]">
                                 {parseInline(col.trim())}
                               </td>
                             ))}
                           </tr>
                         );
                       })}
                     </tbody>
                   </table>
                 </div>
               </div>
             );
           }
        }

        // Standard Text Blocks
        const blocks = section.split(/\n\n+/);
        return blocks.map((block, index) => {
          const trimmed = block.trim();
          if (!trimmed) return null;
          
          // Headers
          const headerMatch = trimmed.match(/^(#{1,3})\s+(.+?)(?:\n|$)([\s\S]*)$/);
          if (headerMatch && !trimmed.match(/^[-*]\s/)) { 
            const level = headerMatch[1].length;
            const title = headerMatch[2].trim();
            const body = headerMatch[3] ? headerMatch[3].trim() : '';
            
            return (
              <React.Fragment key={index}>
                {level === 1 && <h1 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">{parseInline(title)}</h1>}
                {level === 2 && <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-3 mb-2">{parseInline(title)}</h2>}
                {level === 3 && <h3 className="text-sm font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mt-3 mb-1">{parseInline(title)}</h3>}
                
                {body && (
                   <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-1">
                      {parseInline(body)}
                   </div>
                )}
              </React.Fragment>
            );
          }
          
          // Lists
          if (trimmed.match(/^[-*]\s/m)) {
            const items = trimmed.split('\n').filter(line => line.trim().match(/^[-*]\s/));
            return (
              <ul key={index} className="space-y-2 my-2 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0 shadow-sm shadow-violet-200 dark:shadow-none" />
                      <span className="flex-1">{parseInline(item.replace(/^[-*]\s/, ''))}</span>
                  </li>
                ))}
              </ul>
            );
          }

          // Paragraphs
          return (
            <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {parseInline(trimmed)}
            </p>
          );
        });
      })}
    </div>
  );
};

// Robust Inline Parser (Bold, Code)
const parseInline = (text: string) => {
  if (!text) return null;
  // Escaped regex for safety: split by **bold** or `code`
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-violet-600 dark:text-violet-300 font-mono text-xs border border-slate-200 dark:border-slate-600">{part.slice(1, -1)}</code>;
    }
    return <span key={i}>{part}</span>;
  });
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ visaData, originState, destination }) => {
  // Initialize with the new persona
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: `Hello! I am your **EEC Expert Visa Consultant**.\n\nI have the official consular dossier for **${visaData.visaName}** tailored for applicants from **${originState}**.\n\nHow can I assist you with your application strategy today?` 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [originalMessages, setOriginalMessages] = useState<ChatMessage[]>(messages);
  const [activePrompts, setActivePrompts] = useState(PROMPT_POOL.slice(0, 5));
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic Prompt Logic: Shuffle and pick 5 new ones whenever destination changes
  useEffect(() => {
    const shuffled = [...PROMPT_POOL].sort(() => 0.5 - Math.random());
    setActivePrompts(shuffled.slice(0, 5));
  }, [destination, visaData.visaName]);

  // Auto-scroll logic: FIXED to prevent page jump. Uses scrollTop of container only.
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: "smooth"
        });
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isTranslating]);

  // Reset chat when visa context changes (e.g. user changes destination)
  useEffect(() => {
     const newInitMsg: ChatMessage = {
        role: 'model',
        text: `Hello! I am your **EEC Expert Visa Consultant**.\n\nI have the official consular dossier for **${visaData.visaName}** tailored for applicants from **${originState}**.\n\nHow can I assist you with your application strategy today?` 
     };
     setMessages([newInitMsg]);
     setOriginalMessages([newInitMsg]);
  }, [visaData.visaName, originState]);

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as SupportedLanguage;
    const previousLang = currentLang;
    setCurrentLang(selectedLang);

    if (selectedLang === 'English') {
      setMessages(originalMessages);
      return;
    }

    setIsTranslating(true);
    try {
      const translatedMessages = await Promise.all(
        originalMessages.map(async (msg) => {
           const translatedText = await translateText(msg.text, selectedLang);
           return { ...msg, text: translatedText };
        })
      );
      setMessages(translatedMessages);
    } catch (err) {
      console.error("Chat translation failed", err);
      setCurrentLang(previousLang); 
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || isLoading) return;

    const newUserMsg: ChatMessage = { role: 'user', text: textToSend };
    
    setInput('');
    // Keep focus on input for rapid chatting but PREVENT SCROLL
    if (textareaRef.current) textareaRef.current.focus({ preventScroll: true });

    setMessages(prev => [...prev, newUserMsg]);
    setOriginalMessages(prev => [...prev, newUserMsg]); 
    
    setIsLoading(true);

    try {
      // Prepare history for API (Model expects generic role structure)
      const historyToApi = originalMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      const responseText = await sendChatMessage(historyToApi, textToSend, visaData, currentLang, destination);
      const newModelMsg: ChatMessage = { role: 'model', text: responseText };
      
      setMessages(prev => [...prev, newModelMsg]);
      setOriginalMessages(prev => [...prev, newModelMsg]); 

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: ChatMessage = { role: 'model', text: "I'm having trouble reaching the secure consular network. Please try again in a moment." };
      setMessages(prev => [...prev, errorMsg]);
      setOriginalMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    const initialMsg = originalMessages[0];
    setMessages([initialMsg]);
    setOriginalMessages([initialMsg]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[650px] md:h-[750px] flex flex-col rounded-[2.5rem] overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-2xl relative z-10 transition-colors duration-500 group/container">
      
      {/* Dynamic Ambient Background */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-violet-50/80 dark:from-violet-900/10 to-transparent pointer-events-none z-0" />

      {/* 1. Header Section */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 relative z-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
           {/* Avatar */}
           <div className="relative group/avatar cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 transform group-hover/avatar:scale-105 transition-transform duration-300">
                 <BotIcon className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
              </div>
           </div>
           
           {/* Info */}
           <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                 EEC Expert Visa Consultant
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                 Official EEC Agent
              </p>
           </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
           {messages.length > 1 && (
             <button 
               onClick={handleClear}
               className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-900"
               title="Reset Conversation"
             >
               <RefreshIcon className="w-5 h-5" />
             </button>
           )}
           
           <div className="relative flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 transition-all hover:bg-white dark:hover:bg-slate-700 hover:border-violet-200 dark:hover:border-slate-600 hover:shadow-sm">
              <TranslateIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <select 
                  value={currentLang}
                  onChange={handleLanguageChange}
                  className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-6 w-20"
                  disabled={isTranslating}
              >
                  <option value="English">English</option>
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
              </select>
           </div>
        </div>
      </div>

      {/* 2. Chat Area */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent z-10"
        ref={scrollContainerRef}
      >
         {isTranslating && (
           <div className="sticky top-0 z-50 flex justify-center pb-4">
              <div className="px-4 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-2 shadow-sm animate-pulse">
                <TranslateIcon className="w-3 h-3" /> Translating...
              </div>
           </div>
         )}
         
         {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
               <div key={idx} className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                  
                  {/* Avatar for Bot only */}
                  {!isUser && (
                     <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
                        <BotIcon className="w-5 h-5" />
                     </div>
                  )}
                  {isUser && (
                     <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 flex-shrink-0">
                        <UserIcon className="w-4 h-4" />
                     </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`relative max-w-[85%] sm:max-w-[75%] px-5 py-4 shadow-sm transition-all duration-300 ${
                      isUser 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] rounded-tl-sm hover:shadow-md'
                  }`}>
                      <MessageContent text={msg.text} isUser={isUser} />
                  </div>
               </div>
            )
         })}
         
         {isLoading && (
            <div className="flex items-center gap-3 animate-in fade-in duration-300">
               <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-400 dark:text-violet-500 flex-shrink-0">
                  <BotIcon className="w-5 h-5" />
               </div>
               <div className="bg-white dark:bg-slate-800 px-5 py-4 rounded-[1.5rem] rounded-tl-sm border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
               </div>
            </div>
         )}
         {/* Sentinel element removed, relying on container scroll */}
      </div>

      {/* 3. Input & Prompts Area */}
      <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-20">
         
         {/* Quick Prompts (Horizontal Scroll) - NOW DYNAMIC */}
         {!isLoading && (
            <div className="flex gap-2 ml-10 overflow-x-auto pb-4 mask-linear-fade scrollbar-hide snap-x">
               {activePrompts.map((prompt, idx) => (
                  <button
                     key={idx}
                     onClick={() => handleSend(prompt.query)}
                     className="snap-start flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-700 dark:hover:text-violet-300 transition-all whitespace-nowrap active:scale-95"
                  >
                     <prompt.icon className="w-3.5 h-3.5" />
                     {prompt.label}
                  </button>
               ))}
            </div>
         )}

         {/* Floating Input Bar */}
         <div className="relative flex items-end gap-2 bg-slate-100 dark:bg-black/30 p-2 rounded-[2rem] border border-transparent focus-within:border-violet-300 dark:focus-within:border-violet-700 focus-within:ring-4 focus-within:ring-violet-100 dark:focus-within:ring-violet-900/20 transition-all">
            <textarea
               ref={textareaRef}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyPress}
               disabled={isLoading || isTranslating}
               placeholder={currentLang === 'English' ? "Type your question..." : `Ask in ${currentLang}...`}
               className="w-full bg-transparent border-0 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 py-3 pl-4 resize-none max-h-32 min-h-[48px] leading-relaxed scrollbar-hide text-sm md:text-base font-medium"
               rows={1}
            />
            <button
               onClick={() => handleSend()}
               disabled={!input.trim() || isLoading}
               className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:scale-105 active:scale-90 transition-all disabled:opacity-50 disabled:scale-100 shadow-md flex-shrink-0"
               title="Send Message"
            >
               {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />
               ) : (
                  <ArrowRightIcon className="w-5 h-5" />
               )}
            </button>
         </div>

         <div className="text-center mt-3 flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <SparklesIcon className="w-3 h-3 text-violet-500" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               Powered by Gemini 2.5 • Official EEC Intelligence
            </p>
         </div>
      </div>
    </div>
  );
};

export default ChatAssistant;