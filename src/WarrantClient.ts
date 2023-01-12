import { API_URL_BASE } from "./constants";
import Config from "./types/Config";
import Feature from "./types/Feature";
import Check, {
    CheckMany,
    CheckOp,
    CheckWarrant,
    FeatureCheck,
    PermissionCheck,
} from "./types/Check";
import Permission from "./types/Permission";
import ApiClient from "./HttpClient";

export default class WarrantClient {
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
        const response = await this.httpClient.post({
            url: "/v2/authorize",
            data: {
                op: CheckOp.AnyOf,
                warrants: [{
                    objectType: check.object.getObjectType(),
                    objectId: check.object.getObjectId(),
                    relation: check.relation,
                    context: check.context,
                }],
                consistentRead: check.consistentRead,
                debug: check.debug,
            },
        });
        return response.result === "Authorized";
    }

    public async checkMany(check: CheckMany): Promise<boolean> {
        const response = await this.httpClient.post({
            url: "/v2/authorize",
            data: {
                op: check.op,
                warrants: check.warrants.map((warrant: CheckWarrant) => ({
                    objectType: warrant.object.getObjectType(),
                    objectId: warrant.object.getObjectId(),
                    relation: warrant.relation,
                    context: warrant.context,
                })),
                consistentRead: check.consistentRead,
                debug: check.debug,
            },
        });
        return response.result === "Authorized";
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