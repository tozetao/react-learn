import { fork } from "./fork";
import { take } from "./take";

// 监听指定的action类型，你可以在生成器中
export function takeEvery(actionType, generatorFunc, ...args) {
  return fork(function*() {
    while(1) {
      const action = yield take(actionType)
      args.unshift(action)
      yield fork(generatorFunc, args)
    }
  }, ...args)
}