import * as z from 'zod';
import { listAccountSchema, AccountDetailSchema } from './account.schema';

type Account = z.infer<typeof listAccountSchema>;
type AccountDetail = z.infer<typeof AccountDetailSchema>;

export type { Account, AccountDetail };