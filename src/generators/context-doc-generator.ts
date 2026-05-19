import fs from "fs";

import { ContextOutput } from "../../schemas/context.schema";

export class ContextDocGenerator {
  generate(
    context: ContextOutput
  ) {
    const markdown = `# Context Document

## Product Summary

${context.productSummary || "N/A"}

## Business Goals

${(context.businessGoals || [])
  .map((goal) => `- ${goal}`)
  .join("\n")}

## Stakeholders

${(context.stakeholders || [])
  .map(
    (stakeholder) =>
      `- ${stakeholder}`
  )
  .join("\n")}

## Technical Constraints

${(
  context.technicalConstraints ||
  []
)
  .map(
    (constraint) =>
      `- ${constraint}`
  )
  .join("\n")}
`;

    fs.writeFileSync(
      "docs/CONTEXT.md",
      markdown
    );

    console.log(
      "[ContextDocGenerator] CONTEXT.md generated"
    );
  }
}