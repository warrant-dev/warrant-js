import WarrantObject from "./WarrantObject";

export default class Role implements WarrantObject {
    roleId: string;
    name?: string;
    description?: string;

    constructor(roleId: string, name?: string, description?: string) {
        this.roleId = roleId;
        this.name = name;
        this.description = description;
    }

    getObjectType(): string {
        return "role";
    }

    getObjectId(): string {
        return this.roleId;
    }

}
