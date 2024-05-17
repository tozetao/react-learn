import { createEffectObject, effectTypes } from "../effectHelper";

export function put(action) {
  return createEffectObject(effectTypes.put, {
    action
  })
}

export function runPut(env, payload, next) {
  const action = payload.action
  const store = env.store
  next(store.dispatch(action))
}
