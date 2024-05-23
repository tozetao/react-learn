import * as actionTypes from './actionTypes';

export function routerMiddleware(history) {
  return store => next => action => {
    // 拦截CALL_ROUTER_METHOD action
    if (actionTypes.CALL_ROUTER_METHOD === action.type) {
      const path = action.payload.path

      if (action.payload.type === 'PUSH') {
        history.push(path)
      } else if (action.payload.type === 'REPLACE') {
        history.replace(path)
      }
    } else {
      next(action)
    }
  }
}