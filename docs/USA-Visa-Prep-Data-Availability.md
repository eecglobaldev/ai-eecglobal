# USA Visa Prep – Data Availability for New Pages

This document maps **existing content** in `features/usa-visa/` (and shared app data) to the five new pages: **FAQ**, **Glossary**, **Preparation Guide**, **Resources**, and **About EEC**. All new pages must use **only** this identified data; no new copy should be invented.

---

## 1. FAQ Page

### Source: `components/GeoContentSection.tsx` — `LONG_TAIL_FAQS`

| # | Question | Answer (summary) |
|--|----------|------------------|
| 1 | What is the F-1 visa interview process at US Consulate Mumbai? | 2–3 min; questions on university, finances, career, ties; common Qs: Why this university?, How will you fund?, Plans after graduation?; 214(b) risk. |
| 2 | How much bank balance is required for F-1 visa from Gujarat? | Varies; first-year fees + living ($15k–$25k) + travel; typically ₹30–50L; liquid, 6 months statements. |
| 3 | Can I get F-1 visa if I have 214(b) refusal from previous application? | Yes; EEC 214(b) recovery: CA Madhav Gupta financial docs, interview strategy, profile improvement; 3–6 months recommended before reapply. |
| 4 | What documents do I need for F-1 visa interview at Mumbai Consulate? | Passport, DS-160, I-20, SEVIS receipt, appointment, 6mo bank statements, sponsor ITR 3yr, CA cert, I-134, transcripts, test scores, admission letter; originals + copies. |
| 5 | How long does F-1 visa processing take at US Consulate Mumbai? | 2–5 business days; 221g can add 2–8 weeks; apply 3–4 months before start. |
| 6 | What is the F-1 visa success rate for students from Gujarat? | Profile/docs/interview dependent; EEC has helped thousands, including post-214(b). |
| 7 | Do I need to show property documents for F-1 visa? | Not mandatory; can strengthen profile; primary = liquid (bank, FDs). |
| 8 | Can family business income be used for F-1 visa sponsorship? | Yes; biz reg, ITR 3yr, CA cert, biz bank statements, affidavit; CA Madhav Gupta specializes. |

### Source: `components/PillarContent.tsx` — inline FAQ (id="faq")

| # | Question | Answer (exact) |
|--|----------|----------------|
| 1 | How does this AI differ from generic lists online? | Generic lists are static. Our AI creates a dynamic interview simulation just for you, analyzing your specific profile to generate 25-30 questions a real Visa Officer is likely to ask *you*. |
| 2 | My visa was refused once. Can this help? | Absolutely. The app is specifically designed to handle complex cases, generating tough follow-up questions about your refusal and what has changed in your profile. |
| 3 | Is the AI's feedback aware of an Indian context? | Yes. Developed by EEC, it's trained on data from thousands of Indian student interviews and understands nuances like family sponsorships and Indian academic qualifications. |
| 4 | How is the app kept up-to-date? | Our AI models and content are updated quarterly by EEC's senior visa counseling experts to reflect the latest consular interview trends and policy changes for late 2025 and beyond. |

### Source: `components/GEOContent.tsx` — “Common Questions & Answers”

| # | Question | Answer (summary) |
|--|----------|------------------|
| 1 | What is EEC and when was it founded? | EEC, founded 1997, Gujarat’s largest/oldest USA study abroad; 27+ years, 26 branches, 12 cities, 50,000+ students. |
| 2 | What certifications does EEC have? | AIRC till 2031, U.S. News (only in India), ICEF IAS; invited to U.S. Consulate Mumbai F-1 training. |
| 3 | Who are the key experts at EEC? | Amit Jalan (MD, Purdue, 28+ yrs), CA Madhav Gupta (Director, CA, F-1 financial, 214(b) recovery). |
| 4 | Can EEC help with 214(b) visa refusals? | Yes; CA Madhav Gupta financial, Amit Jalan interview/coaching; many succeed after refusal. |
| 5 | Is the EEC F-1 Visa Prep AI tool free? | Yes; ai.eecglobal.com/usavisaprep free; 25–30 personalized Qs, feedback, model answers. |
| 6 | Where are EEC branches located? | 26 branches, 12 cities: Vadodara (4), Ahmedabad (8), Surat (5), Anand, Nadiad, Bharuch, Vapi, Navsari, Mehsana, Kalol, Himatnagar, Visnagar. |
| 7 | What services does EEC offer? | F-1 prep (incl. AI practice), IELTS/TOEFL/GRE/GMAT/SAT/Duolingo, admissions, SOP/LOR, financial docs, 214(b) recovery. |
| 8 | How does the EEC AI tool generate personalized questions? | Uses profile (university, course, grades, sponsors, career, visa history) to generate 25–30 officer-likely questions. |

