import { GoogleGenAI, Type } from "@google/genai";
import type { Profile, PrepContent, HistoryItem, Question } from '../types';

// FIX: Do not create a global AI client instance. Instead, create it on-demand within each function.
// This ensures the API key from process.env is available at the time of the API call, resolving race conditions on app load.
const getAiClient = () => {
    // The error "An API Key must be set..." is thrown by the constructor if the key is missing.
    // Per guidelines, we must assume process.env.API_KEY is configured and available in the execution context.
    // By creating the instance just-in-time, we ensure we read the key at the moment of the API call.
    return new GoogleGenAI({ apiKey: process.env.API_KEY! });
};

const buildProfileSummary = (profile: Profile, fromSop: boolean): string => {
    if (fromSop) {
        return profile.gsAnswersText;
    }
    const workExperienceSummary = profile.workExperience.length > 0 
        ? profile.workExperience.map(exp => `${exp.type} at ${exp.employerName} from ${exp.startDate} to ${exp.endDate}`).join('; ') 
        : 'None';
        
    const testScoresSummary = profile.testScores.length > 0
        ? profile.testScores.map(test => `${test.testType} on ${test.testDate}: Overall ${test.overall} (L:${test.listening}, R:${test.reading}, W:${test.writing}, S:${test.speaking})`).join('; ')
        : 'Not provided';

    return `
        The applicant is applying for a ${profile.courseLevel} in ${profile.courseName} at ${profile.institutionName}, a ${profile.institutionType}.
        Previous Qualification: ${profile.previousQualification} from ${profile.previousInstitution} (NOOSR Section: ${profile.previousInstitutionNOOSR}) with a grade of ${profile.previousGrade}.
        Work Experience: ${workExperienceSummary}.
        Career Goals in India: ${profile.careerGoals}.
        English Test Scores: ${testScoresSummary}.
        Total Funds Available: AUD $${profile.totalFunds}.
        Primary Sponsor: ${profile.primarySponsor}.
        Sponsor 1: ${profile.sponsor1Name} (${profile.sponsor1Profession}), Annual Income: AUD $${profile.sponsor1Income} (ITR: AUD $${profile.sponsor1ItrIncome}).
        ${profile.primarySponsor === 'Both Parents' ? `Sponsor 2: ${profile.sponsor2Name} (${profile.sponsor2Profession}), Annual Income: AUD $${profile.sponsor2Income} (ITR: AUD $${profile.sponsor2ItrIncome}).` : ''}
        Marital Status: ${profile.maritalStatus}. ${profile.maritalStatus === 'Married' ? `Married for ${profile.marriageDurationInMonths} months.` : ''}
        Relatives in Australia: ${profile.hasRelativesInAustralia === 'yes' ? 'Yes' : 'No'}.
        Visa Refusal History: ${profile.hasVisaRefusal === 'yes' ? `Yes, reason: ${profile.refusalReason}` : 'No'}.
        ${profile.gsAnswersText ? `\n\n--- Applicant's GS/SOP Text ---\n${profile.gsAnswersText}` : ''}
    `;
};


/**
 * Generates a personalized interview prep plan based on the user's profile.
 */
export const generatePrep = async (
    profile: Profile,
    onProgress: (message: string, progress: number) => void,
    options: { fromSop: boolean }
): Promise<PrepContent> => {
    const ai = getAiClient();
    onProgress('Building your personalized profile...', 10);
    const profileSummary = buildProfileSummary(profile, options.fromSop);

    let pswInstruction = `- **Post-Study Work (PSW) Strategy:** Explain how the Temporary Graduate visa (subclass 485) will be used for valuable work experience *before* returning to India. Mention benefits from the Australia-India ECTA (Bachelor's: 2 years, Master's: 3 years, PhD: 4 years; with an additional year for STEM Honours) and any regional bonuses if applicable.`;
    const courseLevelLower = (profile.courseLevel || '').toLowerCase();
    if (courseLevelLower.includes('diploma')) {
        pswInstruction = `- **Post-Study Work (PSW) & Course Pathways:** CRITICAL: The applicant is studying a Diploma. Under the Australia-India ECTA, Indian students are eligible for up to 18 months of PSW for a standalone Diploma/VET qualification. If the course is packaged with a degree, they are only eligible for PSW *after* completing the degree. Your narrative MUST reflect this understanding clearly, showing the applicant is aware of these special rules and not misinterpreting their eligibility.`;
    }

    const promptInstructions = `
        **IMPORTANT:** The 'GTE' (Genuine Temporary Entrant) requirement is now obsolete. You MUST refer to the new 'Genuine Student' (GS) requirement in all responses. Do NOT mention GTE.

        **Your Task:**
        1.  **Generate a "Strategic Narrative" (Key Talking Points):** Analyze the profile/SOP and create a detailed, bulleted list in HTML format. This is the student's core strategy. It MUST cover:
            - **Course & Provider Justification:** Why this specific course at this university is superior to Indian/other international options.
            - **Career Progression:** A clear path from past studies -> this course -> specific high-demand roles back in India (quoting expected INR salaries).
            - **Financial Soundness:** A summary of the financial plan, emphasizing the adequacy of funds.
            - ${pswInstruction}
            - **Understanding of Obligations:** Acknowledge visa conditions, including current work rights (48 hours per fortnight) and the primary purpose of study.
            - **Ties to Home Country:** Reinforce strong financial and family incentives to return to India.
        2.  **Generate Interview Questions:** Create a list of interview questions (plain text). This list MUST be composed of two parts:
            - **Part A: Mandatory Questions:** You MUST include the 10 compulsory questions listed below, exactly as written.
            - **Part B: Profile-Specific Questions:** Generate an additional 10-15 highly specific questions a visa officer is likely to ask based on this profile/SOP, targeting potential weaknesses (e.g., study gaps, visa refusals, financial anomalies, career changes).

        **Mandatory Questions (Part A):**
        1. Why do you want to study in Australia?
        2. Why did you choose this specific university/provider?
        3. Why did you choose this particular course? How does it relate to your previous studies and future career plans?
        4. Can you tell me about your research into your course and provider? What are some of the subjects you will be studying?
        5. What are your career plans after completing your studies in Australia?
        6. What is your understanding of the post-study work rights (Temporary Graduate visa) in Australia?
        7. Who is sponsoring your education and living expenses? What is their occupation and annual income?
        8. Do you have any family or relatives in Australia?
        9. What are your incentives to return to your home country after your studies?
        10. Are you aware of the conditions of your student visa? (e.g., work rights, academic progress).

        **Formatting Rules:**
        - All HTML content MUST use rich formatting: \`<p>\`, \`<b>\`, \`<mark>\`.
        - All bulleted lists MUST use \`<ul>\` with \`<li class="checklist-item">\` for a checkmark style.

        **Output Format:**
        You MUST return a single, valid JSON object that strictly adheres to the following schema.
    `;

    const initialPrompt = options.fromSop 
    ? `
        Based on the following complete Statement of Purpose (SOP) from an Indian student, act as a senior Australian visa strategist from EEC Global.
        **Applicant's Full SOP / GS Answers:**
        ${profileSummary}
        ${promptInstructions}
    `
    : `
        Based on the following detailed profile of an Indian student, act as a senior Australian visa strategist from EEC Global.
        **Applicant Profile:**
        ${profileSummary}
        ${promptInstructions}
    `;
    
    // --- Step 1: Generate Key Talking Points and Question List ---
    onProgress('Generating tailored question list...', 20);
    const initialModel = 'gemini-2.5-pro';
    let initialResponseData: { keyTalkingPoints: string; questionList: string[] };

    try {
        const response = await ai.models.generateContent({
            model: initialModel,
            contents: initialPrompt,
            config: { 
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        keyTalkingPoints: { type: Type.STRING },
                        questionList: { 
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["keyTalkingPoints", "questionList"]
                }
            }
        });
        const initialResponseText = response.text ?? '';
        if (!initialResponseText.trim()) {
            throw new Error("AI returned an empty response during the initial planning phase.");
        }
        initialResponseData = JSON.parse(initialResponseText);
        if (!initialResponseData.keyTalkingPoints || !Array.isArray(initialResponseData.questionList) || initialResponseData.questionList.length < 10) { // Check for at least the mandatory 10
            throw new Error("Invalid initial JSON structure or insufficient questions received from AI.");
        }
    } catch (error) {
        console.error("Failed to parse initial AI response for prep generation:", error);
        throw new Error("The AI returned data in an unexpected format during the initial planning phase. Please try again.");
    }
    
    onProgress('Categorizing questions...', 30);

    // --- Step 2: Categorize questions and prepare for processing ---
    const { questionList } = initialResponseData;
    const groundingKeywords = ['university', 'college', 'course', 'compare', 'modules', 'subjects', 'campus', 'facilities', 'ranking', 'why this institution'];
    const groundingQuestions: string[] = [];
    const nonGroundingQuestions: string[] = [];

    questionList.forEach(q => {
        if (typeof q !== 'string') {
            return;
        }
        const lowerQ = q.toLowerCase();
        if (groundingKeywords.some(kw => lowerQ.includes(kw))) {
            groundingQuestions.push(q);
        } else {
            nonGroundingQuestions.push(q);
        }
    });

    const allQuestions: Question[] = new Array(questionList.length);
    let questionsProcessed = 0;
    const baseProgress = 30;
    const progressRange = 95 - baseProgress;

    // --- Step 3: Batch-process non-grounding questions ---
    if (nonGroundingQuestions.length > 0) {
        onProgress(`Generating answers for ${nonGroundingQuestions.length} questions...`, baseProgress);

        const batchedDetailPrompt = `
            You are an expert Australian visa consultant from EEC Global.
            **IMPORTANT:** The 'GTE' requirement is now obsolete. You MUST refer to the new 'Genuine Student' (GS) requirement. Do NOT mention GTE.
            
            **Applicant Profile Summary:**
            ${profileSummary}

            **Your Task:**
            For EACH question in the following JSON array, provide a "modelAnswer" and "guidance" in HTML format. The model answers must be deeply integrated with the specific details provided in the applicant's profile summary.
            When discussing Post-Study Work (PSW) rights, you MUST apply the special rules for Indian students under the Australia-India ECTA: Diploma/VET = 1.5 years, Bachelor's = 2 years, Bachelor's (1st Class Hons in STEM/ICT) = 3 years, Master's = 3 years, PhD = 4 years. Regional bonuses are additional.
            Return a single, valid JSON array of objects, matching the input array exactly.

            **Instructions for each question:**
            1.  **Model Answer:** Write an exemplary, detailed answer from the student's perspective.
            2.  **Guidance:** Write a concise paragraph explaining the *strategy* behind the model answer.
            3.  **Formatting:**
                - Use paragraphs \`<p>...\</p>\`.
                - For all bullet points, use \`<ul>\` with \`<li class="checklist-item">\`.
                - Use \`<b>\`, \`<mark>\`, and \`<u class="red-underline">\` for emphasis.

            **Questions to Process:**
            ${JSON.stringify(nonGroundingQuestions)}
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: batchedDetailPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                modelAnswer: { type: Type.STRING },
                                guidance: { type: Type.STRING }
                            },
                            required: ["question", "modelAnswer", "guidance"]
                        }
                    }
                }
            });
            const batchedResponseText = response.text ?? '';
            if (!batchedResponseText.trim()) {
                throw new Error("AI returned an empty response during the batch generation phase.");
            }
            const results: Question[] = JSON.parse(batchedResponseText);
            results.forEach(result => {
                const originalIndex = questionList.indexOf(result.question);
                if (originalIndex !== -1) {
                    allQuestions[originalIndex] = result;
                    questionsProcessed++;
                }
            });
            const currentProgress = baseProgress + (questionsProcessed / questionList.length) * progressRange;
            onProgress(`Generated ${nonGroundingQuestions.length} answers...`, Math.round(currentProgress));
        } catch (error) {
            console.error("Batch processing failed:", error);
            throw new Error("The AI failed during the batch generation phase. Please try again.");
        }
    }

    // --- Step 4: Individually process grounding-required questions ---
    for (const question of groundingQuestions) {
        const currentProgress = baseProgress + (questionsProcessed / questionList.length) * progressRange;
        onProgress(`Researching: "${question.substring(0, 40)}..."`, Math.round(currentProgress));

        const groundingDetailPrompt = `
            You are an expert Australian visa consultant from EEC Global.
             **IMPORTANT:** The 'GTE' requirement is now obsolete. You MUST refer to the new 'Genuine Student' (GS) requirement. Do NOT mention GTE.

            **Applicant Profile Summary:**
            ${profileSummary}

            **Your Task:**
            For the following question, provide a "Model Answer" and "Guidance". The model answer must be deeply integrated with the specific details from the profile.
            When discussing Post-Study Work (PSW) rights, you MUST apply the special rules for Indian students under the Australia-India ECTA: Diploma/VET = 1.5 years, Bachelor's = 2 years, Bachelor's (1st Class Hons in STEM/ICT) = 3 years, Master's = 3 years, PhD = 4 years. Regional bonuses are additional.
            
            **CRITICAL INSTRUCTION:** You MUST use Google Search to find up-to-date, factual information, restricted to the official website of "${profile.institutionName}".

            **Question:** "${question}"

            **Instructions:**
            1.  **Model Answer:** Write an exemplary HTML answer incorporating facts from your search.
            2.  **Guidance:** Write a concise HTML paragraph explaining the strategy.
            3.  **Formatting:** Use \`<p>\`, \`<li class="checklist-item">\`, \`<b>\`, \`<mark>\`, and \`<u class="red-underline">\`.

            **Output Format:**
            Your response MUST have two parts separated by a unique delimiter: "<!--[--GUIDANCE-SEPARATOR--]-->".
            - The first part is the "modelAnswer" HTML.
            - The second part is the "guidance" HTML.
            Do not add any other text, explanations, or formatting like markdown fences around the output.
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: groundingDetailPrompt,
                config: {
                    tools: [{ googleSearch: {} }],
                }
            });
            
            const separator = "<!--[--GUIDANCE-SEPARATOR--]-->";
            let modelAnswer = '';
            let guidance = '';

            if (response.text && response.text.includes(separator)) {
                const parts = response.text.split(separator);
                modelAnswer = parts[0].trim();
                guidance = parts[1].trim();
            } else if (response.text && response.text.trim().length > 50) { // Fallback: if there's content, assume it's the model answer
                console.warn(`Separator not found for question: "${question}". Using entire response as model answer and adding generic guidance.`);
                modelAnswer = response.text.trim();
                guidance = `<p><b>Guidance:</b> Focus on showing genuine, specific research into the course. Mentioning exact subject names proves you've gone beyond the course title and truly understand what you'll be studying.</p>`;
            } else { // Final fallback for empty or error-like responses
                console.error(`Grounding failed for question: "${question}". AI returned an empty or invalid response:`, response.text);
                modelAnswer = `<p>The AI could not generate a model answer for this question due to a research failure. Please try again or focus on other questions.</p>`;
                guidance = `<p><b>Guidance:</b> This question requires specific research. Please visit the official website for ${profile.institutionName}, find the page for the ${profile.courseName}, and identify key subjects or modules to discuss.</p>`;
            }

            const result = { modelAnswer, guidance };
            const originalIndex = questionList.indexOf(question);
            if (originalIndex !== -1) {
                allQuestions[originalIndex] = { question, ...result };
                questionsProcessed++;
            }
        } catch (error) {
            console.error(`Grounding processing failed for question: ${question}`, error);
            // Even if the API call itself throws, we should add a placeholder to not lose the question
            const modelAnswer = `<p>The AI could not generate a model answer for this question due to an API error. Please try again.</p>`;
            const guidance = `<p><b>Guidance:</b> An error occurred. Please try generating the prep plan again.</p>`;
            const result = { modelAnswer, guidance };
            const originalIndex = questionList.indexOf(question);
            if (originalIndex !== -1) {
                allQuestions[originalIndex] = { question, ...result };
                questionsProcessed++; // Still count it as "processed" to avoid hanging progress
            }
        }
    }

    // --- Step 5: Finalize and return ---
    onProgress('Finalizing your prep plan...', 98);
    const finalQuestions = allQuestions.filter(Boolean);
    if (finalQuestions.length !== questionList.length) {
         console.warn("Mismatch in question count. Some questions may have failed to generate.");
    }
    
    onProgress('Done!', 100);
    return {
        keyTalkingPoints: initialResponseData.keyTalkingPoints,
        questions: finalQuestions,
    };
};


/**
 * Analyzes a user's answer and provides feedback and a score.
 */
export const analyzeAnswer = async (
    profile: Profile,
    question: string,
    transcript: string
): Promise<Pick<HistoryItem, 'feedback' | 'score'>> => {
    const ai = getAiClient();
    
    let pswAnalysisInstruction = `
        **ANALYSIS POINT FOR PSW:** Evaluate the user's PSW answer against the correct AI-ECTA rules for Indian students (Diploma=1.5y, Bachelor's=2y, Bachelor's with STEM Hons=3y, Master's=3y, PhD=4y). Acknowledge correct answers and gently correct any outdated information.
    `;
    if (profile.courseLevel.toLowerCase().includes('diploma')) {
        pswAnalysisInstruction = `
            **CRITICAL ANALYSIS POINT:** The applicant is a Diploma-level student. Under the AI-ECTA, Indian students are eligible for up to 18 months of PSW for standalone Diplomas/VET courses. 
            - If the student correctly states this, praise them for excellent research. 
            - If they incorrectly state they are not eligible, you MUST correct them and flag it as a missed opportunity to show awareness of the beneficial ECTA agreement.
            - If their course is packaged, they are only eligible after the degree. Check if their answer reflects this nuance.
        `;
    }

    const prompt = `
        You are an AI-powered Australian visa interview coach for EEC Global. Your task is to analyze a student's answer and provide constructive, beautifully formatted feedback and a score.
        
        **IMPORTANT:** The 'GTE' requirement is now obsolete. You MUST refer to the new 'Genuine Student' (GS) requirement. Do NOT mention GTE.

        **Applicant's Background (for context):**
        - Applying for: ${profile.courseName} (${profile.courseLevel}) at ${profile.institutionName}.
        - Key Goal: To return to India and become a ${profile.careerGoals}.

        **The Interview Scenario:**
        - **Question Asked:** "${question}"
        - **Student's Spoken Answer (Transcript):** "${transcript}"

        **Your Analysis Task:**
        1.  **Evaluate the answer** against the Genuine Student (GS) criteria. Consider clarity, confidence, relevance, and how it reinforces their incentive to return to India.
        ${pswAnalysisInstruction}
        2.  **Provide Feedback in HTML:** Structure your response as follows:
            - Start with \`<div class="feedback-good">\`, include \`<h4>What Went Well</h4>\`, and a \`<ul>\` list.
            - Follow with \`<div class="feedback-improve">\`, include \`<h4>Areas for Improvement</h4>\`, and a \`<ul>\` list.
            - For all list items, you MUST use \`<li class="checklist-item">\`.
            - Use rich formatting: \`<b>\`, \`<mark>\` for highlighting transcript phrases, and \`<u class="red-underline">\` for critical advice.
    3.  **Assign a Score:** Give a score from 1 to 10.

        **Output Format:**
        You MUST return a single, valid JSON object that strictly adheres to the following schema.
    `;

    const model = 'gemini-2.5-flash';
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        feedback: { type: Type.STRING },
                        score: { type: Type.INTEGER }
                    },
                    required: ["feedback", "score"]
                }
            }
        });

        const jsonString = response.text ?? '';
        if (!jsonString.trim()) {
            throw new Error("AI returned an empty response for answer analysis.");
        }
        const result = JSON.parse(jsonString);

        if (typeof result.feedback !== 'string' || typeof result.score !== 'number') {
            throw new Error("Invalid JSON structure for feedback.");
        }
        return result;

    } catch (error) {
        console.error("Failed to parse AI response for answer analysis:", error);
        throw new Error("The AI returned feedback in an unexpected format. Please try again.");
    }
};

