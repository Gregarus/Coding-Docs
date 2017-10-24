/* @flow */
export type IncrementCount = { type: 'INCREMENT_COUNT' }

export default function(): IncrementCount {
  return {
    type: 'INCREMENT_COUNT'
  }
}