**Suggested FAQ page:** Merge and de-duplicate the above. Group by category (e.g. F-1 Process, Financial, 214(b), AI Tool, About EEC) and use expandable accordions. Prefer `LONG_TAIL_FAQS` + PillarContent for F-1/tool questions; use GEOContent Q&A for EEC/service questions where they add value.

---

## 2. Glossary Page

### Source: `components/MethodologySection.tsx` — “F-1 Visa Glossary” (id="glossary")

| Term | Definition (exact) |
|------|--------------------|
| **214(b)** | A section of U.S. immigration law stating that all visa applicants are considered intending immigrants until they prove otherwise. This is the most common reason for F-1 visa refusal. |
| **I-20 Form** | The "Certificate of Eligibility for Nonimmigrant Student Status" issued by your university. It's a mandatory document for your interview. |
| **SEVIS Fee** | A mandatory fee for the Student and Exchange Visitor Information System, a database that tracks international students in the U.S. Must be paid before the interview. |
| **Non-Immigrant Intent** | The crucial requirement to prove you have strong ties (financial, family, professional) to your home country and intend to return after completing your studies. |

### Source: `components/GeoContentSection.tsx` — `LSI_TERMS`

Keyword lists that can be turned into short definitions or “see also” terms:

- **visa:** student visa, F-1 visa, non-immigrant visa, visa interview, visa approval, visa officer, consular interview, **DS-160**, **SEVIS**, **I-20**, visa stamping  
- **financial:** proof of funds, bank statement, financial documentation, sponsor letter, education loan, **I-134**, affidavit of support  
- **refusal:** 214(b), visa denial, visa rejection, refused visa, visa refusal recovery, reapplication, administrative processing  
- **tests:** IELTS, TOEFL, GRE, GMAT, SAT, Duolingo, English proficiency test, standardized tests  

**Suggested glossary page:** Use the 4 MethodologySection terms as primary entries. Add short definitions for **DS-160**, **I-134**, **SEVIS** (if not duplicate), **221(g)** (mentioned in LONG_TAIL_FAQS), **CPT/OPT** (from geminiService question list). Use LSI_TERMS only to extend term set, not to invent new copy—where no definition exists in code, use one sentence derived from existing wording (e.g. GEOContent or LONG_TAIL_FAQS).

---

## 3. Preparation Guide Page

### Source: `components/PillarContent.tsx`

- **“Your Authoritative Guide to F-1 Visa Success”** + “Master the interview with expert knowledge, AI-driven insights, and proven strategies.”
- **“Understanding Non-Immigrant Intent & Section 214(b)”:** 214(b) presumption; bona fide non-immigrant; strong ties + clear return plan. Strong Ties (family/social, economic, career in India) vs Weak Ties / Red Flags (vague plans, many relatives in US, course with no path in India).
- **“Preparation Methods Compared”** table: AI Prep Tool vs Traditional Agent vs Self-Study (personalization, feedback, practice, complex cases, cost).

### Source: `components/GeoContentSection.tsx` — `TOPIC_SILOS`

| Silo | Description | Subtopics (names + keywords) |
|------|-------------|-------------------------------|
| F-1 Visa Interview Preparation | Comprehensive preparation for your US student visa interview at the consulate | Common Visa Interview Questions (why USA, university, future plans, ties); Non-Immigrant Intent Strategy; Financial Documentation; DS-160 Form Guidance |
| 214(b) Visa Refusal Recovery | Expert guidance for students who have faced visa denial under Section 214(b) | Understanding 214(b); Financial Restructuring (CA Madhav Gupta); Interview Strategy Revision; Reapplication Timeline |
| US University Selection & Applications | Strategic university selection based on profile, budget, career goals | University Shortlisting; Application Strategy (SOP, LOR, deadlines); I-20 Processing; Scholarship Opportunities |
| F-1 Financial Planning & Documentation | Complete financial documentation support for F-1 visa approval | Proof of Funds; Income Tax Returns; Loan Documentation; Asset Documentation |

