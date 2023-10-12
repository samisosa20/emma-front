import * as z from 'zod';
import { investmentSchema, listInvestmentSchema, investmentParamsSchema } from './investment.schema';

type Investment = z.infer<typeof listInvestmentSchema>;
type InvestmentDetail = z.infer<typeof investmentSchema>;
type InvestmentParams = z.infer<typeof investmentParamsSchema>;

export type { Investment, InvestmentDetail, InvestmentParams };