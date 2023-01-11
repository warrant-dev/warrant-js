import WarrantObject from "./WarrantObject";

export default class PricingTier implements WarrantObject {
    pricingTierId: string;

    constructor(pricingTierId: string) {
        this.pricingTierId = pricingTierId;
    }

    getObjectType(): string {
        return "pricing-tier";
    }

    getObjectId(): string {
        return this.pricingTierId;
    }
}
