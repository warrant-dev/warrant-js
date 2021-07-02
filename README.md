# @warrantdev/warrant-js

Use [Warrant](https://warrant.dev/) as an ES module.

## Installation

Use `npm` to install the Warrant module:

```sh
npm install @warrantdev/warrant-js
```

## Usage
Import the Warrant client and pass your Client Key to the constructor to get started:
```js
import {Client as Warrant} from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant('client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=', sessionToken);
```

### `isAuthorized(permissionId)`

This function returns a `Promise` that resolves with `true` if the user for the current session token has the permission with the specified `permissionId` and `false` otherwise.

```js
import {Client as WarrantClient} from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new WarrantClient('client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=', sessionToken);

//
// Example Scenario:
// An e-commerce website where Store Owners can edit their own Store's info
//
warrant
    .isAuthorized("edit_stores")
    .then((isAuthorized) => {
        if (isAuthorized) {
            // Carry out logic to allow user to edit a Store
        }
    });
```
Or using async/await:
```js
import {Client as WarrantClient} from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new WarrantClient('client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=', sessionToken);

//
// Example Scenario:
// An e-commerce website where Store Owners can edit their own Store's info
//
if (await warrant.isAuthorized("edit_stores")) {
    // Carry out logic to allow user to edit a Store
}
```

We’ve used a random Client Key in these code examples. Replace it with your
[actual publishable Client Key](https://app.warrant.dev) to
test this code through your own Warrant account.

For more information on how to use the Warrant API, please refer to the
[Warrant API reference](https://docs.warrant.dev).

## TypeScript support

This package includes TypeScript declarations for Warrant.

Note that we may release new [minor and patch](https://semver.org/) versions of
`@warrantdev/warrant-js` with small but backwards-incompatible fixes to the type
declarations. These changes will not affect Warrant itself.

## Warrant Documentation

- [Warrant Docs](https://docs.warrant.dev/)
