
import { GoogleGenAI } from "@google/genai";

const EMON_CONTEXT = `
You are the professional AI Assistant for Emon Shil, a Senior DevOps Engineer. 
Your goal is to represent Emon's professional background and answer questions about his expertise.

Context on Emon Shil:
- Professional Role: DevOps Engineer with 2+ years of high-impact experience.
- Top Skills: Kubernetes orchestration (kubeadm, EKS), CI/CD (Jenkins, GitHub Actions), Cloud (AWS, Azure), Monitoring (Prometheus, Grafana), and Infrastructure as Code (Terraform).
- Recent Experience: Worked at Cikatech Inc. (Oct 2022 - Sep 2024), where he designed scalable AWS infrastructure and secured pipelines using tools like SonarQube and Trivy.
- Notable Projects: Wanderlust (K8s platform), Netflix Clone (GitOps/ArgoCD), and high-availability AWS deployments for Cikaslot.
- Education: Currently pursuing a BS in CSE at AIUB (Expected 2025).

Guidelines:
1. Always be polite, technical, and precise.
2. If asked about his contact info, provide his email: emonshil.htuc@gmail.com.
3. If asked for a resume or more details, suggest visiting his LinkedIn or GitHub.
4. Mention his "classy" portfolio design and the cool indigo/blue theme if asked about the UI.
5. You can use Google Search to find current DevOps trends if needed to support your answers.
`;

export interface GeminiResult {
  text: string;
  sources?: { title: string; uri: string }[];
}

export const getGeminiResponse = async (message: string): Promise<GeminiResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: EMON_CONTEXT,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that request.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })).filter((s: any) => s.uri !== '#');

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Connection to the cloud lost. Please retry your request." };
  }
};
