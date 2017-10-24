# Static Type Checking
Over the course of the project, the Jigsaw team has had difficulty ensuring the
correctness of its complex value calculations.

Because the calculations often depend on the results of a long chain of other
calculations, writing integration tests for a single calculation and its
dependencies is challenging. A large amount of data needs to be crafted for each
test case.

An alternative to writing integration tests has been injecting mocks (or
"stubbing") to isolate the calculation under test. Historically, we've lacked
a means of dependency injection for our calculations, meaning that testing them
has required setting the return values of dependent calculations as well as
asserting that the correct arguments are passed into those dependent
calculations.

Having to assert on the arguments passed into a mock means that whenever a
calculation changes, all of the other calculations that depend on it, along with
their tests, need to change. Because JavaScript lacks a type system, there is no
automated way to detect these required changes. We've been forced to rely on
vigilance and having good acceptance test coverage, and our acceptance tests
have historically been difficult to maintain.

All of the above have led to a high bug rate, incorrect unit tests after
changing a dependency, and low confidence in our ability to make large changes
to the codebase.

## Flow
[Flow](https://flow.org/en/) is a static type checker for JavaScript. It allows
us to annotate an exported function's (or component's) argument types and return
type. It then infers the validity of usages of that function as well as usages
of the values it returns.

In this way, Flow can go a long way in helping us maintain our unit tests and
ensure the correctness of our function calls.

We recorded
[a talk](https://drive.google.com/drive/u/1/folders/0B5kNC_gMDBxLYkJZUTE4ZkN3RWM),
which gives a high-level overview of how to use Flow and a flavor for some of
the day-to-day benefits and challenges that developers are likely to face.

## Running Flow
Flow runs as a separate process independent from the compiler (Babel and
Webpack), the test runner (Mocha), and the linter (ESLint):

```bash
yarn run flow
```

The type annotations that Flow processes are a non-standard syntax addition to
JavaScript. This means that Babel plugins (`babel-preset-flow`) are needed to
ensure that type annotations do not interfere with the compiler, test runner,
and linter.

## Writing Type Annotations
Flow is opt-in on a per-file basis. In order fo it to check the usages of a
function, the file that defines it as well as all of the files that use it must
opt-in to be type checked.

Here's how we would annotate a function that adds two numbers:

```js
/* @flow */

export function add(x: 1, y: 2): number {
  return x + y
}
```

```js
/* @flow */
import { add } from './maths'

add(1, 1)
add(1, 'string') // Error
add(1, null) // Error
add(1) // Error
```

## Type Definitions for External Libraries
External libraries may or may not come with type definitions. If they do not,
then Flow will be unable to validate their usages and will not report any
downstream errors.

## Where to Find Documentation
Unfortunately, Flow does not have very detailed or comprehensive documentation.
We have found the following references to be useful:

* [Flow Docs](https://flow.org/en/docs/types/)
* [Flow Blog](https://flow.org/blog/)
* [Flow GitHub Issues](https://github.com/facebook/flow/issues)
* [GitHub Issue on Advanced Features](https://github.com/facebook/flow/issues/2464)
