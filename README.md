# @warrantdev/warrant-js

Use [Warrant](https://warrant.dev/) as an ES module.

[![npm](https://img.shields.io/npm/v/@warrantdev/warrant-js)](https://www.npmjs.com/package/@warrantdev/warrant-js)

## Installation

Use `npm` to install the Warrant module:

```sh
npm install @warrantdev/warrant-js
```

## Usage

Import the Warrant client and pass a valid Config object to the constructor to get started:

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});
```

### `check`

This function returns a `Promise` that resolves with `true` if the user for the current session token has the specified `warrant` and `false` otherwise.

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

//
// Example Scenario:
// An e-commerce website where Store Owners can edit their own Store's info
//
warrant.check({ object: myReport, relation: "editor" }).then((isAuthorized) => {
  if (isAuthorized) {
    // Carry out logic to allow user to edit a Store
  }
});
```

Or using async/await:

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

//
// Example Scenario:
// An e-commerce website where Store Owners can edit their own Store's info
//
const isAuthorized = await warrant.check({
  object: myReport,
  relation: "editor",
});
if (isAuthorized) {
  // Carry out logic to allow user to edit a Store
}
```

### `checkMany`

This function returns a `Promise` that resolves with `true` if the user for the current session token has `allOf` or `anyOf` (depending on the passed in `op`) the specified `warrants` and `false` otherwise.

**CheckOp.AnyOf** specifies that the access check request will be authorized if _any of_ the warrants are matched and will not be authorized otherwise.

**CheckOp.AllOf** specifies that the access check request will be authorized if _all of_ the warrants are matched and will not be authorized otherwise.

```js
import Warrant, { CheckOp } from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

warrant
  .checkMany({
    op: CheckOp.AllOf,
    warrants: [
      {
        object: tenantA,
        relation: "member",
      },
      {
        object: reportA,
        relation: "editor",
      },
    ],
  })
  .then((isAuthorized) => {
    if (isAuthorized) {
      // Carry out logic if user is member of tenantA AND editor of reportA
    }
  });
```

Or using async/await:

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

const isAuthorized = await warrant.checkMany({
  op: CheckOp.AllOf,
  warrants: [
    {
      object: tenantA,
      relation: "member",
    },
    {
      object: reportA,
      relation: "editor",
    },
  ],
});
if (isAuthorized) {
  // Carry out logic if user is member of tenantA AND editor of reportA
}
```

### `hasPermission`

This function returns a `Promise` that resolves with `true` if the user for the current session token has the specified permission and `false` otherwise.

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

warrant.hasPermission({ permissionId: "view-items" }).then((canViewItems) => {
  if (canViewItems) {
    // Carry out logic if user has permission view-items
  }
});
```

Or using async/await:

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

const canViewItems = await warrant.hasPermission({
  permissionId: "view-items",
});
if (canViewItems) {
  // Carry out logic if user has permission view-items
}
```

### `hasFeature`

This function returns a `Promise` that resolves with `true` if the user for the current session token has the specified feature and `false` otherwise.

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

warrant.hasFeature({ featureId: "save-items" }).then((canSaveItems) => {
  if (canSaveItems) {
    // Carry out logic if user has feature save-items
  }
});
```

Or using async/await:

```js
import Warrant from "@warrantdev/warrant-js";

// A valid session token is required to initialize the Client
const warrant = new Warrant({
  clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
  sessionToken: "sess_test_f9asdfASD90mkj2jXZIaeoqbIUAIjsJAHSAnsndW=",
});

const canSaveItems = await warrant.hasFeature({ featureId: "save-items" });
if (canSaveItems) {
  // Carry out logic if user has feature save-items
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
