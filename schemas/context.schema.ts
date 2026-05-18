import { z } from "zod";

export const ContextSchema = z.object({
  productSummary: z.string(),

  businessGoals: z.array(z.string()),

  stakeholders: z.array(z.string()),

  mainEntities: z.array(z.string()),

  constraints: z.array(z.string()),

  openQuestions: z.array(z.string()),
});

export type ContextOutput = z.infer<typeof ContextSchema>;