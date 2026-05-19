import { z } from "zod";

export const ProductSpecSchema =
  z.object({
    featureName: z.string(),

    goals: z.array(z.string()),

    nonGoals: z.array(z.string()),

    userStories: z.array(z.string()),

    functionalRequirements:
      z.array(z.string()),

    nonFunctionalRequirements:
      z.array(z.string()),

    edgeCases: z.array(z.string()),

    acceptanceCriteria:
      z.array(z.string()),
  });

export type ProductSpecOutput =
  z.infer<
    typeof ProductSpecSchema
  >;