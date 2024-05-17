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

// This email is to confirm that your profile has been created in UD Trucks career site. you can visit your profile page at any time to update your profile.
// best regards
// UD Trucks Recruitment Team
