import * as z from 'zod';

export const supportSchema = z.object({
  subject: z.string().min(10, "Ingrese un texto mas largo"),
  message: z.string().min(10, "Ingrese un texto mas largo"),
});

export type SupportSchema = z.infer<typeof supportSchema>;