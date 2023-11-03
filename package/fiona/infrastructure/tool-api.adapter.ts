import { AxiosRequestConfig } from "axios";

import type { ToolAdapter } from "../domain/tool/tool.adapter";
import type {
  Message, PredictionParams, TestProjectParams, TestProject
} from "../domain/tool/tool";

import HttpService from "./http.service"; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class ToolApiAdapter implements ToolAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async getCanIDo(params: PredictionParams): Promise<Message> {
    let queryString = null;
    if (params) {
      queryString = Object.entries(params)
        .map(([key, value]) => {
          if (value && value !== undefined)
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join("&");
    }
    const result: any = await this.httpService.get(`analytics/canido?${queryString}`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async getTestProject(params: TestProjectParams): Promise<TestProject> {
    let queryString = null;
    if (params) {
      queryString = Object.entries(params)
        .map(([key, value]) => {
          if (value && value !== undefined)
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join("&");
    }
    const result: any = await this.httpService.get(`analytics/project?${queryString}`);
    if (result.error) {
      return result;
    }
    return result;
  }
  // Additional methods with error handling
}

export { ToolApiAdapter };
