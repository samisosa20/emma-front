import * as z from "zod";

const investmentParamsSchema = z.object({
  name: z.string(),
  initAmount: z.union([z.string(), z.number()]),
  endAmount: z.union([z.string(), z.number()]),
  badgeId: z.union([z.string(), z.number()]),
  dateInvestment: z.string(),
});

const investmentSchema = z.object({
  name: z.string(),
  initAmount: z.union([z.string(), z.number()]),
  endAmount: z.union([z.string(), z.number()]),
  badgeId: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  dateInvestment: z.string(),
});

const investmentAppretiationSchema = z.object({
  amount: z.union([z.string(), z.number()]),
  dateAppreciation: z.string(),
});

export type InvestmentSchema = z.infer<typeof investmentParamsSchema>;
export type InvestmentAppretiaitonSchema = z.infer<
  typeof investmentAppretiationSchema
>;

export { investmentSchema, investmentAppretiationSchema };
