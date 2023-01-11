import { API_URL_BASE } from "./constants";
import Config from "./types/Config";
import Feature from "./types/Feature";
import Check, {
    CheckMany,
    CheckOp,
    FeatureCheck,
    PermissionCheck,
} from "./types/Check";
import Permission from "./types/Permission";
import ApiClient from "./HttpClient";

export default class Warrant {
    private readonly config: Config;
    private readonly httpClient: ApiClient;

    constructor(config: Config) {
        this.config = config;
        this.httpClient = new ApiClient({
            sessionToken: this.config.sessionToken,
            baseUrl: this.config.endpoint || API_URL_BASE,
        });
    }

    public async check(check: Check): Promise<boolean> {
        try {
            const response = await this.httpClient.post({
                url: "/v2/authorize",
                data: {
                    op: CheckOp.AnyOf,
                    warrants: [{
                        objectType: check.object.getObjectType(),
                        objectId: check.object.getObjectId(),
                        relation: check.relation,
                        context: check.context,
                    }]
                },
            });

            return response.data.result === "Authorized";
        } catch (e) {
            return false;
        }
    }

    public async checkMany(check: CheckMany): Promise<boolean> {
        try {
            const response = await this.httpClient.post({
                url: "/v2/authorize",
                data: check,
            });
            return response.data.result === "Authorized";
        } catch (e) {
            return false;
        }
    }

    public async hasFeature(featureCheck: FeatureCheck): Promise<boolean> {
        return this.check({
            object: new Feature(featureCheck.featureId),
            relation: "member",
            context: featureCheck.context,
            consistentRead: featureCheck.consistentRead,
            debug: featureCheck.debug,
        });
    }

    public async hasPermission(permissionCheck: PermissionCheck): Promise<boolean> {
        return this.check({
            object: new Permission(permissionCheck.permissionId),
            relation: "member",
            context: permissionCheck.context,
            consistentRead: permissionCheck.consistentRead,
            debug: permissionCheck.debug,
        });
    }
}
