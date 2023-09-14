import * as z from 'zod';

const categorySchema = z.object({
  name: z.string(),
  description: z.union([z.null(), z.string(), z.undefined()]),
  group_id: z.union([z.string(), z.number()]),
  category_id: z.union([z.null(), z.string(), z.undefined(), z.number()]),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export { categorySchema };
