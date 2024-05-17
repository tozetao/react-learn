import { createStore, applyMiddleware } from 'redux'

import reducer from './action/index'

import rootSaga from './rootSaga'

import createSagaMiddleware from 'redux-saga'

const saga = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(saga))

saga.run(rootSaga)

export default store
