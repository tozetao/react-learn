import React from 'react';

import { createStore, bindActionCreators } from './redux';
import cntReducer from './cntReducer'
import * as cntActions from './cntActions';

const store = createStore(cntReducer)

// const unListen = store.subscribe(() => {
//   console.log('This is a listener.')
// })
// unListen();

// const incr = bindActionCreators(cntActions.getIncrAction, store.dispatch)
// incr(10)
// console.log(store.getState())

const dispatchers = bindActionCreators({
  incr: cntActions.getIncrAction,
  decr: cntActions.getDecrAction
}, store.dispatch)

dispatchers.incr(10)
console.log(store.getState())

dispatchers.decr(5)
console.log(store.getState())

// store.dispatch(cntActions.getIncrAction())
// console.log(store.getState())

// store.dispatch(cntActions.getDecrAction())
// console.log(store.getState())

export default function App() {
  return (<div>
    APP
  </div>)
}
