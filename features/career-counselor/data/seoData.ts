// SEO Data Module for EEC Global - AI Course Counselor
// Comprehensive organization data for structured data and UI components

export const ORGANIZATION = {
  name: "EEC (Enbee Education Center)",
  legalName: "Enbee Education Center Private Limited",
  alternateName: ["EEC", "Enbee Education Center", "EEC India", "EEC Gujarat"],
  description: "EEC established in 1997 is the largest and oldest study abroad company in Gujarat state with 26 branches across 12 cities. Providing test preparation, admissions, and visa guidance services for students who wish to study abroad.",
  shortDescription: "Gujarat's largest & oldest study abroad company since 1997",
  foundingYear: 1997,
  experience: new Date().getFullYear() - 1997,
  branchCount: 26,
  cityCount: 12,
  studentCount: "100,000+",
  slogan: "Your Gateway to Global Education Since 1997",
  
  urls: {
    main: "https://eecglobal.com",
    aiTool: "https://ai.eecglobal.com/careercounselor",
    logo: "https://ai.eecglobal.com/assets/eeclogo.svg",
  },
  
  contact: {
    phone: "+91-9375974748",
    email: "info@eecglobal.com",
    whatsapp: "https://wa.me/919375974748",
  },
  
  address: {
    street: "3rd Floor, B-Wing, Windsor Plaza, RC Dutt Road, Alkapuri",
    city: "Vadodara",
    state: "Gujarat",
    country: "India",
    postalCode: "390007",
  },
  
  socialMedia: {
    instagram: "https://www.instagram.com/eecglobal",
    facebook: "https://www.facebook.com/eecglobal",
    youtube: "https://www.youtube.com/@eecgujarat",
    linkedin: "https://www.linkedin.com/school/eecindia",
    twitter: "https://x.com/eecglobalindia",
  },
};

export const CERTIFICATIONS = [
  {
    name: "AIRC",
    fullName: "American International Recruitment Council",
    description: "Certified agency member for ethical international student recruitment",
    validTill: "2031",
    url: "https://airceducation.app.neoncrm.com/membership-directory/details/5?memberId=9367",
    country: "USA",
    code: "US",
    logo: "🇺🇸",
    priority: 1,
  },
  {
    name: "U.S. News Global Education",
    fullName: "U.S. News Global Education Certified Agency",
    description: "Only company in India certified by U.S. News Global Education",
    url: "https://www.credential.net/97326517-ea1a-4c00-8e76-dd3be34c91fe#acc.3GnypZ6v",
    country: "USA",
    code: "US",
    logo: "🇺🇸",
    priority: 2,
  },
  {
    name: "ICEF IAS",
    fullName: "ICEF International Agent Standards Accreditation",
    description: "International accreditation for education agent standards",
    url: "https://www.icef.com/agency/00120000014SG0aAAG",
    verifyUrl: "https://verifier.nextid.com/?url=https://issuer-services.icef.com/certifications/57642946-6f1c-4a92-b8db-b6b617fdd880",
    country: "Global",
    code: null,
    logo: "🌍",
    priority: 3,
  },
  {
    name: "British Council",
    fullName: "British Council UK Education Agent Training",
    description: "Certified by British Council for UK education guidance",
    country: "UK",
    code: "GB",
    logo: "🇬🇧",
    priority: 4,
  },
  {
    name: "Australia PIER",
    fullName: "Professional International Education Resources",
    description: "Certified for Australian education counseling",
    country: "Australia",
    code: "AU",
    logo: "🇦🇺",
    priority: 5,
  },
  {
    name: "New Zealand ENZ",
    fullName: "Education New Zealand Certification",
    description: "Certified for New Zealand education guidance",
    country: "New Zealand",
    code: "NZ",
    logo: "🇳🇿",
    priority: 6,
  },
  {
    name: "Ireland Certification",
    fullName: "Ireland Agent and Counselor Certification",
    description: "Certified for Irish education guidance",
    country: "Ireland",
    code: "IE",
    logo: "🇮🇪",
    priority: 7,
  },
  {
    name: "Canada CCEA",
    fullName: "Canadian Consortium for Canadian Education Abroad",
    description: "Certified for Canadian education counseling",
    country: "Canada",
    code: "CA",
    logo: "🇨🇦",
    priority: 8,
  },
  {
    name: "USATC",
    fullName: "USA Training Certification",
    description: "US embassy-level training certification",
    country: "USA",
    code: "US",
    logo: "🇺🇸",
    priority: 9,
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Embassy Training",
    description: "One of the few companies in India invited to UK and USA Embassy in New Delhi for student visa interview training",
    icon: "🏛️",
  },
  {
    title: "NAFSA Exhibitor",
    description: "Long-standing exhibitor at NAFSA - Association of International Educators",
    icon: "🎓",
  },
  {
    title: "CBIE Exhibitor",
    description: "Regular exhibitor at Canadian Bureau for International Education events",
    icon: "🍁",
  },
];

