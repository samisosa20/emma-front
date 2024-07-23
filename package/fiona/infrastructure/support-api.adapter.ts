import { AxiosRequestConfig } from "axios";

import type { SupportAdapter } from "../domain/support/support.adapter";
import type {
  Message, SupportParamsSchema
} from "../domain/support/support";

import HttpService from "./http.service"; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class SupportApiAdapter implements SupportAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async postSupport(data: SupportParamsSchema): Promise<Message> {

    const result: any = await this.httpService.post(`supports`, data);
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

export { SupportApiAdapter };
