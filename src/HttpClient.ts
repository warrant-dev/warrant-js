const PACKAGE_VERSION = require("../package.json").version;
import Axios, { AxiosRequestConfig } from "axios";
import ApiError from "./types/ApiError";

interface HttpClient {
    get(requestOptions: HttpClientRequestOptions): Promise<any>;
    post(requestOptions: HttpClientRequestOptions): Promise<any>;
}

export interface HttpClientConfig {
    sessionToken: string;
    baseUrl: string;
}

export interface HttpClientRequestOptions {
    sessionToken?: string;
    baseUrl?: string;
    data?: any;
    params?: any;
    url: string;
}

export default class ApiClient implements HttpClient {
    private config: HttpClientConfig;

    constructor(config: HttpClientConfig) {
        this.config = config;
    }

    public async get(requestOptions: HttpClientRequestOptions): Promise<any> {
        try {
            const response = await Axios({
                method: "GET",
                ...this.buildRequestConfig(requestOptions),
            });
            return response.data;
        } catch (e) {
            throw this.buildError(e);
        }
    }

    public async post(requestOptions: HttpClientRequestOptions): Promise<any> {
        try {
            const response = await Axios({
                method: "POST",
                ...this.buildRequestConfig(requestOptions),
            });
            return response.data;
        } catch (e) {
            throw this.buildError(e);
        }
    }

    private buildRequestConfig(requestOptions?: HttpClientRequestOptions): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            baseURL: this.config.baseUrl,
            headers: {
                "User-Agent": `warrant-js/${PACKAGE_VERSION}`,
                Authorization: `Bearer ${this.config.sessionToken}`,
            },
            ...requestOptions,
        };

        if (requestOptions?.sessionToken) {
            config.headers['Authorization'] = `Bearer ${requestOptions.sessionToken}`;
        }

        if (requestOptions?.baseUrl) {
            config.baseURL = requestOptions.baseUrl;
        }

        return config;
    }

    private buildError(e: any): Error {
        if (e.response) {
            return new ApiError(e.response.data.code, e.response.data.message);
        }

        return e;
    }
}
