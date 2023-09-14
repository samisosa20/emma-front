import * as z from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  group_id: z.number(),
  category_id: z.number().nullable(),
  deleted_at: z.string().nullable(),
  sub_categories: z.number(),
  group: z.object({
    name: z.string()
  }),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const categoryCreateSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  group_id: z.string(),
  category_id: z.string().nullable(),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const categoryDetailSchema = z.object({
  categories: z.array(categorySchema).nullable(),
  category_father: categorySchema.nullable(),
  ...categorySchema.shape,
})

const listCategorySchemas = z.array(z.object({
  id: z.number(),
  title: z.string(),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
}))


export { categorySchema, categoryDetailSchema, categoryCreateSchema, listCategorySchemas };