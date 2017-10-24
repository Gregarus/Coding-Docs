/* @flow */
import { React, mount, expect } from '../specHelper'
import withElement from '../../src/hocs/withElement'

function Component() {
  return <div />
}

describe('withElement', () => {
  let enhancedComponent
  afterEach(() => {
    enhancedComponent.detach()
  })

  it('renders a containing div and passes a reference to its DOM element into the given component', () => {
    const EnhancedComponent = withElement(Component)
    enhancedComponent = mount(<EnhancedComponent />, { attachTo: window.root })

    const containingDiv = document.querySelector('#root > *')
    expect(containingDiv).not.to.equal(null)

    expect(enhancedComponent.find('Component').props().element).to.equal(
      containingDiv
    )
  })

  it('correctly sets the display name for the wrapped component', () => {
    const EnhancedComponent = withElement(Component)
    enhancedComponent = mount(<EnhancedComponent />, { attachTo: window.root })

    expect(enhancedComponent.find('WithElement(Component)')).to.exist
  })
})
