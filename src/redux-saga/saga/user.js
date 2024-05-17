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

// // cps指令
// // callback是一个回调函数，由saga传入。该回调函数是nodejs格式的回调函数，参数是一个error对象，参数2是要传入的值。
// function mockFetchUsers(conditions, callback) {
//   console.log('fetch users: ', conditions)
//   setTimeout(() => {
//     if (Math.random() > 0.6) {
//       callback(new Error('occur a error'), null)
//     } else {
//       callback(null, [
//         { id: 1, name: 'A' },
//         { id: 2, name: 'B' }
//       ])
//     }
//   }, 1000)
// }

// function *fetchUsersAction(action) {
//   const result = yield cps(mockFetchUsers, action)
//   console.log('receive result: ', result)
// }

export default function*() {
  yield takeEvery(UserAction.FetchUsers, fetchUsersAction)
  console.log('end at user.js')
}