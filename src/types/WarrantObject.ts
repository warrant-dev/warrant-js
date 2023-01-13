export default interface WarrantObject {
    getObjectType(): string;
    getObjectId(): string;
}

export interface WarrantObjectLiteral {
    objectType: string;
    objectId: string;
}

export function isWarrantObject(object: any): object is WarrantObject {
    return object.getObjectType !== undefined && object.getObjectId !== undefined;
}
