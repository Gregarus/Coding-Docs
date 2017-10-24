/* @flow */
import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { count } from '../selectors'

type Props = {
  count: number
}

export function CurrentCount({ count }: Props) {
  return <div className="current-count">{count}</div>
}

export default connect(
  createStructuredSelector({
    count
  }),
  {}
)(CurrentCount)
