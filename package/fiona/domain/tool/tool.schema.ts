import * as z from 'zod';

const messageSchema = z.string();

const predictionParamsSchema = z.object({
  amount: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
});

const testProjectParamsSchema = z.object({
  rate: z.union([z.string(), z.number()]),
  periods: z.union([z.string(), z.number()]),
  investment: z.union([z.string(), z.number()]),
  incomes_flow: z.union([z.string(), z.number()]),
  end_investement: z.union([z.string(), z.number()]),
  expensives_flow: z.union([z.string(), z.number()]),
});

const testProjectSchema =  z.object({
  tir: z.string(),
  approve_tir: z.boolean(),
  npv: z.number(),
  approve_npv: z.boolean(),
  benefist_cost: z.number(),
  approve_benefist_cost: z.boolean(),
  roi: z.number(),
  approve_roi: z.boolean(),
  message: z.object({
    fun: z.string(),
    real: z.string(),
  }),
});
export { messageSchema, predictionParamsSchema, testProjectParamsSchema, testProjectSchema };
