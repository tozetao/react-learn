// take 测试all指令
// import { take } from 'redux-saga/effects'
// import * as CounterAction from '../action/counterAction'

// export default function*() {
//   while (1) {
//     const action = yield take(CounterAction.INCREASE)
//     console.log('got an action on counter.js, ', action)
//   }
// }

// // takeEvery
// import { takeEvery } from 'redux-saga/effects'
// import * as CounterAction from '../action/counterAction'

// function *increaseTask() {
//   console.log('increaseTask')
// }

// export default function*() {
//   yield takeEvery(CounterAction.INCREASE, increaseTask)
//   console.log('end at counter.js')
// }

import { takeEvery, delay, put, fork, take, cancel, takeLatest, cancelled, race, call } from 'redux-saga/effects'
import * as CounterAction from '../action/counterAction'

function *increaseTask() {
  // 分发action后，延迟一定的毫秒数后才进行处理。
  yield delay(2000)
  console.log('receive an action: ', '?')

  // yield put(CounterAction.getDecreaseAction(100))
}

// 模拟takeEvery指令
// function *decreaseTask() {
//   while (1) {
//     // 监听CounterAction.DECREASE，触发后指向下面代码。
//     yield take(CounterAction.DECREASE)

//     // take监听到action触发后，必须再次fork并立即进行监听，避免监听不到后续触发的action。
//     yield fork(() => {
//       yield delay(2000)
//       yield put(CounterAction.getIncreaseAction(1))
//     })
//   }
// }

// fork与cancel指令实现函数防抖。
// function *decreaseTask() {
//   let task;

//   while (1) {
//     // 监听CounterAction.DECREASE，触发后指向下面代码。
//     yield take(CounterAction.DECREASE)
    
//     console.log('task ', task)
//     if (task) {
//       yield cancel(task)
//     }

//     task = yield fork(function*() {
//       yield delay(2000)
//       yield put(CounterAction.getIncreaseAction(10))
//     })
//   }
// }

function *autoIncrease() {
  while (1) {
    console.log('while 1')
    yield take(CounterAction.AutoIncrease)

    const result = yield race({
      autoIncrease: call(function*(){
        while(1) {
          yield delay(1000)
          yield put(CounterAction.getIncreaseAction(1))
        }
      }),
      cancel: take(CounterAction.StopIncrease)
    })
    console.log('result: ', result)
  }
}

export default function*() {
  // yield take(CounterAction.INCREASE, increaseTask)

  // fork指令不会阻塞当前生成器的执行，相当于开启了一个分支去执行自己的逻辑。
  // yield fork(decreaseTask)

  // yield takeEvery(CounterAction.INCREASE, increaseTask)

  yield fork(autoIncrease)
  console.log('end at counter.js')
}