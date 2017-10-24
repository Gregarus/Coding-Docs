/* @flow */
export default function(): HTMLElement {
  if (!document.documentElement) {
    throw new Error('This must be run in a browser')
  }
  return document.documentElement
}
