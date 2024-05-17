import { takeEvery, delay, select, put } from 'redux-saga/effects'

import { fetchUsers, setUsers } from './action/userActions'

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
  console.log('saga end')
}