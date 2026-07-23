import * as z from "zod";

const paymentsSchema = z.object({
  account: z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  }),
  category: z
    .object({
      value: z.union([z.string(), z.number()]),
      label: z.string(),
    })
    .optional()
    .nullable(),
  description: z
    .string()
    .max(255, "Máximo 255 caracteres")
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  endDate: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  startDate: z.string().min(1, "La fecha de inicio es requerida"),
  amount: z.union([z.string(), z.number()]).refine((value) => {
    if (value === "") return false;
    const num = Number(value);
    return !isNaN(num) && num >= 0 && isFinite(num);
  }, {
    message: "Debe ser un número positivo válido",
  }),
  specificDay: z.union([z.string(), z.number()]).refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num >= 1 && num <= 31 && isFinite(num);
  }, {
    message: "Debe ser un día válido entre 1 y 31",
  }),
});

const paymentParamsSchema = z.object({
  description: z.union([z.null(), z.string().max(255, "Máximo 255 caracteres")]),
  amount: z.union([z.string(), z.number()]).refine((value) => {
    if (value === "") return false;
    const num = Number(value);
    return !isNaN(num) && num >= 0 && isFinite(num);
  }, {
    message: "Debe ser un número positivo válido",
  }),
  accountId: z.string(),
  categoryId: z.string(),
  startDate: z.string(),
  endDate: z.union([z.null(), z.string()]),
  specificDay: z.string(),
});

export type PaymentsSchema = z.infer<typeof paymentsSchema>;
export type PaymentsParamsSchema = z.infer<typeof paymentParamsSchema>;

export { paymentsSchema };
