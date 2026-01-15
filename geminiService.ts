
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, ActivityDay, AIAdvice } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAICoachAdvice = async (
  profile: UserProfile,
  recentActivity: ActivityDay[]
): Promise<AIAdvice> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    As a professional health and fitness AI coach, analyze the user's profile and activity.
    
    User Profile:
    - Name: ${profile.name}
    - Age: ${profile.age}
    - Goal: ${profile.goal}
    - Daily Step Goal: ${profile.dailyStepGoal}
    
    Recent Activity (Last 3 days):
    ${recentActivity.map(day => `- ${day.date}: ${day.steps} steps`).join('\n')}
    
    Provide personalized, motivating advice and a health tip.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: "A friendly personalized analysis of their progress." },
            motivation: { type: Type.STRING, description: "A punchy motivational quote or statement." },
            tip: { type: Type.STRING, description: "A practical walking or health tip." }
          },
          required: ["message", "motivation", "tip"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as AIAdvice;
  } catch (error) {
    console.error("AI Coach Error:", error);
    return {
      message: "Keep up the great work! Consistency is key to achieving your fitness goals.",
      motivation: "Every step is progress.",
      tip: "Drinking water before a walk can boost your metabolism."
    };
  }
};

export const suggestDailyGoal = async (profile: Partial<UserProfile>): Promise<number> => {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Based on this user profile, suggest a realistic starting daily step goal:
    - Age: ${profile.age}
    - Height: ${profile.height}cm
    - Weight: ${profile.weight}kg
    - Goal: ${profile.goal}
    - Activity Level: ${profile.activityLevel}
    
    Return ONLY a single integer between 5000 and 15000.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });
    const goal = parseInt(response.text?.trim() || "10000");
    return isNaN(goal) ? 10000 : goal;
  } catch (error) {
    return 8000;
  }
};
