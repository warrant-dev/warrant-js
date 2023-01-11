import WarrantObject from "./WarrantObject";

export default class Tenant implements WarrantObject {
    tenantId: string;
    name?: string;

    constructor(tenantId: string, name?: string) {
        this.tenantId = tenantId;
        this.name = name;
    }

    getObjectType(): string {
        return "tenant";
    }

    getObjectId(): string {
        return this.tenantId;
    }
}
