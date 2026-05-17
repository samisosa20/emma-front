import * as z from "zod";

const eventSchema = z.object({
  name: z.string().min(1, "Se requiere el nombre").max(100, "Máximo 100 caracteres"),
  endEvent: z.string(),
  type: z.string(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export { eventSchema };
