import React from 'react'

import { createStore, applyMiddleware } from 'redux'
import * as CounterAction from './action/counterAction'
import * as UserAction from './action/userAction'
import reducer from './reducer/index'

import createSagaMiddleware from 'redux-saga'

import rootSaga from './saga/index'

const saga = createSagaMiddleware();

const logger = store => next => action => {
  console.log('before action: %o, store: %o, ', action, store.getState())
  next(action)
  console.log('after action: %o, store: %o, ', action, store.getState())
}

const store = createStore(reducer, applyMiddleware(saga, logger))

saga.run(rootSaga)

window.incr = function() {
  store.dispatch(CounterAction.getIncreaseAction(10))
}

window.auto_incr = function(n = 1) {
  store.dispatch(CounterAction.getAutoIncreaseAction(n))
}
window.stop_incr = function(n = 1) {
  store.dispatch(CounterAction.getStopIncreaseAction())
}

// window.decr = function() {
//   store.dispatch(CounterAction.getDecreaseAction(1))
// }

// store.dispatch(UserAction.getFetchUsersAction({
//   page: 1,
//   pageSize: 20,
//   keyword: 'test key'
// }))

export default function App() {
  return (
    <div>
      Is this a demo?      
    </div>
  )
}
