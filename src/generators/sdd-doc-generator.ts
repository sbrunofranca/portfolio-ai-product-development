import fs from "fs";

import { SddOutput } from "../../schemas/sdd.schema";

export class SddDocGenerator {
  generate(sdd: SddOutput) {
    const markdown = `# System Design Document

## Architecture Overview

${sdd.architectureOverview}

## System Components

${sdd.systemComponents
  .map((item) => `- ${item}`)
  .join("\n")}

## API Endpoints

${sdd.apiEndpoints
  .map((item) => `- ${item}`)
  .join("\n")}

## Database Entities

${sdd.databaseEntities
  .map((item) => `- ${item}`)
  .join("\n")}

## Integrations

${sdd.integrations
  .map((item) => `- ${item}`)
  .join("\n")}

## Technical Risks

${sdd.technicalRisks
  .map((item) => `- ${item}`)
  .join("\n")}

## Scalability Concerns

${sdd.scalabilityConcerns
  .map((item) => `- ${item}`)
  .join("\n")}

## Observability Requirements

${sdd.observabilityRequirements
  .map((item) => `- ${item}`)
  .join("\n")}
`;

    fs.writeFileSync(
      "docs/SDD.md",
      markdown
    );

    console.log(
      "[SddDocGenerator] SDD.md generated"
    );
  }
}