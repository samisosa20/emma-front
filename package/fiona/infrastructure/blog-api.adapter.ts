import { AxiosRequestConfig } from 'axios';

import type { BlogAdapter } from '../domain/blog/blog.adapter';
import type { BlogDetail, Blogs } from '../domain/blog/blog';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class BlogApiAdapter implements BlogAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listBlogs(): Promise<Blogs> {
    const result: any = await this.httpService.get(`blogs`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async getBlogDetail(slug: string): Promise<BlogDetail> {
    const result: any = await this.httpService.get(`blogs/${slug}`);
    if (result.error) {
      return result;
    }

    return result;
  }
  // Additional methods with error handling
}

export { BlogApiAdapter };
