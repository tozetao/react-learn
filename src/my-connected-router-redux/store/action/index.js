import { combineReducers } from 'redux'

// import { connectRouter } from 'connected-react-router'
import { connectRouter } from '../../lib/index';

import cntActions from './cntActions'
import userReducer from './userActions'

// export default combineReducers({
//   countState: cntActions,
//   userState: userReducer
// })

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  countState: cntActions,
  userState: userReducer
})

export default createRootReducer