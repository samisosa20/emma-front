import * as z from 'zod';
import { listAccountSchema, AccountDetailSchema, accountCreateSchema, accountParamsSchema } from './account.schema';

type Account = z.infer<typeof listAccountSchema>;
type AccountDetail = z.infer<typeof AccountDetailSchema>;
type AccountCreate = z.infer<typeof accountCreateSchema>;
type AccountParams = z.infer<typeof accountParamsSchema>;

export type { Account, AccountDetail, AccountCreate, AccountParams };