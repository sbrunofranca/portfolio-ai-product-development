import {
  SddOutput,
  SddSchema,
} from "../../schemas/sdd.schema";

import { ContextOutput } from "../../schemas/context.schema";

import { DiscoveryOutput } from "../../schemas/discovery.schema";

import { ProductSpecOutput } from "../../schemas/product-spec.schema";

import { Agent } from "../../src/shared/types";

import { AIProvider } from "../../src/lib/ai/provider";

import { readPrompt } from "../../src/utils/read-prompt";

import { safeJsonParse } from "../../src/utils/parse-json";

export interface SddInput {
  context: ContextOutput;

  discovery: DiscoveryOutput;

  productSpec: ProductSpecOutput;
}

export class SddAgent
  implements Agent<SddInput, SddOutput>
{
  name = "SDD Agent";

  constructor(
    private provider: AIProvider
  ) {}

  async execute(
    input: SddInput
  ): Promise<SddOutput> {
    try {
      console.log(
        "[SddAgent] Starting execution"
      );

      const systemPrompt = readPrompt(
        "prompts/sdd-agent/system.txt"
      );

      const userPrompt = `
Generate a System Design Document.

Context:
${JSON.stringify(
  input.context,
  null,
  2
)}

Discovery:
${JSON.stringify(
  input.discovery,
  null,
  2
)}

Product Specification:
${JSON.stringify(
  input.productSpec,
  null,
  2
)}
`;

      console.log(
        "[SddAgent] Calling AI provider"
      );

      const text =
        await this.provider.generate(
          userPrompt,
          systemPrompt
        );

      console.log(
        "[SddAgent] Raw response received"
      );

      const parsed =
        safeJsonParse(text);

      console.log(
        "[SddAgent] JSON parsed successfully"
      );

      const validated =
        SddSchema.parse(parsed);

      console.log(
        "[SddAgent] Schema validation successful"
      );

      return validated;
    } catch (error) {
      console.error(
        "[SddAgent] Execution failed"
      );

      console.error(error);

      throw error;
    }
  }
}