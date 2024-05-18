import * as actionTypes from './actionTypes'

// 当Store分发push、replace这俩个方法产生的action时，中间件会对其进行处理，使用history来进行跳转。

export function push(...args) {
  return {
    action: actionTypes.CALL_ROUTER_METHOD,
    payload: args
  }
}

export function replace(...args) {
  return {
    action: actionTypes.CALL_ROUTER_METHOD,
    payload: args
  }
}