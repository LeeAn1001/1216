import { API_KEY, API_URL, MODEL_ID, ORACLE_PERSONA_DEFINITION } from '../constants';
import { OracleResponse } from '../types';

/**
 * Calls the OpenRouter API to get the Oracle's response.
 * Merges system prompt into user content as requested.
 */
export const fetchOracleAdvice = async (userQuery: string): Promise<string> => {
  const cleanQuery = userQuery.trim() || "（使用者選擇留白，僅心中默唸困惑）";

  // Merging System Prompt into User Content strictly as requested
  const mergedContent = `
${ORACLE_PERSONA_DEFINITION}

---
使用者當前的困惑或情境：
${cleanQuery}

請依照汝之角色設定，給予一句文言文箴言：
`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        // HTTP-Referer and X-Title are optional but good practice for OpenRouter rankings
        'HTTP-Referer': 'https://oracle-book-ai.com', 
        'X-Title': 'AI Book of Answers',
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: 'user', // STRICT REQUIREMENT: System prompt merged here
            content: mergedContent,
          },
        ],
        temperature: 0.9, // Higher temperature for more abstract/creative results
        max_tokens: 100,  // Keep it short as per spec (1-3 sentences)
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OracleResponse = await response.json();
    const rawContent = data.choices[0]?.message?.content || "";

    // Post-processing to ensure clean output (sometimes models add quotes or explanations)
    // We strictly want the axiom.
    let cleanContent = rawContent.trim();
    
    // Remove wrapping quotes if present
    if (cleanContent.startsWith('"') && cleanContent.endsWith('"')) {
      cleanContent = cleanContent.slice(1, -1);
    }
    if (cleanContent.startsWith('「') && cleanContent.endsWith('」')) {
      cleanContent = cleanContent.slice(1, -1);
    }

    return cleanContent;

  } catch (error) {
    console.error("Oracle Service Error:", error);
    throw error;
  }
};
