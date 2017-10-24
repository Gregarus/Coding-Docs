/* @flow */
import { expect } from '../specHelper'
import { decrementCount } from '../../src/actions'

describe('decrementCount', () => {
  it('returns DECREMENT_COUNT', () => {
    expect(decrementCount()).to.deep.equal({ type: 'DECREMENT_COUNT' })
  })
})
