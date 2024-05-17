import { createEffectObject, effectTypes } from '../effectHelper';

// 接收一个action type，返回一个action对象。
export function take(actionType) {
  return createEffectObject(effectTypes.take, {
    actionType
  })
}

export function runTake(env, payload, next) {
  const channel = env.channel

  channel.take(payload.actionType, action => {
    next(action)
  })
}