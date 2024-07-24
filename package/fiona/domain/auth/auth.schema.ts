import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Formato incorrecto'),
  password: z.string(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Formato incorrecto'),
});

const currencySchema = z.array(
  z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
    code: z.string(),
  })
);

const registerSchema = z.object({
  email: z.string().email('Formato incorrecto'),
  password: z.string(),
  name: z.string(),
  badge_id: z.union([z.string(), z.number()]),
});

const paramsProfileSchema = z.object({
  password: z.union([z.string(), z.null(), z.undefined()]),
  name: z.string(),
  badge_id: z.union([z.string(), z.number()]),
});

const profileSchema = z.object({
  email: z.string().email('Formato incorrecto'),
  name: z.string(),
  id: z.number(),
  badge_id: z.union([z.string(), z.number()]),
  error: z.boolean(),
  message: z.string(),
});

const authSchema = z.object({
  email: z.string().email('Formato incorrecto'),
  verify_email: z.boolean(),
  name: z.string(),
  currency: z.number(),
  transfer_id: z.number(),
  token: z.string(),
  error: z.boolean(),
  message: z.string(),
  accounts_type: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  periods: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  currencies: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  groups_category: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export {
  loginSchema,
  authSchema,
  registerSchema,
  paramsProfileSchema,
  profileSchema,
  currencySchema,
  forgotPasswordSchema,
};
