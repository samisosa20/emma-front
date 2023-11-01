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
        values: [result.metrics.open_balance + ' ' + result.currency.code],
      },
      {
        title: 'Ingresos',
        values: [result.metrics.income + ' ' + result.currency.code],
      },
      {
        title: 'Egresos',
        values: [result.metrics.expensive + ' ' + result.currency.code],
      },
      {
        title: 'Balance final',
        values: [result.metrics.utility + ' ' + result.currency.code],
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
          color: ((card.balance + card.init_amount) / card.limit) > 0.95 ? 'red' : ((card.balance + card.init_amount) / card.limit) > 0.50 ? 'yellow': 'green',
          percentage: (
            ((card.balance + card.init_amount) / card.limit) *
            -100
          ).toFixed(2),
        };
      }),
      budget: result.budget.map((budget: any) => {
        let color = 'green';
        if(budget.category.group_id > 2) {
          color = (Math.abs(budget.movement) / budget.amount) > 0.95 ? 'red' : (Math.abs(budget.movement) / budget.amount) > 0.65 ? 'yellow': 'green'
        } else {
          color = (Math.abs(budget.movement) / budget.amount) > 0.90 ? 'green' : (Math.abs(budget.movement) / budget.amount) > 0.65 ? 'yellow': 'red'
        }
        return {
          limit: budget.amount,
          title: budget.category.name,
          value: budget.movement,
          color: color,
          percentage: (
            (Math.abs(budget.movement) / budget.amount) *
            -100
          ).toFixed(2),
        }
      })
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
