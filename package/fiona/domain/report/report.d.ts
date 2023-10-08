import * as z from 'zod';
import { reportSchema, reportParamsSchema, reportMovementSchema } from './report.schema';

type Report = z.infer<typeof reportSchema>;
type ReportParams = z.infer<typeof reportParamsSchema>;
type ReportMovement = z.infer<typeof reportMovementSchema>;

export type { Report, ReportParams, ReportMovement };