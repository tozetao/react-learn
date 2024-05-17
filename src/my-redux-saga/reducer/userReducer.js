import * as ActionTypes from '../action/userAction'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SetUser:
      return {
        ...state,
        list: action.payload
      }
    case ActionTypes.RemoveUser:
      const list = state.list.filter(item => item.id !== action.payload.id)
      return {
        list
      }
    default:
      return state
  }
}