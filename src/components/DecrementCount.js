/* @flow */
import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { decrementCount } from '../actions'

type Props = {
  decrementCount: () => void
}

export function DecrementCount({ decrementCount }: Props) {
  return (
    <div>
      <button onClick={decrementCount}>Decrement</button>
    </div>
  )
}

export default connect(createStructuredSelector({}), {
  decrementCount
})(DecrementCount)
