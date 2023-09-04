import * as z from 'zod';
import { accountSchema } from './account.schema';

type Account = z.infer<typeof accountSchema>;

export type { Account };