import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// 1. Image Editing (Nano Banana / Gemini 2.5 Flash Image)
export const editImage = async (base64Image: string, prompt: string, mimeType: string = 'image/png'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Edit this image: ${prompt}. Return ONLY the image.`
          },
        ],
      },
    });

    // Check for inline data (image) in response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};

// 2. Chat (Gemini 3 Pro)
export const sendChatMessage = async (history: { role: string, parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: "Você é o assistente virtual da Onzy. Você é profissional, prestativo e fala português. Seu objetivo é ajudar clientes a entenderem os serviços da Onzy (sites, automação, design, sistemas). Seja breve e direto.",
      }
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return result.text || "Desculpe, não consegui processar sua resposta.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "Ocorreu um erro ao conectar com a IA.";
  }
};

// 3. Fast Response (Gemini 2.5 Flash Lite)
export const generateFastInsight = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Gere uma frase curta, impactante e vendedora sobre: ${topic} para uma agência digital chamada Onzy. Max 20 palavras.`,
    });
    return response.text || "Inovação ao seu alcance.";
  } catch (error) {
    console.error("Fast insight error:", error);
    return "Transformando o futuro digital.";
  }
};