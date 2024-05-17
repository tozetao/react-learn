
const identityAttrName = '@@redux-saga/ID'

export const effectTypes = {
  call: 'call',
  take: 'take',
  takeEvery: 'takeEvery',
  select: 'select',
  put: 'put',
  fork: 'fork',
  cancel: 'cancel',
  all: 'all'
}

export function createEffectObject(type, payload) {
  const types = Object.values(effectTypes)
  if(!types.includes(type)) {
    throw new Error('The type param is not a valid type.')
  }

  return {
    [identityAttrName]: true,
    type,
    payload
  }
}

export function isEffectObject(value) {
  if (!value || typeof value !== 'object') {
    return false
  }
  return value[identityAttrName]
}
