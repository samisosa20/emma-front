import { AxiosRequestConfig } from 'axios';

import type { EventAdapter } from '../domain/event/event.adapter';
import type { Event, EventDetail, EventCreate, EventSelect } from '../domain/event/event';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class EventApiAdapter implements EventAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listEvents(): Promise<Event> {
    const result: any = await this.httpService.get(`events`);
    if (result.error) {
      return result;
    }
    return result;
  }
  
  async listSelectEvents(): Promise<EventSelect> {
    const result: any = await this.httpService.get(`events/active`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async getEventDetail(id: number): Promise<EventDetail> {
    const result: any = await this.httpService.get(`events/${id}`);
    if (result.error) {
      return result;
    }

    return result;
  }

  async createEvent(data: EventCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`events`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editEvent(id: number, data: EventCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`events/${id}`, data);
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

export { EventApiAdapter };
