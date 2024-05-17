import { createEffectObject, effectTypes } from "../effectHelper";
import { runSaga } from "../runSaga";

export function fork(generatorFunc, ...args) {
  return createEffectObject(effectTypes.fork, {
    generatorFunc,
    args
  })
}

export function runFork(env, payload, next) {
  const task = runSaga(env, payload.generatorFunc, ...payload.args)
  next(task)
}
