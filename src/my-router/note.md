
createBrowerHistory(options)
  创建一个使用浏览器的History API的history对象

createMemoryHistory(options)
  创建一个使用内存中的地址栈的history对象

createHashHistory
  创建一个使用浏览器hash的history对象。

以上3个方法都会返回history对象，表示不同环境下的history，但是会提供相同的接口。

### History

- action
  表示当前地址栈的最后一次操作类型。
  1. 通过调用createXXXHistory()函数新建的history对象，action固定为POP
  2. 如果调用push()方法，action为PUSH
  3. 如果调用replace()方法，action为REPLACE

- push
  向地址栈中加入一个新的地址。

- replace
  把当前指针指向的地址进行替换。

- go
  控制当前地址栈的偏移量。
  如果是0将会刷新页面，当前地址不变；正数表示在地址栈中前进的步数，负数表示在地址栈中后退的步数。
  注：调用该方法，action属性值不会变化。
- goForward
- goBack
  
- length
  地址栈的地址数量。

- listen(callback): cancelFunc
  用于监听地址指针的变化。该函数接受一个函数作为参数。

  callback(location, action):
  - location: 该对象包含新地址信息
  - action: 进入新地址的方式
    POP: 指针变化，只要地址栈中的指针发生变化，都是POP动作。比如调用go、push、用户点击浏览器后退，都是POP动作。
    PUSH：调用history.push()方法
    REPLACE：调用history.replace()方法

  cancelFunc: 用于取消listen的监听。

  注：listen()可以添加多个监听函数。

- block(callback): unBlock
  用于设置阻塞，当页面跳转时，并将指定的消息传递到getUserConfirmation()

  callback(location, action)
  - location: 表示要跳转页面信息。
  - aciton

  unBlock: 取消函数，解除阻塞。

- createHref(location)
  接收location参数，返回一个完成的路径。

options
  - basename
    设置根路径

  - forceUpdate
    地址改变时是否强制刷新页面

  - keyLength
    location对象key的长度。
    地址栈存储的元素是location对象，为了区分location对象，所有有了key值。比如path同样都是/user的location是不同的俩个地址。

  - getUserConfirmation(message, next)
