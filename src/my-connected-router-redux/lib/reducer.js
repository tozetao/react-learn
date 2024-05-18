import * as actionTypes from './actionTypes'

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