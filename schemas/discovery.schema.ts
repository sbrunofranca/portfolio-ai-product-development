import { z } from "zod";

export const DiscoverySchema = z.object({
  problemStatement: z.string(),

  userProblems: z.array(z.string()),

  hypotheses: z.array(z.string()),

  assumptions: z.array(z.string()),

  risks: z.array(z.string()),

  successMetrics: z.array(z.string()),

  openQuestions: z.array(z.string()),
});

export type DiscoveryOutput = z.infer<
  typeof DiscoverySchema
>;