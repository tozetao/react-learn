import React from 'react'

import { createStore, bindActionCreators } from 'redux'
import reducer from './reducer/index'
// import promise from 'redux-promise'
import promise from '../my-redux/middlewares/promise'

// import { createStore, bindActionCreators } from '../my-redux/redux'
import applyMiddleware from '../my-redux/applyMiddleware'
// import reducer from './reducer/index'

import * as cntActions from './action/cntActions'
import * as userActions from './action/userActions'

const logger = store => next => action => {
  console.log('before logger: %o', store.getState())
  next(action)
  console.log('after logger: %o', store.getState())
}

const store = createStore(reducer, applyMiddleware(promise, logger));

const dispatcher = bindActionCreators({
  incr: cntActions.getIncreaseAction,
  decr: cntActions.getDecreaseAction,
  addUser: userActions.getAddUserAction,
  removeUser: userActions.getRemoveUserAction,
  setUsers: userActions.getSetUsersAction,
  fetchUsers: userActions.fetchUsers
}, store.dispatch)

const result = dispatcher.fetchUsers()
console.log(result)
// console.log(store.getState())


export default function App() {
  return (
    <div>
      This is my demo
    </div>
  )
}