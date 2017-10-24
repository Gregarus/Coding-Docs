/* @flow */
import { createSelector } from 'reselect'
import type { Position } from '../types'
import { htmlElement, element, preferredPosition } from './'

export function popupPosition(
  htmlElement: {
    clientWidth: number,
    clientHeight: number
  },
  element: {
    getBoundingClientRect(): {
      top: number,
      left: number,
      right: number,
      bottom: number
    }
  },
  preferredPosition: Position
): Position {
  const {
    clientWidth: viewportWidth,
    clientHeight: viewportHeight
  } = htmlElement

  const {
    top: anchorTop,
    bottom: anchorBottom,
    left: anchorLeft,
    right: anchorRight
  } = element.getBoundingClientRect()

  let vertical
  if (anchorTop < 0.2 * viewportHeight) vertical = 'down'
  else if (anchorBottom > 0.8 * viewportHeight) vertical = 'up'
  else vertical = preferredPosition.vertical

  let horizontal
  if (anchorLeft < 0.2 * viewportWidth) horizontal = 'right'
  else if (anchorRight > 0.8 * viewportWidth) horizontal = 'left'
  else horizontal = preferredPosition.horizontal

  return { vertical, horizontal }
}

export default createSelector(
  [htmlElement, element, preferredPosition],
  (htmlElement, element, preferredPosition) =>
    popupPosition(htmlElement, element, preferredPosition)
)
