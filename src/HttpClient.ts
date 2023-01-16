const PACKAGE_VERSION = require("../package.json").version;
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

interface RequestHeaders {
    [header: string]: string;
}

export default class ApiClient implements HttpClient {
    private config: HttpClientConfig;

    constructor(config: HttpClientConfig) {
        this.config = config;
    }

    public async get(requestOptions: HttpClientRequestOptions): Promise<any> {
        const [requestUrl, requestHeaders] = this.buildRequestUrlAndHeaders(requestOptions);
        /* @ts-ignore */
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: requestHeaders,
        });
        if (!response.ok) {
            throw this.buildError(await response.json());
        }

        return response.json();
    }

    public async post(requestOptions: HttpClientRequestOptions): Promise<any> {
        const [requestUrl, requestHeaders] = this.buildRequestUrlAndHeaders(requestOptions);
        /* @ts-ignore */
        const response = await fetch(requestUrl, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestOptions.data),
        });

        if (!response.ok) {
            throw this.buildError(await response.json());
        }

        return response.json();
    }

    private buildRequestUrlAndHeaders(requestOptions?: HttpClientRequestOptions): [string, RequestHeaders] {
        let baseUrl = this.config.baseUrl;
        const headers = {
            "User-Agent": `warrant-js/${PACKAGE_VERSION}`,
            Authorization: `Bearer ${this.config.sessionToken}`,
        };

        if (requestOptions?.sessionToken) {
            headers['Authorization'] = `Bearer ${requestOptions.sessionToken}`;
        }

        if (requestOptions?.baseUrl) {
            baseUrl = requestOptions.baseUrl;
        }

        return [`${baseUrl}${requestOptions.url}`, headers];
    }

    private buildError(errorResponse: any): Error {
        return new ApiError(errorResponse.code, errorResponse.message);
    }
}
