import WarrantObject from "./WarrantObject";

export default class User implements WarrantObject {
    userId: string;
    email?: string;

    constructor(userId: string, email?: string) {
        this.userId = userId;
        this.email = email;
    }

    getObjectType(): string {
        return "user";
    }

    getObjectId(): string {
        return this.userId;
    }
}
