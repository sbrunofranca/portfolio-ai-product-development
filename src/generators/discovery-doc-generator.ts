import fs from "fs";

import { DiscoveryOutput } from "../../schemas/discovery.schema";

export class DiscoveryDocGenerator {
  generate(
    discovery: DiscoveryOutput
  ) {
    const markdown = `# Discovery Document

## Problem Statement

${discovery.problemStatement}

## User Problems

${discovery.userProblems
  .map((item) => `- ${item}`)
  .join("\n")}

## Hypotheses

${discovery.hypotheses
  .map((item) => `- ${item}`)
  .join("\n")}

## Assumptions

${discovery.assumptions
  .map((item) => `- ${item}`)
  .join("\n")}

## Risks

${discovery.risks
  .map((item) => `- ${item}`)
  .join("\n")}

## Success Metrics

${discovery.successMetrics
  .map((item) => `- ${item}`)
  .join("\n")}

## Open Questions

${discovery.openQuestions
  .map((item) => `- ${item}`)
  .join("\n")}
`;

    fs.writeFileSync(
      "docs/DISCOVERY.md",
      markdown
    );

    console.log(
      "[DiscoveryDocGenerator] DISCOVERY.md generated"
    );
  }
}