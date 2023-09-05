import { AxiosRequestConfig } from 'axios';

import type { AccountAdapter } from '../domain/account/account.adapter';
import type { Account, AccountDetail } from '../domain/account/account';

import HttpService from './http.service'; // Abstracted http service

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
    const transformedData = Object.keys(result.balances[0])
      .filter((key) => key !== 'i' && key !== 'currency')
      .map((key) => ({
        title: key,
        values: result.balances.map(
          (item: any) =>
            `${parseFloat(item[key]).toLocaleString()} ${item.currency}`
        ),
      }));
    return {
      accounts: result.accounts,
      balances: [
        {
          title: 'Balance del mes actual',
          values: transformedData.filter((v) => v.title === 'month')[0].values,
        },
        {
          title: 'Balance del año actual',
          values: transformedData.filter((v) => v.title === 'year')[0].values,
        },
        {
          title: 'Balance total',
          values: transformedData.filter((v) => v.title === 'balance')[0]
            .values,
        },
      ],
    };
  }

  async getAccountDetail(id: number): Promise<AccountDetail> {
    const result: any = await this.httpService.get(`accounts/${id}`);
    if (result.error) {
      return result;
    }
    const transformedData = Object.keys(result.balances[0])
      .filter((key) => key !== 'i' && key !== 'currency')
      .map((key) => ({
        title: key,
        values: result.balances.map(
          (item: any) =>
            `${parseFloat(item[key]).toLocaleString()} ${item.currency}`
        ),
      }));
    return {
      balancesAccount: result.balancesAccount,
      movements: result.movements,
      account: result.account,
      balances: [
        {
          title: 'Balance del mes actual',
          values: transformedData.filter((v) => v.title === 'month')[0].values,
        },
        {
          title: 'Balance del año actual',
          values: transformedData.filter((v) => v.title === 'year')[0].values,
        },
        {
          title: 'Balance total',
          values: transformedData.filter((v) => v.title === 'balance')[0]
            .values,
        },
      ],
    };
  }

  // Additional methods with error handling
}

export { AccountApiAdapter };
