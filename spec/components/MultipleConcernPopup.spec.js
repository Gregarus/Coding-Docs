/* @flow */
import { expect, mount, React, stub } from '../specHelper'
import MultipleConcernPopup from '../../src/components/MultipleConcernPopup'

function Anchor({ preferredPosition }) {
  return (
    <MultipleConcernPopup
      preferredPosition={preferredPosition}
      anchor={
        <div className="anchor-content">
          <p>Hover</p>
        </div>
      }
      content={
        <div className="popup-content">
          <p>Popup Content</p>
        </div>
      }
    />
  )
}

function renderAnchor(props) {
  const rootElement = document.querySelector('#root')

  if (!rootElement) {
    throw new Error(
      '<div id="root" /> cannot be found, maybe there is test pollution'
    )
  }

  return mount(<Anchor preferredPosition={['down', 'right']} {...props} />, {
    attachTo: rootElement
  })
}

describe('<MultipleConcernPopup />', () => {
  let anchor
  afterEach(() => {
    anchor.detach()
  })

  it('renders anchor content', () => {
    anchor = renderAnchor()
    expect(anchor.find('.anchor-content').length).to.equal(1)
  })

  it('hides popup content by default', () => {
    anchor = renderAnchor()
    expect(anchor.find('.popup-content').length).to.equal(0)
  })

  it('shows popup content on mouse enter', () => {
    anchor = renderAnchor()
    anchor.simulate('mouseEnter')
    expect(anchor.find('.popup-content').length).to.equal(1)
  })

  it('positions the popup content to the bottom right of the anchor when the anchor is too close to the top left of the viewport', () => {
    anchor = renderAnchor({ preferredPosition: ['up', 'left'] })

    if (!document.documentElement) {
      throw new Error('documentElement does not exist')
    }

    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000
    })
    stub(
      document.querySelector('.popup-container'),
      'getBoundingClientRect'
    ).returns({
      top: 0,
      left: 0,
      right: 100,
      bottom: 100
    })

    anchor.simulate('mouseEnter')

    expect(anchor.find('.popup.down.right').length).to.equal(1)
  })

  it('positions the popup content to the bottom left of the anchor when the anchor is too close to the top right of the viewport', () => {
    anchor = renderAnchor({ preferredPosition: ['up', 'right'] })

    if (!document.documentElement) {
      throw new Error('documentElement does not exist')
    }

    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000
    })
    stub(
      document.querySelector('.popup-container'),
      'getBoundingClientRect'
    ).returns({
      top: 0,
      left: 900,
      right: 1000,
      bottom: 100
    })

    anchor.simulate('mouseEnter')

    expect(anchor.find('.popup.down.left').length).to.equal(1)
  })

  it('positions the popup content to the top right of the anchor when the anchor is too close to the bottom left of the viewport', () => {
    anchor = renderAnchor({ preferredPosition: ['down', 'left'] })

    if (!document.documentElement) {
      throw new Error('documentElement does not exist')
    }

    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000
    })
    stub(
      document.querySelector('.popup-container'),
      'getBoundingClientRect'
    ).returns({
      top: 900,
      left: 0,
      right: 100,
      bottom: 1000
    })

    anchor.simulate('mouseEnter')

    expect(anchor.find('.popup.up.right').length).to.equal(1)
  })

  it('positions the popup content to the top left of the anchor when the anchor is too close to the bottom right of the viewport', () => {
    anchor = renderAnchor({ preferredPosition: ['down', 'right'] })

    if (!document.documentElement) {
      throw new Error('documentElement does not exist')
    }

    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000
    })
    stub(
      document.querySelector('.popup-container'),
      'getBoundingClientRect'
    ).returns({
      top: 900,
      left: 900,
      right: 1000,
      bottom: 1000
    })

    anchor.simulate('mouseEnter')

    expect(anchor.find('.popup.up.left').length).to.equal(1)
  })

  it('respects the preferred positioning when there is enough space from the edges of the viewport', () => {
    anchor = renderAnchor({ preferredPosition: ['up', 'right'] })

    if (!document.documentElement) {
      throw new Error('documentElement does not exist')
    }

    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000
    })
    stub(
      document.querySelector('.popup-container'),
      'getBoundingClientRect'
    ).returns({
      top: 500,
      left: 500,
      right: 600,
      bottom: 600
    })

    anchor.simulate('mouseEnter')
    expect(anchor.find('.popup.up.right').length).to.equal(1)
  })

  it('hides popup content on mouse leave', () => {
    anchor = renderAnchor()

    anchor.simulate('mouseEnter')
    anchor.simulate('mouseLeave')
    expect(anchor.find('.popup-content').length).to.equal(0)
  })
})
