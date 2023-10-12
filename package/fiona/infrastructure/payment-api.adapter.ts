import { AxiosRequestConfig } from 'axios';

import type { PaymentAdapter } from '../domain/payment/payment.adapter';
import type { Payment, PaymentDetail, PaymentParams  } from '../domain/payment/payment';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class PaymentApiAdapter implements PaymentAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listPayments(): Promise<Payment> {
    const result: any = await this.httpService.get(`payments`);
    if (result.error) {
      return result;
    }

    return result;
  }
  
  async getPaymentDetail(id: number): Promise<PaymentDetail> {
    const result: any = await this.httpService.get(`payments/${id}`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async createPayment(data: PaymentParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`payments`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editPayment(id: number, data: PaymentParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`payments/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async deletePayment(id: number): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.delete(`payments/${id}`);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  // Additional methods with error handling
}

export { PaymentApiAdapter };
