import * as z from 'zod';

const heritageSchema = z.object({
  name: z.string(),
  comercial_amount: z.union([z.string(), z.number()]),
  legal_amount: z.union([z.string(), z.number()]),
  badge_id: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  year: z.union([z.string(), z.number()]),
});

const heritageParamsSchema = z.object({
  name: z.string(),
  comercial_amount: z.string(),
  legal_amount: z.string(),
  badge_id: z.string(),
  year: z.string(),
});

export type HeritageSchema = z.infer<typeof heritageParamsSchema>;

export { heritageSchema };
