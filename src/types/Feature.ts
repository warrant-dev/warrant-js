import WarrantObject from "./WarrantObject";

export default class Feature implements WarrantObject {
    featureId: string;

    constructor(featureId: string) {
        this.featureId = featureId;
    }

    getObjectType(): string {
        return "feature";
    }

    getObjectId(): string {
        return this.featureId;
    }
}