### Source: `components/KnowledgeHub.tsx`

- **“Decoding 2025-26 Interview Trends”:** Focus on university/course choice and financial plans beyond year one; vague answers = red flag; AI tuned to those points.
- **“Spotlight: Top US States”:** California (living costs, budget); Texas (tech/energy in India); New York (competitive, high-density).
- **“Financial Documentation Checklist”:** Sponsor’s Bank Statements (6 months), Loan Approval Letter, Sponsor’s ITR (3 years), Affidavit of Support (Form I-134), Proof of Assets, Scholarship/Assistantship Letter.

### Source: `components/MethodologySection.tsx`

- **“Our AI’s ‘Secret Sauce’”:** 10,000+ anonymized mock interviews, quarterly consular trend reports.
- **“Non-Immigrant Intent Scoring (NIIS v3.0)”:** Analyzes answers for “strong ties” markers.
- **“By the Numbers”:** 92% user confidence boost; 5+ profile-specific weak points identified on average.

### Source: `features/usa-visa/services/geminiService.ts` (and `actions/gemini.ts`) — question topics

Context-specific question topics (for “what to prepare for” list, not full Q text):  
Why this university?, Why this course?, Why USA?, Who is sponsoring?, Plans after graduation?, Relatives in US?, Why not study in India?, Academic background?, Test scores?, How will this help career in India?, Parents' occupation?, How many universities applied to?, Knowledge of the city?, Ever been to US before?, What if visa is rejected?, Long-term professional aspirations?, Why this intake (Fall/Spring)?, Intentions for CPT/OPT?, Scope of your field in India upon return?, Explain academic/professional gaps?, Who is in your family?, Family assets in India?, How will you manage living expenses?, Final year project?, What makes your profile strong?

**Suggested Preparation Guide page:**  
1) Short intro reusing PillarContent “Authoritative Guide” line.  
2) “Non-Immigrant Intent & 214(b)” section from PillarContent (strong/weak ties).  
3) “What to Prepare” / “Common Question Areas” section built from TOPIC_SILOS + geminiService question list.  
4) “Step-by-step” style sections per silo: Interview Prep, 214(b) Recovery, University Selection, Financial Docs—using TOPIC_SILOS text + KnowledgeHub checklist + MethodologySection stats where relevant.  
5) “Preparation Methods Compared” table from PillarContent.  
6) “Interview Trends & State Tips” from KnowledgeHub (trends + California/Texas/New York).  
All narrative must stay within the wording of the listed sources.

---

## 4. Resources Page

### Source: `components/KnowledgeHub.tsx` — “Financial Documentation Checklist”

- Sponsor's Bank Statements (6 months)  
- Loan Approval Letter (if applicable)  
- Sponsor's Income Tax Returns (3 years)  
- Affidavit of Support (Form I-134)  
- Proof of Assets (Property, FDs, etc.)  
- Scholarship/Assistantship Letter  

### Source: `components/GeoContentSection.tsx`

- **Trust signals:** Established 1997, 26 Branches in Gujarat, AIRC Certified till 2031, U.S. News Certified, 50,000+ Students Helped, 4.9/5 Rating.  
- **CITY_CONTENT:** Vadodara, Ahmedabad, Surat, North Gujarat — highlights + long-tail phrases (for “city-specific resources” or internal links only, no new copy).

### Source: `components/GEOContent.tsx`

- **Verification links:** AIRC, U.S. News Credential.net, ICEF, Amit Jalan LinkedIn, CA Madhav Gupta LinkedIn.  
- **Branch Distribution** table: Vadodara (4), Ahmedabad (8), Surat (5), Other (9) with location names.  
- **Certifications** table: AIRC (to 2031), U.S. News, ICEF, U.S. Consulate Mumbai Training.

### Source: `components/SEOFooter.tsx`

- Internal anchors: `#setup`, `#interview-flow`, `#visa-interview-prep`, `#214b-refusal`, `#knowledge-hub`, `#branches`, `#faq`, `#experts`, `#methodology`.  
- External: eecglobal.com/about-us, /usavisaprep/llms.txt.  
- Services copy: F-1 Visa Interview Preparation • 214(b) Refusal Recovery • IELTS/TOEFL/GRE/GMAT/SAT • USA University Admission • Study Abroad Counseling • Financial Documentation • Mock Interviews • DS-160 Help • I-20 Guidance.  
- Locations: Vadodara, Ahmedabad, Surat, Anand, Nadiad, Bharuch, Vapi, Navsari, Mehsana, Kalol, Himatnagar, Visnagar.

