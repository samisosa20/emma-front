import { AxiosRequestConfig } from 'axios';

import type { AuthAdapter } from "../domain/auth/auth.adapter.d";
import type { Login, Auth, Register, ParamsProfile, Profile, Currency, ForgotPassword } from "../domain/auth/auth.d";

import HttpService from './http.service'; // Abstracted http service

interface AuthApiAdapterOptions {
    baseUrl: string;
    customConfig?: AxiosRequestConfig | undefined;
}

class AuthApiAdapter implements AuthAdapter {
    private httpService: HttpService;

    constructor(options: AuthApiAdapterOptions) {
        this.httpService = new HttpService(options.baseUrl, options.customConfig);
    }


    async postLogin({ email, password }: Login): Promise<Auth> {
        const result: any = await this.httpService.post<Login>(`login`, { email, password });
        if(result.error) {
            return result
        }
        return {
            name: result.data.name,
            email: result.data.email,
            token: result.token,
            currency: result.data.currency,
            transfer_id: result.data.transfer_id,
            accounts_type: result.accounts_type.map((t: any) => { return {label: t.name, value: t.id}}),
            currencies: result.currencies.map((c: any) => { return {label: c.code, value: c.id}}),
            groups_category: result.groups_category.map((c: any) => { return {label: c.name, value: c.id}}),
            periods: result.periods,
            error: false,
            message: ''
        }
    }

    async postRegister(data: Register): Promise<Auth> {
        const result: any = await this.httpService.post<Register>(`register`, data);
        if(result.error) {
            return result
        }
        return {
            name: result.data.name,
            email: result.data.email,
            token: result.token,
            currency: result.data.currency,
            transfer_id: result.data.transfer_id,
            accounts_type: result.accounts_type.map((t: any) => { return {label: t.name, value: t.id}}),
            currencies: result.currencies.map((c: any) => { return {label: c.code, value: c.id}}),
            groups_category: result.groups_category.map((c: any) => { return {label: c.name, value: c.id}}),
            periods: Object.entries(result.periods).map(([key, label]) => ({ value: key, label: label as string })),
            error: false,
            message: ''
        }
    }

    async getCurrency(): Promise<Currency> {
        const result: any = await this.httpService.get(`currencies`);

        return result
    }
    async getProfile(): Promise<Profile> {
        const result: any = await this.httpService.get(`profile`);
        if(result.error) {
            return result
        }
        return {
            id: result.id,
            name: result.name,
            email: result.email,
            badge_id: result.badge_id,
            error: false,
            message: ''
        }
    }

    async updateProfile(id: number, data: ParamsProfile): Promise<Profile> {
        const result: any = await this.httpService.put(`profile/${id}`, data);
        if(result.error) {
            return result
        }
        return {
            id: result.id,
            name: result.name,
            email: result.email,
            badge_id: result.badge_id,
            error: false,
            message: result.message,
        }
    }

    async recoveryPassword(data: ForgotPassword): Promise<string> {
        const result: any = await this.httpService.post(`forgot`, data);
        if(result.error) {
            return result
        }
        return result.message;
    }

    // Additional methods with error handling
}

export { AuthApiAdapter };