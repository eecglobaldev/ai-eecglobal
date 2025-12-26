import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Mail } from 'lucide-react';
import { SEOFooterKeywords } from './SEOFooterKeywords';
import { RegionalVisaIndex } from './RegionalVisaIndex';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-4 pb-6 mt-auto transition-colors relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto items-start justify-evenly">
          
          {/* ---------------- Brand Section ---------------- */}
          <div className="text-center md:text-left flex-1">
            <a
              href="https://eecglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <img
                src="https://ai.eecglobal.com/assets/logos/eeclogo-main.png"
                alt="Logo"
                className="h-14 sm:h-10"
              />
            </a>

            <div className="space-y-2">
              <p className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                Enbee Education Center Private Limited (EEC)
              </p>

              <div className="flex flex-col gap-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span>© 2025 EEC. All rights reserved.</span>

                <div className="flex flex-row flex-wrap items-center gap-x-2 gap-y-0.5 justify-center md:justify-start">
                  <span>Established 1997</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>26 Branches</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>12 Cities</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- Social + Email Section ---------------- */}
          <div className="flex flex-col items-start flex-shrink-0 mx-auto md:mx-0 max-w-fit">
            <h3 className="font-semibold text-slate-900 dark:text-slate-200 md:mt-0 mt-3 text-xl text-left md:text-right">
              Connect with Us
            </h3>

            {/* Social Icons */}
            <div className="flex items-center gap-6 sm:gap-5 my-3 justify-start md:justify-end">
              <a
                href="https://www.instagram.com/eecglobal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group transition-all"
              >
                <Instagram className="h-7 w-7 text-slate-400 group-hover:text-[#E1306C] transition-all duration-300 transform group-hover:scale-110" />
              </a>

              <a
                href="https://www.facebook.com/eecglobal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group transition-all"
              >
                <Facebook className="h-7 w-7 text-slate-400 group-hover:text-[#1877F2] transition-all duration-300 transform group-hover:scale-110" />
              </a>

              <a
                href="https://www.youtube.com/@eecgujarat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group transition-all"
              >
                <Youtube className="h-7 w-7 text-slate-400 group-hover:text-[#FF0000] transition-all duration-300 transform group-hover:scale-110" />
              </a>

              <a
                href="https://www.linkedin.com/school/eecindia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group transition-all"
              >
                <Linkedin className="h-7 w-7 text-slate-400 group-hover:text-[#0A66C2] transition-all duration-300 transform group-hover:scale-110" />
              </a>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 justify-start md:justify-end">
              <Mail className="h-6 w-6 text-slate-400 mt-1 flex-shrink-0" />

              <div className="text-left md:text-right">
                <p className="text-xs text-slate-400 ">Feedback & Suggestions</p>

                <a
                  href="mailto:info@eecglobal.com"
                  className="text-sm font-semibold text-slate-900 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-all duration-200"
                >
                  info@eecglobal.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ---------------- Footer SEO Blocks ---------------- */}
        <div className="space-y-4 max-w-5xl mx-auto mt-3">
          <SEOFooterKeywords />
          <RegionalVisaIndex />
        </div>

        {/* ---------------- Disclaimer ---------------- */}
        <div className="mt-1 pt-2 text-center space-y-2">
          <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold">
            Disclaimer: AI-generated information. Verify with official embassies.
          </p>

          <a
            href="/travelagent/llm.txt"
            target="_blank"
            className="inline-flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors uppercase tracking-widest font-mono py-2 px-5 rounded-full border border-slate-100 dark:border-slate-800/50 hover:border-violet-200 dark:hover:border-violet-900/50 bg-slate-50/50 dark:bg-slate-900/50"
          >
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            LLM's & Generative Engines read here
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;