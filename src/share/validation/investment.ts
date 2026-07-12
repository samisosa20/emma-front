import * as z from "zod";

const validateNumeric = (value: string | number | undefined | null) => {
  if (value === "" || value === undefined || value === null) return false;
  const num = Number(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

const investmentParamsSchema = z.object({
  name: z.string().max(100, "Máximo 100 caracteres"),
  initAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  endAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badgeId: z.union([z.string(), z.number()]),
  dateInvestment: z.string(),
});

const investmentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  initAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  endAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badgeId: z.any().refine((val) => {
    return !!val && typeof val === "object" && "value" in val && val.value !== undefined && val.value !== null && val.value !== "";
  }, {
    message: "Moneda es requerida",
  }),
  dateInvestment: z.string().min(1, "La fecha de apertura es requerida"),
});

const investmentAppretiationSchema = z.object({
  amount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  dateAppreciation: z.string(),
});

export type InvestmentSchema = z.infer<typeof investmentParamsSchema>;
export type InvestmentAppretiaitonSchema = z.infer<
  typeof investmentAppretiationSchema
>;

export { investmentSchema, investmentAppretiationSchema };
