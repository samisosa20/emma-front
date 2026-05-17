import * as z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Se requiere el nombre").max(50, "Máximo 50 caracteres"),
  description: z.union([
    z.null(),
    z.string().max(255, "Máximo 255 caracteres"),
  ]),
  groupId: z.union([z.string()]),
  color: z.string(),
  icon: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export { categorySchema };
