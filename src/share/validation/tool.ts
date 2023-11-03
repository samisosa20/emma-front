import * as z from 'zod';

export const predictionParamsSchema = z.object({
  amount: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
});

export const testProjectParamsSchema = z.object({
    rate: z.union([z.string(), z.number()]),
    periods: z.union([z.string(), z.number()]),
    investment: z.union([z.string(), z.number()]),
    incomes_flow: z.union([z.string(), z.number()]),
    end_investement: z.union([z.string(), z.number()]),
    expensives_flow: z.union([z.string(), z.number()]),
  });

export type PredictionParamsSchema = z.infer<typeof predictionParamsSchema>;
export type TestProjectParamsSchema = z.infer<typeof testProjectParamsSchema>;