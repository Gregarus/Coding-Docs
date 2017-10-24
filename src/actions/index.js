/* @flow */
import type { IncrementCount } from './incrementCount'
import type { DecrementCount } from './decrementCount'

export type Action = IncrementCount | DecrementCount

export { default as incrementCount } from './incrementCount'
export { default as decrementCount } from './decrementCount'
