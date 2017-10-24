/* @flow */
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM(`
  <!doctype html>
  <meta charset="utf-8">
  <div id="root"></div>
`)

const { window } = jsdom

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

Object.defineProperties(
  global,
  Object.getOwnPropertyNames(window)
    .filter(prop => typeof global[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(window, prop))
)
