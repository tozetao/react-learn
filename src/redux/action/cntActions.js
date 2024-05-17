export const Increase = 'increase'
export const Decrease = 'decrease'
export const Set = 'set'

export const getIncreaseAction = (n) => ({
  type: Increase,
  payload: n
})

export const getDecreaseAction = (n) => ({
  type: Decrease,
  payload: n
})

export const getSetAction = (payload) => ({
  type: Set,
  payload
})

