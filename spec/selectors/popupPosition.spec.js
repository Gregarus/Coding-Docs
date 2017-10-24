/* @flow */
import { expect } from '../specHelper'
import { popupPosition } from '../../src/selectors/popupPosition'

const htmlElement = {
  clientWidth: 1000,
  clientHeight: 1000
}

describe('popupPosition', () => {
  it('positions the popup content to the bottom right of the anchor when the anchor is too close to the top left of the viewport', () => {
    const anchorElement = {
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          right: 100,
          bottom: 100
        }
      }
    }
    const preferredPosition = { vertical: 'up', horizontal: 'left' }

    const actualPosition = popupPosition(
      htmlElement,
      anchorElement,
      preferredPosition
    )
    expect(actualPosition).to.deep.equal({
      vertical: 'down',
      horizontal: 'right'
    })
  })

  it('positions the popup content to the bottom left of the anchor when the anchor is too close to the top right of the viewport', () => {
    const anchorElement = {
      getBoundingClientRect() {
        return {
          top: 0,
          left: 900,
          right: 1000,
          bottom: 100
        }
      }
    }
    const preferredPosition = { vertical: 'up', horizontal: 'right' }

    const actualPosition = popupPosition(
      htmlElement,
      anchorElement,
      preferredPosition
    )
    expect(actualPosition).to.deep.equal({
      vertical: 'down',
      horizontal: 'left'
    })
  })

  it('positions the popup content to the top right of the anchor when the anchor is too close to the bottom left of the viewport', () => {
    const anchorElement = {
      getBoundingClientRect() {
        return {
          top: 900,
          left: 0,
          right: 100,
          bottom: 1000
        }
      }
    }
    const preferredPosition = { vertical: 'down', horizontal: 'left' }

    const actualPosition = popupPosition(
      htmlElement,
      anchorElement,
      preferredPosition
    )
    expect(actualPosition).to.deep.equal({
      vertical: 'up',
      horizontal: 'right'
    })
  })

  it('positions the popup content to the top left of the anchor when the anchor is too close to the bottom right of the viewport', () => {
    const anchorElement = {
      getBoundingClientRect() {
        return {
          top: 900,
          left: 900,
          right: 1000,
          bottom: 1000
        }
      }
    }
    const preferredPosition = { vertical: 'down', horizontal: 'right' }

    const actualPosition = popupPosition(
      htmlElement,
      anchorElement,
      preferredPosition
    )
    expect(actualPosition).to.deep.equal({ vertical: 'up', horizontal: 'left' })
  })

  it('respects the preferred positioning when there is enough space from the edges of the viewport', () => {
    const anchorElement = {
      getBoundingClientRect() {
        return {
          top: 500,
          left: 500,
          right: 600,
          bottom: 600
        }
      }
    }
    const preferredPosition = { vertical: 'up', horizontal: 'right' }

    const actualPosition = popupPosition(
      htmlElement,
      anchorElement,
      preferredPosition
    )
    expect(actualPosition).to.deep.equal({
      vertical: 'up',
      horizontal: 'right'
    })
  })
})
