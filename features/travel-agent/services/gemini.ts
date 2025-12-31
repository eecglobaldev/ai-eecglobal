
import { GoogleGenAI, Type } from "@google/genai";
import { VisaRequirements, ChecklistCategory } from "../types";

const getAiClient = () => {
  // Next.js environment variable access
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY_TRAVEL_AGENT as string | undefined;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY_TRAVEL_AGENT is not defined in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

// Temporal Helpers for Real-Time Context
const getCurrentDate = () => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const getCurrentYear = () => new Date().getFullYear();

// 10x Improvement: Hardcoded "Forensic Source" Database
// Matches the user's strict list strictly.
const OFFICIAL_SOURCES_DB: Record<string, string[]> = {
  "Ireland": ["irishimmigration.ie", "justice.ie", "visa.vfsglobal.com/ind/en/irl"],
  "United Kingdom": ["gov.uk", "visa.vfsglobal.com/ind/en/gbr"],
  "United States": ["travel.state.gov", "ustraveldocs.com", "ceac.state.gov", "dhs.gov"],
  "Canada": ["canada.ca", "ircc.canada.ca", "visa.vfsglobal.com/ind/en/can"],
  "Australia": ["immi.homeaffairs.gov.au", "india.highcommission.gov.au"],
  "New Zealand": ["immigration.govt.nz", "visa.vfsglobal.com/ind/en/nzl"],
  "Germany": ["india.diplo.de", "make-it-in-germany.com", "visa.vfsglobal.com/ind/en/deu"],
  "France": ["france-visas.gouv.fr", "in.ambafrance.org", "visa.vfsglobal.com/ind/en/fra"],
  "Netherlands": ["netherlandsworldwide.nl", "ind.nl", "visa.vfsglobal.com/ind/en/nld"],
  "Italy": ["vistoperitalia.esteri.it", "ambnewdelhi.esteri.it", "visa.vfsglobal.com/ind/en/ita"],
  "Spain": ["exteriores.gob.es", "india.blsspainvisa.com"],
  "Switzerland": ["sem.admin.ch", "eda.admin.ch", "visa.vfsglobal.com/ind/en/che"],
  "Austria": ["bmeia.gv.at", "migration.gv.at", "visa.vfsglobal.com/ind/en/aut"],
  "Malta": ["identita.gov.mt", "foreign.gov.mt", "visa.vfsglobal.com/ind/en/mlt"],
  "Finland": ["migri.fi", "finlandabroad.fi", "visa.vfsglobal.com/ind/en/fin"],
  "Sweden": ["migrationsverket.se", "swedenabroad.se", "visa.vfsglobal.com/ind/en/swe"],
  "Denmark": ["nyidanmark.dk", "um.dk", "applyvisa.um.dk", "visa.vfsglobal.com/ind/en/dnk"],
  "Latvia": ["pmlp.gov.lv", "mfa.gov.lv", "visa.vfsglobal.com/ind/en/lva"],
  "Hungary": ["oif.gov.hu", "konzuliszolgalat.kormany.hu", "visa.vfsglobal.com/ind/en/hun"],
  "Portugal": ["vistos.mne.gov.pt", "visa.vfsglobal.com/ind/en/prt"],
  "Belgium": ["dofi.ibz.be", "visa.vfsglobal.com/ind/en/bel", "diplomatie.belgium.be"],
  "Poland": ["gov.pl", "visa.vfsglobal.com/ind/en/pol"],
  "United Arab Emirates": ["u.ae", "icp.gov.ae", "gdrfad.gov.ae"],
  "Singapore": ["ica.gov.sg", "mfa.gov.sg"],
  "Schengen Area": ["ec.europa.eu"]
};

// Strict Validator Function
const isOfficialSource = (url: string, destination: string): boolean => {
  if (!url) return false;
  
  // Safe string handling
  const safeDest = (destination || "").toLowerCase().trim();
  const lowerUrl = String(url).toLowerCase();

  // 1. ABSOLUTE RED LIST (Aggregators & Low Quality)
  const BLOCKED = [
    'atlys', 'ivisa', 'wikipedia', 'quora', 'reddit', 'tripadvisor', 
    'makemytrip', 'cleartrip', 'goibibo', 'easemytrip', 'handyvisas',
    'skyscanner', 'kayak', 'booking.com', 'agoda', 'travel.usnews', 'visaguide.world',
    'thomascook', 'akbartravels', 'schengenvisainfo'
  ];
  if (BLOCKED.some(b => lowerUrl.includes(b))) return false;

  // 2. DESTINATION SPECIFIC ALLOWLIST (The "Forensic Match")
  const destKey = Object.keys(OFFICIAL_SOURCES_DB).find(k => safeDest.includes(k.toLowerCase()));
  if (destKey) {
    const allowedDomains = OFFICIAL_SOURCES_DB[destKey];
    if (allowedDomains.some(domain => lowerUrl.includes(domain))) {
      return true; // GOLD STANDARD
    }
  }

  // 3. ENHANCED GENERIC OFFICIAL PATTERNS (Silver Standard)
  if (
    lowerUrl.includes('.gov') || 
    lowerUrl.includes('gov.') || 
    lowerUrl.includes('.go.') ||      // e.g. .go.ke, .go.kr
    lowerUrl.includes('.gc.ca') || 
    lowerUrl.includes('.europa.eu') ||
    lowerUrl.includes('.mil') ||
    lowerUrl.includes('.nic.in') ||
    lowerUrl.includes('.gouv') ||     // French style
    lowerUrl.includes('.gob') ||      // Spanish/Latin style
    lowerUrl.includes('.diplo') ||    // German diplomatic
    lowerUrl.includes('mfa.') ||      // Ministry of Foreign Affairs
    lowerUrl.includes('.int')         // International Organizations
  ) {
    return true;
  }

  // 4. OFFICIAL PARTNERS (Bronze Standard)
  if (
    lowerUrl.includes('vfsglobal') || 
    lowerUrl.includes('blsinternational') || 
    lowerUrl.includes('tlscontact') || 
    lowerUrl.includes('ustraveldocs') ||
    lowerUrl.includes('ceac.state.gov') ||
    lowerUrl.includes('gvcworld')
  ) {
    return true;
  }

  return false;
};

// Deterministic Confidence Calculator
const calculateForensicConfidence = (data: VisaRequirements, destination: string): { score: number, analysis: string } => {
  let score = 50; // Base score
  let analysisParts = [];
  const safeDestination = (destination || "").toLowerCase().trim();

  const officialSources = data.officialSources || [];
  const validSources = officialSources.filter(s => isOfficialSource(s.url, safeDestination));
  
  // High Trust Check
  const destKey = Object.keys(OFFICIAL_SOURCES_DB).find(k => safeDestination.includes(k.toLowerCase()));
  const highTrustDomains = destKey ? OFFICIAL_SOURCES_DB[destKey] : [];
  
  const hasHighTrust = highTrustDomains.length > 0 
    ? validSources.some(s => highTrustDomains.some(d => (s.url || "").toLowerCase().includes(d)))
    : false;

  // SCORING LOGIC
  if (hasHighTrust) {
      score += 35;
      analysisParts.push("Verified against official Government allow-list.");
  } else if (validSources.length > 0) {
      score += 25; 
      analysisParts.push(destKey ? "Sourced from partner domains." : "Verified via official Government TLDs.");
  } else {
      score -= 30;
      analysisParts.push("⚠️ No official government sources verified.");
  }

  // Data Density Checks
  const cost = String(data.cost || "").toLowerCase();
  if (cost && /\d/.test(cost) && !cost.includes('vary')) score += 5;
  
  const procTime = String(data.processingTime || "");
  if (procTime && /\d/.test(procTime)) score += 5;

  const notes = String(data.notes || "").toLowerCase();
  if (notes.includes('vfs') || notes.includes('bls')) score += 5;

  score = Math.min(Math.max(score, 10), 99);

  return {
      score,
      analysis: analysisParts.join(" ")
  };
};

const getSourceAuthorityLevel = (url: string, destination: string): 'Gold' | 'Silver' | 'Bronze' => {
   const safeDest = (destination || "").toLowerCase();
   const destKey = Object.keys(OFFICIAL_SOURCES_DB).find(k => safeDest.includes(k.toLowerCase()));
   
   if (destKey) {
     const allowedDomains = OFFICIAL_SOURCES_DB[destKey];
     if (allowedDomains.some(domain => String(url).toLowerCase().includes(domain))) return 'Gold';
   }
   
   if (url.includes('.gov') || url.includes('.europa.eu')) return 'Silver';
   return 'Bronze';
};

// Helper to safely coerce values to string
const safeStr = (val: any, defaultVal = ""): string => {
    if (val === null || val === undefined) return defaultVal;
    return String(val).trim();
};

export const fetchVisaRequirements = async (
  _origin: string, 
  originState: string, 
  destination: string, 
  visaType: string
): Promise<VisaRequirements> => {
  
  const ai = getAiClient();
  const safeDestination = (destination || "").trim();
  const currentDate = getCurrentDate();
  const currentYear = getCurrentYear();
  
  const destKey = Object.keys(OFFICIAL_SOURCES_DB).find(k => safeDestination.toLowerCase().includes(k.toLowerCase()));
  const approvedSourcesList = destKey ? OFFICIAL_SOURCES_DB[destKey].join(', ') : "Official government websites, embassies, or consulates";

  const systemInstruction = `
    You are the "EEC Chief Immigration Officer", a specialized AI for Indian citizens.
    Current Date: ${currentDate}.
    
    CRITICAL E-E-A-T MANDATE:
    1.  LEGAL CITATIONS: You MUST cite specific immigration acts where possible (e.g. "Section 214(b) of INA" for USA, "Immigration Rules Appendix V" for UK).
    2.  SOURCE TRUTH: Prioritize specific government sources if available. For ${safeDestination}, look for: ${approvedSourcesList}.
    3.  IGNORE AGGREGATORS: Do not look at Atlys, iVisa, Wikipedia.
    4.  CONTEXT: User is an Indian Citizen from ${originState}.
    5.  OUTPUT: Return raw JSON ONLY matching the provided structure.
  `;

  const prompt = `
    Report on ${visaType} visa for ${safeDestination} (Indian Passport).
    Context: Today is ${currentDate}. Ensure all data (fees, processing times) is current as of ${currentYear}.
    Search Query: "Official ${safeDestination} visa requirements for Indian citizens ${originState} government consulate ${currentYear}"
    Search Query: "Official visa fees ${safeDestination} India ${currentYear}"
    Search Query: "${safeDestination} visa rejection reasons for Indian students ${currentYear}"

    Return the response as a VALID JSON Object with the following structure:
    {
        "visaName": "string",
        "status": "string",
        "duration": "string",
        "validity": "string",
        "cost": "string",
        "processingTime": "string",
        "summary": "string",
        "documents": ["string", "string"],
        "processSteps": ["string", "string"],
        "difficulty": "Easy" | "Medium" | "Hard",
        "financialReqs": "string",
        "photoReqs": "string",
        "insuranceReqs": "string",
        "accommodationReqs": "string",
        "notes": "string",
        "embassyContact": "string",
        "officialSources": [{ "title": "string", "url": "string" }],
        "lastUpdate": "string",
        "confidenceScore": number,
        "aiAnalysis": "string",
        "legalCitations": ["string"],
        "rejectionRisk": {
            "probability": "Low" | "Moderate" | "High",
            "primaryReason": "string",
            "mitigationTip": "string"
        }
    }
  `;

  let response;
  try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          tools: [{googleSearch: {}}],
        }
      });
  } catch (apiError) {
      console.error("API Error during fetch:", apiError);
      throw new Error("Unable to connect to visa intelligence service.");
  }

  // --- ROBUST PARSING & SANITIZATION START ---
  // Default Object to prevent Null Pointer Exceptions
  let data: VisaRequirements = {
      visaName: `${visaType} Visa for ${safeDestination}`,
      status: "Manual Verification Required",
      summary: "We could not automatically verify requirements for this specific destination at this time. Please check official embassy sources directly.",
      documents: [],
      processSteps: [],
      officialSources: [],
      difficulty: "Medium",
      confidenceScore: 0,
      aiAnalysis: "Data generation failed or was incomplete.",
      cost: "Check Embassy",
      validity: "Check Embassy",
      processingTime: "Check Embassy",
      duration: "Check Embassy",
      financialReqs: "",
      photoReqs: "",
      insuranceReqs: "",
      accommodationReqs: "",
      notes: "Automated verification failed."
  } as VisaRequirements;

  try {
    let rawText = "";
    // Defensive access to response text
    if (response && response.candidates && response.candidates.length > 0) {
        try {
            rawText = (response.text || "{}").trim();
        } catch (e) {
            // Fallback if SDK getter throws due to safety filters
            rawText = response.candidates[0].content?.parts?.[0]?.text || "{}";
        }
    } else {
        rawText = "{}";
    }
    
    // Attempt to extract JSON block if wrapped in markdown
    const jsonMatch = rawText.match(/```json([\s\S]*?)```/) || rawText.match(/```([\s\S]*?)```/);
    if (jsonMatch) {
        rawText = jsonMatch[1];
    } else {
        const firstBrace = rawText.indexOf('{');
        const lastBrace = rawText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            rawText = rawText.substring(firstBrace, lastBrace + 1);
        }
    }
    
    const parsed = JSON.parse(rawText);
    
    // MERGE parsed data into default object (Protects against missing keys)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        data = { ...data, ...parsed };
    } 

  } catch (e) {
    console.warn("Gemini returned invalid JSON. Using partial fallback.", e);
    // Data remains default/partial
  }
  
  // --- DEEP SANITIZATION: Force types to prevent crashes ---
  // Safeguard: data is strictly typed here, but runtime values could be null/undefined/wrong type.
  data.documents = Array.isArray(data.documents) ? data.documents.filter(d => d !== null && d !== undefined).map(String) : [];
  data.processSteps = Array.isArray(data.processSteps) ? data.processSteps.filter(p => p !== null && p !== undefined).map(String) : [];
  data.legalCitations = Array.isArray(data.legalCitations) ? data.legalCitations.filter(l => l !== null && l !== undefined).map(String) : [];
  
  // Ensure officialSources is an array of objects with string urls
  if (!Array.isArray(data.officialSources)) {
      data.officialSources = [];
  } else {
      data.officialSources = data.officialSources.filter(s => s && typeof s === 'object').map(s => ({
          title: safeStr(s.title, "Official Source"),
          url: safeStr(s.url, ""),
          authorityLevel: s.authorityLevel
      }));
  }

  // Force String Coercion for all text fields
  data.processingTime = safeStr(data.processingTime, "Check Embassy");
  data.cost = safeStr(data.cost, "Check Embassy");
  data.validity = safeStr(data.validity, "Check Embassy");
  data.duration = safeStr(data.duration, "Check Embassy");
  data.status = safeStr(data.status, "Check Embassy");
  data.visaName = safeStr(data.visaName, `${visaType} Visa`);
  data.notes = safeStr(data.notes);
  data.embassyContact = safeStr(data.embassyContact);
  data.summary = safeStr(data.summary, "Details unavailable.");
  data.financialReqs = safeStr(data.financialReqs);
  data.photoReqs = safeStr(data.photoReqs);
  data.insuranceReqs = safeStr(data.insuranceReqs);
  data.accommodationReqs = safeStr(data.accommodationReqs);
  data.aiAnalysis = safeStr(data.aiAnalysis);
  data.difficulty = ["Easy", "Medium", "Hard"].includes(data.difficulty) ? data.difficulty : "Medium";
  data.confidenceScore = typeof data.confidenceScore === 'number' ? data.confidenceScore : 50;

  // Rejection Risk Safety
  if(!data.rejectionRisk || typeof data.rejectionRisk !== 'object') {
      data.rejectionRisk = {
          probability: "Moderate",
          primaryReason: "Generic Documentation Errors",
          mitigationTip: "Ensure all documents are original and verifiable."
      };
  } else {
      data.rejectionRisk.probability = safeStr(data.rejectionRisk.probability, "Moderate");
      data.rejectionRisk.primaryReason = safeStr(data.rejectionRisk.primaryReason, "Standard Scrutiny");
      data.rejectionRisk.mitigationTip = safeStr(data.rejectionRisk.mitigationTip, "Check official guidelines.");
  }
  // --- SANITIZATION END ---

  let verifiedSources: {title: string, url: string, authorityLevel?: 'Gold'|'Silver'|'Bronze'}[] = [];

  // Grounding chunk logic
  if (response && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      const chunks = response.candidates[0].groundingMetadata.groundingChunks;
      verifiedSources = (chunks || [])
        .filter((c: any) => c.web?.uri && c.web?.title)
        .map((c: any) => ({ 
            title: String(c.web.title), 
            url: String(c.web.uri),
            authorityLevel: getSourceAuthorityLevel(String(c.web.uri), safeDestination)
        }))
        .filter((source: { url: string }) => isOfficialSource(source.url, safeDestination));
  } 

  // Merge manual and verified sources
  if (data.officialSources) {
      const manualSources = data.officialSources.filter(s => isOfficialSource(s.url, safeDestination));
      manualSources.forEach(ms => {
          if (!verifiedSources.some(vs => vs.url === ms.url)) {
              verifiedSources.push({
                  ...ms,
                  authorityLevel: getSourceAuthorityLevel(ms.url, safeDestination)
              });
          }
      });
  }

  data.officialSources = verifiedSources;

  // Calculate forensics only after data is fully sanitized
  const forensic = calculateForensicConfidence(data, safeDestination);
  data.confidenceScore = forensic.score;
  data.aiAnalysis = forensic.analysis;

  return data;
};

