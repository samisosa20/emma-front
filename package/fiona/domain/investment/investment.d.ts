import * as z from 'zod';
import { investmentSchema, listInvestmentSchema, investmentParamsSchema, appretiationParamsSchema, listAppretiationSchema } from './investment.schema';

type Investment = z.infer<typeof listInvestmentSchema>;
type InvestmentDetail = z.infer<typeof investmentSchema>;
type InvestmentParams = z.infer<typeof investmentParamsSchema>;
type AppretiationParams = z.infer<typeof appretiationParamsSchema>;
type Appretiation = z.infer<typeof listAppretiationSchema>;

export type { Investment, InvestmentDetail, InvestmentParams, Appretiation, AppretiationParams };