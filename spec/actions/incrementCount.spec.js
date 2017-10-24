/* @flow */
import { expect } from '../specHelper'
import { incrementCount } from '../../src/actions'

describe('incrementCount', () => {
  it('returns INCREMENT_COUNT', () => {
    expect(incrementCount()).to.deep.equal({ type: 'INCREMENT_COUNT' })
  })
})
