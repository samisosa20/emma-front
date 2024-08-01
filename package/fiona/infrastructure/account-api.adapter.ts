import { AxiosRequestConfig } from "axios";

import type { AccountAdapter } from "../domain/account/account.adapter";
import type {
  Account,
  AccountDetail,
  AccountCreate,
  AccountParams,
} from "../domain/account/account";

import HttpService from "./http.service"; // Abstracted http service

interface AuthApiAdapterOptions {
  baseUrl: string;
  customConfig?: AxiosRequestConfig | undefined;
}

class AccountApiAdapter implements AccountAdapter {
  private httpService: HttpService;

  constructor(options: AuthApiAdapterOptions) {
    this.httpService = new HttpService(options.baseUrl, options.customConfig);
  }

  async listAccounts(): Promise<Account> {
    const result: any = await this.httpService.get(`accounts`);
    if (result.error) {
      return result;
    }
    const transformedData = result.balances.length > 0 ? Object.keys(result.balances[0])
      .filter((key) => key !== "i" && key !== "currency")
      .map((key) => ({
        title: key,
        values: result.balances.map(
          (item: any) =>
            `${parseFloat(item[key]).toLocaleString()} ${item.currency}`
        ),
      })): [];
    return {
      accounts: result.accounts,
      balances: [
        {
          title: "Balance del mes actual",
          values: transformedData.filter((v) => v.title === "month").length > 0 ? transformedData.filter((v) => v.title === "month")[0].values : [],
        },
        {
          title: "Balance del año actual",
          values: transformedData.filter((v) => v.title === "year").length > 0 ? transformedData.filter((v) => v.title === "year")[0].values : [],
        },
        {
          title: "Balance total",
          values: transformedData.filter((v) => v.title === "balance").length > 0 ? transformedData.filter((v) => v.title === "balance")[0].values : [],
        },
      ],
    };
  }

  async getAccountDetail(
    id: number,
    filters?: AccountParams
  ): Promise<AccountDetail> {
    let queryString = null;
    if (filters) {
      queryString = Object.entries(filters)
        .map(([key, value]) => {
          if (value && value !== undefined)
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join("&");
    }
    const result: any = await this.httpService.get(
      `accounts/${id}?${queryString}`
    );
    if (result.error) {
      return result;
    }
    const transformedData = Object.keys(result.balances[0])
      .filter((key) => key !== "i" && key !== "currency")
      .map((key) => ({
        title: key,
        values: result.balances.map(
          (item: any) =>
            `${parseFloat(item[key]).toLocaleString()}${key.includes('variation') ? '' : ` ${item.currency}`}`
        ),
      }));

      console.log(transformedData)
    return {
      balancesAccount: result.balancesAccount,
      movements: result.movements,
      account: result.account,
      balances: [
        {
          title: "Balance del mes actual",
          values: transformedData.filter((v) => v.title === "month")[0].values,
          variations: transformedData.filter((v) => v.title === "month_variation")[0].values,
        },
        {
          title: "Balance del año actual",
          values: transformedData.filter((v) => v.title === "year")[0].values,
          variations: transformedData.filter((v) => v.title === "year_variation")[0].values,
        },
        {
          title: "Balance total",
          values: transformedData.filter((v) => v.title === "balance")[0]
            .values,
            variations: null
        },
      ],
    };
  }

  async createAccount(
    data: AccountCreate
  ): Promise<{ message: string; error: boolean }> {
    const result: any = await this.httpService.post(`accounts`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false,
    };
  }
  async editAccount(
    id: number,
    data: AccountCreate
  ): Promise<{ message: string; error: boolean }> {
    const result: any = await this.httpService.put(`accounts/${id}`, data);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false,
    };
  }
  async desactiveAccount(
    id: number,
  ): Promise<{ message: string; error: boolean }> {
    const result: any = await this.httpService.delete(`accounts/${id}`);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false,
    };
  }
  async activeAccount(
    id: number,
  ): Promise<{ message: string; error: boolean }> {
    const result: any = await this.httpService.post(`accounts/restore/${id}`, {});
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false,
    };
  }
  async deleteAccount(
    id: number,
  ): Promise<{ message: string; error: boolean }> {
    const result: any = await this.httpService.delete(`accounts/delete/${id}`);
    if (result.error) {
      return result;
    }
    return {
      message: result.message,
      error: false,
    };
  }
  // Additional methods with error handling
}

export { AccountApiAdapter };
