import Axios, { AxiosInstance } from "axios";
import { API_URL_BASE } from "./constants";
import Config from "./types/Config";
import WarrantCheck from "./types/WarrantCheck";

export default class Client {
    private httpClient: AxiosInstance;

    constructor(config: Config) {
        this.httpClient = Axios.create({
            baseURL: config.endpoint || API_URL_BASE,
            headers: {
                Authorization: `Bearer ${config.sessionToken}`,
            },
        })
    }

    public async isAuthorized(warrantCheck: WarrantCheck): Promise<boolean> {
        try {
            const response = await this.httpClient.post("/v2/authorize", warrantCheck);

            return response.data.result === "Authorized";
        } catch (e) {
            return false;
        }
    }
}
