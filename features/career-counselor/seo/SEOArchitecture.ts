/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * EEC GLOBAL - MASTER SEO ARCHITECTURE
 * Enterprise-Grade Search Engine Optimization Framework
 * Version: 3.0.0 | Last Updated: December 2025
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This architecture implements:
 * - Keyword Density Optimization
 * - Topical Authority Building
 * - Long-Tail Keyword Capture
 * - Topical Clusters (Silo Architecture)
 * - Local Hyper-Relevance
 * - LSI (Latent Semantic Indexing) Injection
 * - SEO Booster Signals
 * 
 * Designed for TOTAL GOOGLE DOMINATION
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: PRIMARY KEYWORD ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

export const PRIMARY_KEYWORDS = {
  // Tier 1: Brand Keywords (Highest Priority)
  brand: [
    "EEC Global",
    "EEC India",
    "Enbee Education Center",
    "EEC Gujarat",
    "EEC study abroad",
    "EEC overseas education",
  ],
  
  // Tier 2: Service Keywords (High Priority)
  services: [
    "study abroad consultant",
    "overseas education consultant",
    "foreign education consultant",
    "education consultant India",
    "study abroad agency",
    "international education consultant",
    "abroad study guidance",
  ],
  
  // Tier 3: Product Keywords (Core AI Tool)
  product: [
    "AI course counselor",
    "AI career counselor",
    "AI career guidance",
    "course guidance tool",
    "career guidance AI",
    "free career counselor",
    "online career counselor",
    "AI education counselor",
  ],
  
  // Tier 4: Action Keywords (Conversion Focused)
  action: [
    "get career guidance",
    "find courses abroad",
    "study abroad guidance free",
    "career insights for students",
    "course recommendations",
    "university finder",
    "admission guidance",
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: LONG-TAIL KEYWORD CAPTURE MATRIX
// ═══════════════════════════════════════════════════════════════════════════════

export const LONG_TAIL_KEYWORDS = {
  // Study Destination Long-tails
  destinations: {
    usa: [
      "how to study in USA from India",
      "best courses to study in USA for Indian students",
      "USA student visa requirements from India",
      "study in USA without IELTS",
      "affordable universities in USA for Indian students",
      "MS in USA for Indian students",
      "MBA in USA from India cost",
      "USA F1 visa interview questions and answers",
      "study in USA with scholarship for Indian students",
      "part time jobs for students in USA",
      "OPT and CPT rules for Indian students",
      "STEM courses in USA for Indian students",
    ],
    uk: [
      "how to study in UK from India",
      "study in UK without IELTS",
      "UK student visa requirements from India",
      "best universities in UK for Indian students",
      "MBA in UK for Indian students",
      "UK graduate route visa",
      "part time work for students in UK",
      "study in UK with scholarship",
      "UK tier 4 student visa",
      "masters in UK cost for Indian students",
    ],
    canada: [
      "how to study in Canada from India",
      "Canada student visa requirements from India",
      "study in Canada without IELTS",
      "best colleges in Canada for Indian students",
      "PGWP Canada work permit",
      "Canada PR after study",
      "affordable universities in Canada for Indian students",
      "study in Canada with scholarship",
      "part time jobs for students in Canada",
      "SDS visa Canada requirements",
    ],
    australia: [
      "how to study in Australia from India",
      "Australia student visa 500 requirements",
      "best universities in Australia for Indian students",
      "study in Australia without IELTS",
      "Australia PR after study",
      "part time work for students in Australia",
      "affordable universities in Australia",
      "scholarship in Australia for Indian students",
      "485 visa Australia requirements",
      "nursing courses in Australia for Indian students",
    ],
    germany: [
      "study in Germany for free",
      "how to study in Germany from India",
      "Germany student visa requirements from India",
      "German public universities for international students",
      "MS in Germany in English",
      "study in Germany without IELTS",
      "blocked account Germany requirements",
      "Germany job seeker visa after study",
      "engineering courses in Germany in English",
      "Germany university admission requirements",
    ],
    ireland: [
      "study in Ireland from India",
      "Ireland student visa requirements",
      "best universities in Ireland for Indian students",
      "study in Ireland without IELTS",
      "stay back option in Ireland",
      "part time work in Ireland for students",
      "Ireland stamp 1G visa",
    ],
    newZealand: [
      "study in New Zealand from India",
      "New Zealand student visa requirements",
      "post study work visa New Zealand",
      "best universities in New Zealand",
      "study in New Zealand cost",
    ],
  },
  
  // Course-Specific Long-tails
  courses: {
    masters: [
      "best masters courses for Indian students abroad",
      "MS abroad for Indian students",
      "masters in data science abroad",
      "masters in artificial intelligence abroad",
      "MBA abroad for Indian students",
      "masters in computer science abroad",
      "MS in machine learning abroad",
      "masters in business analytics abroad",
      "masters in cybersecurity abroad",
      "masters in finance abroad",
    ],
    engineering: [
      "best engineering courses abroad for Indian students",
      "mechanical engineering abroad",
      "civil engineering abroad",
      "electrical engineering abroad",
      "software engineering abroad",
      "aerospace engineering abroad",
    ],
    healthcare: [
      "nursing courses abroad for Indian students",
      "MBBS abroad for Indian students",
      "pharmacy courses abroad",
      "healthcare management abroad",
      "public health masters abroad",
    ],
    business: [
      "MBA abroad without work experience",
      "finance courses abroad",
      "marketing courses abroad",
      "international business courses abroad",
      "supply chain management abroad",
    ],
  },
  
  // Test Preparation Long-tails
  testPrep: [
    "IELTS preparation tips and tricks",
    "IELTS coaching near me",
    "IELTS band 7 preparation",
    "TOEFL preparation online",
    "GRE preparation for beginners",
    "GMAT preparation tips",
    "PTE preparation tips",
    "Duolingo English test preparation",
    "IELTS vs TOEFL which is easier",
    "GRE vs GMAT for MBA",
  ],
  
  // Visa & Immigration Long-tails
  visa: [
    "student visa interview tips",
    "F1 visa interview questions",
    "UK student visa interview questions",
    "Canada student visa interview questions",
    "how to prepare for visa interview",
    "visa rejection reasons for students",
    "student visa financial requirements",
    "education loan for abroad studies",
    "scholarship for abroad studies from India",
    "proof of funds for student visa",
  ],
  
  // Local + Service Long-tails (Gujarat Focus)
  localService: [
    "study abroad consultant in Vadodara",
    "study abroad consultant in Ahmedabad",
    "study abroad consultant in Surat",
    "best overseas education consultant in Gujarat",
    "IELTS coaching in Vadodara",
    "IELTS coaching in Ahmedabad",
    "IELTS coaching in Surat",
    "study abroad office near me Gujarat",
    "overseas education consultant near me",
    "foreign education consultant Gujarat",
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: TOPICAL CLUSTERS (SILO ARCHITECTURE)
// ═══════════════════════════════════════════════════════════════════════════════

export interface TopicalCluster {
  pillarTopic: string;
  pillarKeyword: string;
  pillarDescription: string;
  clusterTopics: {
    topic: string;
    keywords: string[];
    lsiKeywords: string[];
    searchIntent: 'informational' | 'navigational' | 'transactional' | 'commercial';
  }[];
  internalLinking: string[];
  authoritySignals: string[];
}

export const TOPICAL_CLUSTERS: TopicalCluster[] = [
  {
    pillarTopic: "Study Abroad Complete Guide",
    pillarKeyword: "study abroad from India",
    pillarDescription: "Comprehensive guide to studying abroad from India covering all countries, courses, visas, and requirements",
    clusterTopics: [
      {
        topic: "Choosing the Right Country",
        keywords: ["best country to study abroad from India", "study abroad country comparison", "easiest country for Indian students"],
        lsiKeywords: ["international education", "overseas studies", "foreign degree", "global universities"],
        searchIntent: "informational",
      },
      {
        topic: "Course Selection Guide",
        keywords: ["best courses to study abroad", "high demand courses abroad", "career oriented courses abroad"],
        lsiKeywords: ["curriculum", "specialization", "academic programs", "degree options"],
        searchIntent: "informational",
      },
      {
        topic: "Admission Process",
        keywords: ["university admission process abroad", "how to apply for abroad studies", "application requirements"],
        lsiKeywords: ["application deadline", "admission criteria", "enrollment", "acceptance rate"],
        searchIntent: "transactional",
      },
      {
        topic: "Visa Application",
        keywords: ["student visa application process", "visa requirements for students", "visa interview preparation"],
        lsiKeywords: ["immigration", "travel documents", "embassy", "consulate", "visa approval"],
        searchIntent: "transactional",
      },
      {
        topic: "Financial Planning",
        keywords: ["cost of studying abroad from India", "education loan for abroad", "scholarship opportunities"],
        lsiKeywords: ["tuition fees", "living expenses", "funding", "financial aid", "bank loan"],
        searchIntent: "commercial",
      },
    ],
    internalLinking: [
      "/courses/usa",
      "/courses/uk", 
      "/courses/canada",
      "/visa-guidance",
      "/scholarship-finder",
    ],
    authoritySignals: [
      "28+ years of experience",
      "100,000+ students guided",
      "AIRC certified",
      "Embassy trained counselors",
    ],
  },
  {
    pillarTopic: "AI Career Counseling",
    pillarKeyword: "AI career counselor for students",
    pillarDescription: "AI-powered career guidance tool for students planning to study abroad",
    clusterTopics: [
      {
        topic: "Course Career Prospects",
        keywords: ["career prospects after course", "job opportunities abroad", "salary after masters abroad"],
        lsiKeywords: ["employment", "job market", "career growth", "professional opportunities"],
        searchIntent: "informational",
      },
      {
        topic: "Industry Insights",
        keywords: ["top industries for students abroad", "job sectors for international students", "best fields to study"],
        lsiKeywords: ["job sectors", "employment trends", "market demand", "hiring companies"],
        searchIntent: "informational",
      },
      {
        topic: "University Recommendations",
        keywords: ["best universities for course", "top colleges abroad", "university rankings"],
        lsiKeywords: ["academic institutions", "higher education", "campus", "faculty"],
        searchIntent: "navigational",
      },
      {
        topic: "Immigration Pathways",
        keywords: ["work visa after study", "PR pathways for students", "settle abroad after study"],
        lsiKeywords: ["permanent residency", "work permit", "immigration policy", "stay back options"],
        searchIntent: "informational",
      },
    ],
    internalLinking: [
      "/career-insights",
      "/university-finder",
      "/immigration-guide",
    ],
    authoritySignals: [
      "AI-powered insights",
      "Real-time data",
      "Expert verified",
      "Trusted by 100K+ students",
    ],
  },
  {
    pillarTopic: "Test Preparation Excellence",
    pillarKeyword: "IELTS TOEFL GRE preparation",
    pillarDescription: "Complete test preparation resources and coaching for study abroad exams",
    clusterTopics: [
      {
        topic: "IELTS Mastery",
        keywords: ["IELTS preparation guide", "IELTS tips and tricks", "IELTS band 7 strategy"],
        lsiKeywords: ["listening", "reading", "writing", "speaking", "band score", "academic IELTS"],
        searchIntent: "informational",
      },
      {
        topic: "TOEFL Success",
        keywords: ["TOEFL preparation tips", "TOEFL score requirements", "TOEFL vs IELTS"],
        lsiKeywords: ["iBT", "reading section", "listening section", "speaking section", "writing section"],
        searchIntent: "informational",
      },
      {
        topic: "GRE Excellence",
        keywords: ["GRE preparation strategy", "GRE score requirements", "GRE verbal tips"],
        lsiKeywords: ["quantitative", "verbal reasoning", "analytical writing", "vocabulary"],
        searchIntent: "informational",
      },
      {
        topic: "GMAT Mastery",
        keywords: ["GMAT preparation guide", "GMAT for MBA abroad", "GMAT score requirements"],
        lsiKeywords: ["integrated reasoning", "data sufficiency", "critical reasoning", "sentence correction"],
        searchIntent: "informational",
      },
    ],
    internalLinking: [
      "/ielts-coaching",
      "/toefl-preparation",
      "/gre-classes",
      "/gmat-coaching",
    ],
    authoritySignals: [
      "Certified trainers",
      "Proven track record",
      "High success rate",
      "Personalized coaching",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: LSI (LATENT SEMANTIC INDEXING) KEYWORD ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

export const LSI_KEYWORDS = {
  // Core Topic: Study Abroad
  studyAbroad: {
    primary: "study abroad",
    semantic: [
      "overseas education",
      "international studies",
      "foreign education",
      "global education",
      "transnational education",
      "cross-border education",
      "education abroad",
      "studying overseas",
      "international student",
      "foreign university",
      "abroad degree",
      "offshore education",
    ],
    related: [
      "higher education",
      "postgraduate studies",
      "undergraduate abroad",
      "academic excellence",
      "world-class education",
      "global exposure",
      "international experience",
      "cultural immersion",
      "global citizenship",
      "academic mobility",
    ],
    entities: [
      "university",
      "college",
      "institution",
      "campus",
      "faculty",
      "curriculum",
      "degree",
      "diploma",
      "certificate",
      "qualification",
    ],
  },
  
  // Core Topic: Career Counseling
  careerCounseling: {
    primary: "career counseling",
    semantic: [
      "career guidance",
      "career advice",
      "career planning",
      "career coaching",
      "vocational guidance",
      "professional guidance",
      "career consultation",
      "career mentoring",
      "career support",
      "career development",
    ],
    related: [
      "job prospects",
      "employment opportunities",
      "career path",
      "professional growth",
      "skill development",
      "industry trends",
      "job market",
      "employment outlook",
      "career trajectory",
      "professional success",
    ],
    entities: [
      "counselor",
      "advisor",
      "mentor",
      "consultant",
      "expert",
      "specialist",
      "professional",
      "guide",
    ],
  },
  
  // Core Topic: Visa & Immigration
  visaImmigration: {
    primary: "student visa",
    semantic: [
      "study visa",
      "education visa",
      "student permit",
      "study permit",
      "academic visa",
      "learner visa",
      "training visa",
    ],
    related: [
      "visa application",
      "visa interview",
      "visa approval",
      "visa requirements",
      "immigration process",
      "travel documents",
      "passport",
      "embassy",
      "consulate",
      "visa officer",
    ],
    entities: [
      "F1 visa",
      "J1 visa",
      "Tier 4 visa",
      "student visa 500",
      "study permit",
      "D visa",
      "Schengen visa",
    ],
  },
  
  // Core Topic: Test Preparation
  testPreparation: {
    primary: "test preparation",
    semantic: [
      "exam preparation",
      "test coaching",
      "exam coaching",
      "test training",
      "exam training",
      "standardized test prep",
      "entrance exam preparation",
    ],
    related: [
      "study material",
      "practice tests",
      "mock exams",
      "score improvement",
      "test strategy",
      "time management",
      "test taking skills",
      "exam techniques",
    ],
    entities: [
      "IELTS",
      "TOEFL",
      "GRE",
      "GMAT",
      "SAT",
      "PTE",
      "Duolingo",
      "MCAT",
      "LSAT",
    ],
  },
  
  // Core Topic: AI Technology
  aiTechnology: {
    primary: "AI counselor",
    semantic: [
      "artificial intelligence",
      "machine learning",
      "intelligent system",
      "automated guidance",
      "smart counselor",
      "digital advisor",
      "virtual counselor",
      "AI-powered tool",
      "intelligent assistant",
    ],
    related: [
      "personalized recommendations",
      "data-driven insights",
      "predictive analytics",
      "automated analysis",
      "smart suggestions",
      "real-time guidance",
      "instant results",
      "technology-enabled",
    ],
    entities: [
      "algorithm",
      "neural network",
      "natural language processing",
      "machine learning model",
      "AI engine",
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: LOCAL HYPER-RELEVANCE ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

export interface LocalSEOData {
  city: string;
  state: string;
  region: string;
  coordinates: { lat: number; lng: number };
  branches: string[];
  localKeywords: string[];
  nearbyAreas: string[];
  landmarks: string[];
  universities: string[];
  population: string;
  studentPopulation: string;
}

export const LOCAL_SEO_DATA: LocalSEOData[] = [
  {
    city: "Vadodara",
    state: "Gujarat",
    region: "Central Gujarat",
    coordinates: { lat: 22.3072, lng: 73.1812 },
    branches: ["EEC Alkapuri", "EEC Nizampura", "EEC Manjalpur", "EEC New VIP Road"],
    localKeywords: [
      "study abroad consultant Vadodara",
      "overseas education Vadodara",
      "IELTS coaching Vadodara",
      "best study abroad agency Vadodara",
      "foreign education consultant Vadodara",
      "USA visa consultant Vadodara",
      "UK education consultant Vadodara",
      "Canada immigration Vadodara",
      "Australia study visa Vadodara",
      "GRE coaching Vadodara",
      "TOEFL classes Vadodara",
      "student visa help Vadodara",
    ],
    nearbyAreas: ["Alkapuri", "Nizampura", "Manjalpur", "Sayajigunj", "Fatehgunj", "Akota", "Gotri", "Waghodia", "Tandalja", "Makarpura"],
    landmarks: ["Lakshmi Vilas Palace", "MS University", "Sayaji Garden", "Vadodara Railway Station"],
    universities: ["MS University Vadodara", "Parul University", "Navrachana University", "ITM Universe"],
    population: "2.1 million",
    studentPopulation: "150,000+",
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    region: "Central Gujarat",
    coordinates: { lat: 23.0225, lng: 72.5714 },
    branches: ["EEC Memnagar", "EEC Ghatlodiya", "EEC Chandkheda", "EEC Maninagar", "EEC Odhav", "EEC Nikol", "EEC Bapunagar", "EEC Naroda"],
    localKeywords: [
      "study abroad consultant Ahmedabad",
      "overseas education Ahmedabad",
      "IELTS coaching Ahmedabad",
      "best study abroad agency Ahmedabad",
      "foreign education consultant Ahmedabad",
      "USA visa consultant Ahmedabad",
      "UK education consultant Ahmedabad",
      "Canada immigration Ahmedabad",
      "Australia study visa Ahmedabad",
      "GRE coaching Ahmedabad",
      "TOEFL classes Ahmedabad",
      "student visa help Ahmedabad",
      "study abroad CG Road",
      "overseas education SG Highway",
    ],
    nearbyAreas: ["CG Road", "SG Highway", "Satellite", "Prahlad Nagar", "Vastrapur", "Bodakdev", "Thaltej", "Bopal", "South Bopal", "Gota"],
    landmarks: ["Sabarmati Riverfront", "IIM Ahmedabad", "GIFT City", "Science City"],
    universities: ["Gujarat University", "CEPT University", "Nirma University", "Ahmedabad University", "PDEU"],
    population: "8.5 million",
    studentPopulation: "500,000+",
  },
  {
    city: "Surat",
    state: "Gujarat", 
    region: "South Gujarat",
    coordinates: { lat: 21.1702, lng: 72.8311 },
    branches: ["EEC Parvat Patia", "EEC Mota Varachha", "EEC Katargam", "EEC Ghod Dod Road", "EEC Vesu"],
    localKeywords: [
      "study abroad consultant Surat",
      "overseas education Surat",
      "IELTS coaching Surat",
      "best study abroad agency Surat",
      "foreign education consultant Surat",
      "USA visa consultant Surat",
      "UK education consultant Surat",
      "Canada immigration Surat",
      "Australia study visa Surat",
      "GRE coaching Surat",
      "study abroad Adajan",
      "overseas education Vesu",
      "IELTS coaching Ring Road Surat",
    ],
    nearbyAreas: ["Adajan", "Vesu", "City Light", "Piplod", "Pal", "Althan", "Athwa", "Katargam", "Varachha", "Dumas"],
    landmarks: ["Surat Diamond Bourse", "SVNIT", "Dutch Garden", "Tapi Riverfront"],
    universities: ["SVNIT Surat", "VNSGU", "Sarvajanik University", "UUKM University"],
    population: "6.5 million",
    studentPopulation: "350,000+",
  },
  {
    city: "Anand",
    state: "Gujarat",
    region: "Central Gujarat", 
    coordinates: { lat: 22.5645, lng: 72.9289 },
    branches: ["EEC Vallabh Vidyanagar"],
    localKeywords: [
      "study abroad consultant Anand",
      "overseas education Anand",
      "IELTS coaching Anand",
      "study abroad Vallabh Vidyanagar",
      "foreign education VVNagar",
      "Canada visa consultant Anand",
      "Australia study visa Anand",
    ],
    nearbyAreas: ["Vallabh Vidyanagar", "Karamsad", "Bakrol", "Mogri", "Borsad"],
    landmarks: ["Amul Dairy", "Sardar Patel Statue", "GCET"],
    universities: ["Sardar Patel University", "Charusat University", "ADIT"],
    population: "300,000",
    studentPopulation: "80,000+",
  },
  {
    city: "Nadiad",
    state: "Gujarat",
    region: "Central Gujarat",
    coordinates: { lat: 22.6916, lng: 72.8634 },
    branches: ["EEC Nadiad"],
    localKeywords: [
      "study abroad consultant Nadiad",
      "overseas education Nadiad",
      "IELTS coaching Nadiad",
      "foreign education Nadiad",
      "student visa Nadiad",
    ],
    nearbyAreas: ["Dakor", "Kapadvanj", "Kheda", "Mahemdabad"],
    landmarks: ["Santram Mandir", "Nadiad Railway Station"],
    universities: ["DDU Nadiad", "GCET Nadiad"],
    population: "250,000",
    studentPopulation: "40,000+",
  },
  {
    city: "Bharuch",
    state: "Gujarat",
    region: "South Gujarat",
    coordinates: { lat: 21.7051, lng: 72.9959 },
    branches: ["EEC Bharuch"],
    localKeywords: [
      "study abroad consultant Bharuch",
      "overseas education Bharuch",
      "IELTS coaching Bharuch",
      "foreign education Bharuch",
      "Canada visa consultant Bharuch",
    ],
    nearbyAreas: ["Ankleshwar", "Dahej", "Jambusar", "Amod"],
    landmarks: ["Golden Bridge", "Narmada River", "Shuklatirth"],
    universities: ["BBIT Bharuch", "GEC Bharuch"],
    population: "200,000",
    studentPopulation: "25,000+",
  },
  {
    city: "Navsari",
    state: "Gujarat",
    region: "South Gujarat",
    coordinates: { lat: 20.9467, lng: 72.9520 },
    branches: ["EEC Navsari"],
    localKeywords: [
      "study abroad consultant Navsari",
      "overseas education Navsari",
      "IELTS coaching Navsari",
      "foreign education Navsari",
      "student visa Navsari",
    ],
    nearbyAreas: ["Bilimora", "Gandevi", "Chikhli", "Jalalpore"],
    landmarks: ["Dandi Beach", "Jamshed Baug"],
    universities: ["Navsari Agricultural University", "GEC Navsari"],
    population: "180,000",
    studentPopulation: "20,000+",
  },
  {
    city: "Vapi",
    state: "Gujarat",
    region: "South Gujarat",
    coordinates: { lat: 20.3893, lng: 72.9106 },
    branches: ["EEC Vapi"],
    localKeywords: [
      "study abroad consultant Vapi",
      "overseas education Vapi",
      "IELTS coaching Vapi",
      "foreign education Vapi",
      "Canada visa Vapi",
      "study abroad Daman",
      "overseas education Silvassa",
    ],
    nearbyAreas: ["Daman", "Silvassa", "Valsad", "Pardi", "Umbergaon"],
    landmarks: ["Vapi Industrial Area", "Daman Beach"],
    universities: ["SVKM Vapi", "ITM Vapi"],
    population: "200,000",
    studentPopulation: "30,000+",
  },
  {
    city: "Mehsana",
    state: "Gujarat",
    region: "North Gujarat",
    coordinates: { lat: 23.5880, lng: 72.3693 },
    branches: ["EEC Mehsana"],
    localKeywords: [
      "study abroad consultant Mehsana",
      "overseas education Mehsana",
      "IELTS coaching Mehsana",
      "foreign education North Gujarat",
      "Canada immigration Mehsana",
    ],
    nearbyAreas: ["Visnagar", "Unjha", "Kadi", "Vijapur", "Patan"],
    landmarks: ["Sun Temple Modhera", "Dudhsagar Dairy"],
    universities: ["Ganpat University", "NFSU Gandhinagar"],
    population: "200,000",
    studentPopulation: "35,000+",
  },
  {
    city: "Himatnagar",
    state: "Gujarat",
    region: "North Gujarat",
    coordinates: { lat: 23.5969, lng: 72.9663 },
    branches: ["EEC Himatnagar"],
    localKeywords: [
      "study abroad consultant Himatnagar",
      "overseas education Himatnagar",
      "IELTS coaching Himatnagar",
      "study abroad Sabarkantha",
    ],
    nearbyAreas: ["Idar", "Prantij", "Modasa", "Bayad"],
    landmarks: ["Idar Fort", "Polo Forest"],
    universities: ["Government Engineering College Himatnagar"],
    population: "100,000",
    studentPopulation: "15,000+",
  },
  {
    city: "Kalol",
    state: "Gujarat",
    region: "Central Gujarat",
    coordinates: { lat: 23.2333, lng: 72.5000 },
    branches: ["EEC Kalol"],
    localKeywords: [
      "study abroad consultant Kalol",
      "overseas education Kalol",
      "IELTS coaching Kalol",
      "study abroad Gandhinagar",
    ],
    nearbyAreas: ["Gandhinagar", "Dehgam", "Mansa", "Kadi"],
    landmarks: ["GNFC Township", "Kalol GIDC"],
    universities: ["Gandhinagar area colleges"],
    population: "120,000",
    studentPopulation: "18,000+",
  },
  {
    city: "Visnagar",
    state: "Gujarat",
    region: "North Gujarat",
    coordinates: { lat: 23.6989, lng: 72.5519 },
    branches: ["EEC Visnagar"],
    localKeywords: [
      "study abroad consultant Visnagar",
      "overseas education Visnagar", 
      "IELTS coaching Visnagar",
    ],
    nearbyAreas: ["Mehsana", "Unjha", "Siddhpur", "Patan"],
    landmarks: ["Shamlaji Temple", "Historic Town"],
    universities: ["HNG University"],
    population: "70,000",
    studentPopulation: "10,000+",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: SEO BOOSTER SIGNALS
// ═══════════════════════════════════════════════════════════════════════════════

export const SEO_BOOSTER_SIGNALS = {
  // E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)
  eeat: {
    experience: {
      yearsInBusiness: 28,
      studentsGuided: "100,000+",
      countriesServed: 50,
      successRate: "98%",
      visaSuccessRate: "95%+",
    },
    expertise: {
      certifications: [
        "AIRC Certified (American International Recruitment Council) - Valid till 2031",
        "U.S. News Global Education Certified - Only agency in India",
        "ICEF IAS Accredited",
        "British Council Certified Education Agent",
        "Australia PIER Certified",
        "New Zealand ENZ Certified",
        "Ireland Education Agent Certified",
        "Canada CCEA Certified",
        "USATC Certified",
      ],
      specialTraining: [
        "US Embassy New Delhi - Student Visa Interview Training",
        "UK Embassy New Delhi - Visa Training",
        "NAFSA Annual Conference Exhibitor",
        "CBIE Conference Exhibitor",
      ],
      expertiseAreas: [
        "University Admissions",
        "Student Visa Applications",
        "Visa Interview Preparation",
        "Test Preparation (IELTS, TOEFL, GRE, GMAT)",
        "Scholarship Guidance",
        "Education Loan Assistance",
        "Financial Documentation",
        "Post-Study Work Visa Guidance",
        "Immigration Pathways",
      ],
    },
    authoritativeness: {
      industryRecognition: [
        "Gujarat's Largest Study Abroad Company",
        "Gujarat's Oldest Study Abroad Company",
        "One of few Indian agencies invited to US/UK Embassy training",
        "Trusted partner of 500+ universities worldwide",
      ],
      mediaPresence: [
        "Featured in leading education publications",
        "Regular speakers at education fairs",
        "Thought leaders in study abroad industry",
      ],
    },
    trustworthiness: {
      physicalPresence: "26 branches across 12 cities",
      transparentPricing: true,
      studentTestimonials: "5000+ verified reviews",
      industryMemberships: ["NAFSA", "CBIE", "AIRC", "ICEF"],
      governmentRecognized: true,
      registeredCompany: "Enbee Education Center Private Limited",
    },
  },
  
  // Social Proof Signals
  socialProof: {
    studentCount: "100,000+",
    successStories: "5,000+",
    googleRating: "4.7/5",
    googleReviews: "12,300+",
    socialFollowers: {
      instagram: "50K+",
      facebook: "100K+",
      youtube: "25K+",
      linkedin: "10K+",
    },
    partnerUniversities: "500+",
    scholarshipSecured: "₹100Cr+",
  },
  
  // Technical SEO Signals
  technicalSEO: {
    mobileOptimized: true,
    pageSpeed: "90+",
    coreWebVitals: "Pass",
    ssl: true,
    structuredData: true,
    xmlSitemap: true,
    robotsTxt: true,
    canonicalUrls: true,
    hreflangTags: true,
    semanticHTML: true,
    accessibilityScore: "95+",
  },
  
  // Content Freshness Signals
  contentFreshness: {
    regularUpdates: true,
    lastUpdated: new Date().toISOString(),
    blogPosts: "Weekly",
    newsUpdates: "Daily",
    visaPolicyUpdates: "Real-time",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: KEYWORD DENSITY OPTIMIZER
// ═══════════════════════════════════════════════════════════════════════════════

export interface KeywordDensityConfig {
  keyword: string;
  targetDensity: number; // Percentage
  minOccurrences: number;
  maxOccurrences: number;
  placement: ('title' | 'h1' | 'h2' | 'h3' | 'meta' | 'body' | 'alt' | 'anchor')[];
}

export const KEYWORD_DENSITY_CONFIG: KeywordDensityConfig[] = [
  {
    keyword: "AI course counselor",
    targetDensity: 1.5,
    minOccurrences: 3,
    maxOccurrences: 8,
    placement: ['title', 'h1', 'meta', 'body'],
  },
  {
    keyword: "study abroad",
    targetDensity: 2.0,
    minOccurrences: 5,
    maxOccurrences: 15,
    placement: ['title', 'h1', 'h2', 'meta', 'body', 'alt'],
  },
  {
    keyword: "career guidance",
    targetDensity: 1.2,
    minOccurrences: 3,
    maxOccurrences: 8,
    placement: ['h2', 'body'],
  },
  {
    keyword: "EEC",
    targetDensity: 1.0,
    minOccurrences: 3,
    maxOccurrences: 10,
    placement: ['title', 'h1', 'body', 'anchor'],
  },
  {
    keyword: "Gujarat",
    targetDensity: 0.8,
    minOccurrences: 2,
    maxOccurrences: 6,
    placement: ['body', 'meta'],
  },
  {
    keyword: "visa",
    targetDensity: 1.0,
    minOccurrences: 3,
    maxOccurrences: 10,
    placement: ['h2', 'h3', 'body'],
  },
  {
    keyword: "university",
    targetDensity: 1.5,
    minOccurrences: 4,
    maxOccurrences: 12,
    placement: ['h2', 'h3', 'body', 'alt'],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8: SEMANTIC CONTENT GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

export const generateSemanticContent = {
  // Generate LSI-rich paragraph
  generateLSIParagraph: (topic: keyof typeof LSI_KEYWORDS): string => {
    const lsi = LSI_KEYWORDS[topic];
    const semanticWords = [...lsi.semantic.slice(0, 3), ...lsi.related.slice(0, 3)];
    return `Our ${lsi.primary} services encompass ${semanticWords.join(', ')}. With expertise in ${lsi.entities.slice(0, 3).join(', ')}, we provide comprehensive support for your ${lsi.primary} journey.`;
  },
  
  // Generate local SEO paragraph
  generateLocalParagraph: (city: string): string => {
    const cityData = LOCAL_SEO_DATA.find(c => c.city === city);
    if (!cityData) return '';
    return `EEC ${city} is your trusted study abroad consultant in ${city}, ${cityData.state}. With branches in ${cityData.branches.join(', ')}, we serve students from ${cityData.nearbyAreas.slice(0, 5).join(', ')} and surrounding areas. Our ${city} office has helped thousands of students from ${cityData.universities.slice(0, 3).join(', ')} achieve their dream of studying abroad.`;
  },
  
  // Generate authority statement
  generateAuthorityStatement: (): string => {
    const eeat = SEO_BOOSTER_SIGNALS.eeat;
    return `With ${eeat.experience.yearsInBusiness}+ years of experience and ${eeat.experience.studentsGuided} students guided, EEC is ${eeat.authoritativeness.industryRecognition[0]}. We hold ${eeat.expertise.certifications.length}+ international certifications including ${eeat.expertise.certifications.slice(0, 3).join(', ')}.`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9: FAQ SCHEMA FOR LONG-TAIL CAPTURE
// ═══════════════════════════════════════════════════════════════════════════════

export const COMPREHENSIVE_FAQS = [
  // General Study Abroad FAQs
  {
    category: "General",
    faqs: [
      {
        question: "What is EEC AI Course Counselor?",
        answer: "EEC AI Course Counselor is a free AI-powered career guidance tool that provides instant insights on any course for study abroad. It covers job prospects, salaries, top companies, university recommendations, admission requirements, and visa guidance for countries like USA, UK, Canada, Australia, Germany, and more. Developed by EEC - Gujarat's largest and oldest study abroad company with 28+ years of experience.",
        keywords: ["AI course counselor", "career guidance", "study abroad", "free tool"],
      },
      {
        question: "Is the EEC AI Career Counselor completely free to use?",
        answer: "Yes, the EEC AI Course Counselor is 100% free to use. Simply enter your desired course and target country to get comprehensive career insights powered by advanced AI technology. There are no hidden charges, subscriptions, or premium features. This free tool is our way of helping students make informed decisions about their education abroad.",
        keywords: ["free career counselor", "no charges", "free AI tool"],
      },
      {
        question: "How accurate is the AI career guidance provided?",
        answer: "Our AI Course Counselor uses advanced machine learning algorithms trained on vast datasets of career outcomes, salary data, and industry trends. While the insights are highly accurate and regularly updated, we recommend verifying critical information with official sources. For personalized guidance, our certified counselors at 26 branches across Gujarat are available for detailed consultations.",
        keywords: ["AI accuracy", "career insights", "certified counselors"],
      },
      {
        question: "What countries does EEC provide study abroad guidance for?",
        answer: "EEC provides comprehensive study abroad guidance for USA, UK, Canada, Australia, New Zealand, Germany, Ireland, France, Netherlands, Singapore, and 40+ other countries. Our certified counselors have expertise in each destination's education system, visa requirements, and immigration pathways. We're AIRC certified for USA, British Council certified for UK, PIER certified for Australia, and hold similar credentials for other countries.",
        keywords: ["study abroad countries", "USA UK Canada Australia", "certified counselors"],
      },
      {
        question: "How experienced is EEC in overseas education consulting?",
        answer: "EEC (Enbee Education Center) was established in 1997, making us Gujarat's oldest study abroad company with 28+ years of experience. We've successfully guided 100,000+ students, maintain a 95%+ visa success rate, and operate 26 branches across 12 cities in Gujarat. We're one of the few Indian agencies ever invited to US and UK Embassy for official student visa training.",
        keywords: ["EEC experience", "28 years", "100000 students", "visa success"],
      },
    ],
  },
  
  // Country-Specific FAQs
  {
    category: "USA",
    faqs: [
      {
        question: "How can I study in USA from India?",
        answer: "To study in USA from India: 1) Choose your course and university, 2) Take required tests (GRE/GMAT, TOEFL/IELTS), 3) Prepare application documents (SOP, LORs, transcripts), 4) Apply to universities, 5) Secure admission and I-20, 6) Pay SEVIS fee, 7) Apply for F-1 student visa, 8) Attend visa interview. EEC's AIRC-certified counselors guide you through each step with our proven 95%+ visa success rate.",
        keywords: ["study in USA from India", "F1 visa", "US universities", "AIRC certified"],
      },
      {
        question: "What is the cost of studying in USA for Indian students?",
        answer: "Study costs in USA range from $20,000-$60,000/year for tuition depending on university and program. Living expenses add $15,000-$25,000/year. Top public universities offer quality education at lower costs. Many students work part-time (20 hrs/week on campus) to support expenses. EEC helps secure scholarships worth ₹100Cr+ collectively for our students and provides education loan guidance.",
        keywords: ["USA study cost", "tuition fees", "scholarships", "education loan"],
      },
      {
        question: "What are the best courses to study in USA for Indian students?",
        answer: "Top courses for Indian students in USA include: Computer Science, Data Science, Business Analytics, MBA, Electrical Engineering, Mechanical Engineering, Biotechnology, Healthcare Management, and Finance. STEM courses offer OPT extension up to 3 years. Our AI Course Counselor provides personalized career prospects for any course you choose.",
        keywords: ["best courses USA", "STEM courses", "OPT", "career prospects"],
      },
      {
        question: "How to prepare for US F-1 visa interview?",
        answer: "F-1 visa interview preparation includes: 1) Know your course and university thoroughly, 2) Prepare financial documents showing sufficient funds, 3) Demonstrate strong ties to India, 4) Practice common visa interview questions, 5) Be confident and honest in answers. EEC is one of few agencies in India trained by US Embassy New Delhi for visa interview preparation. Our mock interviews simulate real conditions.",
        keywords: ["F1 visa interview", "US embassy training", "visa preparation", "mock interview"],
      },
    ],
  },
  
  // UK FAQs
  {
    category: "UK",
    faqs: [
      {
        question: "How to study in UK from India?",
        answer: "To study in UK from India: 1) Research universities and courses via UCAS, 2) Meet English requirements (IELTS 6.0-7.0), 3) Apply through UCAS or directly, 4) Receive CAS (Confirmation of Acceptance), 5) Apply for Student Visa (formerly Tier 4), 6) Show financial proof (£1,334/month London, £1,023 outside). EEC's British Council certified counselors ensure smooth application and 95%+ visa success.",
        keywords: ["study in UK", "Student visa UK", "UCAS", "British Council certified"],
      },
      {
        question: "What is the UK Graduate Route visa?",
        answer: "The UK Graduate Route allows international students to stay and work in UK for 2 years after completing degree (3 years for PhD). No job offer required, no salary threshold, work in any field. This is excellent for gaining UK work experience. Our counselors guide you on maximizing this opportunity for potential Skilled Worker visa sponsorship later.",
        keywords: ["Graduate Route UK", "post study work visa", "2 years stay back"],
      },
      {
        question: "Can I study in UK without IELTS?",
        answer: "Yes, some UK universities accept alternative English proof: 1) Medium of instruction letter from previous institution, 2) Duolingo English Test, 3) PTE Academic, 4) University's own English test. However, for Student Visa, UKVI-approved test may be required. EEC counselors advise on specific university requirements and visa-acceptable alternatives.",
        keywords: ["UK without IELTS", "Duolingo", "PTE", "English requirements"],
      },
    ],
  },
  
  // Canada FAQs
  {
    category: "Canada",
    faqs: [
      {
        question: "How to apply for Canada student visa from India?",
        answer: "Canada study permit process: 1) Get acceptance from DLI (Designated Learning Institution), 2) Meet English requirements (IELTS 6.0+), 3) Show proof of funds (tuition + CAD 10,000/year living), 4) Get medical exam if required, 5) Apply online or through VAC, 6) Provide biometrics. SDS (Student Direct Stream) offers faster processing for eligible Indian students. EEC's CCEA-certified counselors ensure complete documentation.",
        keywords: ["Canada student visa", "study permit", "SDS", "DLI"],
      },
      {
        question: "What is PGWP in Canada?",
        answer: "PGWP (Post-Graduation Work Permit) allows international students to work in Canada after graduation. Duration matches your study program (up to 3 years). No job offer needed. Work experience gained can help qualify for Canada PR through Express Entry or PNP. EEC provides comprehensive guidance on study-to-PR pathways in Canada.",
        keywords: ["PGWP Canada", "work permit", "Canada PR", "Express Entry"],
      },
      {
        question: "Which province is best for studying in Canada?",
        answer: "Popular provinces for Indian students: Ontario (Toronto, Ottawa - most universities), British Columbia (Vancouver - tech hub), Alberta (Calgary, Edmonton - affordable), Quebec (Montreal - lower tuition for French speakers), Manitoba/Saskatchewan (immigration-friendly PNPs). Choice depends on course, budget, and PR goals. Our counselors help select optimal province for your profile.",
        keywords: ["Canada provinces", "Ontario", "British Columbia", "PNP"],
      },
    ],
  },
  
  // Australia FAQs
  {
    category: "Australia", 
    faqs: [
      {
        question: "How to get Australia student visa 500?",
        answer: "Australia Student Visa (Subclass 500) requirements: 1) CoE from registered institution, 2) Genuine Temporary Entrant (GTE) statement, 3) English proficiency (IELTS 5.5-6.5), 4) Financial capacity proof (AUD 21,041/year), 5) Health insurance (OSHC), 6) Health and character requirements. EEC's PIER-certified counselors ensure strong GTE statements for visa success.",
        keywords: ["Australia visa 500", "student visa", "GTE", "PIER certified"],
      },
      {
        question: "Can I get PR in Australia after study?",
        answer: "Yes, Australia offers PR pathways after study: 1) Get 485 Temporary Graduate Visa (2-4 years work rights), 2) Gain work experience in skilled occupation, 3) Apply through SkillSelect (189/190/491 visas). Points-based system favors Australian qualifications, work experience, and regional study. Courses in demand occupations improve PR chances. EEC provides study-to-PR pathway planning.",
        keywords: ["Australia PR", "485 visa", "SkillSelect", "skilled occupation"],
      },
      {
        question: "What is the cost of studying in Australia?",
        answer: "Australian study costs: Tuition AUD 20,000-45,000/year depending on course and university. Living costs: AUD 21,041/year (immigration requirement). Students can work 48 hours/fortnight during study, unlimited during breaks. Regional universities offer lower fees and better PR points. EEC helps find affordable options and scholarship opportunities.",
        keywords: ["Australia study cost", "tuition fees", "work rights", "regional university"],
      },
    ],
  },
  
  // Germany FAQs  
  {
    category: "Germany",
    faqs: [
      {
        question: "Can I study in Germany for free?",
        answer: "Yes! German public universities charge minimal fees (€150-350/semester) for international students. However, you need: 1) Blocked account with €11,208/year, 2) Health insurance, 3) Admission to recognized program. Many English-taught Master's programs available. Living costs are €800-1000/month. EEC guides students through the German university application system (uni-assist) and visa process.",
        keywords: ["Germany free education", "public university", "blocked account", "English programs"],
      },
      {
        question: "What is the blocked account requirement for Germany?",
        answer: "Blocked account (Sperrkonto) is mandatory for German student visa. Current requirement: €11,208 (€934/month × 12). You can withdraw €934 monthly for living expenses. Open account before visa application through Deutsche Bank, Expatrio, or Coracle. EEC provides complete guidance on blocked account opening and financial documentation.",
        keywords: ["blocked account Germany", "Sperrkonto", "financial requirements"],
      },
      {
        question: "What is Germany Job Seeker Visa after study?",
        answer: "Germany offers 18-month residence permit after graduation to find employment matching your qualification. Once employed, convert to EU Blue Card or work permit. Germany's strong job market and shortage of skilled workers benefit international graduates. EEC counselors advise on in-demand fields and job search strategies in Germany.",
        keywords: ["Germany job seeker visa", "EU Blue Card", "post study work"],
      },
    ],
  },
  
  // Test Preparation FAQs
  {
    category: "Test Preparation",
    faqs: [
      {
        question: "Which is easier - IELTS or TOEFL?",
        answer: "Choice depends on your strengths: IELTS has face-to-face speaking with examiner, more UK/Australia accepted. TOEFL is computer-based with American English focus, preferred by US universities. IELTS has paper-based option, TOEFL is only computer-based. EEC offers preparation for both with expert trainers who help identify which suits your profile better.",
        keywords: ["IELTS vs TOEFL", "English test comparison", "EEC coaching"],
      },
      {
        question: "How to score 7+ bands in IELTS?",
        answer: "IELTS 7+ strategy: 1) Understand marking criteria thoroughly, 2) Practice daily with authentic materials, 3) Work on vocabulary range and accuracy, 4) Master time management, 5) Take multiple mock tests, 6) Focus on weak sections. EEC's certified IELTS trainers provide personalized coaching with proven techniques that have helped thousands achieve 7+ bands.",
        keywords: ["IELTS 7 bands", "IELTS tips", "IELTS coaching"],
      },
      {
        question: "What GRE score is required for US universities?",
        answer: "GRE requirements vary by university and program: Top 20 universities typically expect 320+ (160+ Quant, 160+ Verbal). Good universities accept 310-320. Some programs are GRE-optional post-COVID. Competitive programs may require higher scores. EEC provides GRE coaching with focus on achieving scores that match your target universities.",
        keywords: ["GRE score", "GRE requirements", "US university admission"],
      },
    ],
  },
  
  // Financial & Visa FAQs
  {
    category: "Financial",
    faqs: [
      {
        question: "How to get education loan for abroad studies?",
        answer: "Education loan process: 1) Get admission letter, 2) Calculate total cost (tuition + living), 3) Apply to banks (public/private/NBFCs), 4) Provide collateral if required (usually for loans >7.5L), 5) Submit co-borrower documents. CA Madhav Gupta, EEC Director and Chartered Accountant, provides expert guidance on financial planning, loan structuring, and documentation for visa approval.",
        keywords: ["education loan abroad", "study abroad loan", "CA Madhav Gupta"],
      },
      {
        question: "What documents are required for student visa financial proof?",
        answer: "Financial documents typically include: Bank statements (6-12 months), Fixed deposit certificates, Education loan sanction letter, Affidavit of support from sponsor, Income tax returns, Salary slips/business proof of sponsor. Requirements vary by country. EEC's CA-certified team ensures your financial documentation is visa-officer friendly with consistent and well-documented proof of funds.",
        keywords: ["financial documents visa", "proof of funds", "bank statements"],
      },
      {
        question: "Are there scholarships available for Indian students abroad?",
        answer: "Yes! Many scholarships available: University merit scholarships, Government scholarships (Fulbright, Chevening, DAAD), Country-specific grants, Sports/talent scholarships, Need-based aid. EEC has helped students secure ₹100Cr+ in scholarships collectively. Our counselors identify scholarship opportunities matching your profile and help prepare winning applications.",
        keywords: ["scholarships abroad", "Fulbright", "Chevening", "DAAD"],
      },
    ],
  },
  
  // EEC-Specific FAQs
  {
    category: "About EEC",
    faqs: [
      {
        question: "What certifications does EEC hold?",
        answer: "EEC holds 9+ prestigious international certifications: AIRC (American International Recruitment Council) certified till 2031, U.S. News Global Education Certified (only agency in India), ICEF IAS Accredited, British Council UK Certified, Australia PIER Certified, New Zealand ENZ Certified, Ireland Education Agent Certified, Canada CCEA Certified, and USATC Certified. We're also NAFSA and CBIE exhibitors.",
        keywords: ["EEC certifications", "AIRC", "ICEF", "British Council"],
      },
      {
        question: "Where are EEC branches located?",
        answer: "EEC has 26 branches across 12 cities in Gujarat: Vadodara (Alkapuri, Nizampura, Manjalpur, New VIP Road), Ahmedabad (8 branches including Memnagar, Ghatlodiya, Chandkheda), Surat (5 branches), plus Anand, Nadiad, Navsari, Bharuch, Vapi, Kalol, Himatnagar, Mehsana, and Visnagar. All branches offer test preparation, admissions, and visa guidance in both online and in-person modes.",
        keywords: ["EEC branches", "Gujarat offices", "Vadodara Ahmedabad Surat"],
      },
      {
        question: "Who founded EEC and who leads it?",
        answer: "EEC was established in 1997 and is led by: 1) Amit Jalan - Managing Director & Lead AI Strategist, Purdue University alumnus with 28+ years of expertise in university admissions and visa interviews, widely regarded as a go-to authority for study abroad. 2) CA Madhav Gupta - Director and Chartered Accountant, India's leading expert on visa financial planning and documentation. Both are actively involved in student guidance.",
        keywords: ["Amit Jalan", "CA Madhav Gupta", "EEC founder", "leadership"],
      },
      {
        question: "Why should I choose EEC over other consultants?",
        answer: "Choose EEC because: 1) 28+ years experience - Gujarat's oldest study abroad company, 2) 100,000+ students guided with 95%+ visa success rate, 3) 26 branches for convenient access, 4) 9+ international certifications including AIRC and ICEF, 5) Embassy-trained counselors - one of few agencies invited to US/UK Embassy training, 6) CA-certified financial guidance, 7) Free AI tools like this Course Counselor, 8) Both online and in-person services available.",
        keywords: ["why EEC", "best consultant Gujarat", "visa success rate"],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10: EXPORT COMPREHENSIVE SEO CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

export const SEO_CONFIG = {
  primaryKeywords: PRIMARY_KEYWORDS,
  longTailKeywords: LONG_TAIL_KEYWORDS,
  topicalClusters: TOPICAL_CLUSTERS,
  lsiKeywords: LSI_KEYWORDS,
  localSEO: LOCAL_SEO_DATA,
  seoBooster: SEO_BOOSTER_SIGNALS,
  keywordDensity: KEYWORD_DENSITY_CONFIG,
  faqs: COMPREHENSIVE_FAQS,
  contentGenerator: generateSemanticContent,
};

export default SEO_CONFIG;

