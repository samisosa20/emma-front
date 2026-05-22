import * as z from "zod";

const validateNumeric = (value: string | number) => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

const heritageSchema = z.object({
  name: z.string().max(100, "Máximo 100 caracteres"),
  comercialAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  legalAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badgeId: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  year: z.union([z.string(), z.number()]),
});

const heritageParamsSchema = z.object({
  name: z.string().max(100, "Máximo 100 caracteres"),
  comercial_amount: z.string().refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  legal_amount: z.string().refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badge_id: z.string(),
  year: z.string(),
});

export type HeritageSchema = z.infer<typeof heritageParamsSchema>;

export { heritageSchema };
