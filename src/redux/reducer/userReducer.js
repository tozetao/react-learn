import * as actionTypes from '../action/userActions';

const initialState = {
  list: [
    { id: 1, name: 'lisi' }
  ]
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.AddUser:
      return {
        list: [...state.list, action.payload]
      }
    case actionTypes.RemoveUser:
      const newUsers = state.list.filter(item => item.id !== action.payload)
      return {
        list: newUsers
      }
    case actionTypes.SetUsers:
      return {
        list: [...state.list, ...action.payload]
      }
    default:
      return state
  }
}