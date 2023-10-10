import * as z from 'zod';
import { listEventsSchema, eventDetailSchema, createEventSchema, listEventsSelectSchema } from './event.schema';

type Event = z.infer<typeof listEventsSchema>;
type EventSelect = z.infer<typeof listEventsSelectSchema>;
type EventDetail = z.infer<typeof eventDetailSchema>;
type EventCreate = z.infer<typeof createEventSchema>;

export type { Event, EventDetail, EventCreate, EventSelect };