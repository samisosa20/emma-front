import * as z from 'zod';
import { reportSchema, reportParamsSchema } from './report.schema';

type Report = z.infer<typeof reportSchema>;
type ReportParams = z.infer<typeof reportParamsSchema>;

export type { Report, ReportParams };