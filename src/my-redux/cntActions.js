export function getIncrAction(value) {
  return {
    type: 'incr',
    payload: value
  }
}

export function getDecrAction(value) {
  return {
    type: 'decr',
    payload: value
  }
}