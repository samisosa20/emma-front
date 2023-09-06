import * as z from 'zod';
import { currencySchema } from '../general/geneal.schema';
import { eventSchema } from '../event/event.schema';
import { categorySchema } from '../category/category.schema';

const accountSchema = z.object({
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
  currency: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  balance: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  month: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  year: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  title: z.string(),
  values: z.array(z.string()),
});

const listAccountSchema = z.object({
  accounts: z.array(accountSchema),
  balances: z.array(balanceSchema),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const balancesAccountSchema = z.object({
  name: z.string(),
  values: z.array(z.number()),
  labels: z.array(z.string()),
});

const movementSchema = z.object({
  id: z.number(),
  description: z.string().nullable(),
  amount: z.number(),
  trm: z.number(),
  date_purchase: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  account: accountSchema,
  category: categorySchema,
  event: eventSchema.nullable(),
  transfer_out: z.nullable(z.unknown()),
  transfer_in: z.nullable(z.unknown()),
});

const AccountDetailSchema = z.object({
  balances: z.array(balanceSchema),
  balancesAccount: z.array(balancesAccountSchema),
  movements: z.object({
    current_page: z.number(),
    last_page: z.number(),
    data: z.array(movementSchema),
  }),
  account: accountSchema,
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const accountCreateSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  type_id: z.string(),
  badge_id: z.string(),
  init_amount: z.string(),
  limit: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
})

export { listAccountSchema, AccountDetailSchema, accountCreateSchema };
