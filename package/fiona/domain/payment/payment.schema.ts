import * as z from "zod";
import { categorySchema } from '../category/category.schema';
import { accountSchema } from '../account/account.schema';

const paymentParamsSchema = z.object({
  description: z.union([z.null(), z.string()]),
  amount: z.union([z.string(), z.number()]),
  account_id: z.union([z.string(), z.number()]),
  category_id: z.union([z.string(), z.number()]),
  start_date: z.union([z.string(), z.number()]),
  end_date: z.union([z.null(), z.string()]),
  specific_day: z.string(),
});

const paymentSchema = z.object({
  ...paymentParamsSchema.shape,
  account: accountSchema,
  category: categorySchema,
});

const listPaymentSchema = z.object({
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
    payments: z.array(paymentSchema),
})


export { paymentSchema, listPaymentSchema, paymentParamsSchema };
