import { AxiosRequestConfig } from 'axios';

import type { InvestmentAdapter } from '../domain/investment/investment.adapter';
import type { Investment, InvestmentDetail, InvestmentParams, Appretiation, AppretiationParams  } from '../domain/investment/investment';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class InvestmentApiAdapter implements InvestmentAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listInvestments(): Promise<Investment> {
    const result: any = await this.httpService.get(`investments`);
    if (result.error) {
      return result;
    }

    return result;
  }
  
  async getInvestmentDetail(id: number): Promise<InvestmentDetail> {
    const result: any = await this.httpService.get(`investments/${id}`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async createInvestment(data: InvestmentParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`investments`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editInvestment(id: number, data: InvestmentParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`investments/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async deleteInvestment(id: number): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.delete(`investments/${id}`);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  
  async listAppretiations(): Promise<Appretiation> {
    const result: any = await this.httpService.get(`appretiations`);
    if (result.error) {
      return result;
    }

    return result;
  }
  async createAppretiation(data: AppretiationParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`appretiations`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editAppretiation(id: number, data: AppretiationParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`appretiations/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async deleteAppretiation(id: number): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.delete(`appretiations/${id}`);
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

export { InvestmentApiAdapter };
