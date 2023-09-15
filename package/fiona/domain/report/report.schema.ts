import * as z from "zod";

const incomeSchema = z.object({
  name: z.string(),
  values: z.array(z.number()),
  labels: z.array(z.string()),
});

const expenseSchema = z.object({
  name: z.string(),
  values: z.array(z.number()),
  labels: z.array(z.string()),
});

const balanceSchema = z.object({
  name: z.string(),
  values: z.array(z.number()),
  labels: z.array(z.string()),
});

const groupExpenseSchema = z.object({
  name: z.string(),
  amount: z.number(),
  porcent: z.number(),
});

const listExpenseSchema = z.object({
  category: z.string(),
  amount: z.number(),
});

const listIncomeSchema = z.object({
  category: z.string(),
  amount: z.number(),
});

const creditCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  badge_id: z.number(),
  init_amount: z.number(),
  limit: z.string(),
  type_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  balance: z.number(),
});

const metricsSchema = z.object({
  open_balance: z.string(),
  income: z.string(),
  expense: z.string(),
  utility: z.string(),
});

const reportSchema = z.object({
  incomes: z.array(incomeSchema),
  expensives: z.array(expenseSchema),
  balances: z.array(balanceSchema),
  group_expensive: z.array(groupExpenseSchema),
  list_expensives: z.array(listExpenseSchema),
  list_incomes: z.array(listIncomeSchema),
  credit_carts: z.array(creditCardSchema),
  metrics: metricsSchema,
  init_date: z.string(),
  end_date: z.string(),
  currency: z.number(),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const reportParamsSchema = z.object({
  badge_id: z.string().nullable(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
})

export { reportSchema, reportParamsSchema };
