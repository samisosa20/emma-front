import { AxiosRequestConfig } from 'axios';

import type { BudgetAdapter } from '../domain/budget/budget.adapter';
import type { Budget, BudgetParams, BudgetReport, BudgetYear, BudgetList  } from '../domain/budget/budget';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class BudgetApiAdapter implements BudgetAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listYearBudget(): Promise<BudgetYear> {
    const result: any = await this.httpService.get(`budgets-list`);
    if (result.error) {
      return result;
    }

    return result;
  }
  async listBudget(params: {year: number, badge_id: number}): Promise<BudgetList> {
    const result: any = await this.httpService.get(`budgets?year=${params.year}&badge_id=${params.badge_id}`);
    if (result.error) {
      return result;
    }

    return result;
  }

  async getReporttPerYear(params: {year: number, badge_id: number}): Promise<BudgetReport> {
    const result: any = await this.httpService.get(`budgets-report?year=${params.year}&badge_id=${params.badge_id}`);
    if (result.error) {
      return result;
    }

    return result;
  }
  
  async getBudgetDetail(id: number): Promise<Budget> {
    const result: any = await this.httpService.get(`budgets/${id}`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async createBudget(data: BudgetParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`budgets`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editBudget(id: number, data: BudgetParams): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`budgets/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async deleteBudget(id: number): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.delete(`budgets/${id}`);
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

export { BudgetApiAdapter };
