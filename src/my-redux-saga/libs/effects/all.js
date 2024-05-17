import { createEffectObject, effectTypes } from '../effectHelper';
import { proc } from '../runSaga';

export function all(generators) {
  console.log('all generator: ', generators)
  generators = generators || []
  return createEffectObject(effectTypes.all, {
    generators
  })
}

export function runAll(env, payload, next) {
  const generators = payload.generators

  /*
    在生成任务对象时，该任务就开始进行迭代了。

    因此先生成任务对象，再将任务对象转换成Promise对象会有bug。
    如果任务所对应的生成器迭代完成，该任务就完成了。但是Promise对象的状态不是完成状态。

    它
  */

  const tasks = generators.map(g => {
    let ID = Math.random().toString(32).substring(2, 4)
    return proc(env, g, ID)
  })

  const promises = tasks.map(task => {
    return task.toPromise()
  })

  Promise.all(promises).then(() => {
    next()
  })
}