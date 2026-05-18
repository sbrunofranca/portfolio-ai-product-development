import {
  DiscoveryOutput,
  DiscoverySchema,
} from "../../schemas/discovery.schema";

import { ContextOutput } from "../../schemas/context.schema";

import { Agent } from "../../src/shared/types";

import { AIProvider } from "../../src/lib/ai/provider";

import { readPrompt } from "../../src/utils/read-prompt";

import { safeJsonParse } from "../../src/utils/parse-json";

export class DiscoveryAgent
  implements
    Agent<
      ContextOutput,
      DiscoveryOutput
    >
{
  name = "Discovery Agent";

  constructor(
    private provider: AIProvider
  ) {}

  async execute(
    input: ContextOutput
  ): Promise<DiscoveryOutput> {
    try {
      console.log(
        "[DiscoveryAgent] Starting execution"
      );

      const systemPrompt = readPrompt(
        "prompts/discovery-agent/system.txt"
      );

      const userPrompt = `
Analyze the following structured product context.

Context:
${JSON.stringify(input, null, 2)}
`;

      console.log(
        "[DiscoveryAgent] Calling AI provider"
      );

      const text =
        await this.provider.generate(
          userPrompt,
          systemPrompt
        );

      console.log(
        "[DiscoveryAgent] Raw response received"
      );

      const parsed =
        safeJsonParse(text);

      console.log(
        "[DiscoveryAgent] JSON parsed successfully"
      );

      const validated =
        DiscoverySchema.parse(parsed);

      console.log(
        "[DiscoveryAgent] Schema validation successful"
      );

      return validated;
    } catch (error) {
      console.error(
        "[DiscoveryAgent] Execution failed"
      );

      console.error(error);

      throw error;
    }
  }
}