# Defining Components In a Consistent Way
We've had many developers stumble over the implementation details around how
to access values from the store and how to fire actions. These details are
always secondary to feature development and are usually only noticed when they
are missing and need to be added or when they are inconsistent and need to be
tweaked.

Here is a skeleton React component that exhibits our current practices:

```js
/* @flow */
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { incrementCount } from '../actions'
import { count } from '../selectors'

type Props = {
  count: number,
  incrementCount: () => void
}

export function Component({ count, incrementCount }: Props) {
  return (
    <div>
      <p>Current Count: <span>{count}</span></p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  )
}

export default connect(
  createStructuredSelector({
    count
  }),
  {
    incrementCount
  }
)(Component)
```

This skeleton consists of the following pieces:

* The bare React component having nothing to do with Redux. This is the
  component exercised in unit test.

* A collection of selectors used to read values from the store. Values with the
  same names will be passed into the bare React component as `props`. Be
  careful not to confuse the selector with the prop that it produces.

* A collection of action creators. Similar to the treatment of selectors,
  values with the same names will be passed into the bare React component as
  `props`.

* A connected component (or a container). This is a React component that will,
  when rendering, automatically read values from the store and upon user action,
  create and dispatch the correct actions.

Here is a unit test for the above component:

```js
/* @flow */
import { expect, shallow, sinon, React } from '../specHelper'
import { Component } from '../../src/components/Component'

describe('<Component />', () => {
  it('renders the current count', () => {
    const component = shallow(<Component count={20} incrementCount={() => {}} />)
    expect(component.find('span').text()).to.equal('20')
  })

  it('allows the user to increment the count', () => {
    const incrementCount = sinon.spy()
    const component = shallow(<Component count={20} incrementCount={incrementCount} />)

    component.find('button').simulate('click')

    expect(incrementCount).to.have.been.calledWith()
  })
})
```

Notice the following:

* In unit test, we import the bare React component using curly braces. This is
  a named export. The connected component imported elsewhere is the default
  export and does not need curly braces.

* Because we are not testing the connected component, selectors and action
  creators are not automatically run. `props` are not automatically provided
  to the bare React component. We must manually provide required `props` when
  rendering the component.

* We are `shallow` rendering the component under test. We are not easily able
  to mount connected components because they would require a store and reducer
  to be setup.
