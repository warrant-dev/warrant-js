import Axios, { AxiosInstance } from "axios";
import { API_URL_BASE, API_VERSION } from "./constants";
import WarrantCheck from "./types/WarrantCheck";

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

    public async isAuthorized(warrantCheck: WarrantCheck): Promise<boolean> {
        try {
            const response = await this.httpClient.post("/authorize", warrantCheck);

            return response.data.result === "Authorized";
        } catch (e) {
            return false;
        }
    }
}
