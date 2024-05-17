import React from 'react'

import { applyMiddleware, createStore } from 'redux'

import reducer from './reducer/index'
import * as CounterAction from './action/counterAction'

import createSagaMiddleware from './libs/index'

import sagaTasks from './sagaTasks';

const saga = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(saga))
saga.run(sagaTasks)

window.incr = function() {
  store.dispatch(CounterAction.getIncreaseAction(10))
}

export default function App() {
  return (
    <div>App</div>
  )
}
