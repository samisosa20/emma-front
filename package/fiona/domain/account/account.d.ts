import * as z from 'zod';
import { listAccountSchema, AccountDetailSchema, accountCreateSchema } from './account.schema';

type Account = z.infer<typeof listAccountSchema>;
type AccountDetail = z.infer<typeof AccountDetailSchema>;
type AccountCreate = z.infer<typeof accountCreateSchema>;

export type { Account, AccountDetail, AccountCreate };