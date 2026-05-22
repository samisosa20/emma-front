import * as z from 'zod';

const validateNumeric = (value: string | number) => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

export const predictionParamsSchema = z.object({
  amount: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  badge_id: z.union([z.string(), z.number()]),
});

export const testProjectParamsSchema = z.object({
  rate: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  periods: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  investment: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  incomes_flow: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  end_investement: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  expensives_flow: z.union([z.string(), z.number()]).refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
});

export type PredictionParamsSchema = z.infer<typeof predictionParamsSchema>;
export type TestProjectParamsSchema = z.infer<typeof testProjectParamsSchema>;