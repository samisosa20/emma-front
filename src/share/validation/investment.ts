import * as z from "zod";

const validateNumeric = (value: string | number) => {
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
  name: z.string().max(100, "Máximo 100 caracteres"),
  initAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  endAmount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badgeId: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  dateInvestment: z.string(),
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