### Source: `features/usa-visa/data/branches.ts`

- **BRANCHES:** 26 branches with address, geo, timings, contactPoint, counselors, reviews, hasMap. Used by `BranchLocator.tsx`.  
- Use for “Find a branch” / “Branch locator” resource and link to main tool’s `#branches` or in-page BranchLocator.

**Suggested Resources page:**  
- “Document checklist” block using KnowledgeHub list (and optionally LONG_TAIL_FAQS doc list).  
- “Useful links” block: Start Prep (#setup), Practice Interview (#interview-flow), Interview Guide (#visa-interview-prep), 214(b) Help (#214b-refusal), Knowledge Hub (#knowledge-hub), Branches (#branches or BranchLocator), FAQ, Experts, Methodology; About Us, For AI/LLMs.  
- “EEC certifications & verification” using GEOContent certifications + verification links.  
- “Branch locator” / “26 branches”: reuse BranchLocator or link to main page #branches; no need to duplicate full branch data.  
- “Trust & impact” line using GeoContentSection trust signals (1997, 26 branches, AIRC, U.S. News, 50k+ students, 4.9/5).  
- Optional short “Services” and “Locations” lines from SEOFooter.

---

## 5. About EEC Page

### Source: `components/PillarContent.tsx`

- **Testimonials** (id="success-stories"): name, university, quote, focus.  
  - Rohan P., MS CS Arizona State, “My first visa was rejected…”, Previous Refusal.  
  - Anjali M., BS Business UIUC, “The AI helped me turn my dad’s ‘kirana store’…”, Family Business Background.  
  - Vikram S., PhD AI Carnegie Mellon, “I had a full scholarship…”, Strong Ties & Career Goals.  
- **Experts** (id="experts"): Amit Jalan (title, bio, image /assets/amit.jpeg); CA Madhav Gupta (title, bio, image /assets/Madhav-Gupta.jpeg). Text as in component.

### Source: `components/GEOContent.tsx`

- **Organization table:** Name, Founded 1997 (27+ years), HQ Vadodara, 26 branches / 12 cities, 50,000+ students, Specialty USA F-1, Rating 4.9/5 (2,847 reviews).  
- **Certifications table:** AIRC (to 2031), U.S. News (only in India), ICEF IAS, U.S. Consulate Mumbai Training.  
- **Key Personnel:** Amit Jalan (Purdue, 28+ years, F-1/ US admissions/ AI); CA Madhav Gupta (Chartered Accountant ICAI, 421209, F-1 financial, 214(b) recovery); LinkedIn links.  
- **Citation-ready statements:** EEC largest/oldest USA in Gujarat, 1997, 26 branches; AIRC till 2031; only U.S. News in India; Consulate Mumbai F-1 training invite.  
- **Branch Distribution** table (city, count, locations).  
- **Verification footer** links (AIRC, U.S. News, ICEF, Amit Jalan, CA Madhav Gupta).

### Source: `components/SEOFooter.tsx`

- EEC blurb: Established 1997, Gujarat’s largest and oldest for USA, AIRC till 2031, U.S. News (only in India), ICEF IAS, 26 branches in 12 cities.  
- “About EEC” links: #faq, #experts, #methodology, About Us, For AI/LLMs.  
- Contact: info@eecglobal.com, +91 875 875 0036, +91 875 888 0034.  
- Social: Instagram, Facebook, YouTube, LinkedIn.

### Source: `features/usa-visa/data/branches.ts` + `BranchLocator.tsx`

- Branch data and UI for “Find your nearest branch.” About EEC page can link to main app “#branches” or embed/inline BranchLocator.

**Suggested About EEC page:**  
- Hero: “About EEC” + one sentence from GEOContent or SEOFooter (largest/oldest USA in Gujarat, 1997, 26 branches).  
- “Who we are” / “Organization” using GEOContent organization table + citation statements.  
- “Certifications” using GEOContent certifications table + verification links.  
- “Our experts” using PillarContent experts (names, titles, bios, images).  
- “Success stories” using PillarContent testimonials (name, university, quote, focus).  
- “Find a branch” → link to main app #branches or BranchLocator; optionally list cities/counts from Branch Distribution.  
- “Contact & connect” using SEOFooter (email, phones, social).  
All text must come from the listed components/footer/data.

---

## 6. Gaps and Constraints

| Item | Status |
|------|--------|
| FAQ Q&A | **Available** — PillarContent (4), GeoContentSection LONG_TAIL_FAQS (8), GEOContent (8). Merge and categorize for FAQ page. |
| Glossary terms | **Partial** — 4 terms in MethodologySection; DS-160, I-134, 221(g), CPT/OPT can be defined from existing sentences elsewhere. No large pre-built glossary; extend only from existing wording. |
| Preparation Guide | **Available** — PillarContent (214(b), comparison table), TOPIC_SILOS, KnowledgeHub, MethodologySection, geminiService question topics. |
| Resources | **Available** — KnowledgeHub checklist, GEOContent/GeoContentSection trust + certs + branches, SEOFooter links, branches.ts / BranchLocator. |
| About EEC | **Available** — PillarContent testimonials + experts, GEOContent org/certs/personnel/statements/branches, SEOFooter blurb + contact + social. |
| USA Header nav | **Missing** — Header has only Dashboard/Sign In and ThemeSwitcher. Add nav links for FAQ, Glossary, Preparation Guide, Resources, About EEC (and optionally “Start Prep” → `/usavisaprep`). |
| App routes | **Missing** — No `/usavisaprep/faq`, `/usavisaprep/glossary`, `/usavisaprep/preparation-guide`, `/usavisaprep/resources`, `/usavisaprep/about-eec`. Create under `app/usavisaprep/` to mirror australiagsprep. |
| Sitemap | **Missing** — `app/sitemap.ts` has `usavisaprep/` only. Add the five subpages. |

---

## 7. Implementation Order

1. **FAQ** — Merge PillarContent + LONG_TAIL_FAQS + GEOContent Q&A; build `app/usavisaprep/faq/page.tsx` (and layout) using accordions, categories, internal links to #setup, #interview-flow, #214b-refusal, #knowledge-hub, #branches.  
2. **Glossary** — Extract 4 terms from MethodologySection; add DS-160, I-134, 221(g), CPT, OPT (and optionally SEVIS, I-20) only where a one-sentence definition can be quoted/paraphrased from GeoContentSection or GEOContent or LONG_TAIL_FAQS.  
3. **Preparation Guide** — Compose from PillarContent, TOPIC_SILOS, KnowledgeHub, MethodologySection, geminiService question list; add internal links to FAQ/Glossary/Resources where relevant.  
4. **Resources** — Checklist from KnowledgeHub; links from SEOFooter + GEOContent; trust/certs from GEOContent/GeoContentSection; branch locator link or BranchLocator.  
5. **About EEC** — GEOContent org + certs + personnel + statements, PillarContent experts + testimonials, SEOFooter contact/social, branch link.  
6. **Nav** — Update `features/usa-visa/components/Header.tsx` with links to the five pages (and optionally “Start Prep”); order to match Australia: e.g. Start Prep, Glossary, Preparation Guide, Resources, FAQ, About EEC (or as per product).  
7. **Sitemap** — Add `usavisaprep/faq/`, `usavisaprep/glossary/`, `usavisaprep/preparation-guide/`, `usavisaprep/resources/`, `usavisaprep/about-eec/` to `app/sitemap.ts`.

---

## 8. File Reference Quick Map

| Page | Primary sources |
|------|------------------|
| FAQ | `GeoContentSection.tsx` (LONG_TAIL_FAQS), `PillarContent.tsx` (faq details), `GEOContent.tsx` (Q&A block) |
| Glossary | `MethodologySection.tsx` (glossary dl), `GeoContentSection.tsx` (LSI_TERMS for term names only) |
| Preparation Guide | `PillarContent.tsx`, `GeoContentSection.tsx` (TOPIC_SILOS), `KnowledgeHub.tsx`, `MethodologySection.tsx`, `geminiService.ts` / `actions/gemini.ts` |
| Resources | `KnowledgeHub.tsx` (checklist), `GEOContent.tsx`, `GeoContentSection.tsx` (trust, city), `SEOFooter.tsx`, `data/branches.ts`, `BranchLocator.tsx` |
| About EEC | `PillarContent.tsx` (testimonials, experts), `GEOContent.tsx` (org, certs, personnel, statements, branch table), `SEOFooter.tsx`, `data/branches.ts` |
