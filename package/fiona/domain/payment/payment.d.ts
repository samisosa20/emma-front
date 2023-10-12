import * as z from 'zod';
import { paymentSchema, listPaymentSchema, paymentParamsSchema } from './payment.schema';

type Payment = z.infer<typeof listPaymentSchema>;
type PaymentDetail = z.infer<typeof paymentSchema>;
type PaymentParams = z.infer<typeof paymentParamsSchema>;

export type { Payment, PaymentDetail, PaymentParams };