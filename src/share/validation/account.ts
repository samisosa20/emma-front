import * as z from 'zod';

const accountParamsSchema = z.object({
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
  interest: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
});

const accountSchema = z.object({
  name: z.string(),
  description: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  type_id: z.string(),
  badge_id: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  init_amount: z.string(),
  limit: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  interest: z.union([z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)), z.number().optional()]),
});

export type AccountParamsSchema = z.infer<typeof accountParamsSchema>;

export { accountSchema };
