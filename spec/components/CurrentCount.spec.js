/* @flow */
import { expect, shallow, React } from '../specHelper'
import { CurrentCount } from '../../src/components/CurrentCount'

describe('<CurrentCount />', () => {
  it('renders the given count', () => {
    const component = shallow(<CurrentCount count={5} />)
    expect(component.text()).to.equal('5')
  })
})
