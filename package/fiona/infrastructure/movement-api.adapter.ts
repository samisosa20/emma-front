import { AxiosRequestConfig } from 'axios';

import type { MovementAdapter } from '../domain/movement/movement.adapter';
import type { MomeventCreate, Movement } from '../domain/movement/movement';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class MovementApiAdapter implements MovementAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async getMovementDetail(id: number): Promise<Movement> {
    const result: any = await this.httpService.get(`movements/${id}`);
    if (result.error) {
      return result;
    }

    return result;
  }

  async createMovement(data: MomeventCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`movements`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editMovement(id: number, data: MomeventCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`movements/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async deleteMovement(id: number): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.delete(`movements/${id}`);
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

export { MovementApiAdapter };
