import Axios, { AxiosInstance } from "axios";

export class Client {
    private static readonly API_URL_BASE = "https://api.warrant.dev";
    private static readonly API_VERSION = "v1";

    private readonly apiKey: string;
    private httpClient: AxiosInstance;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.httpClient = Axios.create({
            baseURL: `${Client.API_URL_BASE}/${Client.API_VERSION}`,
            headers: {
                Authorization: `ApiKey ${this.apiKey}`,
            },
        });
    }

    /**
     * Creates a user entity in Warrant with the specified uuid and assigns the created user the role with the specified roleName.
     * Call this method whenever a new user is created in your application. After using this method to create a user entity
     * in Warrant, you can then the isAuthorized method to authorize subsequent actions the specified user takes in your application.
     *
     * @param uuid The unique identifier used to identify the specified user in your application (i.e. a database generated id).
     * @param roleName The name of the role (from the Warrant dashboard) that you would like to assign to the specified user.
     */
    public async createUser(uuid: string, roleName: string): Promise<void> {
        try {
            await this.httpClient.post("/users", {
                uuid,
                role: {
                    id: roleName,
                },
            });
        } catch (e) {
            console.log("Error creating user in Warrant", e);
        }

        return;
    }

    /**
     * Checks against your role permission and user permission assignments in Warrant to determine if the user with the specified
     * uuid has the permission with the specified permissionName. Returns true if the user does have the permission and false otherwise.
     *
     * @param uuid The unique identifier used to identify the specified user in your application (i.e. a database generated id).
     * @param permissionName The name of the permission (from the Warrant dashboard) that you would like to check access against for the specified user.
     */
    public async isAuthorized(uuid: string, permissionName: string): Promise<boolean> {
        try {
            const response = await this.httpClient.get(`/users/${uuid}/authorize/${permissionName}`);
            if (response.status === 200) {
                return true;
            }
        } catch (e) {
            if (e.response.status !== 401) {
                console.log("Error authorizing access through Warrant", e);
            }

            return false;
        }
    }
}
