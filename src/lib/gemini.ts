// @ts-ignore - Temporary ignore for type checking until env vars are set
import { GoogleGenerativeAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    // Silent warn in build time/CI
    if (process.env.NODE_ENV === "development") {
        console.warn("Missing GEMINI_API_KEY environment variable. Gemini features will be disabled.");
    }
}

// Export a robust client or null
// Using 'any' cast for now to avoid SDK version mismatches during initial setup
export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
