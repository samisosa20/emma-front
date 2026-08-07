import * as z from "zod";

const validateNumeric = (value: string | number | undefined | null) => {
  if (value === "" || value === undefined || value === null) return false;
  const num = Number(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

const heritageSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  comercialAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  legalAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badgeId: z.any().refine(
    (val) => {
      return (
        !!val &&
        typeof val === "object" &&
        "value" in val &&
        val.value !== undefined &&
        val.value !== null &&
        val.value !== ""
      );
    },
    {
      message: "Moneda es requerida",
    }
  ),
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

