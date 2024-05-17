import React from 'react'
import { createStore, applyMiddleware } from 'redux'

import { add } from './action/cntActions'
import { fetchUsers } from './action/userActions'

import reducer from './action/index'

import rootSaga from './rootSaga'

import createSagaMiddleware from 'redux-saga'

const saga = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(saga))

saga.run(rootSaga)

store.dispatch(add(10))
console.log(store.getState().countState)

window.fetchUsers = () => {
  console.log(fetchUsers.toString())
  store.dispatch(fetchUsers())
}



export default function App() {
  return (
    <div>
      This is an App.
    </div>
  )
}
