import { AxiosRequestConfig } from 'axios';

import type { ReportAdapter } from '../domain/report/report.adapter';
import type { Report, ReportParams, ReportMovement } from '../domain/report/report';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class ReportApiAdapter implements ReportAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async getReport(params: ReportParams): Promise<Report> {
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (value &&
          value !==
            undefined) return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    const result: any = await this.httpService.get(`report?${queryString}`);
    if (result.error) {
      return result;
    }

    const metrics = [
      {
        title: 'Balance inicial',
        values: [result.metrics.open_balance],
      },
      {
        title: 'Ingresos',
        values: [result.metrics.income],
      },
      {
        title: 'Egresos',
        values: [result.metrics.expensive],
      },
      {
        title: 'Balance final',
        values: [result.metrics.utility],
      },
    ];

    return {
      ...result,
      metrics: metrics,
      group_expensive: result.group_expensive.map((group: any) => {
        return { title: group.name, value: group.amount, id: group.id };
      }),
      list_expensives: result.list_expensives.map((expensive: any) => {
        return { title: expensive.category, value: expensive.amount, id: expensive.id };
      }),
      list_incomes: result.list_incomes.map((income: any) => {
        return { title: income.category, value: income.amount, id: income.id };
      }),
      credit_carts: result.credit_carts.map((card: any) => {
        return {
          limit: card.limit,
          title: card.name,
          value: card.balance + card.init_amount,
          percentage: (
            ((card.balance + card.init_amount) / card.limit) *
            -100
          ).toFixed(2),
        };
      }),
    };
  }

  async getReportCategory(params: ReportParams): Promise<ReportMovement> {
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (value &&
          value !==
            undefined) return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    const result: any = await this.httpService.get(`report/category?${queryString}`);
    if (result.error) {
      return result;
    }


    return result
  }
  async getReportGroup(params: ReportParams): Promise<ReportMovement> {
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (value &&
          value !==
            undefined) return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    const result: any = await this.httpService.get(`report/group?${queryString}`);
    if (result.error) {
      return result;
    }


    return result
  }
  // Additional methods with error handling
}

export { ReportApiAdapter };
