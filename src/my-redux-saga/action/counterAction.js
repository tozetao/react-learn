export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

export const AutoIncrease = 'AutoIncrease'
export const StopIncrease = 'StopIncrease'

export function getIncreaseAction(value) {
  return {
    type: INCREASE,
    payload: value
  }
}

export function getDecreaseAction(value) {
  return {
    type: DECREASE,
    payload: value
  }
}

export function getAutoIncreaseAction(value) {
  return {
    type: AutoIncrease,
    payload: value
  }
}

export function getStopIncreaseAction(value) {
  return {
    type: StopIncrease,
    payload: value
  }
}