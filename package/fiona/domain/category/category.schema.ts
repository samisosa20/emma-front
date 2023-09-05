import * as z from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  group_id: z.number(),
  category_id: z.number(),
  deleted_at: z.string().nullable(),
});

export { categorySchema };