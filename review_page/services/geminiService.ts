
import { GoogleGenAI, Type } from "@google/genai";
import type { ScriptResult, TestimonialData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateTrilingualScript = async (data: TestimonialData): Promise<ScriptResult> => {
    const { name, type, score, topic } = data;

    const prompt = `
        You are an expert scriptwriter for student testimonials at an institute in Vadodara, Gujarat called EEC.
        Your task is to generate an engaging, approximately 150 words, in natural-sounding and conversational speaking style testimonial script in very simple English.
        Then, you must translate this script accurately into both Hindi (using Devanagari script) and Gujarati (using Gujarati script).

        The script must be customized based on the following details:
        - Student's First Name: ${name}
        - Testimonial Type: ${type}
        - Their Stated Result: "${score}"
        - The Key Topic they want to talk about: "${topic}"

        **CRITICAL INSTRUCTIONS:**
        1.  **Customize Content:** Tailor the script's content to the 'Testimonial Type'. For example:
            - If the type is 'IELTS', 'PTE', 'TOEFL', etc., mention modules like Speaking, Writing, Listening, Reading (or as per the specific format of the test talked about), mock tests, or computer-based vs paper-based tests.
            - If the type is 'Student_Visa', talk about the smooth application process, documentation guidance from EEC, and the feeling of getting the visa approved.
            - If the type is 'Spoken_English', talk about gaining confidence, improving fluency, and practical activities in the course.
        2.  **Follow a Strict Format:** The script must always start with the student's first name, then state their achievement, and then elaborate on their experience/tip related to the topic.
        3.  **Tone:** The tone should be positive, confident, and genuinely helpful.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        english: { "type": Type.STRING },
                        hindi: { "type": Type.STRING },
                        gujarati: { "type": Type.STRING }
                    },
                    required: ["english", "hindi", "gujarati"]
                }
            }
        });

        const generatedContentText = response.text;
        if (!generatedContentText) {
            throw new Error("Invalid or empty response from Gemini API.");
        }
        
        const scripts: ScriptResult = JSON.parse(generatedContentText);
        
        if (scripts.english && scripts.hindi && scripts.gujarati) {
            return scripts;
        } else {
            throw new Error("Parsed response did not contain the required script fields.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while generating the script.");
    }
};
