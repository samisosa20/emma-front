import * as z from "zod";

const categorySchema = z.object({
  name: z.string(),
  description: z.union([z.null(), z.string()]),
  groupId: z.union([z.string()]),
  color: z.string(),
  icon: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export { categorySchema };
