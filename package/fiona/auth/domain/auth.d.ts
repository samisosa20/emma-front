import * as z from 'zod';
import { loginSchema } from './auth.schema';

type Login = z.infer<typeof loginSchema>;

export type { Login };

export interface AuthModel {
  data: {
    name: string;
    email: string;
    currrency: number;
    transfer_id: number;
  };
  token: string;
}
