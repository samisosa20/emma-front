import * as z from 'zod';

export const supportSchema = z.object({
  subject: z
    .string()
    .min(10, "Ingrese un texto mas largo")
    .max(100, "Máximo 100 caracteres"),
  message: z
    .string()
    .min(10, "Ingrese un texto mas largo")
    .max(1000, "Máximo 1000 caracteres"),
});

export type SupportSchema = z.infer<typeof supportSchema>;