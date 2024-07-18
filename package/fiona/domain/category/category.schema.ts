import * as z from 'zod';

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  group_id: z.number(),
  category_id: z.number().nullable(),
  deleted_at: z.string().nullable(),
  sub_categories: z.number(),
  group: z.object({
    name: z.string(),
  }),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const categoryCreateSchema = z.object({
  name: z.string(),
  description: z.union([z.null(), z.string(), z.undefined(), z.number()]),
  group_id: z.union([z.string(), z.number()]),
  category_id: z.union([z.null(), z.string(), z.undefined(), z.number()]),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const categoryDetailSchema = z.object({
  categories: z.array(categorySchema).nullable(),
  category_father: categorySchema.nullable(),
  ...categorySchema.shape,
});

const listCategorySchemas = z.array(
    z.object({
      value: z.number(),
      label: z.string(),
    })
  );


const categoryDetailParamsSchema = z.object({
  badge_id: z.string().nullable(),
})

export {
  categorySchema,
  categoryDetailSchema,
  categoryCreateSchema,
  listCategorySchemas,
  categoryDetailParamsSchema,
};
