# Caching Computed Values
For Jigsaw, much of the data that is displayed on screen can be computed based
on a relatively small set of database-persisted models.

## Computing Values in the View Layer (Components)
Historically, our computations have always been done in the frontend components.

The advantage is speed of feature development: computation functions can be
directly called by components that need to show the values.

The disadvantage is that business logic becomes tightly coupled with
presentational logic and can't easily be changed independently. Changing how
components show data forces larges changes in the business logic. Changing the
business logic forces large changes to component logic.

Another disadvantage is that the more computations that need to be performed,
the more time it takes to render and re-render components. Frontend
applications should be able to re-render at a rate of 60 times per second, or
16.67 milliseconds per render. Components are hence very limited in the amount
of time they can spend on data computation.

## Computed Values and Shallow Equality Checking
In Redux applications, data computations take the form of functions that take
in values from the application state and return new computed values.

For example, consider a Todo List app with a list of tasks in its application
state:

```js
const state = {
  tasks: [
    {name: 'Do Something', complete: false},
    {name: 'Do Something Else', complete: true},
    {name: 'Do Another Thing', complete: false}
  ]
}
```

Suppose we wanted to show a list of incomplete tasks. Here's how we might
compute that value:

```js
function getIncompleteTasks(state) {
  return state.tasks.filter(task => !task.complete)
}
```

Notice that this function always returns a new array. In other words:

```js
getIncompleteTasks(state) !== getIncompleteTasks(state)
```

So, even when this computation returns the same information, it will fail
shallow equality checking.

This means that if a component that uses this function re-renders for any
reason and passes the new array to a different component, that other component
will re-render needlessly.

Hence, depending on how a project's components are structured, computed values
may cause many many needless re-renders.

## Memoizing to Enable Shallow Equality Checking
In the Redux documentation about
[Computing Derived Data](http://redux.js.org/docs/recipes/ComputingDerivedData.html),
they recommend using [Reselect](https://github.com/reactjs/reselect) to memoize
computed values.

Let's rewrite `getIncompleteTasks` using Reselect:

```js
import { createSelector } from 'reselect'

const tasks = (state) => state.tasks

const incompleteTasks = createSelector(
  [tasks],
  (tasks) => tasks.filter(task => !task.complete)
)
```

In this example, `incompleteTasks` is a memoized selector that takes in an array
of tasks as argument. Reselect guarantees that if `incompleteTasks` is called
again with the same array as argument, it will return the memoized result.

In other words:

```js
incompleteTasks(state) === incompleteTasks(state)
```

This allows us to retain the benefits of shallow equality checking despite
having complex computed values. Furthermore, because Reselect selectors return
cached results instead of re-computing them, introducing them into an
application will reduce the number of needless re-renders.

On Jigsaw, this more than halved the render time of the grid.

Notice that because Reselect selectors memoize by argument using shallow
equality checking, the application state must reuse references as much as
possible. Introducing Reselect has no benefit unless the reducers are performing
immutable updates.
