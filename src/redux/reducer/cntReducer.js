import * as actionTypes from '../action/cntActions'

const initialState = {
  cnt: 0
}

/**
 * @param state 要处理的数据，由store传递。
 * @param action 处理数据的动作（action）
 * @return {any} 返回处理过的state
 */
export default function reducer(state = initialState, action) {
  if (action.type === actionTypes.Increase) {
    return {
      cnt: state.cnt + Number(action.payload)
    }
  }
  if (action.type === actionTypes.Decrease) {
    return {
      cnt: state.cnt - Number(action.payload)
    }
  }
  if (action.type === actionTypes.Set) {
    return {
      cnt: action.payload
    }
  }
  return state
}

