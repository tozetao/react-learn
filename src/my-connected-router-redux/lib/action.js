import * as actionTypes from './actionTypes'

// 当Store分发push、replace这俩个方法产生的action时，中间件会对其进行处理，使用history来进行跳转。

export function push(path) {
  let payload = {
    type: 'PUSH',
    path
  }

  if (path && typeof path === 'object'){
    payload = {
      ...payload,
      ...path
    }
  }

  return {
    type: actionTypes.CALL_ROUTER_METHOD,
    payload
  }
}

export function replace(path) {
  let payload = {
    type: 'REPLACE',
    path
  }

  if (path && typeof path === 'object'){
    payload = {
      ...payload,
      ...path
    }
  }

  return {
    type: actionTypes.CALL_ROUTER_METHOD,
    payload
  }
}

export function changeLocation(location, action) {
  return {
    type: actionTypes.LOCATION_CHANGING,
    payload: {
      location,
      action
    }
  }
}