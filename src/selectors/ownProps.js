/* @flow */
import type { Position } from '../types'

export function element(
  state: mixed,
  ownProps: { element: HTMLElement }
): HTMLElement {
  return ownProps.element
}

export function preferredPosition(
  state: mixed,
  ownProps: { preferredPosition: Position }
): Position {
  return ownProps.preferredPosition
}
