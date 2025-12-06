import * as z from "zod";

const paymentsSchema = z.object({
  account: z.object({
    value: z.string(),
    label: z.string(),
  }),
  category: z.object({
    value: z.string(),
    label: z.string(),
  }),
  description: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  endDate: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  startDate: z.string(),
  amount: z.union([z.string(), z.number()]),
  specificDay: z.union([z.string(), z.number()]),
});

const paymentParamsSchema = z.object({
  description: z.union([z.null(), z.string()]),
  amount: z.union([z.string(), z.number()]),
  accountId: z.string(),
  categoryId: z.string(),
  startDate: z.string(),
  endDate: z.union([z.null(), z.string()]),
  specificDay: z.string(),
});

export type PaymentsSchema = z.infer<typeof paymentsSchema>;
export type PaymentsParamsSchema = z.infer<typeof paymentParamsSchema>;

export { paymentsSchema };
