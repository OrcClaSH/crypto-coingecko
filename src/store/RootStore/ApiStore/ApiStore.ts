import Axios from 'axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';

import rootStore from '../instance';

import {
    ApiResponse,
    GetDataParams,
    IApiStore,
    RequestParams,
    StatusHTTP,
    HTTPMethod
} from './types';

const axios = setupCache(Axios)

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;
    readonly apiKey?: string;
    readonly axios: AxiosCacheInstance;

    constructor(baseUrl: string, apiKey?: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.axios = axios;
    }

    async request<SuccessT, ErrorT = Error, ReqT = Record<string, unknown>>(
        requestParams: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        let config = {};
        if (requestParams.method === HTTPMethod.GET) {
            config = {
                method: requestParams.method,
                baseURL: this.baseUrl,
                url: requestParams.endpoint,
                params: { apiKey: this.apiKey, ...requestParams.params },
            };
        } else {
            config = {
                method: requestParams.method,
                headers: {
                    ...requestParams.headers,
                    'Content-Type': 'application/json;charset=utf-8',
                },
                baseURL: this.baseUrl,
                url: requestParams.endpoint,
                data: JSON.stringify(requestParams.data),
                params: { apiKey: this.apiKey, ...requestParams.params },
            };
        }

        try {
            const response = await this.axios(config);

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data,
                    status: response.status,
                };
            } else {
                const error = new Error(response.status.toString(), response.data)
                return {
                    success: false,
                    data: error,
                    status: response.status,
                };
            }
        } catch (error) {
            console.log('[ERROR apiStore]', error)
            rootStore.error.setErrorText((error as Error).message)
            return {
                success: false,
                data: error as Error,
                status: StatusHTTP.UnExpectedError,
            };
        }
    }

    async getData<SuccessT, ErrorT = Error>(params: GetDataParams): Promise<ApiResponse<SuccessT, ErrorT>> {
        return await this.request<SuccessT, ErrorT>({
            method: HTTPMethod.GET,
            headers: {},
            data: {},
            ...params,
        });
    }
}