import * as z from 'zod';

const movementSchema = z.object({
  type: z.string(),
  date_purchase: z.string(),
  amount: z.string().refine((value) => !value.includes("-"), {
    message: "Solo valores positivos",
  }),
  amount_end: z.string().refine((value) => !value.includes("-"), {
    message: "Solo valores positivos",
  }).optional(),
  account: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  account_end: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }).optional(),
  category: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }).optional(),
  event: z.union([z.null(), z.undefined(), z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  })]),
  investment: z.union([z.null(), z.undefined(), z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  })]),
  description: z.string().optional()
  .transform((e) => (e === '' ? undefined : e)),
  add_withdrawal: z.boolean(),
}).refine((data) =>  {
  if (data.type !== '0') {
    return data.category !== undefined && data.category !== null && data.category.value !== undefined && data.category.value !== null;
  }
  // Si type es '0', category puede ser opcional
  return true;
}).refine((data) =>  {
  if (data.type === '0') {
    return data.account_end !== undefined && data.account_end !== null;
  }
  // Si type no es '0', category puede ser opcional
  return true;
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
  add_withdrawal: z.boolean(),
});

export type MovementSchema = z.infer<typeof movementSchema>;

export type MovementSchemaParams = z.infer<typeof movementParamsSchema>;

export { movementSchema };
