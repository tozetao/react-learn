import { createEffectObject, effectTypes } from "../effectHelper";

export function select(fn) {
  return createEffectObject(effectTypes.select, {
    fn
  })
}

export function runSelect(env, payload, next) {
  let state = env.store.getState()
  if (payload.fn) {
    state = payload.fn(state)
  }
  next(state)
}