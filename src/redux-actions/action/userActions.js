import { createActions, handleActions } from "redux-actions"

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const FETCH_USERS = 'FETCH_USERS'

export const { addUser, removeUser, setUsers, fetchUsers } = createActions({
  [ADD_USER]: (user) => (user),
  [REMOVE_USER]: (userId) => (userId),
  [SET_USERS]: (users, total) => ({ users, total }),
  [FETCH_USERS]: null
})

export default handleActions({
  [addUser]: (state, action) => {
    const users = [...state.users, action.payload]
    return {
      users,
      total: state.total + 1
    }
  },
  [removeUser]: (state, action) => {
    const newUsers = state.list.filter(item => item.id !== action.payload)
    return {
      list: newUsers,
      total: state.total - 1
    }
  },
  [setUsers]: (state, action) => {
    console.log('setUsers ', state, action)
    return action.payload
  }
}, {
  users: [],
  total: 0
})
