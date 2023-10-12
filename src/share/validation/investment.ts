import * as z from 'zod';

const investmentSchema = z.object({
  name: z.string(),
  init_amount: z.union([z.string(), z.number()]),
  end_amount: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
  date_investment: z.string(),
});

export type InvestmentSchema = z.infer<typeof investmentSchema>;

export { investmentSchema };
