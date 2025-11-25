import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY || ''; 
    // In a real app, handle missing key gracefully, but for this demo assume env is present or strict mode handles it.
    if (!apiKey) console.warn("API Key is missing!");
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const initChat = () => {
  const client = getClient();
  chatSession = client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });
};

export const sendMessageToJojo = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChat();
  }
  if (!chatSession) throw new Error("Chat session failed to initialize");

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Désolé, je suis momentanément indisponible.";
  } catch (error) {
    console.error("Error communicating with JOJO:", error);
    return "Je rencontre une légère difficulté technique. Veuillez m'excuser.";
  }
};