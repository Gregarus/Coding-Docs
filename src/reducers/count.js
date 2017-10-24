/* @flow */
import type { Action } from '../actions'

export default function(count: number = 0, action: Action): number {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return count + 1
    case 'DECREMENT_COUNT':
      return count - 1
    default:
      return count
  }
}
