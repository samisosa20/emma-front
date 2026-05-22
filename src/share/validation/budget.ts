import * as z from "zod";

const budgetSchema = z.object({
  year: z.union([z.string(), z.number()]),
  categoryId: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  badgeId: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  amount: z.union([z.string(), z.number()]).refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && isFinite(num);
  }, {
    message: "Debe ser un número positivo válido",
  }),
  periodId: z.union([z.string(), z.number()]),
});

const validateNumeric = (value: string | number) => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && isFinite(num);
};

const budgetParamsSchema = z.object({
  year: z.union([z.string(), z.number()]),
  categoryId: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
  amount: z.number().refine(validateNumeric, {
    message: "Debe ser un número positivo válido",
  }),
  periodId: z.union([z.string(), z.number()]),
});

export type BudgetSchema = z.infer<typeof budgetSchema>;
export type BudgetParamsSchema = z.infer<typeof budgetParamsSchema>;

export { budgetSchema };
