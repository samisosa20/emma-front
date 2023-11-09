import * as z from 'zod';

const budgetSchema = z.object({
  year: z.union([z.string(), z.number()]),
  category: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  badge_id: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  amount: z.union([z.string(), z.number()]),
  period_id: z.union([z.string(), z.number()]),
});

const budgetParamsSchema = z.object({
  year: z.union([z.string(), z.number()]),
  category_id: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
  amount: z.number(),
  period_id: z.union([z.string(), z.number()]),
});

export type BudgetSchema = z.infer<typeof budgetSchema>;
export type BudgetParamsSchema = z.infer<typeof budgetParamsSchema>;

export { budgetSchema };
