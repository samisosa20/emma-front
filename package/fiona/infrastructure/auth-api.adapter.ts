import { AxiosRequestConfig } from 'axios';

import type { AuthAdapter } from "../domain/auth/auth.adapter.d";
import type { Login, Auth } from "../domain/auth/auth.d";

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
            error: false,
            message: ''
        }
    }

    // Additional methods with error handling
}

export { AuthApiAdapter };