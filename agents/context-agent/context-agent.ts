import {
  ContextOutput,
  ContextSchema,
} from "../../schemas/context.schema";

import { Agent } from "../../src/shared/types";

import { AIProvider } from "../../src/lib/ai/provider";

import { readPrompt } from "../../src/utils/read-prompt";

import { safeJsonParse } from "../../src/utils/parse-json";

export class ContextAgent
  implements Agent<string, ContextOutput>
{
  name = "Context Agent";

  constructor(
    private provider: AIProvider
  ) {}

  async execute(
    input: string
  ): Promise<ContextOutput> {
    try {
      console.log(
        "[ContextAgent] Starting execution"
      );

      const systemPrompt = readPrompt(
        "prompts/context-agent/system.txt"
      );

      const userPrompt = `
Analyze the following project context.

Project Context:
${input}
`;

      console.log(
        "[ContextAgent] Calling AI provider"
      );

      const text =
        await this.provider.generate(
          userPrompt,
          systemPrompt
        );

      console.log(
        "[ContextAgent] Raw response received"
      );

      const parsed = safeJsonParse(text);

      console.log(
        "[ContextAgent] JSON parsed successfully"
      );

      const validated =
        ContextSchema.parse(parsed);

      console.log(
        "[ContextAgent] Schema validation successful"
      );

      return validated;
    } catch (error) {
      console.error(
        "[ContextAgent] Execution failed"
      );

      console.error(error);

      throw error;
    }
  }
}