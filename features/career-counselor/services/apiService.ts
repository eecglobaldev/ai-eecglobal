import { GoogleGenAI } from "@google/genai";
import { getInstitutionRules } from '../utils/institutionRules';
import { GuidanceReport } from '../types';

export const createPrompt = (course: string, country: string): string => {
  const institutionRules = getInstitutionRules(country);
  return `You are an expert career and education counselor. Generate a detailed guidance report for the course "${course}" in "${country}".

Provide the output in a valid JSON object format. Do not include any text or markdown formatting before or after the JSON object.

The JSON object must have the following keys:

- "course_explanation": An array of strings with a brief, simple overview of the course.
- "prospects": An array of strings describing career prospects in the specified country.
- "job_profiles": An array of strings listing exactly 10 common job titles.
- "industries": An array of strings listing up to 10 relevant industries.
- "salaries": An array of strings with average starting salaries for key roles, in local currency and converted to INR. Format as "Role: [Local Salary] (approx. ₹[INR Salary] Lakhs)".
- "top_companies": An array of strings listing 10 well-known hiring companies in the country.
- "job_search_websites": An array of strings listing 2-3 popular job search websites for that country.
- "immigration_relevance": An array of strings with a note on immigration relevance.
- "university_information": An array of minimum 10+ objects if available, where each object represents ONE institution and contains the following string keys: "institution_name", "related_courses", "tuition_fees_local_inr", "academic_requirements", "english_test_scores", "other_test_scores", "application_deadlines". For the "university_information", adhere strictly to the following rules: ${institutionRules}`;
};

export const callGeminiApi = async (prompt: string): Promise<GuidanceReport> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY_CAREER_COUNSELOR;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY_CAREER_COUNSELOR is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
      throw new Error("Empty response from AI model");
    }
    
    // The model might still wrap the JSON in markdown backticks
    const cleanedJsonText = jsonText.replace(/^```json\s*/, '').replace(/```$/, '');
    
    return JSON.parse(cleanedJsonText);
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error(
      "Failed to get a valid response from the AI model. It might be busy, or the response format was incorrect. Please try again."
    );
  }
};

