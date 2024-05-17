import { runCall } from './effects/call';
import { effectTypes } from './effectHelper';
import { runSelect } from './effects/select';
import { runPut } from './effects/put';
import { runTake } from './effects/take';
import { runFork } from './effects/fork';
import { runCancel } from './effects/cancel';
import { runAll } from './effects/all';

export function runEffect(env, effectObject, iterator) {
  switch(effectObject.type) {
    case effectTypes.call:
      runCall(env, effectObject.payload, iterator)
      break;
    case effectTypes.select:
      runSelect(env, effectObject.payload, iterator)
      break;
    case effectTypes.put:
      runPut(env, effectObject.payload, iterator)
      break;
    case effectTypes.take:
      runTake(env, effectObject.payload, iterator)
      break;
    case effectTypes.fork:
      runFork(env, effectObject.payload, iterator)
      break;
    case effectTypes.cancel:
      runCancel(env, effectObject.payload, iterator)
      break;
    case effectTypes.all:
      runAll(env, effectObject.payload, iterator)
      break;
    default:
      throw new Error('unknow effect object.')
  }
}