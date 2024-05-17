import isPromise from 'is-promise';
import { createEffectObject, effectTypes } from '../effectHelper';

export function call(handler, ...args) {
  let fn = handler;
  let context = null;

  if (Array.isArray(handler)) {
    context = handler[0]
    fn = handler[1]
  }

  return createEffectObject(effectTypes.call, {
    context,
    fn,
    args
  })
}

export function runCall(_env, payload, next) {
  const { fn, context, args } = payload
  const result = fn.call(context, ...args)

  if (isPromise(result)) {
    result.then(data => next(data))
      .catch(error => next(null, error))
  } else {
    next(result)
  }
}