import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email('Formato incorrecto'),
    password: z.string().min(6, "Se requiere minimo 6 caracteres"),
    remind: z.boolean().optional().nullable()
})

const registerSchema = z.object({
    name: z.string().min(2, "Se requiere minimo 2 caracteres"),
    badge_id: z.object({
        value: z.union([z.string(), z.number()]),
        label: z.string(),
      }),
    email: z.string().email('Formato incorrecto'),
    password: z.string().min(6, "Se requiere minimo 6 caracteres"),
})

const registerParamsSchema = z.object({
    name: z.string().min(2, "Se requiere minimo 2 caracteres"),
    badge_id: z.union([z.string(), z.number()]),
    email: z.string().email('Formato incorrecto'),
    password: z.string().min(6, "Se requiere minimo 6 caracteres"),
})

const paramsProfileSchema = z.object({
    password: z.union([z.string(), z.null(), z.undefined()]),
    name: z.string(),
    badge_id: z.union([z.string(), z.number()]),
})


const destroyAccountSchema = z.object({
    email: z.string().email('Formato incorrecto'),
})


const paramsForgotSchema = z.object({
    email: z.string().email('Formato incorrecto'),
})

export type LoginSchema = z.infer<typeof loginSchema>; 
export type ParamsProfileSchema = z.infer<typeof paramsProfileSchema>;
export type RegisterSchema = z.infer<typeof registerParamsSchema>;
export type ParamsForgotSchema = z.infer<typeof paramsForgotSchema>;
export type DestroyAccountSchema = z.infer<typeof destroyAccountSchema>;

export { loginSchema, paramsProfileSchema, registerSchema, paramsForgotSchema, destroyAccountSchema }