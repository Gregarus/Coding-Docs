/* @flow */
import { expect, spy, shallow, React } from '../specHelper'
import { DecrementCount } from '../../src/components/DecrementCount'

describe('<DecrementCount />', () => {
  it('calls incrementCount when it is pressed', () => {
    const decrementCount = spy()
    const component = shallow(
      <DecrementCount decrementCount={decrementCount} />
    )
    component.find('button').simulate('click')
    expect(decrementCount).to.have.been.calledWith()
  })
})
