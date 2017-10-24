/* @flow */
import { expect } from '../specHelper'
import { count } from '../../src/reducers'

describe('count', () => {
  it('increments the count by 1 when INCREMENT_COUNT is dispatched', () => {
    expect(count(0, { type: 'INCREMENT_COUNT' })).to.equal(1)
    expect(count(1, { type: 'INCREMENT_COUNT' })).to.equal(2)
  })

  it('decrements the count by 1 when DECREMENT_COUNT is dispatched', () => {
    expect(count(2, { type: 'DECREMENT_COUNT' })).to.equal(1)
    expect(count(1, { type: 'DECREMENT_COUNT' })).to.equal(0)
  })
})
