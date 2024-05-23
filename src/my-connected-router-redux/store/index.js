import { createStore, applyMiddleware } from 'redux'

import history from './history'
import { routerMiddleware } from '../lib/middleware'

import rootSaga from './rootSaga'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from './action/index'


const logger = store => next => action => {
  console.log('before router: ', store.getState().router)
  next(action)
  console.log('after router', store.getState().router)
}
const saga = createSagaMiddleware()

const rootReducer = createRootReducer(history)

const store = createStore(
  rootReducer,
  applyMiddleware(
    routerMiddleware(history),
    saga,
    logger
  )
)

saga.run(rootSaga)

export default store
