import * as ActionTypes from '../action/counterAction'

const initialState = {
  count: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREASE:
      return {
        count: state.count + Number(action.payload)
      }
    case ActionTypes.DECREASE:
      return {
        count: state.count - Number(action.payload)
      }
    default:
      return state
  }
}