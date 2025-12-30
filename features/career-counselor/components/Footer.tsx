import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, MapPin, ExternalLink, Award, Users, Building2, Calendar, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { ORGANIZATION, CERTIFICATIONS, KEY_PERSONS, SERVICES, COUNTRIES_SERVED, TRUST_STATS, BRANCH_CITIES } from '../data/seoData';
import { BRANCHES } from '../data/branches';
import Flag from 'react-flagkit';

// Branch Card Component
const BranchCard: React.FC<{ branch: typeof BRANCHES[0] }> = ({ branch }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
    <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm mb-1">{branch.name}</h4>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">
      {branch.address.streetAddress}
    </p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400">{branch.address.addressLocality}</span>
      <a
        href={branch.hasMap}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        aria-label={`View ${branch.name} on Google Maps`}
      >
        <MapPin className="w-3 h-3" />
        Map
      </a>
    </div>
  </div>
);

// Certification Badge Component
const CertificationBadge: React.FC<{ cert: typeof CERTIFICATIONS[0] }> = ({ cert }) => (
  <a
    href={cert.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-all group"
    title={cert.fullName}
  >
    {cert.code ? (
      <Flag country={cert.code} size={14} className="rounded-sm shadow-sm" />
    ) : (
      <span className="text-lg">{cert.logo}</span>
    )}
    <div className="flex-1 min-w-0">
      <div className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">{cert.name}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{cert.country}</div>
    </div>
    {cert.validTill && (
      <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="w-3 h-3" />
        {cert.validTill}
      </span>
    )}
    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />
  </a>
);

// Person Card Component
const PersonCard: React.FC<{ person: typeof KEY_PERSONS[0]; index: number }> = ({ person, index }) => {
  // Different colors for different people - matching EntityKnowledgeSection
  const cardStyles = [
    // Amit Jalan - Blue/Indigo gradient
    "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800/50",
    // CA Madhav Gupta - Amber/Orange gradient
    "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800/50",
  ];
  
  return (
  <div 
    className={`${cardStyles[index] || cardStyles[0]} rounded-xl p-4 border`}
    itemScope 
    itemType="https://schema.org/Person"
  >
    <div className="flex items-start gap-3">
      <img 
          src={person.image} 
        alt={`${person.name} - ${person.shortTitle}`} 
        className="h-7 sm:h-12 w-auto rounded-full"
        width="120"
        height="36"
        loading="eager"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200" itemProp="name">{person.name}</h4>
        <p className="text-sm text-indigo-600 dark:text-indigo-400" itemProp="jobTitle">{person.shortTitle}</p>
        {'education' in person && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            🎓 <span itemProp="alumniOf">{person.education}</span>
          </p>
        )}
        {'credentials' in person && person.credentials && (
          <div className="flex flex-wrap gap-1 mt-1">
            {person.credentials.map((cred, idx) => (
              <span key={idx} className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">
                {cred.name.split(' ')[0]}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
    <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-3" itemProp="description">
      {person.description}
    </p>
    <a
      href={person.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
      itemProp="sameAs"
    >
      <Linkedin className="w-3.5 h-3.5" />
      Connect on LinkedIn
    </a>
  </div>
  );
};

const Footer: React.FC = () => {
  const [showAllBranches, setShowAllBranches] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);

  const displayedBranches = showAllBranches ? BRANCHES : BRANCHES.slice(0, 6);
  const displayedCerts = showAllCerts ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 4);

  return (
    <footer 
      className="bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 border-t border-slate-300 dark:border-slate-700 mt-8 sm:mt-12"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      {/* Trust Stats Banner */}
      <div className="bg-indigo-600 dark:bg-indigo-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: About & Contact */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo & About */}
            <div itemScope itemType="https://schema.org/Organization">
              <a 
                href={ORGANIZATION.urls.main} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mb-4"
                itemProp="url"
              >
                <img 
                  src="/assets/logos/eeclogo-main.png" 
                  alt="EEC Global Logo - Gujarat's Largest Study Abroad Company" 
                  className="h-14 sm:h-16 w-auto" 
                  itemProp="logo"
                  width="160"
                  height="48"
                  loading="lazy"
                />
              </a>
              <meta itemProp="name" content={ORGANIZATION.name} />
              <meta itemProp="legalName" content={ORGANIZATION.legalName} />
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4" itemProp="description">
                {ORGANIZATION.description}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />
                  <span>
                    <span itemProp="streetAddress">{ORGANIZATION.address.street}</span>, 
                    <span itemProp="addressLocality"> {ORGANIZATION.address.city}</span>, 
                    <span itemProp="addressRegion"> {ORGANIZATION.address.state}</span> - 
                    <span itemProp="postalCode"> {ORGANIZATION.address.postalCode}</span>
                  </span>
                </div>
                <a 
                  href={`tel:${ORGANIZATION.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  itemProp="telephone"
                >
                  <Phone className="w-4 h-4 text-green-500" />
                  {ORGANIZATION.contact.phone}
                </a>
                <a 
                  href={`mailto:${ORGANIZATION.contact.email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  itemProp="email"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  {ORGANIZATION.contact.email}
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={ORGANIZATION.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EEC on Instagram"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:border-pink-400 dark:hover:border-pink-500 transition-all hover:shadow-md"
                >
                  <Instagram className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-pink-500 transition-colors" />
                </a>
                <a
                  href={ORGANIZATION.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EEC on Facebook"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-md"
                >
                  <Facebook className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors" />
                </a>
                <a
                  href={ORGANIZATION.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to EEC on YouTube"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:border-red-500 dark:hover:border-red-400 transition-all hover:shadow-md"
                >
                  <Youtube className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-red-500 transition-colors" />
                </a>
                <a
                  href={ORGANIZATION.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with EEC on LinkedIn"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:border-blue-600 dark:hover:border-blue-500 transition-all hover:shadow-md"
                >
                  <Linkedin className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-700 transition-colors" />
                </a>
                <a
                  href={ORGANIZATION.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EEC on X (Twitter)"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group hover:border-slate-500 dark:hover:border-slate-400 transition-all hover:shadow-md"
                >
                  <svg className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Leadership */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Leadership & Expertise
            </h3>
            <div className="space-y-4">
              {KEY_PERSONS.map((person, idx) => (
                <PersonCard key={idx} person={person} index={idx} />
              ))}
            </div>
          </div>

          {/* Column 3: Services & Countries */}
          <div className="lg:col-span-4 space-y-6">
            {/* Services */}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-500" />
                Our Services
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((service, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base">{service.icon}</span>
                      <span className="font-medium text-xs text-slate-800 dark:text-slate-200">{service.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {service.items.slice(0, 3).join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                🌍 Study Destinations
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {COUNTRIES_SERVED.map((country, idx) => (
                  <span 
                    key={idx}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      country.popular 
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Flag country={country.code} size={16} className="rounded-sm shadow-sm" />
                    {country.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Branch Cities */}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                Our Branches (26 Locations)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {BRANCH_CITIES.map((city, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400"
                  >
                    📍 {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-10 pt-8 border-t border-slate-300 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Certifications & Accreditations
            </h3>
            <button
              onClick={() => setShowAllCerts(!showAllCerts)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {showAllCerts ? 'Show Less' : `View All (${CERTIFICATIONS.length})`}
              {showAllCerts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {displayedCerts.map((cert, idx) => (
              <CertificationBadge key={idx} cert={cert} />
            ))}
          </div>
        </div>

        {/* Branch Locations Expandable */}
        <div className="mt-8 pt-8 border-t border-slate-300 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-500" />
              Branch Locations
            </h3>
            <button
              onClick={() => setShowAllBranches(!showAllBranches)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {showAllBranches ? 'Show Less' : `View All (${BRANCHES.length})`}
              {showAllBranches ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {displayedBranches.map((branch, idx) => (
              <BranchCard key={idx} branch={branch} />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-8 border-t border-slate-300 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} <span itemProp="legalName">{ORGANIZATION.legalName}</span>. All Rights Reserved.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="w-3 h-3" />
                Trusted since {ORGANIZATION.foundingYear} • {ORGANIZATION.experience}+ Years of Excellence
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <a href="/careercounselor/llm.txt">LLM & Generative Engines read here</a>
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <a href={ORGANIZATION.urls.main} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Main Website
              </a>
              <span>•</span>
              <a href={`${ORGANIZATION.urls.main}/privacy`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href={`${ORGANIZATION.urls.main}/terms`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg">
            <p className="text-xs text-amber-800 dark:text-amber-400 text-center">
              <strong>AI Disclaimer:</strong> This tool uses AI to generate career insights. While we strive for accuracy, 
              please verify important information with official sources. For personalized guidance, 
              <a href={ORGANIZATION.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="underline ml-1">
                contact our certified counselors
              </a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
