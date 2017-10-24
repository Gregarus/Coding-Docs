# Immutable Data Updates
React and Redux offer many out of the box performance optimizations that assume
that if a piece of data has been updated, it can be detected using shallow
equality checking.

For example:

```js
const previousState = 'a'
const currentState = 'b'
const isUpdated = previousState !== currentState // true
```

Our application state consists of more than just simple primitives though. It
consists of objects and arrays as well.

## Using Mutation
Consider the following example:

```js
const previousState = { key: 'value', otherData: { foo: 'bar' } }

const currentState = previousState
currentState.key = 'new value'

const isUpdated = previousState !== currentState // false
```

Here, `previousState` and `currentState` reference the same object in memory.
Shallow equality checking fails to notice that an update has happened.

## Overcompensating with `_.cloneDeep`
Consider another example:

```js
import _ from 'lodash'

const previousState = { key: 'value', otherData: { foo: 'bar' } }

const currentState = _.cloneDeep(previousState)
currentState.key = 'new value'

const isUpdated = previousState !== currentState // true
const isUnrelatedDataUpdated = previousState.otherData !== currentState.otherData // true
```

Here, we're using `_.cloneDeep` to ensure that `currentState` references a new
object in memory. We ensure that shallow equality checking notices the update.

Unfortunately, `otherData`, which has not changed now also references a new
object in memory. Shallow equality checking says that `otherData` has changed,
even though we are not actually updating that piece of data.

`_.cloneDeep` does not allow us to leverage shallow equality checking well.

## Cloning Only Updated Object and Arrays
Here's the same example written without `_.cloneDeep`:

```js
const previousState = { key: 'value', otherData: { foo: 'bar' } }

const currentState = { ...previousState, key: 'new value' }

const isUpdated = previousState !== currentState // true
const isUnrelatedDataUpdated = previousState.otherData !== currentState.otherData // false
```

Let's take a closer look at `{ ...previousState, key: 'new value' }`. This code
performs the following steps:

1. Create a new object.
2. Set all of the keys and values from `previousState` onto the new object.
3. Set `key` to `new value` on the new object.

Notice that the `otherData` object is reused and not cloned.

In this way, we can minimize the number of new objects and arrays created to
take full advantage of shallow equality checking.

## References
[Immutable Update Patterns](http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html)
shows many more examples of how to perform immutable updates on objects and arrays.

The [Redux FAQ: Immutable Data](http://redux.js.org/docs/faq/ImmutableData.html)
goes into more detail about how immutable updates fit into the larger picture
of minimizing component re-rendering.
