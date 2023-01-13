const WarrantNode = require("@warrantdev/warrant-node");
const Warrant = require("../dist/index");
var assert = require('assert');

// Simulate browser environment
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Remove .skip below and add your API_KEY and CLIENT_KEY to run the tests.
describe.skip('Live Test', function () {
    before(async function () {
        this.warrantClient = new WarrantNode.WarrantClient({ apiKey: "API_KEY" });

        this.role = await this.warrantClient.Role.create({ roleId: "test-role" });
        this.permission = await this.warrantClient.Permission.create({ permissionId: "test-permission" });
        this.feature = await this.warrantClient.Feature.create({ featureId: "test-feature" });
        this.pricingTier = await this.warrantClient.PricingTier.create({ pricingTierId: "test-pricing-tier" });
        this.user = await this.warrantClient.User.create({ userId: "test-user" });

        await this.role.assignPermission(this.permission.permissionId);
        await this.pricingTier.assignFeature(this.feature.featureId);
        await this.user.assignRole(this.role.roleId);
        await this.user.assignPricingTier(this.pricingTier.pricingTierId);

        const sessionToken = await this.warrantClient.Session.createAuthorizationSession({ userId: this.user.userId });
        this.warrant = new Warrant.WarrantClient({ clientKey: "CLIENT_KEY", sessionToken });
    });

    after(async function () {
        await this.user.removePricingTier(this.pricingTier.pricingTierId);
        await this.user.removeRole(this.role.roleId);
        await this.pricingTier.removeFeature(this.feature.featureId);
        await this.role.removePermission(this.permission.permissionId);

        await this.warrantClient.User.delete(this.user.userId);
        await this.warrantClient.PricingTier.delete(this.pricingTier.pricingTierId);
        await this.warrantClient.Feature.delete(this.feature.featureId);
        await this.warrantClient.Permission.delete(this.permission.permissionId);
        await this.warrantClient.Role.delete(this.role.roleId);
    });

    it('check', async function () {
        let authorized = await this.warrant.check({
            object: {
                objectType: this.role.getObjectType(),
                objectId: this.role.roleId,
            },
            relation: "member",
            subject: this.user,
        });
        assert(authorized);

        authorized = await this.warrant.check({
            object: {
                objectType: this.role.getObjectType(),
                objectId: this.role.roleId,
            },
            relation: "owner",
            subject: this.user,
        });
        assert(!authorized);
    });

    it('checkMany', async function () {
        let authorized = await this.warrant.checkMany({
            op: WarrantNode.CheckOp.AnyOf,
            warrants: [
                {
                    object: this.role,
                    relation: "member",
                },
                {
                    object: this.role,
                    relation: "owner",
                }
            ]
        });
        assert(authorized);

        authorized = await this.warrant.checkMany({
            op: WarrantNode.CheckOp.AllOf,
            warrants: [
                {
                    object: this.role,
                    relation: "member",
                },
                {
                    object: this.role,
                    relation: "owner",
                }
            ]
        });
        assert(!authorized);
    });

    it('hasPermission', async function () {
        let hasPermission = await this.warrant.hasPermission({
            permissionId: "test-permission",
        });
        assert(hasPermission);

        hasPermission = await this.warrant.hasPermission({
            permissionId: "another-permission",
        });
        assert(!hasPermission);
    });

    it('hasFeature', async function () {
        let hasFeature = await this.warrant.hasFeature({
            featureId: "test-feature",
        });
        assert(hasFeature);

        hasFeature = await this.warrant.hasFeature({
            featureId: "another-feature",
        });
        assert(!hasFeature);
    });
});
