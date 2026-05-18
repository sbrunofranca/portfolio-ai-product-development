import Groq from "groq-sdk";
import dotenv from "dotenv";

import { AIProvider } from "./provider";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export class GroqProvider implements AIProvider {
  async generate(
    prompt: string,
    system?: string
  ): Promise<string> {
    try {
      const response =
        await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",

          temperature: 0,

          messages: [
            {
              role: "system",
              content: system || "",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return (
        response.choices[0]?.message
          ?.content || ""
      );
    } catch (error) {
      console.error(
        "[GroqProvider] Generation Error:"
      );

      console.error(error);

      throw error;
    }
  }
}