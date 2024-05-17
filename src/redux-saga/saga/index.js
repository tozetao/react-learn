import { all, fork, take, takeEvery } from 'redux-saga/effects'
import counter from './counter'
import user from './user'

import * as CounterAction from '../action/counterAction';

export default function*() {
  // const result = yield all([counter()])
  // console.log('end at index.js, ', result)
  
  // // all test
  const g = function*() {
    yield fork(function*() {

      // yield new Promise(resolve => {
      //   setTimeout(() => {
      //     resolve('hello world')
      //   }, 3000)
      // })

      yield takeEvery(CounterAction.INCREASE, function*() {
        console.log('hahhaha')
      })

      console.log('end fork')
    })
    console.log('end g')

    // yield fork(function*() {
    //   const action = yield take(CounterAction.INCREASE)
    //   console.log('action, ', action)
    // })
  }
  const result = yield all([g()])
  console.log('end at index.js, ', result)

  // const a1 = yield take(CounterAction.INCREASE)
  // console.log('action1: ', a1)

  
}