import {
  ProductSpecOutput,
  ProductSpecSchema,
} from "../../schemas/product-spec.schema";

import { ContextOutput } from "../../schemas/context.schema";

import { DiscoveryOutput } from "../../schemas/discovery.schema";

import { Agent } from "../../src/shared/types";

import { AIProvider } from "../../src/lib/ai/provider";

import { readPrompt } from "../../src/utils/read-prompt";

import { safeJsonParse } from "../../src/utils/parse-json";

export interface ProductSpecInput {
  context: ContextOutput;

  discovery: DiscoveryOutput;
}

export class ProductSpecAgent
  implements
    Agent<
      ProductSpecInput,
      ProductSpecOutput
    >
{
  name = "Product Spec Agent";

  constructor(
    private provider: AIProvider
  ) {}

  async execute(
    input: ProductSpecInput
  ): Promise<ProductSpecOutput> {
    try {
      console.log(
        "[ProductSpecAgent] Starting execution"
      );

      const systemPrompt = readPrompt(
        "prompts/product-spec-agent/system.txt"
      );

      const userPrompt = `
Generate a structured product specification.

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
`;

      console.log(
        "[ProductSpecAgent] Calling AI provider"
      );

      const text =
        await this.provider.generate(
          userPrompt,
          systemPrompt
        );

      console.log(
        "[ProductSpecAgent] Raw response received"
      );

      const parsed =
        safeJsonParse(text);

      console.log(
        "[ProductSpecAgent] JSON parsed successfully"
      );

      const validated =
        ProductSpecSchema.parse(
          parsed
        );

      console.log(
        "[ProductSpecAgent] Schema validation successful"
      );

      return validated;
    } catch (error) {
      console.error(
        "[ProductSpecAgent] Execution failed"
      );

      console.error(error);

      throw error;
    }
  }
}