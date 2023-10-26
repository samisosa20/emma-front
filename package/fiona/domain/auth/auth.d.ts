import * as z from 'zod';
import { loginSchema, authSchema, registerSchema, paramsProfileSchema, profileSchema, currencySchema } from './auth.schema';

type Login = z.infer<typeof loginSchema>;
type Auth = z.infer<typeof authSchema>;
type Register = z.infer<typeof registerSchema>;
type ParamsProfile = z.infer<typeof paramsProfileSchema>;
type Profile = z.infer<typeof profileSchema>;
type Currency = z.infer<typeof currencySchema>;

export type { Login, Auth, Register, ParamsProfile, Profile, Currency };