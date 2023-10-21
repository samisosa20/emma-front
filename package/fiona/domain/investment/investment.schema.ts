import * as z from "zod";
import { currencySchema } from '../general/geneal.schema';
import { movementSchema } from '../movement/movement.schema';

const investmentParamsSchema = z.object({
  name: z.string(),
  init_amount: z.union([z.string(), z.number()]),
  end_amount: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
  date_investment: z.string(),
});

const appretiationParamsSchema = z.object({
  investment_id: z.union([z.string(), z.number()]),
  amount: z.union([z.string(), z.number()]),
  date_appreciation: z.string(),
});

const investmentSchema = z.object({
  ...investmentParamsSchema.shape,
  returns: z.number(),
  valorization: z.string(),
  total_rate: z.string(),
  currency: currencySchema,
  movements: z.array(movementSchema),
  appreciations: z.array(appretiationParamsSchema),
  id: z.string(),
});

const listInvestmentSchema = z.object({
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
    investments: z.array(investmentSchema),
    balances: z.object({
      currency: z.string(),
      valuation: z.string(),
      amount: z.string(),
      profit: z.number()
    })
})

const listAppretiationSchema = z.object({
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
    appretiations: z.array(appretiationParamsSchema),
})

export { investmentSchema, listInvestmentSchema, investmentParamsSchema, appretiationParamsSchema, listAppretiationSchema };
