import type { PaymentAdapter } from '../domain/payment/payment.adapter';
import type { PaymentRepository } from '../domain/payment/payment.repository';
import type { PaymentParams } from '../domain/payment/payment';

class PaymentUseCase implements PaymentRepository {
    private authAdapter: PaymentAdapter;

    constructor(_authAdapter: PaymentAdapter) {
        this.authAdapter = _authAdapter
    }

    listPayments = () => {
        return this.authAdapter.listPayments();
    }
    getPaymentDetail = (id: number) => {
        return this.authAdapter.getPaymentDetail(id);
    }
    createPayment = (data: PaymentParams) => {
        return this.authAdapter.createPayment(data);
    }
    editPayment = (id: number, data: PaymentParams) => {
        return this.authAdapter.editPayment(id, data);
    }
    deletePayment = (id: number) => {
        return this.authAdapter.deletePayment(id);
    }
}

export { PaymentUseCase }