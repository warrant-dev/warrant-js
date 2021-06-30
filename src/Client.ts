import Axios, { AxiosInstance } from "axios";
import { API_URL_BASE, API_VERSION } from "./constants";

export default class Client {
    private clientKey: string;
    private sessionToken: string;
    private httpClient: AxiosInstance;

    constructor(clientKey: string, sessionToken: string) {
        this.clientKey = clientKey;
        this.sessionToken = sessionToken;
        this.httpClient = Axios.create({
            baseURL: `${API_URL_BASE}/${API_VERSION}`,
            headers: {
                Authorization: `Bearer ${this.sessionToken}`,
            },
        })
    }

    public async isAuthorized(permissionId: string): Promise<boolean> {
        try {
            await this.httpClient.get(`/authorize/${permissionId}`);

            return true;
        } catch (e) {
            return false;
        }
    }
}
