import WarrantObject from "./WarrantObject";

export default class Permission implements WarrantObject {
    permissionId: string;
    name?: string;
    description?: string;

    constructor(permissionId: string, name?: string, description?: string) {
        this.permissionId = permissionId;
        this.name = name;
        this.description = description;
    }

    getObjectType(): string {
        return "permission";
    }

    getObjectId(): string {
        return this.permissionId;
    }

}
