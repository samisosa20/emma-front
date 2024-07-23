import * as z from 'zod';
import { messageSchema, supportParamsSchema } from './support.schema';

type Message = z.infer<typeof messageSchema>;
type SupportParamsSchema = z.infer<typeof supportParamsSchema>;

export type { Message, SupportParamsSchema };