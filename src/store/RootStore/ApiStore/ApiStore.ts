import Axios, { AxiosError } from 'axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';

import rootStore from '../instance';
import { API_ENDPOINTS } from '@/config';
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
    baseUrl: string;
    readonly apiKey?: string;
    readonly axios: AxiosCacheInstance;
    retryCount: number = 0

    constructor(apiKey?: string) {
        this.apiKey = apiKey;
        this.baseUrl = rootStore.status.baseUrl;
        this.axios = axios;
    }

    async request<SuccessT, ErrorT = Error, ReqT = Record<string, unknown>>(
        requestParams: RequestParams<ReqT>,
        isMocked: boolean = false
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        let baseURL = isMocked ? API_ENDPOINTS.MOCK_URL : this.baseUrl
        let config = {};
        if (requestParams.method === HTTPMethod.GET) {
            config = {
                method: requestParams.method,
                baseURL,
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
                baseURL,
                url: requestParams.endpoint,
                data: JSON.stringify(requestParams.data),
                params: { apiKey: this.apiKey, ...requestParams.params },
            };
        }

        try {
            const response = await this.axios(config);

            if (response.status === 200) {
                rootStore.status.setIsLimitRate(false)
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
            const err = error as AxiosError
            if (err.code === 'ERR_NETWORK') {
                this.baseUrl = API_ENDPOINTS.MOCK_URL
                rootStore.status.setErrorText(err.message)
                rootStore.status.setIsLimitRate(true)
                rootStore.status.setBaseUrl(API_ENDPOINTS.MOCK_URL)
            }
            if (this.retryCount === 0) {
                this.retryCount++
                return await this.request<SuccessT, ErrorT, ReqT>(requestParams)
            }
            this.retryCount = 0;
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