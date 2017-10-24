# React Practices
Over the course of working on Jigsaw, we've identified many structural issues
in our frontend code that have been contributing to:

* Poor performance
* Lowered feature development speed
* Increased bug rate

Some of those issues have included:

* Computing values as needed instead of storing them in the application
  state or persisting them to the database, increasing the time cost per render
* Using mutation instead of immutable updates, causing React to fail to render
  despite data changes
* Defensively cloning nested data structures to address the above item at a
  large time cost per action fired.
* Failing to normalize data stored in the application state, causing bugs due
  to forgetting to update every copy of a piece of data
* Having different patterns for declaring React components, preventing
  developers new to React from learning from examples.

Today, we have incorporated the following good practices.

* [The Redux Architecture](/docs/practices/redux.md)
* [Defining Components In a Consistent Way](/docs/practices/components.md)
* [Immutable Data Updates](/docs/practices/immutable.md)
* [Caching Computed Values](/docs/practices/selectors.md)
* [Static Type Checking](/docs/practices/types.md)
