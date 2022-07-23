# @warrantdev/warrant-js

Use [Warrant](https://warrant.dev/) as an ES module.

[![npm](https://img.shields.io/npm/v/@warrantdev/warrant-js)](https://www.npmjs.com/package/@warrantdev/warrant-js)
[![Slack](https://img.shields.io/badge/slack-join-brightgreen)](https://join.slack.com/t/warrantcommunity/shared_invite/zt-12g84updv-5l1pktJf2bI5WIKN4_~f4w)

## Installation

Use `npm` to install the Warrant module:

```sh
npm install @warrantdev/warrant-js
```

## Usage
Import the Warrant client and pass your Client Key to the constructor to get started:
```js
import { Client as Warrant } from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant('client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=', sessionToken);
```

### `isAuthorized(warrantCheck)`

This function returns a `Promise` that resolves with `true` if the user for the current session token has the specified `warrants` and `false` otherwise.

```js
import { Client as WarrantClient } from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new WarrantClient('client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=', sessionToken);

//
// Example Scenario:
// An e-commerce website where Store Owners can edit their own Store's info
//
warrant
    .isAuthorized({
        warrants: [{
            objectType: "store",
            objectId: storeId,
            relation: "edit",
        }]
    })
    .then((isAuthorized) => {
        if (isAuthorized) {
            // Carry out logic to allow user to edit a Store
        }
    });
```
Or using async/await:
```js
import { Client as WarrantClient } from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new WarrantClient('client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=', sessionToken);

//
// Example Scenario:
// An e-commerce website where Store Owners can edit their own Store's info
//
const isAuthorized = await warrant.isAuthorized({
    warrants: [{
        objectType: "store",
        objectId: storeId,
        relation: "edit",
    }]
});
if (isAuthorized) {
    // Carry out logic to allow user to edit a Store
}
```

We’ve used a random Client Key in these code examples. Replace it with your
[actual publishable Client Key](https://app.warrant.dev) to
test this code through your own Warrant account.

For more information on how to use the Warrant API, please refer to the
[Warrant API reference](https://docs.warrant.dev).

## Support for Multiple Warrants

`warrants` contains the list of warrants evaluted to determine if the user has access. If `warrants` contains multiple warrants, the `op` parameter is required and specifies how the list of warrants should be evaluated.

**anyOf** specifies that the access check request will be authorized if *any of* the warrants are matched and will not be authorized otherwise.

**allOf** specifies that the access check request will be authorized if *all of* the warrants are matched and will not be authorized otherwise.

```js
// User is authorized if they are a 'viewer' of protected_info OR a 'viewer' of 'another_protected_info'
const isAuthorized = await warrant.isAuthorized({
    op: "anyOf",
    warrants: [{
        objectType: "info",
        objectId: "protected_info",
        relation: "viewer",
    }, {
        objectType: "info",
        objectId: "another_protected_info",
        relation: "viewer",
    }]
});
```

## TypeScript support

This package includes TypeScript declarations for Warrant.

Note that we may release new [minor and patch](https://semver.org/) versions of
`@warrantdev/warrant-js` with small but backwards-incompatible fixes to the type
declarations. These changes will not affect Warrant itself.

## Warrant Documentation

- [Warrant Docs](https://docs.warrant.dev/)
