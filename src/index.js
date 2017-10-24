/* @flow */
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { count } from './reducers'
import App from './components/App'

const reducer = combineReducers({ count })
const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.root
)
