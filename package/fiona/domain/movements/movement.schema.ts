import * as z from 'zod';
import { eventSchema } from '../event/event.schema';
import { categorySchema } from '../category/category.schema';
import { accountSchema } from '../account/account.schema';

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

export { movementSchema };
