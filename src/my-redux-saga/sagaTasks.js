import { fork, delay, put, select, take, call, all } from './libs/effects/index'
import { cancel } from './libs/effects/cancel'
import { takeEvery } from './libs/effects/takeEvery'

import * as CounterAction from './action/counterAction';

const g1 = function*() {
  console.log('g1开始')

  // yield takeEvery(CounterAction.INCREASE, function*() {
  //   yield delay(2000)
  //   yield put(CounterAction.getIncreaseAction(1))
  // })

  // yield fork(function*() {
  //   yield new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve()
  //     }, 2000)
  //   })
  // })

  // auto incr的实现
  yield fork(function*() {
    const action = yield take(CounterAction.INCREASE)
    console.log('receive an action on g1 function.', action)

    yield fork(function*() {
      yield delay(1000)
    })

    yield fork(function*() {
      yield delay(1000)
      // yield put(CounterAction.getIncreaseAction(1))
    })
    // while(1) {
      
    // }
  })

  // const action = yield take(CounterAction.INCREASE)
  // console.log('receive an action on g1 function.', action)

  console.log('g1结束')
}

const sagaTasks = function*() {
  yield all([g1()])

  console.log('所有任务结束了')

  // // fork: 用于新建一个生成器。即时在fork中存在暂停当前生成器的指令，也不会影响外部的生成器执行。
  // const forkTask = yield fork(function*() {
  //   const action1 = yield take(CounterAction.INCREASE);
  //   console.log('receive an action: ', action1)
  // })

  // // yield delay(2000)
  // // yield cancel(forkTask)
  // console.log(forkTask)
  // console.log('end sagaTasks')
}

// const sagaTasks = function*() {
//   // const test = function(a, b, c) {
//   //   return new Promise(resolve => {
//   //     console.log('args: ', a, b, c)
//   //     setTimeout(() => {
//   //       resolve('This is my demo')
//   //     }, 2000)
//   //   })
//   // }
//   // const result = yield call(test, 'a', 'b', 'c')
//   // console.log('receive result: ', result)

//   // const action = yield take(CounterAction.INCREASE)
//   // console.log('action: %o', action)

//   // while (1) {
//   //   const action = yield take(CounterAction.INCREASE)
//   //   console.log('action: ', action)
//   // }

//   // fork测试
//   // const task = yield fork(function*(a, b, c){
//   //   console.log('params: ', a, b, c)

//   //   while(1) {
//   //     const action = yield take(CounterAction.INCREASE)
//   //     console.log('action: ', action)

//   //     yield delay(2000)
//   //     yield put(CounterAction.getIncreaseAction(10))
//   //     const state = yield select(state => state.counterState)
//   //     console.log('counter state: %o', state)
//   //   }
//   // }, '1', '2', '3')
//   // console.log('new task: ', task);

//   // // takeEvery测试
//   // const task = yield takeEvery(CounterAction.INCREASE, function*(action, b, c, d) {
//   //   console.log('params: ', action, b, c, d)
    
//   //   // yield put(CounterAction.getIncreaseAction(10))
//   //   // yield delay(30 * 1000)

//   //   const r = yield call(() => {
//   //     return new Promise((resolve) => {
//   //       // const state = yield select(state => state.counterState)
//   //       // console.log('counter state: %o', state)
//   //       setTimeout(() => {
//   //         resolve('This is my test?')
//   //       }, 6000)
//   //     })
//   //   })
    
//   //   console.log('r: ', r)
//   // }, 1, 2, 3)
//   // yield delay(5000)
//   // yield cancel(task)
// }

export default sagaTasks