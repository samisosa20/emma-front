import * as z from 'zod';

const eventSchema = z.object({
  name: z.string(),
  end_event: z.string(),
});

export type EventSchema = z.infer<typeof eventSchema>;

export { eventSchema };
