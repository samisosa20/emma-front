import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email('Formato incorrecto'),
    password: z.string(),
})

const authSchema = z.object({
    email: z.string().email('Formato incorrecto'),
    name: z.string(),
    currency: z.number(),
    transfer_id: z.number(),
    token: z.string(),
    error: z.boolean(),
    message: z.string(),
})

export { loginSchema, authSchema }