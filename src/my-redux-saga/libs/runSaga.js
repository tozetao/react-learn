import isGenerator from 'is-generator'
import isPromise from 'is-promise'

import { isEffectObject } from './effectHelper'
import { runEffect } from './runEffect';

class Task {
  next;
  cb;
  name;

  resolve;

  finished = false

  constructor(next, cb, name) {
    this.next = next
    this.cb = cb
    this.name = name

    this.cb.done = () => {
      console.log('Task is finished, ', this.resolve)
      this.finished = true
      this.resolve && this.resolve()
    }
  }

  cancel() {
    this.next(null, null, true)
  }

  toPromise() {
    if (this.finished) {
      return Promise.resolve()
    }
    return new Promise(resolve => {
      this.resolve = resolve
    })
  }
}

// let cnt = 0

// run方法：用于迭代生成器，根据返回的指令对象进行不同的逻辑处理。
export function runSaga(env, generatorFunc, ...args) {
  let iterator = generatorFunc(...args);

  if (!isGenerator(iterator)) {
    throw new Error('The generatorFunc oaran must be a generator.') 
  }
  
  return proc(env, iterator)
}

export function proc(env, iterator, ID) {
  const cb = {
    done: undefined
  }

  // 在生成器函数中，我们可以创建任意多个Task，也就是说，只有这些任务全部都完成时，当前生成器任务才算作结束。

  const tasks = []

  function next(nextValue, error, isOver) {
    // error
    if (error) {
      // throw错误时，不会中断当前代码执行，也会中断生成器函数的执行。
      iterator.throw(error)
      return;
    }

    if (nextValue instanceof Task) {
      tasks.push(nextValue)
    }

    let result;
    if (isOver) {
      result = iterator.return(nextValue)
    } else {
      result = iterator.next(nextValue)
    }

    // console.log('result: %o, nextValue: %o', result, nextValue)
    
    const { value, done } = result
    if (done) {
      // nextValue是task任务时，只有该task任务结束，当前生成器所对应的任务才算做结束。
      if (tasks.length) {
        console.log('tasks: ', tasks)
        const promises = tasks.map(task => task.toPromise())
        Promise.all(promises).then(() => {
          cb.done && cb.done()  
        })
      } else {
        cb.done && cb.done()
      }
      return;
    }

    if (isPromise(value)) {
      value.then(result => next(result)).catch(error => next(null, error))
      return;
    }

    if (isEffectObject(value)) {
      runEffect(env, value, next)
    } else {
      next(value)
    }
  }

  const task = new Task(next, cb, ID)
  next()
  return task
}

/*
我们通过生成器函数返回的生成器来控制生成器函数中代码的执行。

使用递归一直迭代生成器，可以执行完生成器函数中的代码。
在递归迭代生成器的过程中，通过一些手段，比如Promise，或者发布-订阅模式，就能够实现暂停生成器代码的执行，直到触发某个时机。

call指令：
它其实是在异步任务完成后再调用next()方法，恢复生成器的迭代。

fork指令：
fork指令新建了一个生成器，因此fork指令新建的生成器即时暂停了，也不会影响外部生成器的迭代。

take：
take指令将通过 发布 - 订阅模式，在发布时暂停迭代器的执行，就是把next的执行时机放到一个数组中，提现在外部就是暂停生成器的执行了。
当触发action时，再去执行next，恢复生成器的执行。

all:
该指令的实现代码有问题。

*/