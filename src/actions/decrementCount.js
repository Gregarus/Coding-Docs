/* @flow */
export type DecrementCount = { type: 'DECREMENT_COUNT' }

export default function(): DecrementCount {
  return {
    type: 'DECREMENT_COUNT'
  }
}
