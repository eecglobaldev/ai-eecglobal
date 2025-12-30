import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Award, 
  Globe, 
  GraduationCap, 
  MessageCircle, 
  Sparkles, 
  Shield, 
  Users, 
  CheckCircle2,
  Building2,
  ArrowUpRight,
  Heart,
  Plus
} from 'lucide-react';

/**
 * ============================================================================
 * SLEEK PROFESSIONAL FOOTER - BEAUTIFUL UI EDITION
 * ============================================================================
 * 
 * Streamlined footer with:
 * - Premium gradient design
 * - Essential links and contact info
 * - AI Tools & Course Search quick access
 * - Trust certifications
 * - ESTERO Partnership highlight
 * 
 * NOTE: Duplicate NZ-specific content removed (exists in LSIContent/TopicalClusters)
 * 
 * ============================================================================
 */

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // AI Tools Data
  const aiTools = [
    { name: 'Career Counselor AI', url: '/careercounselor', isNew: true },
    { name: 'USA F-1 Visa Prep', url: '/usavisaprep' },
    { name: 'UK Pre-CAS Prep', url: '/ukprecas' },
    { name: 'Australia GS Prep', url: '/australiagsprep' },
    { name: 'Australia PR Calculator', url: 'https://australia.eecglobal.com/prpointscalculator' },
    { name: 'Germany Visa Prep', url: 'https://ai.eecglobal.com/germanyvisaprep' },
    { name: 'NZ Visa Prep', url: '/nzvisaprep', isCurrent: true },
    { name: 'Travel Agent AI', url: '/travelagent', isNew: true },
    { name: 'Germany Public University', url: 'https://germany.eecglobal.com/public', isNew: true },
  ];

  // Course Search Countries
  const countries = [
    { name: 'Canada', flag: '🇨🇦', url: 'https://canada.eecglobal.com' },
    { name: 'UK', flag: '🇬🇧', url: 'https://uk.eecglobal.com' },
    { name: 'USA', flag: '🇺🇸', url: 'https://usa.eecglobal.com' },
    { name: 'Australia', flag: '🇦🇺', url: 'https://aus.eecglobal.com' },
    { name: 'New Zealand', flag: '🇳🇿', url: 'https://nz.eecglobal.com' },
    { name: 'Germany', flag: '🇩🇪', url: 'https://ger.eecglobal.com' },
  ];

  // Certifications
  const certifications = [
    { name: 'AIRC', validity: '2031' },
    { name: 'ICEF', validity: null },
    { name: 'U.S. News', validity: null },
    { name: 'ENZRA', validity: null },
    { name: 'British Council', validity: null },
    { name: 'Australia PIER', validity: null },
  ];

  return (
    <footer 
      className="relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/WPFooter"
    >
      {/* ESTERO Partnership Banner - Premium Gradient */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <img src="https://media.licdn.com/dms/image/v2/D4D0BAQHCF_kNj5hHpw/company-logo_200_200/company-logo_200_200/0/1698639843503/estero_nz_ltd_logo?e=1767225600&v=beta&t=zCmnMPbA6NLvOtXAT-tNsiJ-nKao-20YrWTGz55jLqA" alt="Estero logo" className="h-10 rounded-xl" />
             
              <div className="text-center md:text-left">
                <h3 className="text-white font-bold text-lg">Exclusive ESTERO New Zealand Partnership</h3>
                <p className="text-blue-100 text-sm">Official Representative of All 8 NZ Universities in Gujarat</p>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            
            {/* Column 1: About EEC */}
            <div itemScope itemType="https://schema.org/Organization">
                          <a
                href="https://eecglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-6 overflow-hidden"
              >
                <div className="flex items-center justify-center md:justify-start  w-full max-w-full md:max-w-xl mx-auto md:mx-0">

                  {/* EEC Logo */}
                  <img
                    src="/assets/logos/eeclogo-main.png"
                    alt="EEC logo"
                    className="
                      h-14 sm:h-16 md:h-12 lg:h-12 xl:h-12
                      w-auto
                      max-w-[120px] sm:max-w-[140px] md:max-w-[160px]
                      object-contain
                      flex-shrink-0
                    "
                  />

                  {/* Plus Icon */}
                  <Plus
                    className="
                      h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8
                      text-slate-400 dark:text-slate-500
                      flex-shrink-0
                    "
                    strokeWidth={2.5}
                  />

                  {/* Estero Logo */}
                  <img
                    src="https://estero.co.nz/wp-content/uploads/2024/05/EES_White-300x150.png"
                    alt="Estero"
                    className="
                      h-14 sm:h-16 md:h-16 lg:h-16 xl:h-18
                      w-auto
                      max-w-[140px] sm:max-w-[180px] md:max-w-[220px]
                      object-contain
                      flex-shrink-0
                    "
                  />

                </div>
              </a>

              <meta itemProp="name" content="Enbee Education Center Private Limited" />
              <meta itemProp="foundingDate" content="1997" />
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6" itemProp="description">
                <strong className="text-white">Since 1997</strong> — Gujarat's largest study abroad company. 
                <span className="text-indigo-400"> 26 branches</span> across 
                <span className="text-indigo-400"> 12 cities</span>. 
                Certified counsellors for test prep, admissions & visa guidance.
              </p>

              {/* Contact */}
              <div className="space-y-3">
                <a 
                  href="tel:+918758750036" 
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  itemProp="telephone"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-600 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+91 87587 50036</span>
                </a>
                <a 
                  href="https://Wa.Me/918758750036" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-green-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>WhatsApp Us</span>
                </a>
                <a 
                  href="mailto:info@eecglobal.com" 
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                  itemProp="email"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@eecglobal.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2 mt-6">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/eecglobal', hover: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
                  { icon: Facebook, href: 'https://www.facebook.com/eecglobal', hover: 'hover:bg-[#1877F2]' },
                  { icon: Youtube, href: 'https://www.youtube.com/@eecgujarat', hover: 'hover:bg-[#FF0000]' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/school/eecindia', hover: 'hover:bg-[#0A66C2]' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 bg-slate-800 rounded-lg ${social.hover} hover:text-white transition-all text-slate-400`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: AI Tools */}
            <nav aria-label="AI Tools Navigation">
              <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                Free AI Tools
              </h3>
              <ul className="space-y-3">
                {aiTools.map((tool) => (
                  <li key={tool.url}>
                    <a
                      href={tool.url}
                      target={tool.isCurrent ? '_self' : '_blank'}
                      rel={tool.isCurrent ? undefined : 'noopener noreferrer'}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        tool.isCurrent 
                          ? 'text-indigo-400 font-semibold' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tool.name}
                      {tool.isNew && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">NEW</span>
                      )}
                      {tool.isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500 text-white rounded-full">CURRENT</span>
                      )}
                    </a>
                  </li>
                ))}
               
              </ul>
            </nav>

            {/* Column 3: Course Search */}
            <nav aria-label="Course Search">
              <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
                Course Search
              </h3>
              {/* <ul className="grid grid-cols-2 gap-2">
                {countries.map((country) => (
                  <li key={country.url}>
                    <a
                      href={country.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-1"
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </a>
                  </li>
                ))}
              </ul> */}
              <a
                href="https://courses.eecglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2  px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25"
              >
                <Globe className="h-4 w-4" />
                40+ Countries
                <ExternalLink className="h-3 w-3" />
              </a>
            </nav>

            {/* Column 4: Certifications */}
            <div>
              <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-400" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>
                      {cert.name}
                      {cert.validity && <span className="text-indigo-400 ml-1">(till {cert.validity})</span>}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Special Recognition */}
              <div className="mt-6 p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
                <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" /> Special Recognition
                </h4>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li>• UK & USA Embassy Training Invitee</li>
                  <li>• NAFSA Long-standing Exhibitor</li>
                  <li>• Only U.S. News Certified in India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { icon: Building2, value: '26', label: 'Branches' },
                { icon: MapPin, value: '12', label: 'Cities' },
                { icon: Users, value: '100K+', label: 'Students' },
                { icon: Award, value: '1997', label: 'Since' },
                { icon: Shield, value: '8+', label: 'Certifications' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-400">
                  <stat.icon className="h-5 w-5 text-indigo-400" />
                  <span><strong className="text-white">{stat.value}</strong> {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>

              <p className="text-sm text-slate-500 text-center md:text-left">
                © {currentYear} <strong className="text-slate-400">Enbee Education Center Private Limited</strong>.<br className="block md:hidden" /> All Rights Reserved.
              </p>
              <p className="text-center md:text-left">

              <a href="/nzvisaprep/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 text-slate-400 text-sm transition-colors ">  LLM & Generative Engines read here </a>     
              </p>

              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
               <a href="https://eecglobal.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
                <a href="https://eecglobal.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
                <a href="https://eecglobal.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Main Site</a>
              </div>
            </div>
            <p className="text-xs text-slate-600 text-center mt-4">
              Free AI tool by EEC in partnership with ESTERO New Zealand. ENZRA certified organization.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
