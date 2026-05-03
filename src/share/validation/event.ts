import * as z from "zod";

const eventSchema = z.object({
  name: z.string(),
  endEvent: z.string(),
  type: z.string(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export { eventSchema };
