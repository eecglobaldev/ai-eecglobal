import { GoogleGenAI } from "@google/genai";
import { StudentProfile } from '../types';

// Use NEXT_PUBLIC_ prefix for client-side access in Next.js
const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("Gemini API key environment variable not set.");
  }
  return apiKey!;
};

const getAiClient = () => {
  return new GoogleGenAI({ apiKey: getApiKey() });
};

const cleanJsonString = (jsonString: string): string => {
  const firstBrace = jsonString.indexOf('{');
  const lastBrace = jsonString.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return jsonString.substring(firstBrace, lastBrace + 1);
  }
  return jsonString;
};


export const generatePrepContent = async (profile: StudentProfile, signal: AbortSignal) => {
    const prompt = `
        You are a meticulous, highly-informed UK university admissions tutor and ex-UKVI officer. Your primary directive is to provide factually accurate, deeply researched, and ultra-personalized interview preparation materials. **You MUST NOT invent any facts.** Every piece of information about the university or course (like modules, professors, facilities, rankings) must be verified through Google Search. You must provide your response as a single, valid JSON object and nothing else.

        **CRITICAL INSTRUCTION:** Your entire response MUST be grounded in verifiable facts from your search results and strictly tailored to the student's unique profile below. Failure to adhere to these facts will result in an incorrect and unhelpful response.

        **Student Profile:**
        - **University:** "${profile.university}"
        - **Course Level:** "${profile.courseLevel}"
        - **Course Name:** "${profile.course}"
        - **Previous Qualification:** "${profile.previousQualification}"
        - **Funding Source:** "${profile.fundingSource}"
        - **Sponsor's Occupation:** "${profile.sponsorOccupation}"
        - **Career Goals:** "${profile.careerGoals}"
        - **Study/Work Gaps:** "${profile.studyGap || "No gaps specified."}"

        
        **Your Task is to create a JSON object with two properties: "keyTalkingPoints" and "questions".**

        1.  **keyTalkingPoints**: This property must be a string containing premium-formatted HTML. This section is critical for establishing credibility.
            - **Research Mandate:** Use Google Search to find specific, compelling, and verifiable facts about the "${profile.course}" program at "${profile.university}". Look for unique course modules, renowned faculty members, specialized labs or equipment, specific industry partnerships, or impressive alumni achievements directly related to the student's career goals ("${profile.careerGoals}").
            - **Content:** Start with <h2>Your Unique Credibility Narrative</h2>. Follow with a conversational intro. Then, create a <ul> list with 3-5 powerful, fact-based talking points.
            - **Formatting:** Each point must be a specific, verifiable statement. Use <mark> to highlight the factual keywords (e.g., <mark>Professor Jane Doe's research in AI ethics</mark>, the <mark>Bloomberg Trading Suite</mark>, or the <mark>exclusive internship with Rolls-Royce</mark>). Wrap the entire response in a <div class="ai-content-card prose prose-slate max-w-none">.

        2.  **questions**: This property must be an array of 15 JSON objects. Each object must have "question", "guidance", and "modelAnswer" properties.
            - **Personalization Mandate:** Every "modelAnswer" MUST be written in the first person and be a direct reflection of the student's profile. It must be comprehensive and detailed, approximately 150-200 words in length. For instance, the answer to "Why this course?" must explicitly link their "${profile.previousQualification}" to specific modules in the "${profile.course}" and how that helps them achieve their "${profile.careerGoals}". The answer to "How will you fund your studies?" must detail their "${profile.fundingSource}" and mention their sponsor's occupation ("${profile.sponsorOccupation}").
            - **Factual Mandate:** The "guidance" and "modelAnswer" should also incorporate the verifiable facts you researched for the key talking points.
            - **Question Topics:** The 15 questions must cover the following key areas comprehensively, ensuring no duplicates:
                - Choice of university and course, including your research process.
                - Specific course modules and how they support your career goals.
                - Long-term career benefits of this degree.
                - Financial sponsorship details and total first-year costs.
                - Reasons for choosing the UK over other countries.
                - Accommodation arrangements.
                - Ties to home country and post-study intentions.
                - Relevance of previous studies/work.
                - Plans if visa is refused.
                - Explanation of any gaps in academic/work history.
                - **(Compulsory)** What are your expectations of the cultural differences between your home country and the UK?
                - University facilities you intend to use.
                - Student visa responsibilities and knowledge of work rights.
                - Justification for receiving a student visa.
                - Knowledge of the university's specific location and your commuting plans.
    `;

    // FIX: The `generateContent` function expects only one argument. The AbortSignal from the second argument has been removed to resolve the error.
    const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        },
    });

    const rawText = response.text || '';
    const cleanedText = cleanJsonString(rawText);
    return JSON.parse(cleanedText);
};