export const identifyStateFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    const ai = getAiClient();
    const prompt = `Identify the Indian State for these coordinates: Latitude ${lat}, Longitude ${lng}. Return ONLY the state name.`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return safeStr(response.text).replace(/['".]/g, '') || "";
};

export const translateVisaDetails = async (data: VisaRequirements, lang: string): Promise<VisaRequirements> => {
    const ai = getAiClient();
    const prompt = `Translate values to ${lang}. Keep keys English. Object: ${JSON.stringify(data)}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt, config: { responseMimeType: "application/json" } });
    
    // Robust parsing for translation
    let translated: Partial<VisaRequirements> = {};
    try {
        translated = JSON.parse(response.text || "{}");
    } catch (e) {
        translated = {};
    }

    // Merge translated data onto original data to ensure structure integrity
    // (If translation returns null for some fields, we keep original)
    const safeTranslated = { ...data, ...translated };
    
    // Re-verify array types
    safeTranslated.documents = Array.isArray(safeTranslated.documents) ? safeTranslated.documents.map(String) : data.documents;
    safeTranslated.processSteps = Array.isArray(safeTranslated.processSteps) ? safeTranslated.processSteps.map(String) : data.processSteps;
    
    return safeTranslated as VisaRequirements;
};

export const generateDeepDiveChecklist = async (
    origin: string, 
    originState: string, 
    destination: string, 
    visaType: string
): Promise<ChecklistCategory[]> => {
    
    const ai = getAiClient();
    const prompt = `Create a strict "Forensic Document Checklist" for ${visaType} visa to ${destination} for a resident of ${originState}, ${origin}. Focus on rejection reasons.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        categoryName: { type: Type.STRING },
                        items: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    item: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    isCritical: { type: Type.BOOLEAN }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    try {
        const parsed = JSON.parse(response.text || "[]");
        // Ensure strictly array
        return Array.isArray(parsed) ? parsed : [];
    } catch(e) {
        return [];
    }
};

export const sendChatMessage = async (
    history: { role: string; parts: { text: string }[] }[], 
    message: string, 
    contextData: VisaRequirements,
    lang: string,
    destination: string
): Promise<string> => {
    const ai = getAiClient();
    const safeDest = safeStr(destination).toLowerCase();
    const currentDate = getCurrentDate();

    const destKey = Object.keys(OFFICIAL_SOURCES_DB).find(k => safeDest.includes(k.toLowerCase()));
    const allowedDomains = destKey ? OFFICIAL_SOURCES_DB[destKey] : [];

    let groundingPolicy = "";
    if (allowedDomains.length > 0) {
        groundingPolicy = `
        STRICT GROUNDING RULE:
        You must prioritize and verify information against these OFFICIAL domains: ${allowedDomains.join(', ')}.
        If you need to search for new information, REJECT any source that is not a government (.gov) site or one of the listed domains.
        `;
    } else {
        groundingPolicy = `
        STRICT GROUNDING RULE:
        As specific URL rules are not pre-configured for ${destination}, you must strictly adhere to this heuristic:
        1. TRUST ONLY: Websites ending in .gov, .gob, .gouv, .mil, .int, or official VFS/BLS/TLS partner sites.
        2. REJECT: Blogs, News sites, Wikipedia, iVisa, Atlys, and other aggregators.
        3. TRANSPARENCY: If you cannot find the answer on an official government site, explicitly state: "I cannot verify this with an official government source."
        `;
    }

    const systemInstruction = `
    You are the **EEC Expert Visa Consultant** from **Enbee Education Center (EEC)**, Gujarat's premier study abroad consultancy (Est. 1997).
    Current Date: ${currentDate}.
    
    Context Data: ${JSON.stringify(contextData)}.
    User Language: ${lang}.
    Destination: ${destination}.
    
    ${groundingPolicy}

    BEHAVIOR:
    1. BRAND AUTHORITY: Always speak with the senior authority of EEC. You are NOT a generic AI. You are a consultant with 27 years of legacy.
    2. FORENSIC TONE: Use terms like "Consular Protocol", "Risk Assessment", "Financial Forensics", and "Documentation Integrity".
    3. SOURCE CITATION: When providing facts (fees, documents), cite the source domain in brackets e.g. [travel.state.gov].
    4. JURISDICTION AWARENESS: Always check the user's state (${contextData.embassyContact}) before advising on where to apply.
    5. If the user asks a NEW question, use the Google Search tool.
    6. ALWAYS apply the STRICT GROUNDING RULE to search results.
    `;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { 
            systemInstruction,
            tools: [{googleSearch: {}}] 
        },
        history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "No response generated.";
};

export const translateText = async (text: string, lang: string): Promise<string> => {
    const ai = getAiClient();
    if (lang === 'English') return text;
    const prompt = `Translate to ${lang}: ${text}`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text || text;
};

// --- ENTERPRISE GEO: VISA BULLETIN GENERATOR ---
// This function generates the "Official Memorandum" style content
export interface VisaBulletinData {
    bulletinId: string;
    riskLevel: "Low" | "Medium" | "High";
    economicTiesAnalysis: string;
    consularPsychology: string;
    documentForensics: {
        document: string;
        forgeryErrorReason: string;
    } | string;
    recentPolicyShift: string;
}

export const generateVisaBulletin = async (destination: string, visaType: string): Promise<VisaBulletinData> => {
    const ai = getAiClient();
    const currentDate = getCurrentDate();
    const currentYear = getCurrentYear();
    
    const prompt = `
    Act as the Chief Consular Officer for Enbee Education Center (Est 1997).
    Generate a strict "Internal Visa Bulletin" for ${destination} ${visaType} Visa for Indian applicants.
    Context: Today is ${currentDate}.
    
    Return VALID JSON ONLY:
    {
      "bulletinId": "EEC-${currentYear}-[RANDOM_4_DIGIT]",
      "riskLevel": "Low" | "Medium" | "High",
      "economicTiesAnalysis": "2 sentences on what proves 'Economic Ties' specifically for ${destination}.",
      "consularPsychology": "2 sentences on what the Visa Officer is subconsciously looking for in the interview.",
      "documentForensics": {
          "document": "Name of 1 specific sensitive document (e.g. Bank Statement)",
          "forgeryErrorReason": "1 common forensic error or forgery reason to avoid"
      },
      "recentPolicyShift": "Mention 1 recent or upcoming policy change/trend for ${currentYear}."
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        const parsed = JSON.parse(response.text || "{}");
        // Bullet-proofing parsed response
        if (parsed.riskLevel && !["Low", "Medium", "High"].includes(parsed.riskLevel)) {
            parsed.riskLevel = "Medium";
        }
        return parsed;
    } catch (e) {
        console.error("Bulletin Gen Error", e);
        return {
            bulletinId: "EEC-AUTO-FAIL",
            riskLevel: "Medium",
            economicTiesAnalysis: "Standard financial proof required.",
            consularPsychology: "Confidence and clarity are key.",
            documentForensics: "Ensure all bank statements are original.",
            recentPolicyShift: "Standard scrutiny applies."
        };
    }
};
