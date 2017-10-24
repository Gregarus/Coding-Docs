/* @flow */
import { React, shallow, mount, expect } from '../specHelper'
import hoverable from '../../src/hocs/hoverable'

function Component() {
  return <div />
}

describe('hoverable', () => {
  it('notifies the given element when it is hovered and unhovered', () => {
    const EnhancedComponent = hoverable(Component)
    const enhancedComponent = shallow(<EnhancedComponent />)

    expect(enhancedComponent.find('Component').props().hovered).to.equal(false)

    enhancedComponent.simulate('mouseEnter')
    expect(enhancedComponent.find('Component').props().hovered).to.equal(true)

    enhancedComponent.simulate('mouseLeave')
    expect(enhancedComponent.find('Component').props().hovered).to.equal(false)
  })

  it('correctly sets the display name for the wrapped component', () => {
    const EnhancedComponent = hoverable(Component)
    const enhancedComponent = mount(<EnhancedComponent />)

    expect(enhancedComponent.find('Hoverable(Component)')).to.exist
  })
})
