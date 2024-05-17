import { combineReducers } from 'redux'

import cntActions from './cntActions'

import userReducer from './userActions'

export default combineReducers({
  countState: cntActions,
  userState: userReducer
})