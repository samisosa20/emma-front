import type { Payment, PaymentDetail, PaymentParams } from "./payment";


interface PaymentAdapter {
    /**
     * Retrieves a list of todos from the data source.
     * @returns {Promise<Payment>} A Promise containing the list of todos.
     */
    listPayments(): Promise<Payment>,

    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<PaymentDetail>} A Promise containing the list of todos.
     */
    getPaymentDetail(id: number): Promise<PaymentDetail>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    createPayment(data: PaymentParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    editPayment(id: number, data: PaymentParams): Promise<{message:string, error: boolean}>,
    /**
     * Retrieves a list of todos from the data source.
     * @param {id} number - The unique identifier of the todo.
     * @returns {Promise<{message:string}>} A Promise containing the list of todos.
     */
    deletePayment(id: number): Promise<{message:string, error: boolean}>,

}

export type { PaymentAdapter };