export const KEY_PERSONS = [
  {
    name: "Amit Jalan",
    title: "Managing Director & Lead AI Strategist and Systems Architect",
    shortTitle: "Managing Director",
    description: "Study abroad industry veteran and the driving force behind EEC's AI-led systems and strategy. With 28+ years of deep expertise in university admissions, student visa interviews, and immigration updates.",
    expertise: [
      "University Admissions",
      "Student Visa Interview Preparation",
      "Immigration Policy",
      "AI Systems Architecture",
    ],
    education: "Purdue University, USA",
    experience: "28+ years",
    linkedin: "https://in.linkedin.com/in/amitjalan",
    image: "https://ai.eecglobal.com/assets/Amit-Jalan.jpeg",
  },
  {
    name: "CA Madhav Gupta",
    title: "Director",
    shortTitle: "Director",
    description: "One of India's leading study abroad experts on the financial and compliance side of student visas. Specializes in visa financial planning, proof of funds, loan structuring, and visa-compliant documentation.",
    expertise: [
      "Visa Financial Planning",
      "Proof of Funds Strategy",
      "Education Loan Structuring",
      "Visa Documentation",
    ],
    credentials: [
      { name: "Chartered Accountant (2012)", id: "421209" },
      { name: "British Council UK Education Agent Training", id: "17810" },
    ],
    linkedin: "https://in.linkedin.com/in/madhav-gupta-9027781a7",
    image: "https://ai.eecglobal.com/assets/Madhav-Gupta.jpeg",
  },
];

export const SERVICES = [
  {
    name: "Test Preparation",
    items: ["IELTS", "TOEFL", "GRE", "GMAT", "PTE", "Duolingo English Test", "SAT"],
    icon: "📚",
  },
  {
    name: "Admissions Guidance",
    items: ["University Selection", "Application Support", "SOP/LOR Review", "Scholarship Guidance"],
    icon: "🎓",
  },
  {
    name: "Visa Services",
    items: ["Visa Application", "Interview Preparation", "Financial Documentation", "Visa Mock Interviews"],
    icon: "✈️",
  },
  {
    name: "Financial Guidance",
    items: ["Education Loans", "Proof of Funds", "Financial Planning", "Scholarship Applications"],
    icon: "💰",
  },
];

export const COUNTRIES_SERVED = [
  { name: "USA", flag: "🇺🇸", code: "US", popular: true },
  { name: "UK", flag: "🇬🇧", code: "GB", popular: true },
  { name: "Canada", flag: "🇨🇦", code: "CA", popular: true },
  { name: "Australia", flag: "🇦🇺", code: "AU", popular: true },
  { name: "Germany", flag: "🇩🇪", code: "DE", popular: true },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", popular: false },
  { name: "Ireland", flag: "🇮🇪", code: "IE", popular: false },
  { name: "France", flag: "🇫🇷", code: "FR", popular: false },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", popular: false },
  { name: "Singapore", flag: "🇸🇬", code: "SG", popular: false },
];

export const TRUST_STATS = [
  { value: "28+", label: "Years Experience", icon: "📅" },
  { value: "26", label: "Branches", icon: "🏢" },
  { value: "12", label: "Cities", icon: "🌆" },
  { value: "100K+", label: "Students Guided", icon: "👨‍🎓" },
  { value: "9+", label: "Certifications", icon: "🏆" },
];

// Branch cities for local SEO
export const BRANCH_CITIES = [
  "Vadodara",
  "Ahmedabad", 
  "Surat",
  "Anand",
  "Nadiad",
  "Navsari",
  "Bharuch",
  "Vapi",
  "Kalol",
  "Himatnagar",
  "Mehsana",
  "Visnagar",
];

// SEO Keywords
export const SEO_KEYWORDS = {
  primary: [
    "AI course counselor",
    "study abroad guidance",
    "career counselor AI",
    "free career guidance tool",
    "study abroad consultant Gujarat",
    "EEC Global",
  ],
  secondary: [
    "study in USA",
    "study in UK", 
    "study in Canada",
    "study in Australia",
    "study in Germany",
    "IELTS preparation",
    "GRE preparation",
    "student visa interview",
    "best study abroad consultancy India",
  ],
  localSEO: [
    "study abroad consultant Vadodara",
    "study abroad consultant Ahmedabad",
    "study abroad consultant Surat",
    "overseas education Gujarat",
    "foreign education consultant near me",
  ],
};

