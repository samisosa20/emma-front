import * as z from 'zod';
import { listEventsSchema, eventDetailSchema, createEventSchema } from './event.schema';

type Event = z.infer<typeof listEventsSchema>;
type EventDetail = z.infer<typeof eventDetailSchema>;
type EventCreate = z.infer<typeof createEventSchema>;

export type { Event, EventDetail, EventCreate };