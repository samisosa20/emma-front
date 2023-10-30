import * as z from 'zod';
import { listYearBudgetSchema, reportBudgetSchema, paramsBudgetSchema, budgetSchema, listBudgetSchema } from './budget.schema';

type Budget = z.infer<typeof budgetSchema>;
type BudgetYear = z.infer<typeof listYearBudgetSchema>;
type BudgetReport = z.infer<typeof reportBudgetSchema>;
type BudgetParams = z.infer<typeof paramsBudgetSchema>;
type BudgetList = z.infer<typeof listBudgetSchema>;

export type { Budget, BudgetYear, BudgetReport, BudgetParams, BudgetList };