import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email('Formato incorrecto'),
    password: z.string().min(6, "Se requiere minimo 6 caracteres"),
})

export type LoginSchema = z.infer<typeof loginSchema>; 

export { loginSchema }