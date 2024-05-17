import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Types = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number
  })
}

class A extends Component {
  static childContextTypes = {
    user: Types.user
  }

  static contextTypes = {
    user: Types.user
  }

  getChildContext() {
    return {
      user: {
        name: 'Luck',
        age: 55
      }
    }
  }

  // 在组件中，this.context始终引入父组件定义的context。
  // 在这里，可以看到A组件引入了父组件的Context，即使A定义的ContextType与父组件的Context相同，this.context是不会指向A自己的context的
  render() {
    return (
      <div>
        <div>
          <h3>A component.</h3>
          <p>name: {this.context.user?.name}, age: {this.context.user?.age}</p>
        </div>
        <B />
      </div>
    )
  }
}

class B extends Component {
  // 声明要使用的context
  static contextTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number
    })
  }

  // // 在构造函数中会传入context
  // constructor(props, context) {
  //   super(props)
  //   console.log(context)
  // }
  
  render() {
    return (
      <div>
        <h3>B component</h3>
        <p>通过this.context访问, name: {this.context.user.name}, age: {this.context.user.age}</p>
        <C />
      </div>
    )
  }
}

function C(props, context) {
  console.log('props: %o, context: %o', props, context)
  return (
    <div>
      <h3>C is a function component.</h3>
      <p>requestCnt: {context.requestCnt}</p>
      <p><button onClick={context.request}>Request</button></p>
    </div>
  )
}
C.contextTypes = {
  requestCnt: PropTypes.number,
  request: PropTypes.func
}

export default class OldContext extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestCnt: 0
    }
  }
  
  // 上下文数据类型约束
  static childContextTypes = {
    appConfig: PropTypes.shape({
      showSidebar: PropTypes.bool,
      version: PropTypes.string
    }),
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number
    }),
    requestCnt: PropTypes.number,
    request: PropTypes.func
  }

  // 返回上下文数据
  // 注：在render()函数之后执行，即组件已挂载完成
  getChildContext() {
    console.log('getChildContext', this.state)
    return {
      appConfig: {
        showSidebar: false
      },
      user: {
        name: 'Lee',
        age: 15
      },
      requestCnt: this.state.requestCnt,
      request: () => {
        this.setState({
          requestCnt: this.state.requestCnt + 1
        })
      }
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {
    console.log('render component')
    return (
      <div>
        <p>旧Context</p>
        <A />
        {/* <p>
          <button onClick={() => {
            this.setState({})
          }}>Click</button>
        </p> */}
      </div>
    )
  }
}
