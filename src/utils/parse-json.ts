import { extractJson } from "./extract-json";

export function safeJsonParse(text: string) {
  try {
    const extracted =
      extractJson(text);

    return JSON.parse(extracted);
  } catch (error) {
    console.error(
      "[safeJsonParse] Invalid JSON:"
    );

    console.error(error);

    console.error(
      "[safeJsonParse] Raw response:"
    );

    console.error(text);

    throw new Error(
      "Invalid JSON response from LLM"
    );
  }
}