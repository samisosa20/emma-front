import * as z from "zod";
import { movementSchema } from '../movements/movement.schema';

const balanceSchema = z.object({
  currency: z.string(),
  movements: z.number()
})

const eventSchema = z.object({
  id: z.number(),
  name: z.string(),
  end_event: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  balance: z.array(balanceSchema)
});

const createEventSchema = z.object({
  name: z.string(),
  end_event: z.string(),
});

const listEventsSchema = z.object({
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
  events: z.array(eventSchema)
})

const eventDetailSchema = z.object({
  ...eventSchema.shape,
  movements: movementSchema,
  status: z
    .number()
    .optional()
    .transform((e) => (e === 0 ? undefined : e)),
})

export { eventSchema, listEventsSchema, createEventSchema, eventDetailSchema };
