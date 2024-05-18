import * as actionTypes from './actionTypes'

/*

需求1：route切换时，触发Store的dispatch，把路由相关信息存储到Store中。



*/
export default function(history) {
  const initState = {
    action: history.action,
    location: history.location
  }

  return function(state = initState, action) {
    switch(action) {
      case actionTypes.LOCATION_CHANGING:
        return action.payload
      default:
        return state
    }
  }
}