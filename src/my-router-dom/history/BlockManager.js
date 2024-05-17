export default class BlockManager {
  prompt = undefined
  getUserConfirmation

  constructor(getUserConfirmation) {
    this.getUserConfirmation = getUserConfirmation
  }

  // 在路由跳转时增加一个阻塞
  block(prompt) {
    // prompt可以是一个字符串，或者一个函数。
    // 如果是一个函数，最终将会返回一个message给getUserConfirmation回到函数使用。
    if (typeof prompt !== 'string' && typeof prompt !== 'function') {
      return
    }
    if (!prompt) {
      return
    }
    this.prompt = prompt
    
    return () => {
      this.prompt = undefined
    }
  }

  // 触发阻塞判断
  trigger(location, action, callback) {
    console.log('block trigger: ', this.prompt)

    if (!this.prompt) {
      typeof callback === 'function' && callback()
      return
    }

    let message = ''
    if (typeof this.prompt === 'string') {
      message = this.prompt
    } else {
      message = this.prompt(location, action)
    }

    this.getUserConfirmation(message, (result) => {
      if (result) {
        typeof callback === 'function' && callback()
      }
    })
  }
}
