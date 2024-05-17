export default class ListenManager {
  callbacks = []

  // 当路由发生变动时，执行回调函数
  listen(callback) {
    this.callbacks.push(callback)

    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index === -1) {
        return
      }
      this.callbacks.splice(index, 1)
    }
  }

  trigger(location, action) {
    // console.log('listen trigger: %o', this.callbacks, location, action)
    this.callbacks.forEach(callback => {
      callback(location, action)
    })
  }
}