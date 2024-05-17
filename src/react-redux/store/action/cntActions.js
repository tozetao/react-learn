import { createActions, handleActions } from "redux-actions"

export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const ADD = 'ADD'
export const AUTO_INCREASE = 'AUTO_INCREASE'

export const CANCEL_AUTO_INCREASE = 'CANCEL_AUTO_INCREASE'

export const { increase, decrease, add, autoIncrease, cancelAutoIncrease } = createActions({
  [INCREASE]: null,
  [DECREASE]: null,
  [ADD]: (n) => (n),
  [AUTO_INCREASE]: null,
  [CANCEL_AUTO_INCREASE]: null
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
  },
  [autoIncrease]: (state) => {
    return state + 1
  }
}, 0)