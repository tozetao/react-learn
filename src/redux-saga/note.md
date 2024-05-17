

saga中间件提供了一种通过指令的方式来处理action的方式。本质上是通过迭代生成器函数，获取每次迭代的指令，根据指令的不同来提供不同的功能。



```js
import createSagaMiddleware from 'redux-saga';

const saga = createSagaMiddleware();

function *rootSaga() {
    const result = yield call(effectFunction)
    // ...
}

saga.run(rootSaga)
```

在生成器函数中，yield关键字后面需要执行一个指令函数，指令函数会返回一个指令对象。当saga在迭代生成器对象时，会根据不同的指令对象，执行不同的逻辑。



#### take

该指令只监听一次action的分发。当action分发后，yeild会返回一个分发的action对象。



#### takeEvery

该指令会一直监听action的分发，它永远不会结束当前的生成器。



#### all

该指令接收多个生成器，只有生成器全部执行完毕，all指令才会继续向下执行。



#### delay

阻塞指定的毫秒数。



#### put

用于重新触发一个action，相当于进行了一次dispatch。



#### call

该指令用于副作用函数，副作用函数必须返回Promise，让saga自己解析。

```js
import * as UserAction from '../action/userAction'
import { takeEvery, put, call, cps } from 'redux-saga/effects'

function mockFetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.6) {
        reject(new Error('test error.'))
      } else {
        resolve([{ id: 1, name: 'Marry' }])
      }
    }, 1000)
  })
}

function *fetchUsersAction(action) {
  console.log('fetchUsersAction: ', action)
  try {
    const result = yield call(mockFetchUsers)
    console.log('fetch users action: ', result)

    yield put(UserAction.getSetUserAction(result))
  } catch(error) {
    console.log('receive a error: ', error)
  }
}

export default function*() {
  yield takeEvery(UserAction.FetchUsers, fetchUsersAction)
  console.log('end at user.js')
}
```



#### apply

apply(this, effectFunction, [])，this: effectFunction执行时this的指向。effecFunction是要执行的受影响函数。[]是传递的参数。



#### search

用于获取当前Store的数据。



#### cps

用于调用传统的回调方式的异步函数。当你的副作用函数返回的不是Promise时使用。

```js
// cps指令
// callback是一个回调函数，由saga传入。该回调函数是nodejs格式的回调函数，参数是一个error对象，参数2是要传入的值。
function mockFetchUsers(conditions, callback) {
  console.log('fetch users: ', conditions)
  setTimeout(() => {
    if (Math.random() > 0.6) {
      callback(new Error('occur a error'), null)
    } else {
      callback(null, [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
      ])
    }
  }, 1000)
}

function *fetchUsersAction(action) {
  const result = yield cps(mockFetchUsers, action)
  console.log('receive result: ', result)
}

export default function*() {
  yield takeEvery(UserAction.FetchUsers, fetchUsersAction)
  console.log('end at user.js')
}
```



#### fork

用于开启一个新任务，该指令不会阻塞当前代码，fork指令需要传递一个生成器函数。

example: 模拟takeEvery指令

```js
// 模拟takeEvery指令
function *takeEvery(action, generatorFunc) {
  while (1) {
    // 监听CounterAction.DECREASE，触发后指向下面代码。
    yield take(action)

    // take监听到action触发后，必须再次fork并立即进行监听，避免监听不到后续触发的action。
    yield fork(() => {
      generatorFunc()
      // yield delay(2000)
      // yield put(CounterAction.getIncreaseAction(1))
    })
  }
}
```



example1：定时器的开启与关闭。

```js
let task;
function* stopTask() {
    if (task) {
      yield cancel(task)
    }
}

function *autoIncrease() {
  while(1) {
    const action = yield take(CounterAction.AutoIncrease);
      
    yield *stopTask()

    task = yield fork(function*() {
      while (1) {
        yield delay(4000)
        yield put(CounterAction.getIncreaseAction(action.payload))
      }
    });
  }
}

function stopAutoIncr() {
    yield *stopTask()
}

export default function*() {
  yield fork(autoIncrease);
	yield takeLastest(ActionTypes.StopAutoIncrease, stopAutoIncr)
}
```



example2: 定时器的开始和停止。

```js
var isStop = false

function *autoIncrease() {
  isStop = false
  while (1) {
    yield delay(2000)
    console.log('isStop: %o', isStop)
    if (isStop) {
      break;
    }
    yield put(CounterAction.getIncreaseAction(1))
  }
}

function stopAutoIncrease() {
  isStop = true
  console.log('stopAutoIncrease, ', isStop)
}

export default function*() {
  yield takeLatest(CounterAction.AutoIncrease, autoIncrease)
  yield takeLatest(CounterAction.StopIncrease, stopAutoIncrease)
}
```



example：状态流的实现。

```js
function *autoIncrease() {
  while (1) {
    yield take(CounterAction.AutoIncrease)

    const task = yield fork(function*() {
      try {
        while(1) {
          yield delay(1000)
          yield put(CounterAction.getIncreaseAction(1))
        }
      } finally {
        if (yield cancelled()) {
          console.log('当前任务被取消了.')
        }
      }
    })
    
    yield take(CounterAction.StopIncrease)
    yield cancel(task)
  }
}


export default function*() {
  yield fork(autoIncrease)
}
```





#### race

竞争，可以传递多个指令，当其中某个指令执行完毕，会直接结束。该指令会返回最先完成的指令结果。

```js
function asyncAction() {
  return new Promise((resolve) => {
    const duration = Math.random() * 3000 + 1000
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(CounterAction.getIncreaseAction(1))
      } else {
        resolve(CounterAction.getDecreaseAction(2))
      }
    }, duration)
  })
}

export default function*() {
  const result = yield race({
    action1: call(asyncAction),
    action2: call(asyncAction),
    action3: call(asyncAction),
  })
  console.log(result)
}
```

example：race实现定时器的开启和关闭。

