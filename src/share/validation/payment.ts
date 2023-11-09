import * as z from 'zod';

const paymentsSchema = z.object({
  account: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  category: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  description: z.string().optional()
  .transform((e) => (e === '' ? undefined : e)),
  end_date: z.string().optional()
  .transform((e) => (e === '' ? undefined : e)),
  start_date: z.string(),
  amount: z.string(),
  specific_day: z.union([z.string(), z.number()]),
});

const paymentParamsSchema = z.object({
  description: z.union([z.null(), z.string()]),
  amount: z.union([z.string(), z.number()]),
  account_id: z.union([z.string(), z.number()]),
  category_id: z.union([z.string(), z.number()]),
  start_date: z.string(),
  end_date: z.union([z.null(), z.string()]),
  specific_day: z.string(),
});

export type PaymentsSchema = z.infer<typeof paymentsSchema>;
export type PaymentsParamsSchema = z.infer<typeof paymentParamsSchema>;

export { paymentsSchema };
