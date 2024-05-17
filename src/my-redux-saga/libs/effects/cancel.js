import { createEffectObject, effectTypes } from "../effectHelper";

export function cancel(task) {
  return createEffectObject(effectTypes.cancel, {
    task
  })
}

export function runCancel(_env, payload, next) {
  payload.task.cancel()
  next()
}
