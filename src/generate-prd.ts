import { GroqProvider } from "./lib/ai/groq";

import { ContextAgent } from "../agents/context-agent/context-agent";

import { DiscoveryAgent } from "../agents/discovery-agent/discovery-agent";

import { ProductSpecAgent } from "../agents/product-spec-agent/product-spec-agent";

import { MarkdownGenerator } from "./generators/markdown-generator";

async function main() {
  const provider =
    new GroqProvider();

  const contextAgent =
    new ContextAgent(provider);

  const discoveryAgent =
    new DiscoveryAgent(provider);

  const productSpecAgent =
    new ProductSpecAgent(provider);

  const markdownGenerator =
    new MarkdownGenerator();

  const context =
    await contextAgent.execute(`
We are building a subscription feature for an ecommerce platform.

Users should be able to subscribe to monthly deliveries.

The business goal is increasing recurring revenue and retention.

The checkout team and payments team are stakeholders.
`);

  const discovery =
    await discoveryAgent.execute(
      context
    );

  const spec =
    await productSpecAgent.execute({
      context,
      discovery,
    });

  const content = `
# Feature

${spec.featureName}

${markdownGenerator.generateList(
  "Goals",
  spec.goals
)}

${markdownGenerator.generateList(
  "Non Goals",
  spec.nonGoals
)}

${markdownGenerator.generateList(
  "User Stories",
  spec.userStories
)}

${markdownGenerator.generateList(
  "Functional Requirements",
  spec.functionalRequirements
)}

${markdownGenerator.generateList(
  "Acceptance Criteria",
  spec.acceptanceCriteria
)}
`;

  markdownGenerator.generateDocument(
    "Product Requirements Document",
    content,
    "docs/PRD.md"
  );
}

main();