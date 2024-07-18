import { AxiosRequestConfig } from 'axios';

import type { CategoryAdapter } from '../domain/category/category.adapter';
import type { Category, CategoryList, CategoryCreate, CategoryDetailParams } from '../domain/category/category';

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class CategoryApiAdapter implements CategoryAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listCategories(): Promise<Category> {
    const result: any = await this.httpService.get(`categories`);
    if (result.error) {
      return result;
    }

    return result;
  }

  async listSelectCategories(): Promise<CategoryList> {
    const result: any = await this.httpService.get(`categories-list`);
    if (result.error) {
      return result;
    }

    return result.map((category: any) => { return {label: category.title, value: category.id}});
  }
  
  async getCategoryDetail(id: number, params: CategoryDetailParams): Promise<CategoryCreate> {
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (value &&
          value !==
            undefined) return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
    const result: any = await this.httpService.get(`categories/${id}?${queryString}`);
    if (result.error) {
      return result;
    }
    return result;
  }

  async createCategory(data: CategoryCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.post(`categories`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async editCategory(id: number, data: CategoryCreate): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.put(`categories/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false
    };
  }
  async deleteCategory(id: number): Promise<{message:string, error: boolean}> {
    const result: any = await this.httpService.delete(`categories/${id}`);
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

export { CategoryApiAdapter };
