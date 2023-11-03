import * as z from 'zod';
import { messageSchema, predictionParamsSchema, testProjectParamsSchema, testProjectSchema } from './tool.schema';

type Message = z.infer<typeof messageSchema>;
type PredictionParams = z.infer<typeof predictionParamsSchema>;
type TestProjectParams = z.infer<typeof testProjectParamsSchema>;
type TestProject = z.infer<typeof testProjectSchema>;

export type { Message, PredictionParams, TestProjectParams, TestProject };