
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import { GroundingChunk } from '../types';

// IMPORTANT: The API key must be set in the environment variables.
// Do not hardcode the API key in the code.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });

const MAX_RETRIES = 3;

/**
 * Checks if an error is a rate-limiting or resource exhaustion error that can be retried.
 * @param error The error object.
 * @returns True if the error is retryable, false otherwise.
 */
const isRetryableError = (error: any): boolean => {
    const message = (error.message || '').toLowerCase();
    // Check for status code 429 or common resource exhaustion messages.
    return message.includes('429') || message.includes('resource has been exhausted') || message.includes('rate limit');
};

/**
 * A wrapper function to retry an API call with exponential backoff.
 * @param apiCall The function that makes the API call.
 * @returns The result of the API call.
 */
async function withRetry<T,>(apiCall: () => Promise<T>): Promise<T> {
  let lastError: Error = new Error("API call failed after all retries.");
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await apiCall();
    } catch (error: any) {
      lastError = error;
      if (isRetryableError(error) && i < MAX_RETRIES - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000; // Exponential backoff with jitter
        console.warn(`API call failed with a retryable error. Retrying in ${Math.round(delay / 1000)}s... (Attempt ${i + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // Non-retryable error or max retries reached
        console.error("API call failed after multiple retries or due to a non-retryable error.", error);
        throw error;
      }
    }
  }
  throw lastError; // This line is for type safety and should not be reached.
}


export const generateQuizForContent = async (content: string, title: string) => {
  const apiCall = () => ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      role: 'user',
      parts: [{ text: `Based on the following content titled "${title}", create a 3-question multiple-choice quiz. For each question, provide 4 options and indicate the correct answer.

Content:
---
${content}
---
`}]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quiz: {
            type: Type.ARRAY,
            description: 'An array of quiz questions.',
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING }
              },
              required: ['question', 'options', 'correctAnswer']
            }
          }
        }
      }
    }
  });

  try {
    const response = await withRetry(apiCall);
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};

export const searchWeb = async (query: string): Promise<{ text: string; citations: GroundingChunk[] }> => {
  const apiCall = () => ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { role: 'user', parts: [{ text: query }] },
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  try {
    const response = await withRetry(apiCall);
    const text = response.text;
    const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    return { text, citations: citations as GroundingChunk[] };
  } catch (error) {
    console.error("Error performing web search:", error);
    return { text: "Sorry, I couldn't perform the web search.", citations: [] };
  }
};

export const searchInternalDocs = async (query: string, context: string) => {
  const prompt = `You are a helpful training assistant for product managers. Answer the user's question based *only* on the provided internal documents. If the answer is not in the documents, say "I couldn't find an answer in the internal documents." Do not use any external knowledge.

Internal Documents:
---
${context}
---

User Question: "${query}"`;

  const apiCall = () => ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { role: 'user', parts: [{ text: prompt }] },
    config: {
      temperature: 0.1,
    }
  });

  try {
    const response = await withRetry(apiCall);
    return response.text;
  } catch (error) {
    console.error("Error searching internal docs:", error);
    return "Sorry, an error occurred while searching the internal documents.";
  }
};

export const generateTrainingPlan = async (objectiveTitle: string, objectiveDescription: string) => {
  const prompt = `As an expert instructional designer, create a concise, step-by-step training plan for a new product manager to achieve the following objective. Break it down into 3-5 logical learning modules. For each module, provide a brief title and a one-sentence description.

Objective Title: ${objectiveTitle}
Objective Description: ${objectiveDescription}`;

  const apiCall = () => ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: { role: 'user', parts: [{ text: prompt }] },
  });

  try {
    const responseStream = await withRetry(apiCall);
    let fullResponse = "";
    for await (const chunk of responseStream) {
        fullResponse += chunk.text;
    }
    return fullResponse;
  } catch (error) {
    console.error("Error generating training plan:", error);
    return "Could not generate a training plan at this time.";
  }
};
