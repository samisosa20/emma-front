import * as z from 'zod';
import { movementParamsSchema, movementSchema } from './movement.schema';

type Movement = z.infer<typeof movementSchema>;
type MomeventCreate = z.infer<typeof movementParamsSchema>;

export type { Movement, MomeventCreate };