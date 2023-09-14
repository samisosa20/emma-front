import * as z from 'zod';

const heritageSchema = z.object({
  name: z.string(),
  comercial_amount: z.string(),
  legal_amount: z.string(),
  badge_id: z.string(),
  year: z.string(),
});

export type HeritageSchema = z.infer<typeof heritageSchema>;

export { heritageSchema };