export const analyzeAnswer = async (profile: StudentProfile, question: string, transcript: string, signal: AbortSignal) => {
    const systemPrompt = `You are a senior UKVI Entry Clearance Officer and an expert interview coach, providing direct, comprehensive, and highly detailed feedback to a student applicant. Your tone must be firm, fair, and exceptionally constructive.

    **CRITICAL CONTEXT:** You are analyzing a raw machine transcription of a **SPOKEN** answer. You **MUST IGNORE** issues related to punctuation, capitalization, or run-on sentences, as these are artifacts of transcription, not written errors. Do not comment on grammatical errors that are common in spoken language. Instead, focus your entire in-depth assessment on:
    1.  **Content & Relevance:** Did the student directly answer the question? How detailed and specific was the answer? Was it relevant to their personal profile and the course?
    2.  **Clarity & Structure:** Was the argument logical and easy to follow, even if spoken informally? Did they structure their thoughts coherently?
    3.  **Persuasiveness & Confidence:** Did the answer sound confident, credible, and genuine? Did they effectively sell themselves?

    Your response must be clean HTML and provide a **much more comprehensive and detailed analysis** than a standard review.

    1.  **Overall Score**: Provide a single integer score from 1 to 10 based on the spoken criteria above. This MUST be the first line. Format: <p><strong>Score:</strong> [Your Score]</p>.
    2.  **Executive Summary**: Start with a brief, insightful paragraph summarizing the overall strengths and the single most important area for improvement.
    3.  **Detailed Feedback**:
        -   Create a "What You Did Well" section within a <div class="feedback-section feedback-positive">. It MUST start with an <h5> containing an appropriate SVG icon and the title "What You Did Well". Provide **at least two specific, bulleted points**. For each point, quote a phrase from their answer (using <mark>) and explain exactly why it was effective.
        -   Create an "Areas for Improvement" section within a <div class="feedback-section feedback-improvement">. It MUST start with an <h5> containing an appropriate SVG icon and the title "Areas for Improvement". Provide **at least two specific, bulleted points** on the most critical weaknesses. For each point, explain the issue clearly and describe its potential negative impact on the visa officer.
    4.  **Actionable Coaching Tip**: Conclude with a powerful, actionable tip. This section **MUST** be wrapped in <div class="feedback-section feedback-coaching">. It MUST start with an <h5> containing an appropriate SVG icon and the title "Actionable Coaching Tip". Then, provide the tip or a "Suggested Rephrasing" paragraph. This should be a tangible takeaway.`;
    
    const userQuery = `University: ${profile.university}\nCourse Level: ${profile.courseLevel}\nCourse: ${profile.course}\nQuestion: "${question}"\nApplicant's Answer: "${transcript}"`;
    
    // FIX: The `generateContent` function expects only one argument. The AbortSignal from the second argument has been removed to resolve the error.
    const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: userQuery,
        config: {
            systemInstruction: systemPrompt
        },
    });

    return response.text || '';
};

export const transcribeAudio = async (audioBase64: string, mimeType: string, signal: AbortSignal) => {
    const audioPart = {
        inlineData: {
            mimeType: mimeType,
            data: audioBase64,
        },
    };
    const textPart = {
        text: "Transcribe this audio recording of a student practicing for a UK university admissions interview. The transcript should be as accurate as possible. Do not add any extra commentary, just provide the raw text of what was spoken."
    };
    
    const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [audioPart, textPart] },
    });

    return response.text || '';
};

export const translateText = async (textToTranslate: string, languageName: string, signal: AbortSignal) => {
    const prompt = `Translate the text portions of the following content into ${languageName}. Keep all HTML tags like <h4> and <strong> exactly as they are. The question and the answer content are separated by "|||". Return the translated parts separated by "|||".\n\n${textToTranslate}`;
    // FIX: The `generateContent` function expects only one argument. The AbortSignal from the second argument has been removed to resolve the error.
    const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text || '';
};

export const translateHtmlFragment = async (html: string, languageName: string, signal: AbortSignal) => {
    const prompt = `Translate only the user-facing text in the following HTML content into ${languageName}. Keep ALL HTML tags, classes, and the overall structure exactly the same. Do not translate any text inside an element with the class 'notranslate'. Do not translate HTML tags or attributes. For example, if you see '<h5>...</h5>What You Did Well', only translate 'What You Did Well'.\n\n${html}`;
    // FIX: The `generateContent` function expects only one argument. The AbortSignal from the second argument has been removed to resolve the error.
    const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text || '';
};