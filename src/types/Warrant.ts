import Context from "./Context";

export default interface Warrant {
    objectType: string;
    objectId: string;
    relation: string;
    context?: Context;
}
