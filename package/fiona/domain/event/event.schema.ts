import * as z from "zod";

const eventSchema = z.object({
  id: z.number(),
  name: z.string(),
  end_event: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export { eventSchema };
