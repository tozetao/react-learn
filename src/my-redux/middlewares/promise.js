function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * 判断是否是一个平面对象。即：只允许包含type、payload、meta、error属性，且type属性必须是一个string。
 * 
 * @param {object} action
 * @returns 
 */
function isFluxObject(action) {
  return isPlainObject(action) &&
    Object.keys(action).every(item => (['type', 'payload', 'error', 'meta'].indexOf(item) !== -1)) &&
    typeof action.type === 'string'
}

function isPlainObject(action) {
  return typeof action === 'object' && action.__proto__ === Object.prototype
}

export default ({ dispatch }) => next => action => {
  if (!isFluxObject(action)) {
    return isPromise(action) ? action.then(dispatch): next(action)
  }
  
  return isPromise(action.payload) ?
    action.payload.then(payload => {
      dispatch({
        ...action,
        payload
      })
    }).catch(error => {
      dispatch({
        ...action,
        payload: error,
        error: true
      })
    }) : next(action)

}