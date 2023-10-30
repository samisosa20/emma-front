import * as z from "zod";
import { currencySchema } from '../general/geneal.schema';
import { categorySchema } from '../category/category.schema';

const budgetSchema = z.object({
  id: z.number(),
  year: z.string(),
  amount: z.number(),
  period_id: z.number(),
  badge_id: z.number(),
  category: categorySchema,
  period: z.object({
    id: z.number(),
    name: z.string(),
  })
})

const incomesSchema = z.object({
  ...categorySchema.shape,
  sub_categories: z.array(z.object({
    ...categorySchema.shape,
    budget: budgetSchema.nullable(),
    movements: z.number(),
  })),
  movements: z.array(z.number()),
  budgets: z.array(budgetSchema.nullable())
})

const budgetYearSchema = z.object({
  year: z.string(),
  incomes: z.number(),
  expensives: z.number(),
})

const listYearBudgetSchema = z.object({
  currency: z.string(),
  years: z.array(budgetYearSchema),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
});

const paramsBudgetSchema = z.object({
  year: z.union([z.string(), z.number()]),
  category_id: z.union([z.string(), z.number()]),
  badge_id: z.union([z.string(), z.number()]),
  amount: z.number(),
  period_id: z.union([z.string(), z.number()]),
});

const reportBudgetSchema = z.object({
  incomes: z.array(incomesSchema),
  expensives: z.array(incomesSchema),
  totalMovements: z.number(),
  totalBudgets: z.number(),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
})

const listBudgetSchema = z.object({
  budgets: z.array(budgetSchema),
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
})




export { listYearBudgetSchema, reportBudgetSchema, paramsBudgetSchema, budgetSchema, listBudgetSchema };
