import { combineReducers } from 'redux'
import userReducer from './userReducer'
import counterReducer from './counterReducer'

export default combineReducers({
  userState: userReducer,
  counterState: counterReducer
})