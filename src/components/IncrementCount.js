/* @flow */
import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { incrementCount } from '../actions'

type Props = {
  incrementCount: () => void
}

export function IncrementCount({ incrementCount }: Props) {
  return (
    <div>
      <button onClick={incrementCount}>Increment</button>
    </div>
  )
}

export default connect(createStructuredSelector({}), {
  incrementCount
})(IncrementCount)
