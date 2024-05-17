import { createActions, handleActions } from "redux-actions"

export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const ADD = 'ADD'


export const { increase, decrease, add } = createActions({
  [INCREASE]: null,
  [DECREASE]: null,
  [ADD]: (n) => (n),
})

export default handleActions({
  [increase]: (state) => {
    return state + 1
  },
  [decrease]: (state) => {
    return state - 1
  },
  [add]: (state, action) => {
    return state + action.payload
  }
}, 0)