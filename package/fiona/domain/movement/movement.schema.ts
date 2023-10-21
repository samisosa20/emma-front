import * as z from 'zod';
import { eventSchema } from '../event/event.schema';
import { categorySchema } from '../category/category.schema';
import { accountSchema } from '../account/account.schema';

const baseMoveSchema = z.object({
  id: z.number(),
  description: z.union([z.string(), z.null()]),
  amount: z.number(),
  trm: z.number(),
  date_purchase: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  account: accountSchema,
  category: categorySchema,
  add_withdrawal: z.boolean(),
  investment: z.object({
    name: z.string(),
    id: z.number(),
  }).nullable(),
  event: eventSchema.nullable(),
})

const movementSchema = z.object({
  ...baseMoveSchema.shape,
  transfer_out: z.nullable(baseMoveSchema),
  transfer_in: z.nullable(baseMoveSchema),
});

const movementParamsSchema = z.object({
  description: z.string().nullable(),
  amount: z.string(),
  type: z.string(),
  date_purchase: z.string(),
  account_id: z.union([z.string(), z.number()]),
  category_id: z.union([z.string(), z.number()]),
  event_id: z.union([z.null(), z.string(), z.undefined(), z.number()]),
  investment_id: z.union([z.null(), z.string(), z.undefined(), z.number()]),
});

export { movementSchema, movementParamsSchema };
