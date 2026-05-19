import fs from "fs";

import { ProductSpecOutput } from "../../schemas/product-spec.schema";

export class PrdDocGenerator {
  generate(
    spec: ProductSpecOutput
  ) {
    const markdown = `# Product Requirements Document

## Feature Name

${spec.featureName}

## Goals

${spec.goals
  .map((item) => `- ${item}`)
  .join("\n")}

## Non Goals

${spec.nonGoals
  .map((item) => `- ${item}`)
  .join("\n")}

## User Stories

${spec.userStories
  .map((item) => `- ${item}`)
  .join("\n")}

## Functional Requirements

${spec.functionalRequirements
  .map((item) => `- ${item}`)
  .join("\n")}

## Non Functional Requirements

${spec.nonFunctionalRequirements
  .map((item) => `- ${item}`)
  .join("\n")}

## Edge Cases

${spec.edgeCases
  .map((item) => `- ${item}`)
  .join("\n")}

## Acceptance Criteria

${spec.acceptanceCriteria
  .map((item) => `- ${item}`)
  .join("\n")}
`;

    fs.writeFileSync(
      "docs/PRD.md",
      markdown
    );

    console.log(
      "[PrdDocGenerator] PRD.md generated"
    );
  }
}