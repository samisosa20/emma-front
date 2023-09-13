import { AxiosRequestConfig } from 'axios';

import type { HeritageAdapter } from '../domain/heritage/heritage.adapter';
import type { Heritage, HeritageDetail, HeritageCreate  } from '../domain/heritage/heritage';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class HeritageApiAdapter implements HeritageAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listHeritages(): Promise<Heritage> {
    const result: any = await this.httpService.get(`heritages-list`);
    if (result.error) {
      return result;
    }

    return result;
  }

  async getListPerYearDetail(year: number): Promise<HeritageDetail> {
    const result: any = await this.httpService.get(`heritages?year=${year}`);
    if (result.error) {
      return result;
    }

    return result;
  }
  
  async getHeritageDetail(id: number): Promise<HeritageCreate> {
    const result: any = await this.httpService.get(`heritages/${id}`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async createHeritage(data: HeritageCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`heritages`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editHeritage(id: number, data: HeritageCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`heritages/${id}`, data);
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

export { HeritageApiAdapter };
