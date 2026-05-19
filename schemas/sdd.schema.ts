import { z } from "zod";

export const SddSchema = z.object({
  architectureOverview:
    z.string(),

  systemComponents:
    z.array(z.string()),

  apiEndpoints:
    z.array(z.string()),

  databaseEntities:
    z.array(z.string()),

  integrations:
    z.array(z.string()),

  technicalRisks:
    z.array(z.string()),

  scalabilityConcerns:
    z.array(z.string()),

  observabilityRequirements:
    z.array(z.string()),
});

export type SddOutput = z.infer<
  typeof SddSchema
>;