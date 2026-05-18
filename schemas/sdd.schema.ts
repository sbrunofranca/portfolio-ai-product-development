import { z } from "zod";

export const SDDSchema = z.object({
  architectureOverview: z.string(),

  services: z.array(z.string()),

  APIs: z.array(z.string()),

  dataModel: z.array(z.string()),

  risks: z.array(z.string()),

  tradeoffs: z.array(z.string()),

  observability: z.array(z.string()),
});

export type SDDOutput = z.infer<typeof SDDSchema>;