import * as z from 'zod';
import { loginSchema, authSchema } from './auth.schema';

type Login = z.infer<typeof loginSchema>;
type Auth = z.infer<typeof authSchema>;

export type { Login, Auth };