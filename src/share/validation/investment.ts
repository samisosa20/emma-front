import * as z from 'zod';

const investmentSchema = z.object({
  name: z.string(),
  init_amount: z.union([z.string(), z.number()]),
  end_amount: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
  date_investment: z.string(),
});

const investmentAppretiationSchema = z.object({
  amount: z.union([z.string(), z.number()]),
  date_appreciation: z.string(),
});

export type InvestmentSchema = z.infer<typeof investmentSchema>;
export type InvestmentAppretiaitonSchema = z.infer<typeof investmentAppretiationSchema>;

export { investmentSchema, investmentAppretiationSchema };
