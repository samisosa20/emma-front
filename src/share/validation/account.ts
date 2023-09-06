import * as z from 'zod';

const accountSchema = z.object({
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
});

export type AccountSchema = z.infer<typeof accountSchema>;

export { accountSchema };
