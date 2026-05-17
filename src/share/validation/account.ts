import * as z from "zod";

const validateNumeric = (value: string | number | undefined | null) => {
  if (value === undefined || value === null || value === "") return true;
  const num = Number(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

const accountParamsSchema = z.object({
  name: z.string().max(50, "Máximo 50 caracteres"),
  description: z
    .string()
    .max(255, "Máximo 255 caracteres")
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  type_id: z.string(),
  badge_id: z.string(),
  init_amount: z.string().refine(validateNumeric, "Debe ser un número válido"),
  limit: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e))
    .refine(validateNumeric, "Debe ser un número válido"),
  interest: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e))
    .refine(validateNumeric, "Debe ser un número válido"),
});

const accountSchema = z.object({
  name: z.string().max(50, "Máximo 50 caracteres"),
  description: z
    .string()
    .max(255, "Máximo 255 caracteres")
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  typeId: z.string(),
  badgeId: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  initAmount: z.string().refine(validateNumeric, "Debe ser un número válido"),
  limit: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e))
    .refine(validateNumeric, "Debe ser un número válido"),
  interest: z.union([
    z
      .string()
      .optional()
      .transform((e) => (e === "" ? undefined : e))
      .refine(validateNumeric, "Debe ser un número válido"),
    z.number().optional().refine(validateNumeric, "Debe ser un número válido"),
  ]),
});

export type AccountParamsSchema = z.infer<typeof accountParamsSchema>;

export { accountSchema };
