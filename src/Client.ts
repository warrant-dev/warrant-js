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

    public async isAuthorized(objectType: string, objectId: string, relation: string): Promise<boolean> {
        try {
            await this.httpClient.post("/sessions/authorize", {
                objectType,
                objectId,
                relation,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}