/**
 * Translates HTML content to a specified language.
 */
export const translateHtmlContent = async (html: string, lang: string): Promise<string> => {
    if (!lang || lang === 'en') {
        return html;
    }

    const ai = getAiClient();
    const languageMap: { [key: string]: string } = {
        hi: 'Hindi',
        gu: 'Gujarati',
        mr: 'Marathi',
        pa: 'Punjabi',
        bn: 'Bengali',
        or: 'Oriya',
        ta: 'Tamil',
        te: 'Telugu',
        kn: 'Kannada',
        ml: 'Malayalam',
    };

    const language = languageMap[lang];
    if (!language) {
        console.warn(`Unsupported language code: ${lang}`);
        return html; // Return original if lang code is unknown
    }

    const prompt = `
        Translate the following HTML content into ${language}.
        - **IMPORTANT:** Preserve all HTML tags and class attributes exactly as they are. Only translate the text content within the tags.
        - Do not add any extra explanations or text outside of the translated HTML.
        - Proper nouns (like university names, "EEC Global") should remain in English.

        **HTML to Translate:**
        \`\`\`html
        ${html}
        \`\`\`
    `;

    const model = 'gemini-2.5-flash';
    try {
        const response = await ai.models.generateContent({ model, contents: prompt });

        const responseText = response.text ?? '';
        let translatedHtml = responseText.trim();
        if (translatedHtml.startsWith('```html')) {
            translatedHtml = translatedHtml.substring(7);
        }
        if (translatedHtml.endsWith('```')) {
            translatedHtml = translatedHtml.slice(0, -3);
        }
        return translatedHtml.trim();
    } catch (error) {
        console.error("Translation API call failed:", error);
        throw new Error("Translation failed. Please try again.");
    }
};

/**
 * Transcribes an audio blob into text.
 */
export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
    const ai = getAiClient();
    try {
        const audioPart = {
            inlineData: {
                data: base64Audio,
                mimeType: mimeType,
            },
        };

        const textPart = {
            text: "Transcribe this audio recording of a person answering an interview question. The language is English, likely with an Indian accent. If the audio is unclear or silent, respond with the text 'Could not transcribe audio: audio is unclear or silent.' and nothing else.",
        };

        const model = 'gemini-2.5-pro'; // Pro model is better for speech recognition accuracy.
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [audioPart, textPart] },
        });

        const transcript = (response.text ?? '').trim();

        if (!transcript) {
            return "Could not transcribe audio: The AI returned an empty response.";
        }

        return transcript;

    } catch (error) {
        console.error("Transcription API call failed:", error);
        if (error instanceof Error && error.message.includes('permission')) {
             return "Could not transcribe audio: An API permission error occurred. Please check the API key.";
        }
        return "Could not transcribe audio: An unexpected error occurred during transcription.";
    }
};
