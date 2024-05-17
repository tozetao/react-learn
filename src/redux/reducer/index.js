import cntReducer from './cntReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux'
// import { combineReducers } from '../../my-redux/redux'

// export default (state = {}, action) => {
//   return {
//     userModule: userReducer(state.userModule, action),
//     cntModule: cntReducer(state.cntModule, action)
//   }
// }

// combineReducers(): 
// 返回一个reducer(state, action)函数。
// 每个recuder接受自身对应的state，比如cntReducer接收state[cntModule]。
export default combineReducers({
  cntStore: cntReducer,
  userStore: userReducer
})
