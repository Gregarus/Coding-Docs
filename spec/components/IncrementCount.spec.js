/* @flow */
import { expect, spy, shallow, React } from '../specHelper'
import { IncrementCount } from '../../src/components/IncrementCount'

describe('<IncrementCount />', () => {
  it('calls incrementCount when it is pressed', () => {
    const incrementCount = spy()
    const component = shallow(
      <IncrementCount incrementCount={incrementCount} />
    )
    component.find('button').simulate('click')
    expect(incrementCount).to.have.been.calledWith()
  })
})
