import * as z from "zod";
import { currencySchema } from "../general/geneal.schema";

const accountsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  badge_id: z.number(),
  init_amount: z.number(),
  limit: z.string(),
  type_id: z.number(),
  deleted_at: z.union([z.string(), z.null()]),
  balance: z.number(),
  currency: currencySchema,
});

const balanceSchema = z.object({
  currency: z.string().optional()
  .transform(e => e === "" ? undefined : e),
  balance: z.string().optional()
  .transform(e => e === "" ? undefined : e),
  month: z.string().optional()
  .transform(e => e === "" ? undefined : e),
  year: z.string().optional()
  .transform(e => e === "" ? undefined : e),
  title: z.string(),
  values: z.array(z.string()),
});

const accountSchema = z.object({
    accounts: z.array(accountsSchema),
    balances: z.array(balanceSchema),
    status: z.number().optional()
    .transform(e => e === 0 ? undefined : e),
})

export { accountSchema };
