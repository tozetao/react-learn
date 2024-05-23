import { takeEvery, delay, select, put, cancel } from 'redux-saga/effects'

import { fetchUsers, setUsers } from './action/userActions'

import { autoIncrease, cancelAutoIncrease } from './action/cntActions'

export default function*() {
  console.log('saga start')

  yield takeEvery(fetchUsers.toString(), function*() {
    yield delay(2000)
    yield put(setUsers([
      { id: 1, name: 'lisi' },
      { id: 2, name: 'lisi' },
    ], 2))
    const state = yield select(state => (state.userState))
    console.log('current state: ', state)
  })

  const task = yield takeEvery(autoIncrease.toString(), function*() {
    console.log('dispatch an auto_increase action.')
    yield delay(1000)
    yield put(autoIncrease())
  })

  yield takeEvery(cancelAutoIncrease.toString(), function*() {
    if (task) {
      yield cancel(task)
      console.log('cancel success')
    }
  })

  console.log('saga end')
}