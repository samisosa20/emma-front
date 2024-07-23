import * as z from 'zod';

const messageSchema =z.object({
  error: z.boolean(),
  message: z.string(),
});

const supportParamsSchema = z.object({
  subject: z.string(),
  message: z.string(),
});
export { messageSchema, supportParamsSchema };
