export default class Channel {
  listeners = {}

  // 订阅
  take(prop, fn) {
    if (this.listeners[prop]) {
      this.listeners[prop].push(fn)
    } else {
      this.listeners[prop] = [fn]
    }
  }

  // 发布
  put(prop, ...args) {
    console.log('put: ', prop, this.listeners[prop])
    if (this.listeners[prop]) {
      // 下面的代码会导致while(1) { yield take(); } 死循环
      // for (const fn of this.listeners[prop]) {
      //   // console.log('in channel while cycle, length: ', this.listeners[prop].length)
      //   fn(...args)
      // }

      // for (let i = 0; i < this.listeners[prop].length; i++) {
      //   console.log('in channel while cycle.')
      //   const fn = this.listeners[prop][i];
      //   fn(...args)
      // }
      const handles = this.listeners[prop]
      delete this.listeners[prop]
      handles.forEach(next => next(...args))
      
      // console.log('delete listeners: ', prop, this.listeners)
    }
  }
}