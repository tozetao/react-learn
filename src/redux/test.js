import React from 'react'

import { createStore, bindActionCreators, applyMiddleware } from 'redux'
import reducer from './reducer/index'

// import { createStore, bindActionCreators } from '../my-redux/redux'
// import applyMiddleware from '../my-redux/applyMiddleware'
// import reducer from './reducer/index'

import * as cntActions from './action/cntActions'
import * as userActions from './action/userActions'


// function m1(store) {
//   return function(next) {
//     return function(action) {
//       console.log('m1 dispatch.')
//       next(action)
//     }
//   }
// }

// function m2(store) {
//   return function(next) {
//     return function(action) {
//       console.log('m2 dispatch.')
//       next(action)
//     }
//   }
// }

const auth = store => next => action => {
  // console.log('before auth')
  // console.log('action: ', action)
  // next(action)
  // console.log('after auth')

  console.log('auth: ', action)
  next(action)
}

const logger = store => next => action => {
  // console.log('before logger')
  // console.log('action: ', action)
  // next(action)
  // console.log('after logger')

  console.log('logger: ', action)
  next(action)
}

console.log(reducer)

const store = createStore(reducer, applyMiddleware(auth, logger));
// const store = applyMiddleware(auth, logger)(createStore)(reducer)

const dispatcher = bindActionCreators({
  incr: cntActions.getIncreaseAction,
  decr: cntActions.getDecreaseAction,
  addUser: userActions.getAddUserAction,
  removeUser: userActions.getRemoveUserAction
}, store.dispatch)

dispatcher.incr(10)
console.log(store.getState().cntStore)

dispatcher.decr(5)
console.log(store.getState().cntStore)

// dispatcher.incr(2)
// console.log(store.getState().cntStore)

// dispatcher.addUser({ id: 100, name: 'owl' })
// dispatcher.addUser({ id: 101, name: 'parrot' })
// console.log(store.getState().userStore)

// store.dispatch({
//   type: 'add'
// })
// console.log(store.getState())


// store.dispatch(cntAction.getSetAction(100))
// console.log(store.getState())

// store.dispatch(userAction.getAddUserAction({
//   id: 1000,
//   name: 'Mrs.Marry'
// }))
// console.log(store.getState())

// console.log(store.getState())

// const boundActions = bindActionCreators(memberActions, store.dispatch)

// boundActions.getIncreaseAction()
// console.log(store.getState())

// boundActions.getSetAction(100)
// console.log(store.getState())

// 向仓库分发dispatch
// const action = {
//   type: actionTypes.Increase
// }
// store.dispatch(action)

export default function App() {
  return (
    <div>
      This is my demo
    </div>
  )
}