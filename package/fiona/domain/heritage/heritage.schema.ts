import * as z from "zod";
import { currencySchema } from '../general/geneal.schema';

const balanceSchema = z.object({
  currency: z.string(),
  movements: z.number(),
  amount: z.number(),
})

const heritageSchema = z.object({
  year: z.string(),
  balance: z.array(balanceSchema)
});

const createHeritageSchema = z.object({
  name: z.string(),
  comercial_amount: z.string(),
  legal_amount: z.string(),
  currency: currencySchema.optional(),
  badge_id: z.string(),
  year: z.string(),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const listHeritageSchema = z.object({
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
  events: z.array(heritageSchema)
})

const heritageYearSchema = z.object({
  id: z.number(),
  name: z.string(),
  comercial_amount: z.number(),
  legal_amount: z.number(),
  year: z.number(),
  currency: currencySchema
})

const listHeritageYearSchema = z.object({
  data: z.array(heritageYearSchema),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
})

export { heritageSchema, listHeritageSchema, createHeritageSchema, listHeritageYearSchema };
