/* @flow */
import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import CurrentCount from './CurrentCount'
import IncrementCount from './IncrementCount'
import DecrementCount from './DecrementCount'

export function App() {
  return (
    <div>
      <CurrentCount />
      <div>
        <IncrementCount />
        <DecrementCount />
      </div>
    </div>
  )
}

export default connect(createStructuredSelector({}), {})(App)
