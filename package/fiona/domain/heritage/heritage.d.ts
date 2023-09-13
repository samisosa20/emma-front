import * as z from 'zod';
import { heritageSchema, listHeritageSchema, createHeritageSchema, listHeritageYearSchema } from './heritage.schema';

type Heritage = z.infer<typeof listHeritageSchema>;
type HeritageDetail = z.infer<typeof listHeritageYearSchema>;
type HeritageCreate = z.infer<typeof createHeritageSchema>;

export type { Heritage, HeritageDetail, HeritageCreate };