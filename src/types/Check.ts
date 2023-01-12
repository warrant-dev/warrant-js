import Context from "./Context";
import WarrantObject from "./WarrantObject";

export enum CheckOp {
    AllOf = "allOf",
    AnyOf = "anyOf",
}

export interface CheckWarrant {
    object: WarrantObject;
    relation: string;
    context?: Context;
}

export default interface Check extends CheckWarrant {
    consistentRead?: boolean;
    debug?: boolean;
}

export interface CheckMany {
    op?: CheckOp;
    warrants: CheckWarrant[];
    consistentRead?: boolean;
    debug?: boolean;
}

export interface FeatureCheck {
    featureId: string;
    context?: Context;
    consistentRead?: boolean;
    debug?: boolean;
}

export interface PermissionCheck {
    permissionId: string;
    context?: Context;
    consistentRead?: boolean;
    debug?: boolean;
}
