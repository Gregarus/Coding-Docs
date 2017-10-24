/* @flow */
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import './dom'

chai.use(sinonChai)
chai.use(chaiEnzyme())

export { expect } from 'chai'
export { spy, stub } from 'sinon'
export { shallow, mount } from 'enzyme'
export * as React from 'react'
